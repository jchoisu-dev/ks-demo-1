import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Row, Col, Button } from 'antd';
import { GameLocal, GameName } from 'utils/game';
import { nTom } from 'utils/tool';
import { ___gamename } from 'utils/betData';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
// 
export default () => 
{
    const DATA = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    let location = useLocation();
    // 
    const loca = GameLocal(location.pathname);
    const { category, type } = loca;
    const _name = 'GameJL'+category+''+type;
    const GameJL = DATA&&DATA[_name];
    const Lottery = DATA&&DATA['Lottery'+category+''+type];
    // 
    const getD = (v) => 
    {
        SEND('game/jl',{
            game: category+''+type,
            category,
            type,
            ...v
        });
    }
    // 获取
    useEffect(() => 
    {
        getD({page:1});
    }, []);
    // 更新
    useEffect(() => 
    {
        if(!Lottery) return;
        getD();
    }, [Lottery]);
    // 
    const _win_lose = (a,b) => 
    {
        if(a>b) return '-'+nTom(a-b);
        if(a<b) return '+'+nTom(b-a);
        return 0;
    }
    // 
    const showModal = (v) =>
    {
        dispatch.models.SET({
            M:{
                t: <>{GameName(category, type)} {t("第")} <b>{v[0]}</b> {t("期 - 投注详情")}</>,
                c: <div className="jlist">
                    <div className="list">
                        <Row gutter={[10,10]} justify="center">
                            {Object.keys(v[7]).map(key=>(
                                <Col key={key} flex="100px">
                                    <Button type={v[7][key][1]!=='-'&&"primary"} block>
                                        <p>{___gamename(key)}</p >
                                        <p>{nTom(v[7][key][0])}</p >
                                        <p>{v[7][key][1]}</p >
                                        <p>{nTom(v[7][key][2])}</p >
                                        <p>{_win_lose(v[7][key][0],v[7][key][2])}</p >
                                        {category=="jnd"&&(type=='nn'||type=='nb')&&<p>{ v[7][key][3]&&(t("牛 ") + v[7][key][3][0]+' - '+v[7][key][3][1]) + t(" 庄") ||'-' }</p >}
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <h4 style={{paddingTop:10}}>
                        {t("共")} <b>{v[2]}</b> {t("注，投注")} <b>{nTom(v[4])}</b> {t("豆，盈亏")} {wk(v[4],v[5],v[6])} {t("豆")}
                    </h4>
                </div>
            }
        })
    }
    const wk = (a,b,s) => 
    {
        if(s<=1) return '-';
        if(b>a) return <b>+ {nTom(b-a)}</b>;
        return nTom(b-a)
    }
    const status = {
        1: t("投注中"),
        2: <b>{t("中奖")}</b>,
        3: t("未中")
    }
    const mode = {
        1: t("手动"),
        2: <b>{t("自动")}</b>,
    }
    const columns = [
        [ t("期号") ],
        [ t("时间") ],
        [ t("模式"), (v)=><small>{mode[v[2]]}</small> ],
        [ t("注数") ],
        [ t("投注"), (v)=>nTom(v[4]) ],
        [ t("中奖"), (v)=>v[4]?nTom(v[5]):'-' ],
        [ t("盈亏"), (v)=>wk(v[4],v[5],v[6]) ],
        [ t("状态"), (v)=>status[v[6]] ],
        [ t("详情"), (v)=><Button size="small" onClick={()=>showModal(v)}>{t("查看")}</Button> ]
    ];
    // 
    return<div className="br5">
        <Table 
            tableClass={'hover'}
            columns={columns} 
            data={ GameJL||[] }
            pageChange={ page => getD({page}) }
            hover={true}
        />
    </div>
}