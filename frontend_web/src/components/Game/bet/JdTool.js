import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Row, Col, Input, Button, Pagination } from 'antd';
import { GameLocal } from 'utils/game';
import { nTom, mTon, math_abs } from 'utils/tool';
import { SyncOutlined } from '@ant-design/icons';
import { _tool, _tool_bs, _sh, dxdsSelect, wsSelect, ysSelect } from 'utils/betTool';
import { ___gamename } from 'utils/betData';
import { SEND } from 'store';
import { t } from 'i18n';
// 
export default props => 
{
    let { _type, _tables, btntxt, goBet } = props;
    const DATA = useSelector((state) => state.models);
    const { GameBetVal, PrevBetLoading, HistoryBetLoading, ModeBetLoading, ToolSuoha } = DATA;
    const Auth = useSelector((state) => state.auth);
    // 
    const dispatch = useDispatch();
    let location = useLocation();
    // 
    const { category, type, peroids } = GameLocal(location.pathname);
    //
    const GameBetMsName = 'GameBetMs'+category+''+type;
    const GameBetMs = DATA&&DATA[GameBetMsName];
    // 
    const SetGbv = (r) =>
    {
        dispatch.models.SET({ GameBetVal:r });
    }
    // 
    useEffect(() => {
        if(!GameBetMs) return;
        let _close_set = {};
        _close_set[GameBetMsName] = '';
        dispatch.models.SET({
            M:{
                t: t("模式投注 - 点击选择"),
                c: <div className="jlist">
                    <div className="list mb5">
                        <Row gutter={[15,15]} justify="center">
                            {GameBetMs&&GameBetMs[1].map((v,k)=>(
                                <Col key={k} flex="141px">
                                    <Button 
                                        block
                                        onClick={()=>{
                                            dispatch.models.SET({
                                                GameBetVal: v[2],
                                                M:'',
                                                ..._close_set
                                            })
                                        }}
                                    >
                                        <p>{v[0]}</p>
                                        <p>{nTom(v[1])}</p>
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <div className="pagination tc">
                        <Pagination 
                            current={GameBetMs&&GameBetMs[0]&&GameBetMs[0][0]} 
                            total={GameBetMs&&GameBetMs[0]&&GameBetMs[0][1]} 
                            pageSize={20} 
                            onChange={page=>SEND('game/msbets',{category,type,page})}
                            showQuickJumper={false}
                            showSizeChanger={false}
                        />
                    </div>
                </div>,
                bc: ()=>dispatch.models.SET(_close_set)
            }
        });
    }, [GameBetMs]);
    // 
    const num = GameBetVal&&Object.keys(GameBetVal).length||0;
    // 
    const sum = () => 
    {
        let r = 0
        for(let i in GameBetVal)
        {
           if(GameBetVal[i]) r+= parseInt(GameBetVal[i])
        };
        return r;
    }
    const _sum = sum();
    // 全选
    // const allOn = () => 
    // {
    //     let r = {}
    //     for(let i in _tables){r[i] = _tables[i][1]};
    //     SetGbv(r);
    // }
    // 反选
    const xOn = () => 
    {
        let r = {}
        for(let i in _tables)
        {   
            if(!GameBetVal[i]) r[i] = _tables[i][1];
        };
        SetGbv(r);
    }
    // 倍数
    const allOdd = (odd) => 
    {
        let r = {}
        for(let i in GameBetVal)
        {   
            r[i] = parseInt(GameBetVal[i] * odd);
        };
        SetGbv(r);
    }
    // 定额
    const deSh = (m) => 
    {
        console.log('GameBetVal',GameBetVal)
        let s = 0;
        let r = {};
        for(let i in GameBetVal)
        {   
            s+=parseInt(_tables[i][1]);
        };
        let _s = m/s;
        // console.log(_s);
        for(let i in GameBetVal)
        {
            r[i] = parseInt(_tables[i][1] * _s);
        };
        SetGbv(r);
    }
    //
    const mysh = () => 
    {
        let dou = Auth&&Auth.dou||0;
        if(!dou||dou<1000)
        {
            dispatch.models.SET({M:{c:t("您的金豆余额低于 1,000豆，梭哈失败！")}})
            return;
        }
        deSh(dou);
    }
    // 
    const toolClick = (kk,k,v) => 
    {
        let r = {};
        if(kk==0) r = dxdsSelect(_type,_tables,k);
        // if(kk==1) r = wsSelect(_tables,k);
        if(kk==1) r = ysSelect(_tables,v);
        SetGbv(r);
    };
    //
    const coumaAdd = (k) => 
    {
        dispatch.models.SET({MP3:'coin'});
        let _cm = ToolSuoha ? parseInt(ToolSuoha) : 0;
        _cm+=parseInt(k)
        dispatch.models.SET({ToolSuoha:_cm||''});
    } 
    const coumaEdit = e => 
    {
        let _v = e.target.value;
        _v = math_abs(mTon(_v));
        dispatch.models.SET({ToolSuoha:_v||''});
    }
    // 
    return <div className="gamt_tool">

        {type!=='36'?<div style={{paddingBottom:5}}>
            {_tool.map((vv,kk)=>(
                <Row gutter={5} justify="space-between" key={kk}>
                    {vv.map((v,k)=>(
                        <Col span="2" key={k}>
                            <div 
                                className="bf1 br5 toolb" 
                                onClick={()=>{
                                    dispatch.models.SET({MP3:'click'});
                                    toolClick(kk,k,v)
                                    // console.log({
                                    //     kk,
                                    //     k,
                                    //     v
                                    // })
                                }}
                                    
                            >
                                {v.replace("-",t("余"))}
                            </div>
                        </Col>
                    ))}
                </Row>
            ))}
        </div>:''}

        <Row gutter={[5,5]} justify="space-between">
            {_tool_bs.map((v,k)=>(
                <Col flex="1" key={k}>
                    <div 
                        className="bf1 br5 toolb" 
                        onClick={()=>{
                            dispatch.models.SET({MP3:'click'});
                            allOdd(v)
                        }}
                    >
                        {v} {t("倍")}
                    </div>
                </Col>
            ))}
        </Row>
        
        <div style={{paddingTop:7}}>
            <Row gutter="10">
                {Object.keys(_sh).map(k=>(
                    <Col flex="45px" key={k}>
                        <div className="couma" onClick={()=>coumaAdd(k)}>{_sh[k]}</div>
                    </Col>
                ))}
                <Col flex="230px">
                    <Input 
                        addonBefore={
                            <span 
                                className="cu" 
                                style={{padding:'5px 12px',margin:'-5px -12px'}} 
                                onClick={()=>{dispatch.models.SET({
                                    MP3:'bets',
                                    ToolSuoha:''
                                })}}
                            >
                                <SyncOutlined />
                            </span>
                        } 
                        value={ToolSuoha?nTom(ToolSuoha):''}
                        onChange={e=>coumaEdit(e)}
                        placeholder={t("元")}
                        addonAfter={<Button 
                            size="small"
                            // type="primary"
                            onClick={()=>{
                                // dispatch.models.SET({MP3:'bets'});
                                deSh(mTon(ToolSuoha)*1000)}
                            }
                        >
                            {t("定额梭哈")}
                        </Button>}
                    />
                </Col>
                <Col flex="240px">
                    <Input 
                        value={nTom(_sum)}
                        readOnly
                        addonAfter={<Button 
                            size="small"
                            type="primary"
                            onClick={()=>{
                                dispatch.models.SET({MP3:'but'});
                                goBet(num, _sum)}
                            }
                        >
                            {btntxt}
                        </Button>}
                    />
                </Col>
                <Col flex="1">
                    <Button 
                        block 
                        onClick={()=>{
                            // dispatch.models.SET({MP3:'bets'});
                            SEND('game/prevbet',{category,type,peroids})
                        }}
                    >
                        {t("上期投注")}
                    </Button>
                </Col>
                <Col flex="1">
                    <Button 
                        block 
                        onClick={()=>{
                            // dispatch.models.SET({MP3:'bets'});
                            SEND('game/msbets',{category,type})
                        }}
                    >
                        {t("模式投注")}
                    </Button>
                </Col>
                <Col flex="1">
                    <Button 
                        block 
                        onClick={()=>{
                            // dispatch.models.SET({MP3:'bets'});
                            mysh()
                        }}>
                            {t("梭哈")}
                    </Button>
                </Col>
                {/* <Col flex="1">
                    <Button block onClick={()=>{SET({MP3:'betclick'});allOn()}}>{t("全包")}</Button>
                </Col> */}
                <Col flex="1">
                    <Button 
                        block 
                        onClick={()=>{
                            // dispatch.models.SET({MP3:'bets'});
                            xOn()}}
                        >
                            {t("反选")}
                    </Button>
                </Col>
                <Col flex="1">
                    <Button 
                        block 
                        onClick={()=>{
                            dispatch.models.SET({MP3:'bets'});
                            dispatch.models.SET({GameBetVal:'', ToolSuoha:''})}}
                    >
                        {t("清除")}
                    </Button>
                </Col>
            </Row>
        </div>
    </div>
}