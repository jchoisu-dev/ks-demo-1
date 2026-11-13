import { aTb, bTa } from "utils/wss";
import { store, persistor } from './data';
import { t } from 'i18n';
// 
const SEND = async(path, _data) => 
{
    const Auth = store.getState().auths || '';
    const wss = store.getState().models.wss || '';
    // 
    let __data = {..._data, path };
    const __tk = (Auth && Auth.__tk) || '';
    if(__tk) __data = {...__data, __tk };
    // 
    // console.log(__data); 
    // 
    if(wss)
    {
      wss.onopen = async() => {
        if(wss&&wss.readyState===1) wss.send(await aTb(__data, wss.ikey));
      };
      wss.onmessage = async(d) => {
        store.dispatch.models.SET({...await bTa(d.data, wss.ikey)});
      };
      wss.onclose = async() => {
        store.dispatch.models.SET(({
          M:{
            c: t("失去与网站的连接，请刷新页面")
          }
        }))
      };
    }
    // 
    if(wss&&wss.readyState===1) wss.send(await aTb(__data, wss.ikey));
}
// 
store.subscribe(() => {
  // console.log(store.getState());
});
// 
export {
  SEND,
  store,
  persistor
}