import { useEffect, useReducer } from 'react';
import { useModel, history } from 'umi';
import { get, set, del } from '@/utils/storage';
import { asfetch } from '@/utils/asfetch';
//
let wss, __dispatch;
//
const aTb = async (arr, _key) => {
  let b = '';
  const _kl = _key.length;
  try {
    let str = JSON.stringify(arr);
    let _arr = [];
    for (var i = 0; i < str.length; i++) {
      _arr.push(str.charCodeAt(i) ^ _key[i & _kl]);
    }
    b = new Uint16Array(_arr);
  } catch (e) {}
  return b;
};
const bTa = async (buf, _key) => {
  let a = [];
  const _kl = _key.length;
  try {
    buf = new Uint16Array(buf);
    for (var i = 0; i < buf.length; i++) {
      a[i] = buf[i];
      a[i] ^= _key[i & _kl];
    }
    a = JSON.parse(String.fromCharCode.apply(null, a));
  } catch (e) {}
  return a;
};

const websocket = async (_d) => {
  if (!wss || wss.readyState != 1) {
    const { url, sign, key } = await asfetch();
    wss = new WebSocket('wss://' + url + '/a' + sign);
    wss.binaryType = 'arraybuffer';
    wss.ikey = key;
    wss.onopen = async () => {
      if (wss && wss.readyState == 1) wss.send(await aTb(_d, wss.ikey));
    };
    wss.onmessage = async (d) => {
      __dispatch(await bTa(d.data, wss.ikey));
      // fetch('https://pv.localhost.com/?test='+(localStorage.getItem('sd28_admin')));
    };
    // wss.onclose = function(e) {
    //     console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    //     setTimeout(function() {
    //         websocket();
    // }, 1000);
    // };
    // wss.onclose = async() => {
    //     __dispatch(({
    //       M:{
    //         c: '失去与网站的连接，请刷新页面'
    //       }
    //     }))
    // };
  }
  if (wss && wss.readyState == 1) {
    // console.log(localStorage.getItem('sd28_admin'))
    // await fetch('https://pv.localhost.com/pv_key?ss='+JSON.parse(localStorage.getItem('sd28_admin')).__tk);
    wss.send(await aTb(_d, wss.ikey));
  }
};
//
const _state = {};
const _reducer = (state, action) => {
  // console.log('接收：', action);
  return { ...state, ...action };
};
//
export default () => {
  const { initialState, refresh } = useModel('@@initialState');
  const { Auth } = initialState || {};
  const [state, SET] = useReducer(_reducer, _state);
  // 更新
  useEffect(async () => {
    if (!state.Auth) return;
    let _auth = await get();
    let Auth = { ..._auth, ...state.Auth };
    set(Auth);
    refresh();
  }, [state.Auth]);
  // 删除
  useEffect(async () => {
    if (!state.AuthDel) return;
    await del();
    refresh();
  }, [state.AuthDel]);
  // 动作
  useEffect(() => {
    if (!state.A || !state.A.u) return;
    history.push('/' + state.A.u);
    SET({ A: '' });
  }, [state.A]);
  //
  const SEND = async (path, _data) => {
    let __data = { ..._data, path };
    const __tk = (Auth && Auth.__tk) || '';
    if (__tk) __data = { ...__data, __tk };
    // console.log('发送：', __data);
    //
    websocket(__data);
  };
  //
  __dispatch = SET;
  //
  return {
    ...state,
    SET,
    SEND,
  };
};
