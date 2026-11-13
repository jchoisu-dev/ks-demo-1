import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { GameLocal } from 'utils/game';
import { useSelector, useDispatch } from 'react-redux';
import { t } from 'i18n';
// 
const ten = (e) => {
    return e<10?'0'+e:e;
}
const showTime = (time) => {
    time = time>0 ? time : 0;
    let _arr = [];
    _arr[0] = Math.floor(time / 3600);
    _arr[1] = Math.floor(Math.floor(time % 3600) / 60);
    _arr[2] = time % 60;
    // 
    _arr[0] = ten(_arr[0]);
    _arr[1] = ten(_arr[1]);
    _arr[2] = ten(_arr[2]);
    // 
    let _new = _arr.toString().replace(/,/gi, '');
    //
    return _new.split('');
}
const ssTime = (category) => {
    if(category=='pk') category='jnd';
    if(category=='dd') category='bj';
    const _t = {
        jnd: [30,1],
        bj: [30,1],
        jnc: [30,1],
        au: [30,1],
        slfk: [30,1],
        elg: [30,1],
        btc: [10,5],
    }
    return _t[category];
}

export default () => 
{
    const DATA = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    let location = useLocation();
    // 
    const { category, type } = GameLocal(location.pathname);
    let data = DATA&&DATA['Lottery'+category+''+type][1];
    // 
    const _time = data&&data[1] || 0;
    const __weihu = data&&data[2] || 1;
    const _sstime = ssTime(category);
    const _stop = _sstime&&_sstime[0] || 0;
    const _open = _sstime&&_sstime[1] || 0;
    // 
    const [time, setTime] = useState('');
    // 时间同步
    useEffect(() => 
    {
        if(!data) return;
        setTime(_time);
        let _d = {};
        _d['lottery_stop_'+category] = _time<_stop ? 1 : 2;
        _d['lottery_open_'+category] = _time<_open ? 1 : 2;
        dispatch.models.SET(_d);
        const timer = setInterval(c=>
        {
            setTime(c=>{
                if(c==_stop)
                {
                    _d['lottery_stop_'+category] = 1;
                    dispatch.models.SET(_d);
                }
                if(c==_open)
                {
                    _d['lottery_open_'+category] = 1;
                    dispatch.models.SET(_d);
                }
                if(c==1)
                {
                    clearInterval(timer);
                    return 0;
                }
                if(c>0) return c-1;
            });
        }, 1000);
        return () => clearInterval(timer)
    }, [data]);
    // 
    const clock = showTime(time);
    // 
    const betTxt = () => {
        if(__weihu==2) return t("停盘时间");
        if(time<=_open) return t("正在开奖中...");
        if(time<=_stop) return t("停止投注，准备开奖");
        return t("火热投注中");
    }
    //
    return <div className="jieguo">
        <p>
            {t("距离第")} <b>{data&&data[0]}</b> {t("期开奖")}
        </p>
        <div className={"gametime"+(time<=5?' stop':'')}>
            {[0,1,2,3,4,5].map((v,k)=>(
                <span key={k}>{clock&&clock[v]}</span>
            ))}
        </div>
        <p>{betTxt()}</p>
    </div>
}