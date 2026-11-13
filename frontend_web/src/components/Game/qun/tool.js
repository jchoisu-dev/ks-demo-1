import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Row, Col, Button, Input } from 'antd';
import { nTom, mTon, math_abs } from 'utils/tool';
import { _jgTxt, ___gamename } from 'utils/betData';
import { betTools, betPkTools } from 'utils/qunToolData';
import { GameLocal } from 'utils/game';
import { SEND } from 'store';
import { t } from 'i18n';
// 
export default () => 
{
    const DATA = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auths);
    const { QunBet, gameMyLastBet, GamePrevBetLoading, gamePeroidsBet } = DATA;
    // 
    const dispatch = useDispatch();
    let location = useLocation();
    // 
    const { type, category } = GameLocal(location.pathname);
    // 
    const Lottery = DATA&&DATA['Lottery'+category+''+type];
    const peroids = Lottery&&Lottery[1][0]||'-';
    // 
    const gameOdd = DATA&&DATA['gameodd'+category+type];
    //
    const [ quns, setQuns ] = useState({
        go:false,
        souha:false,
        money: 0,
        bets: [],
        beteds: [],
        betdis: [],
        sum: 0,
        cds: 1,
    });
    // 
    useEffect(() => 
    {
        if(gamePeroidsBet)
        {
            let beteds = [];
            for(let i in gamePeroidsBet)
            {
                beteds.push(i);
            }
            let { betdis } = betCheck(beteds);
            setQuns({ ...quns, beteds, betdis });
        }
    }, [gamePeroidsBet]);
    // 
    useEffect(() => 
    {
        if(gameMyLastBet&&gameMyLastBet.vals)
        {
            let bets = [];
            let money = 0;
            for(let i in gameMyLastBet.vals)
            {
                bets.push(i);
                money = parseInt(mTon(gameMyLastBet.vals[i])/1000);
            }
            let { betdis } = betCheck(bets);
            setBetSum({ bets, money, betdis });
        }
    }, [gameMyLastBet]);
    // 
    const setDefault = () => 
    {
        // SEND('game/qwf/'+type+'/odd', { peroids: __peroids });
        setQuns({
            go:false,
            souha:false,
            money: 0,
            bets: [],
            betdis: [],
            beteds: [],
            sum: 0,
            cds: 1
        })
    }
    // 
    useEffect(() => 
    {
        setDefault();
        dispatch.models.SET({ 
            GamePrevBetLoading: '' 
        });
    }, []);
    // 
    useEffect(() => 
    {
        setDefault();
    }, [type]);
    // 
    const betCheck = (bets) => 
    {
        let __bets = [ ...quns.beteds, ...bets ];
        __bets = [...new Set(__bets)];
        // 
        const _zh = betTools[0][1];
        const _sz = betTools[1][1];
        const _ts = betTools[2][1];
        //  
        let _zha = [];
        let _sza = [];
        let _tsa = [];
        // 
        for(let i in __bets)
        {
            let _v = __bets[i];
            if(_zh.find(v=>v==_v)) _zha.push(_v);
            if(_sz.find(v=>v==_v)) _sza.push(_v);
            if(_ts.find(v=>v==_v)) _tsa.push(_v);
        }
        // 
        const _zhb = _zha.slice(0, 3);
        const _szb = _sza.slice(0, 10);
        const _tsb = _tsa.slice(0, 3);
        // 
        const _zhc = _zhb.length>=3 ? _zh.filter(x => _zhb.every(y => y !== x)) : [];
        const _szc = _szb.length>=10 ? _sz.filter(x => _szb.every(y => y !== x)) : [];
        const _tsc = _tsb.length>=3 ? _ts.filter(x => _tsb.every(y => y !== x)) : [];
        // 
        let _betv = {
            // bets: [ ..._zhb, ..._szb, ..._tsb ],
            betdis: [ ..._zhc, ..._szc, ..._tsc ]
        }
        return _betv;
    }
    // 
    const onBet = (e) => 
    {
        let bets = quns.bets||[];
        // 
        var _index = bets.indexOf(e);
        if (_index > -1) { 
            bets.splice(_index, 1); 
        }else{
            bets.push(e);
        }
        // 
        setBetSum({ ...betCheck(bets), souha:quns.souha });
    }
    const onMoney = (k) => 
    {
        let money = _moneys[1][k];
        if(money=='a')
        {
            setBetSum({ souha:false, money:0 });
            return;
        }
        money = parseInt(money);
        if(!quns.souha) money = parseInt(money + mTon(quns.money));
        setBetSum({ souha:false, money });
    }
    const moneyChange = e => 
    {
        let money = e.target.value;
        money = math_abs(mTon(money));
        if(money>=10000) money=10000;
        setBetSum({ souha:false, money });
    }
    const setSouha = () => 
    {
        setBetSum({ souha:!quns.souha });
    }
    const setBetSum = (d) => 
    {
        let betdis = d.betdis || quns.betdis;
        let bets = d.bets || quns.bets;
        let money = d.money || 0;
        let souha = d.souha;
        money = parseInt(money);
        let len = bets.length;
        if(souha) money = Auth&&Auth.dou ? parseInt(Auth.dou/1000/len) : 0;
        // 
        let sum = nTom(parseInt(money * len));
        setQuns({ ...quns, bets, betdis, money, sum, souha })
    }
    const cleanbet = () =>
    {
        setQuns({
            ...quns,
            go:false,
            souha:false,
            money: 0,
            bets: [],
            sum: 0,
            cds: 1
        })
    }
    const setCdsCheck = (cds) => 
    {
        let _new_bets = [];
        quns.bets.map((v,k)=>
        {
            if(!v.startsWith('cd-')) _new_bets.push(v);
        })
        setQuns({ ...quns, cds, bets: _new_bets })
    }
    const confirmBet = () => 
    {
        if(quns.sum<=0)
        {
            dispatch.models.SET({M:{c:t("请至少选择一个投注号码！")}})
            return;
        }
        dispatch.models.SET({
            M:{
                t: t("投注确认"),
                c: <div className="jlist">
                    <div className="list">
                        <Row gutter={[10,10]} justify="center">
                            {quns.bets.map(k=>(<Col key={k} flex="100px"><Button block>
                                <p>{___gamename(k)}</p>
                                <p>{nTom(quns.money*1000)}</p>
                            </Button></Col>))}
                        </Row>
                    </div>
                    <h4>{t("共")} <b>{Object.keys(quns.bets).length}</b> {t("注，合计")} <b>{nTom(mTon(quns.sum)*1000)}</b> {t("豆")}</h4>
                </div>,
                bt: t("确定投注"),
                b: () => {
                    let vals = {};
                    quns.bets.map(v=>
                    {
                        vals[v] = quns.money*1000;
                    });
                    SEND('game/bet', {
                        game: category+''+type,
                        category,
                        type,
                        peroids,
                        vals
                    });
                }
            }
        })
    }
    const getLastBet = () => 
    {
        dispatch.models.SET({ GamePrevBetLoading: true });
        SEND('game/prevbet',{category,type});
    }
    // 
    const Toolv = props => 
    {
        const {data, bets, onBet, pix, odd, betdis, beteds} = props;
        const _pix = pix || '';
        return <>
            {data.map((vv,kk)=>(
                <div key={kk}>
                    { vv[0] ? <h5>{vv[0]}</h5> : '' }
                    <div className={"qunButtons"}>
                        <Row gutter={10}>
                            {vv[1].map((v,k)=>(
                                <Col span={4} key={k}>
                                    {vv[1][k]?
                                        <Button 
                                            color={bets.indexOf(_pix+v)>-1?'primary':''}
                                            ed={beteds.indexOf(_pix+v)>-1?'yes':''}
                                            block
                                            onClick={()=>onBet(_pix+v)}
                                            disabled={betdis.indexOf(_pix+v)>-1?true:false}
                                        >
                                            {_jgTxt[v]||v}
                                            <p>{odd&&odd[_pix+v] || '-'}</p>
                                        </Button>
                                    :''}
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            ))}
        </>
    }
    const _moneys = [
        ['10', '50', '100', '500', '1,000', t("清除")],
        [10, 50, 100, 500, 1000, 'a']
    ];
    const _cds = [t("一"),t("二"),t("三"),t("四"),t("五"),t("六"),t("七"),t("八"),t("九"),t("十")]
    // 
    const toolv = () => 
    {
        if(type=='pk')
        {
            return <>
                <Toolv 
                    data={[betPkTools[0]]} 
                    odd={gameOdd} 
                    bets={quns.bets} 
                    betdis={quns.betdis} 
                    beteds={quns.beteds} 
                    onBet={onBet} pix={'gyh-'} 
                />
                <h5 style={{marginTop:5}}>{t("猜车道")}</h5>
                <ul className={"cds"}>
                    {_cds.map((v,k)=>(
                        <li key={k} n={quns.cds==(k+1)?1:0} onClick={()=>setCdsCheck(k+1)}>{t("车道")} {v}</li>
                    ))}
                </ul>
                <Toolv 
                    data={quns.cds>5?[betPkTools[2]]:[betPkTools[1]]} 
                    odd={gameOdd} 
                    bets={quns.bets} 
                    betdis={quns.betdis} 
                    beteds={quns.beteds} 
                    onBet={onBet} 
                    pix={'cd-'+quns.cds+'-'} 
                />
            </>
        }
        return <Toolv 
            data={betTools} 
            odd={gameOdd} 
            bets={quns.bets} 
            betdis={quns.betdis} 
            beteds={quns.beteds} 
            onBet={onBet} 
        />
    }
    // 
    return <>
        <div className={"quntool"}>
            
            {toolv()}

            <div className={"qunbets"}>
                <div className={"quntotal"}>
                    <Row justify="space-between" align="middle" gutter={10}>
                        <Col span={6}>
                            <Button
                                loading={GamePrevBetLoading}
                                onClick={()=>getLastBet()}
                                block
                            >
                                {t("上期投注")}
                            </Button>
                        </Col>
                        <Col span={5}>
                            <Button
                                type={quns.souha?'primary':''}
                                onClick={()=>setSouha()}
                                block
                            >
                                {t("梭 哈")}
                            </Button>
                        </Col>
                        <Col span={13}>
                            <span className={"total"}>
                                {t("已选")} <b>{quns.bets.length}</b> {t("注，共")} <b>{quns.sum}</b> {t("元")}
                            </span>
                        </Col>
                    </Row>
                </div>
                <div className={"qunmoneys"}>
                    <Row gutter={10}>
                        {_moneys[0].map((v,k)=>(
                            <Col span={4} key={k}>
                                <Button block onClick={()=>onMoney(k)}>{v}</Button>
                            </Col>
                        ))}
                    </Row>
                </div>
                <div className={"qunbet"}>
                    <Row gutter={10}>
                        <Col span={4}>
                            <Button 
                                block 
                                onClick={()=>cleanbet()}
                                size="large"
                            >{t("重置")}</Button>
                        </Col>
                        <Col span={12}>
                            <Input 
                                addonBefore={t("单注")}
                                addonAfter={t("元")}
                                value={nTom(quns.money)}
                                size="large" 
                                onChange={moneyChange}
                            />
                        </Col>
                        <Col span={8}>
                            <Button 
                                block
                                onClick={()=>confirmBet()}
                                size="large"
                                type="primary"
                                disabled={quns.sum<1}
                                loading={quns.go}
                            >
                                {t("立即投注")}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    </>
}