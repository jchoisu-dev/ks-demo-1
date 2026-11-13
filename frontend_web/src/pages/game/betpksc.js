import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { GameName } from 'utils/game';
import { Row, Col, Button, Form, Input, Checkbox } from 'antd';
import { ___gamename } from 'utils/betData';
import { nTom, mTon, math_abs } from 'utils/tool';
import { _jgTxt } from 'utils/betData';
import { _tool_bs, _tool, _dsdx, _sh } from 'utils/betTool';
import { SyncOutlined } from '@ant-design/icons';
import { SEND } from 'store';
import { t } from 'i18n';
// 
export default proqs => 
{
    const category = 'pk';
    const type = 'sc';
    // 
    const DATA = useSelector((state) => state.models);
    const { Pksccd, GameBetOk, pkChecks, ToolSuoha } = DATA;
    const Auth = useSelector((state) => state.auths);
    // 
    const dispatch = useDispatch();
    let location = useLocation();
    // 
    const Lottery = DATA&&DATA['Lottery'+category+''+type];
    const LotteryOdd = DATA&&DATA['gameodd'+category+''+type];
    // 
    const peroids = location.peroids || Lottery&&Lottery[1][0];
    // 
    useEffect(() => {
        dispatch.models.SET({
            Pksccd: 1,
            pkChecks: '',
            ToolSuoha: ''
        });
        SEND('game/bet_last',{
            game: category+''+type,
            category,
            type,
            peroids,
        })
    }, []);
    // 
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    // 
    const _list = [
        {
            'long': [1.97,10],
            'hu': [1.97,10],
            'xiao': [1.97,10],
            'da': [1.97,10],
            'dan': [1.97,10],
            'shuang': [1.97,10],
        },
        {
            '1': [9.85,10],
            '2': [9.85,10],
            '3': [9.85,10],
            '4': [9.85,10],
            '5': [9.85,10],
            '6': [9.85,10],
            '7': [9.85,10],
            '8': [9.85,10],
            '9': [9.85,10],
            '10': [9.85,10]
        }
    ];
    const _lists = { ..._list[0], ..._list[1] };
    const _cds = [1,2,3,4,5,6,7,8,9,10];
    const _pksccd = Pksccd||1;
    // 
    const listChange = e => 
    {
        let k = Object.keys(e)[0];
        let v = Object.values(e)[0];
        if(v) v = Object.values(e)[0].replace(/[^0-9]/ig,"");
        let n = {};
        if(v)
        {
            v = parseInt(v) > 999999999 ? 999999999 : v;
            n[k] = parseInt(v);
            form1.setFieldsValue({money:0});
        }else{
            n[k] = '';
        }
        form.setFieldsValue(n);
        dous();
    }
    const listOn = (e) => 
    {
        let _list = form.getFieldsValue();
        let _new = {};
        _new[e] = _list[e] ? '' : _lists[e][1];
        form.setFieldsValue(_new);
        form1.setFieldsValue({money:0});
        dous();
    }
    const listOns = (e,o) => 
    {
        let _list = form.getFieldsValue();
        _list[e] = _list[e] ? parseInt(_list[e] * o) : parseInt(_lists[e][1] * o);
        form.setFieldsValue(_list);
        dous();
    }
    const odds = (o) => 
    {
        let _list = form.getFieldsValue();
        for(let i in _list)
        {
            _list[i] = _list[i] ? parseInt(_list[i] * o) : '';
        }
        form.setFieldsValue(_list);
        dous();
    }
    const dous = () => 
    {
        let _list = form.getFieldsValue();
        let dou = 0;
        for(let i in _list)
        {
            if(_list[i])
            {
                form.setFields([{name:i+'',errors:['']}]);
                dou+=parseInt(_list[i]);
            }else{
                form.setFields([{name:i+'',errors:''}]);
            }
        }
        form1.setFieldsValue({dou:nTom(dou)});
        dispatch.models.SET({pkChecks:_list});
    }
    const fanxuan = () => 
    {
        let _list = form.getFieldsValue();
        let _new = {};
        for(let i in _list)
        {
            _new[i] = _list[i] ? '' : _lists[i][1];
        }
        form.setFieldsValue(_new);
        form1.setFieldsValue({money:0});
        dous();
    }
    const quanxuan = () => 
    {
        let _list = form.getFieldsValue();
        let _new = {};
        for(let i in _list)
        {
            _new[i] = _lists[i][1];
        }
        form.setFieldsValue(_new);
        form1.setFieldsValue({money:0});
        dous();
    }
    const money = (e) => 
    {
        // let _money = form1.getFieldValue('money');
        // e = parseInt((parseInt(e)*1000) + parseInt(_money||0));
        doux(e);
    }
    const doux = (e) => 
    {
        e = parseInt(e);
        let _list = form.getFieldsValue();
        let _sum = 0;
        let dou = e;
        for(let i in _list)
        {
            if(_list[i]) _sum+=parseInt(_lists[i][1]);
        }
        if(_sum>0)
        {
            let _n = parseFloat(e / _sum);
            let _new = {};
            dou = 0;
            for(let i in _list)
            {
                if(_list[i]&&_lists[i][1])
                {
                    let _v = parseInt(parseInt(_lists[i][1]) * _n)
                    dou+=_v;
                    _new[i] = _v;
                }else{
                    _new[i] = '';
                }
            }
            form.setFieldsValue(_new);
            // form1.setFieldsValue({money:e});
            dous();
        }
    }
    // const moneyChange = e => 
    // {
    //     let v = Object.values(e)[0];
    //     if(v) v = Object.values(e)[0].replace(/[^0-9]/ig,"");
    //     v = parseInt(v);
    //     v = v<1000 ? 1000 : v;
    //     doux(v);
    // }
    const _clean = () => 
    {
        dispatch.models.SET({Pksccd:1,pkChecks:''});
        form.resetFields();
        form1.resetFields();
    }
    useEffect(() => 
    {
        if(!GameBetOk) return;
        _clean();
    }, [GameBetOk]);
    const gobet = () => 
    {
        let _list = form.getFieldsValue();
        let vals = {};
        for(let i in _list)
        {
            if(_list[i]) vals['cd-'+_pksccd+'-'+i] = _list[i];
        }
        if(JSON.stringify(vals)=='{}')
        {
            dispatch.models.SET({M:{c:t("请至少选择一注")}});
            return;
        }
        let _dou = form1.getFieldValue('dou');
        if(!_dou||_dou<1000)
        {
            dispatch.models.SET({M:{c:t("最低投注 1000 豆")}});
            return;
        }
        dispatch.models.SET({
            M:{
                t: GameName(category,type),
                c: <div className="jlist">
                    <div className="list">
                        <Row gutter={[10,10]} justify="center">
                            {Object.keys(vals).map(k=>(<Col key={k} flex="100px"><Button block>
                                <p>{___gamename(k)}</p>
                                <p>{nTom(vals[k])}</p>
                            </Button></Col>))}
                        </Row>
                    </div>
                    <h4>{t("共")} <b>{Object.keys(vals).length}</b> {t("注，合计")} <b>{nTom(_dou)}</b> {t("豆")}</h4>
                </div>,
                bt: t("确定投注"),
                b: () => {
                    // SEND('game/bet',{
                    //     game: category+''+type,
                    //     category,
                    //     type,
                    //     peroids,
                    //     vals
                    // })
                    console.log({
                        game: category+''+type,
                        category,
                        type,
                        peroids,
                        vals
                    })
                }
            }
        })
    }
    // 
    const oddshow = (vv,k) => 
    {
        if(LotteryOdd)
        {
            return LotteryOdd['cd-'+_pksccd+'-'+k];
        }
        return vv[k][0].toFixed(2);
    }
    // 
    const toolChange = (k) => 
    {
        let _n = {};
        let _list = form.getFieldsValue();
        for(let i in _list)
        {
            if(_dsdx['10'][k].find(v=>(v+'')==(i+'')))
            {
                _n[i] = _lists[i][1];
            }else{
                _n[i] = '';
            }
        }
        form.setFieldsValue(_n);
        dous();
    }
    //
    const coumaAdd = (k) => 
    {
        dispatch.models.SET({MP3:'bets' });
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
    return <div className="bf br5 p10" style={{minHeight:300}}>
        <div className="bf1 br5 tc p5 mb10">
            {t("PK赛车，第")} <b>{peroids}</b> {t("期")}
        </div>
        <div className="gamt_tool">
            <div style={{paddingBottom:5}}>
                <Row gutter={[5,5]} justify="space-between">
                    {(_tool[0]).map((v,k)=>(
                        <Col flex="1" key={k}>
                            <div className="bf1 br5 toolb" onClick={()=>toolChange(k)}>
                                {v}
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
            <div style={{paddingBottom:5}}>
                <Row gutter={[5,5]} justify="space-between">
                    {_tool_bs.map((v,k)=>(
                        <Col flex="1" key={k}>
                            <div className="bf1 br5 toolb" onClick={()=>odds(v)}>
                                {v} {t("倍")}
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
            <div style={{paddingBottom:10,borderBottom:'1px solid #eee',marginBottom:10}}>
                <Row gutter="10">
                    {Object.keys(_sh).map(k=>(
                        <Col flex="1" key={k}>
                            <div className="couma" onClick={()=>coumaAdd(k)}>{_sh[k]}</div>
                        </Col>
                    ))}
                    <Col flex="250px">
                        <Input 
                            addonBefore={
                                <span 
                                    className="cu" 
                                    style={{padding:'5px 12px',margin:'-5px -12px'}} 
                                    onClick={()=>dispatch.models.SET({MP3:'bets',ToolSuoha:''})}
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
                                onClick={()=>{dispatch.models.SET({MP3:'bets'});doux(mTon(ToolSuoha)*1000)}}
                            >
                                {t("定额梭哈")}
                            </Button>}
                        />
                    </Col>
                    <Col flex="260px">
                    <Form
                        form={form1}
                        // onValuesChange={moneyChange}
                        name="basic"
                        autoComplete="off"
                    >
                        {/* <Form.Item name='money' hidden={true}>
                            <Input />
                        </Form.Item> */}
                        <Form.Item name='dou' noStyle>
                            <Input 
                                placeholder={t("金豆")}
                                readOnly
                                addonAfter={<Button 
                                    size="small"
                                    type="primary"
                                    onClick={()=>gobet()}
                                >
                                    {t("确定投注")}
                                </Button>}
                            />
                        </Form.Item>
                    </Form>
                    </Col>
                    <Col flex="auto">
                        <Button 
                            block 
                            onClick={()=>{
                                SEND('game/prevbet',{category,type,peroids})
                            }}
                        >
                            {t("上期投注")}
                        </Button>
                    </Col>
                    <Col flex="auto">
                        <Button block onClick={()=>{form1.setFieldsValue({money:0});doux(Auth.dou);}}>
                            {t("梭哈")}
                        </Button>
                    </Col>
                    <Col flex="auto">
                        <Button block onClick={()=>quanxuan()}>
                            {t("全包")}
                        </Button>
                    </Col>
                    <Col flex="auto">
                        <Button block onClick={()=>fanxuan()}>
                            {t("反选")}
                        </Button>
                    </Col>
                    <Col flex="auto">
                        <Button block onClick={()=>{
                            form.resetFields();
                            form1.resetFields();
                            dispatch.models.SET({pkChecks:''});
                        }}>
                            {t("清除")}
                        </Button>
                    </Col>
                </Row>
            </div>
            <div style={{paddingBottom:5}}>
                <Row gutter={[5,5]} justify="space-between">
                    {_cds.map((v,k)=>(
                        <Col flex="1" key={k}>
                            <div className={"br5 toolb"+(_pksccd==v?' bd':' bf1')} onClick={()=>dispatch.models.SET({Pksccd:v})}>
                                {t("车道")} {v}
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
            <div className="game_table">
                <Form
                    form={form}
                    onValuesChange={listChange}
                    autoComplete="off"
                >
                    <Row gutter={10}>
                        {_list.map((vv,kk)=>(
                            <Col key={kk} span={12}>
                                <div className="boe br5">
                                    <div className="table" style={{marginBottom:-1}}>
                                        <table className="hover">
                                            <thead>
                                                <tr>
                                                    <th>{t("号码")}</th>
                                                    <th>{t("赔率")}</th>
                                                    <th>{t("已投注")}</th>
                                                    <th width="45"></th>
                                                    <th width="150">{t("投注")}</th>
                                                    <th width="148">{t("倍数")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.keys(vv).map(k=>(
                                                    <tr key={k}>
                                                        <td>
                                                            <span className="ball">{___gamename(k)}</span>
                                                        </td>
                                                        <td>
                                                            <small>{oddshow(vv,k)}</small>
                                                        </td>
                                                        <td>
                                                            {/* {edshow(k)} */} -
                                                        </td>
                                                        <td onClick={()=>listOn(k)}>
                                                            <Checkbox checked={pkChecks&&pkChecks[k]} />
                                                        </td>
                                                        <td>
                                                            <Form.Item name={k} noStyle>
                                                                <Input />
                                                            </Form.Item>
                                                        </td>
                                                        <td>
                                                            {k=='-'?'-':<>
                                                            <Button onClick={()=>listOns(k,0.5)} size="small">{t(".5倍")}</Button>
                                                            <Button onClick={()=>listOns(k,2)} size="small" style={{margin:'0 5px'}}>{t("2倍")}</Button>
                                                            <Button onClick={()=>listOns(k,10)} size="small">{t("10倍")}</Button>
                                                            </>}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Form>
            </div>
        </div>
    </div>
}