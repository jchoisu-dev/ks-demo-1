import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Button } from 'antd';
import { nTom } from 'utils/tool';
import { _jgTxt } from 'utils/betData';
import { GameLocal } from 'utils/game';
import { store } from 'store';
import { t } from 'i18n';
// 
const _gamename = (type, e) => 
{
    if(type=='pk')
    {
        let _e = e.toString().split('-');
        let _r = '';
        _e.map((v)=>
        {
            _r+=(_r&&'-')+(_jgTxt[v]||v);
        });
        return _r;
    }
    return _jgTxt[e]||e;
}
// 
const _show = (v, type, genTou) => 
{
    if(v[0]==1)
    {
        return <>
            <p><span>{v[1]}</span></p>
            <dl>
                <dt nick={v[2]} img="1"></dt>
                <dd>
                    <div className="boe br5">
                        <div className="table" style={{marginBottom:-1}}>
                            <table>
                                <tr>
                                    <th>{t("期号")}</th>
                                    <th>{t("结果")}</th>
                                    <th>{t("金豆")}</th>
                                </tr>
                                {Object.keys(v[4]).map(kk=>(
                                    <tr key={kk}>
                                        <td><small>{v[3]}</small></td>
                                        <td><b>{_gamename(type,kk)}</b></td>
                                        <td>{nTom(v[4][kk])}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="2">{t("共")} {Object.keys(v[4]).length} {t("注，合计")} {nTom(v[5])} {t("豆")}</td>
                                    <td>
                                        <Button 
                                            size="small" 
                                            type="primary" 
                                            block
                                            onClick={()=>genTou(v)}
                                        >
                                            {t("跟投")}
                                        </Button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </dd>
            </dl>
        </>
    }
    if(v[0]==2)
    {
        return <>
            <p><span>{v[1]}</span></p>
            <dl k="1">
                <dt nick={t("大豹28客服")} img="100"></dt>
                <dd c="0">{v[2]}</dd>
            </dl>
        </>
    }
    return  <>
        <p><span>{v[1]} {t("进入了房间")}</span></p>
    </>
}
// 
export default () => 
{
    const DATA = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    let location = useLocation();
    // 
    const { type, category } = GameLocal(location.pathname);
    // 
    const game_qun_name = 'GameQun'+category+''+type;
    const gameQun = DATA&&DATA[game_qun_name]||'';
    const game_qun_show_name = 'GameQun'+category+''+type+'Show';
    const gameQunShow = DATA&&DATA[game_qun_show_name]||[];
    // 
    // 新消息 new news
    useEffect(() => 
    {
        if(!gameQun) return;
        if(gameQunShow)
        {
            let _gqs = {};
            _gqs[game_qun_name] = '';
            _gqs[game_qun_show_name] = [ gameQun, ...gameQunShow].slice(0, 50);
            dispatch.models.SET({..._gqs});
        }else{
            let _gqs = {};
            _gqs[game_qun_name] = '';
            _gqs[game_qun_show_name] = [ gameQun ];
            dispatch.models.SET({..._gqs});
        }
    }, [gameQun]);
    // 
    // 跟投
    const genTou = (e) => 
    {
        dispatch.models.SET({ 
            gameMyLastBet:
            {
                vals: e[4],
                // sum
            }
        })
    }
    // 
    return <div style={{background:'#fff',padding:'5px'}}>
        <div id="qunshows" className={"qunshow"}>
            {gameQunShow&&gameQunShow.map((v,k)=>(
                <div className="qunshowblock" key={k}>
                    {_show(v, type, genTou)}
                </div>
            ))}
        </div>
    </div>
}