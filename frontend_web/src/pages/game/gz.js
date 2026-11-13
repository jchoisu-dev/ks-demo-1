import { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GameLocal, GameName } from 'utils/game';
import { nTom } from 'utils/tool';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const BlockLoading = lazy(() => import('components/Loading/BlockLoading'));
const List = lazy(() => import('components/Game/List'));
//
const _tr = (_title, _content, _l, _row) => 
{
    return(
        <tr>
            <td rowSpan={_row}>{_title}</td>
            <td colSpan={4} f={_l}>{_content}</td>
        </tr>
    )
}
const _trs = (_arr) =>
{
    return (
        <>
            {_arr.map((v)=>(
                <>{_tr(...v)}</>
            ))}
        </>
    );
}
const _bdsbz = () => 
{
    return _trs([
        [t("描述"), t("先将号码由小至大排序"), 'l', 6],
        [t("豹"), <>{t("3个号码相同，如：(6，6，6)、(8，8，8)")}</>, 'l'],
        [t("顺"), <>{t("3个号码相连，如：(1，2，3)、(6，7，8)、(")}<b>0，8，9</b>)、(<b>8，9，0</b>)</>, 'l'],
        [t("对"), <>{t("2个号码相同，如：(6，6，9)、(7，8，8)")}</>, 'l'],
        [t("半"), <>{t("2个号码相连，如：(1，2，4)、(5，7，8)、(")}<b>0，9，2</b>)、(<b>0，3，9</b>)</>, 'l'],
        [t("杂"), <>{t("3个号码均无相同或相连，如：(1，3，5)、(1，6，8)")}</>, 'l']
    ]);
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
        'nn': t("取尾数"),
        'nb': t("取尾数")
    }
    // 
    let __trs = [
        [t("规则"), <>{t("采集官网 第")}<b>{d[4][0]}</b>{t("期 开奖号码")} <b>{d[0].length}</b> {t("个")}</>, '', 9],
    ];
    if(category=='jnd'&&(type=='nn'||type=='nb'))
    {
        return <>
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
    }
    if(category=='btc')
    {
        __trs = [
            [t("规则"), <>{t("第")}<b>{d[4][0]}</b>{t("期，采集BTC最新交易码")}</>, '', 14],
            [t("交易码"), <>{d[5][0]}  <a style={{marginLeft:10}} target="_blank" href={"https://www.blockchain.com/btc/tx/"+d[5][0]}><b>{t("溯源查询")}</b></a></>],
            [t("前20份"), <div className="numbs">{d[5][1].map((v,k)=>(<span key={k}>{v}</span>))}</div>],
            [t("十进制"), <div className="numbs">{d[5][2].map((v,k)=>(<span key={k}>{v}</span>))}</div>],
            ['%80', <div className="numbs">{d[5][3].map((v,k)=>(<span key={k}>{v}</span>))}</div>],
            [t("处理"), t("将号码从小到大进行排序")],
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
            {(type==36&&_bdsbz())}
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
                [t("规则"), <>{t("采集加拿大快乐8官网 第")}<b>{d[6][0]}</b>{t("期 开奖号码")}</>, '', 7],
                [t("KENO号码"), <div className="numbs">{d[0].map((v,k)=>(<span key={k}>{v}</span>))}</div> ],
                ['SHA256', d[1]],
                [t("前10份"), <div className="numbs">{d[2].map((v,k)=>(<span key={k}>{v}</span>))}</div> ],
                [t("十进制-时速"), <div className="numbs">{d[3].map((v,k)=>(<span key={k} v={k+1}>{nTom(v)}</span>))}</div> ],
                [t("时速-排名"), <div className="numbs">{d[4].map((v,k)=>(<span key={k} v={d[5][k]}>{nTom(v)}</span>))}</div> ],
                [t("号码"), <div className="numbs">{d[5].map((v,k)=>(<span key={k}><b>{v}</b></span>))}</div>],
                [t("计算"), <>{_jgjs[tp]}</>],
                [t("开奖"), <List data={d[6]} loca={loca} nocheck={1} /> ],
            ])}
            {(tp=='sc'||tp=='lh')&&_trs([
                [t("描述"), t("两面以及龙虎判断"), 'l', 7],
                [t("冠亚和-大小"), <>{t("冠军与亚军之和，小于或等于")} <b>11</b> {t("为小，大于或等于")} <b>12</b> {t("为大")}</>, 'l'],
                [t("冠亚和-单双"), t("冠军与亚军之和，单数为单，双数为双"), 'l'],
                [t("冠亚和-龙虎"), t("车道 1-2 对比，大则为龙，小则为虎"), 'l'],
                [t("车道-大小"), <>{t("车道对应号码，小于或等于")} <b>5</b> {t("为小，大于或等于")} <b>6</b> {t("为大")}</>, 'l'],
                [t("车道-单双"), t("车道对应号码，单数为单，双数为双"), 'l'],
                [t("车道1-5龙虎"), t("车道 1-10，2-9，3-8，4-7，5-6 对比，大则为龙，小则为虎"), 'l'],
            ])}
        </>
    )
}

export default props => 
{
    const DATA = useSelector((state) => state.models);
    const loca = GameLocal(location.pathname);
    const { category, type } = loca;
    // 
    const _name = 'GZ'+loca.category+''+loca.type;
    const GZ = DATA&&DATA[_name];
    const Lottery = DATA&&DATA['Lottery'+category+''+type];
    //
    const Modes = (d) => 
    {
        if(loca.category=='pk') return _PK(d, loca)
        return _DDBJJND(d, loca);
    }
    //
    const getD = () => 
    {
        SEND('game/gz', { game: category+''+type, category, type });
    }
    // 
    useEffect(() => getD(), [category+''+type]);
    useEffect(() => getD(), [Lottery]);
    // 
    return <div className="br5 bf">
        <div className="lh42 bgab tc">{GameName(loca.category, loca.type)} {t("- 游戏规则")}</div>
        <BlockLoading loading={!GZ} top={'0'}>
            <div className="table">
                <table className="g ab">
                    <tbody>
                        {Modes(GZ)}
                    </tbody>
                </table>
            </div>
            <div className="table-dsc bf tc">
                {t("固定系列与群系列为固定赔率，其余为浮动赔率")}
            </div>
        </BlockLoading>
    </div>
}