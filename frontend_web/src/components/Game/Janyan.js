import { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { nTom } from 'utils/tool';
import { GameLocal } from 'utils/game';
import { SEND } from 'store';
// 
import BlockLoading from 'components/Loading/BlockLoading';
import List from 'components/Game/List';
import { t } from 'i18n';
//
const _tr = (_title, _content, _l, _row) => 
{
    return <tr>
        <td rowSpan={_row} width="100">{_title}</td>
        <td colSpan={4} f={_l}>{_content}</td>
    </tr>
}
const _trs = (_arr) =>
{
    return <>
        {_arr.map((v)=>(
            <>{_tr(...v)}</>
        ))}
    </>
}
const _DDBJJND = (d, loca) => 
{
    if(!d) return<></>;
    const { category ,type } = loca;
    const _jgjs = {
        11: t("除以6的余数 + 1"),
        16: t("除以6的余数 + 1"),
        28: t("取尾数"),
        36: t("取尾数"),
        '28gd': t("取尾数"),
    }
    // 
    let __trs = [
        [t("规则"), <>{t("采集官网 第")}<b>{d[4][0]}</b>{t("期 开奖号码")} <b>{d[0].length}</b> {t("个")}</>],
    ];
    if(category=='btc')
    {
        __trs = [
            [t("交易码"), <>{d[5][0]}  <a style={{marginLeft:10}} target="_blank" href={"https://www.blockchain.com/btc/tx/"+d[5][0]}><b>{t("溯源查询")}</b></a></>],
            [t("前20份"), <div className="numbs">{d[5][1].map((v,k)=>(<span key={k}>{v}</span>))}</div>],
            [t("十进制"), <div className="numbs">{d[5][2].map((v,k)=>(<span key={k}>{v}</span>))}</div>],
            ['%80', <div className="numbs">{d[5][3].map((v,k)=>(<span key={k}>{v}</span>))}</div>],
            [t("排序"), t("将号码从小到大进行排序")],
        ];
    }
    // 
    return(
        <>
            {_trs([
                ...__trs, 
                [t("号码"), <div className="numbs">{d[0].map((v,k)=>(<span key={k}>{v}</span>))}</div>],
                [t("玩法"), <>{t("分")} <b>{d[1].length}</b> {t("区进行计算")}</>],
                [t("取位"), <div className="numbs">{d[1].map((vv,kk)=>(
                    <>{vv.map((v,k)=>( <span key={k}><small>{v+1}</small></span> ))}</>
                ))}</div>],
                [t("号数"), <div className="numbs">{d[2].map((vv,kk)=>(
                    <>{vv.map((v,k)=>( <span key={k}>{v}</span> ))}</>
                ))}</div>],
                [t("求和"), <div className="numbs">{d[3].map((v,k)=>(<span key={k}>{v}</span>))}</div>],
                [t("计算"), <div className="numbs">{d[3].map((v,k)=>( <span key={k}>{_jgjs[type]}</span> ))}</div>],
                [t("结果"), <div className="numbs">{d[4][2].map((v,k)=>(<span key={k}>{v}</span>))}</div>],
                [t("开奖"), <List data={d[4]} loca={loca} nocheck={1} /> ]
            ])}
        </>
    );
}
const _PK = (d, loca) => 
{
    const tp = loca.type;
    if(!d) return;
    const _jgjs = {
        'gyh': [t("取前两名之和")],
        'sc': [t("取前两名之和，以及1-5名对比")],
        10: [t("取期号尾数，对应号码位置之数字（其中期号尾数为0则取号码第10位）")],
        22: [t("取前三位之和")],
        'gj': [t("取第一名")],
        'lh': [t("取第一名与最后一名对比")]
    }
    return(
        <>
            {_trs([
                [t("规则"), <>{t("采集加拿大快乐8官网 第")}<b>{d[6][0]}</b>{t("期 开奖号码")}</>],
                [t("KENO号码"), <div className="numbs">{d[0].map((v,k)=>(<span key={k}>{v}</span>))}</div> ],
                ['SHA256', d[1]],
                [t("前10份"), <div className="numbs">{d[2].map((v,k)=>(<span key={k}>{v}</span>))}</div> ],
                [t("十进制-时速"), <div className="numbs">{d[3].map((v,k)=>(<span key={k} v={k+1}>{nTom(v)}</span>))}</div> ],
                [t("时速-排名"), <div className="numbs">{d[4].map((v,k)=>(<span key={k} v={d[5][k]}>{nTom(v)}</span>))}</div> ],
                [t("号码"), <div className="numbs">{d[5].map((v,k)=>(<span key={k}><b>{v}</b></span>))}</div>],
                [t("计算"), <>{_jgjs[tp]}</>],
                [t("开奖"), <List data={d[6]} loca={loca} nocheck={1} /> ],
            ])}
        </>
    )
}

export default props => 
{
    const DATA = useSelector((state) => state.models);
    // 
    let location = useLocation();
    const { category, type } = GameLocal(location.pathname);
    // 
    const { data } = props;
    // 
    const _name = 'GZ'+category+''+type;
    const GZ = DATA&&DATA[_name];
    //
    const Modes = (d) => 
    {
        if(category=='pk') return _PK(d, {category,type})
        return _DDBJJND(d, {category,type});
    }
    //
    const getD = () => 
    {
        SEND('game/gzs', { game: category+''+type, category, type, peroids:data[0] });
    }
    // 
    useEffect(() => getD(), []);
    // 
    return <div className="jianyan">
        <BlockLoading loading={!GZ} top={'0'}>
            <div className="boe br5">
                <div className="table" style={{marginBottom:-1}}>
                    <table className="hover">
                        <tbody>
                            {Modes(GZ)}
                        </tbody>
                    </table>
                </div>
            </div>
        </BlockLoading>
    </div>
}