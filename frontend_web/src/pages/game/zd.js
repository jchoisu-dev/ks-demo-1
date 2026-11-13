import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Button, Input, Form, Checkbox } from 'antd';
import { GameLocal, GameName } from 'utils/game';
import { nTom, mTon } from 'utils/tool';
import { _numbers } from 'utils/betTool';
import { _jgTxt } from 'utils/betData';
import { SEND } from 'store';
// 
import BlockLoading from 'components/Loading/BlockLoading';
import SelectMode from 'components/Game/SelectMode';
import { t } from 'i18n';
// 
export default () => 
{
    const DATA = useSelector((state) => state.models);
    const { ZdData, ZdLoading, ZdMode, ZDYSS, DHSS, ZdBtnLoading, ZdStopLoading} = DATA&&DATA;
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();
    // 
    const [ form]  = Form.useForm();
    const { category, type } = GameLocal(location.pathname);
    const Lottery = DATA&&DATA['Lottery'+category+''+type];
    // 
    useEffect(() => 
    {
        dispatch.models.SET({ 
            ZDYSS: [ [ [0,0], [0,0] ] ],
            DHSS: {},
            ZdBtnLoading:'',
            ZdLoading:'',
            ZdStopLoading: '',
            ZdData: '',
            ZdMode: 1,
        });
        SEND('game/zdget',{game:category+''+type,category,type});
    }, []);
    useEffect(() => 
    {
        if(!Lottery) return;
        //
        let start_peroids = Lottery&&Lottery[1][0];
        start_peroids = start_peroids+1;
        let end_peroids = start_peroids+1000;
        //
        const _d = { start_peroids };
        const _v = form.getFieldValue();
        if(!_v['end_peroids']) _d['end_peroids'] = end_peroids;
        if(!_v['min_dou']) _d['min_dou'] = 1000;
        if(!_v['max_dou']) _d['max_dou'] = 10000000000;
        form.setFieldsValue(_d);
        // 
        if(ZdData)
        {
            SEND('game/zdget',{game:category+''+type,category,type});
        }
        // 
    }, [Lottery]);
    // 
    const YST = (d,a,b) => 
    {
        let _t = t("点击选择模式");
        if(d[0]>0) _t = d[1];
        return <Button size="small" type={d[0]>0&&"primary"} onClick={()=>dispatch.models.SET({
            M:{
                t: t("选择模式"),
                c: <SelectMode re={(v)=>{
                    ZDYSS[a][b]=[v[0],v[1]];
                    dispatch.models.SET({M:'',ZDYSS});
                }} />
            }
        })}>{_t}</Button>;
    }
    const YS = props => 
    {
        return <>
            <div className="boe br5">
                <div className="table" style={{marginBottom:-1}}>
                    <table className="hover">
                        <tr><th colSpan="4">{t("第一期使用")}</th></tr>
                        <tr><td colSpan="4"><b>{t("期号1")}</b>{t("的赢模式")}</td></tr>
                        <tr>
                            <th>{t("期号")}</th>
                            <th>{t("赢了使用")}</th>
                            <th>{t("输了使用")}</th>
                            <th>{t("操作")}</th>
                        </tr>
                        {ZDYSS&&ZDYSS.map((v,k)=>(
                            <tr key={k}>
                                <td>{k+1}</td>
                                <td>{YST(v[0],k,0)}</td>
                                <td>{YST(v[1],k,1)}</td>
                                <td>{k>0?<Button size="small" onClick={()=>dispatch.models.SET({ZDYSS:[...ZDYSS.filter((vv,kk)=>{return kk!=k})]})}>{t("删除")}</Button>:'-'}</td>
                            </tr>
                        ))}
                        <tr><td></td><td colSpan="2">
                            <Button 
                                size="small" 
                                disabled={ZDYSS&&ZDYSS.length>=10}
                                onClick={()=>dispatch.models.SET({ZDYSS:[...ZDYSS,[[0,0],[0,0]]]})}
                            >
                                {t("增加")}
                            </Button>
                        </td><td>
                            <Button 
                                size="small"
                                type="primary"
                                onClick={()=>dispatch.models.SET({ZDYSS:[ [ [0,0], [0,0] ] ]})}
                            >
                                {t("清空")}
                            </Button> 
                        </td></tr>
                    </table>
                </div>
            </div>
        </>
    }
    // 
    const DHT = (d) => 
    {
        let _t = t("不投注");
        if(DHSS[d]) _t = DHSS[d][1];
        return <Button size="small" type={DHSS[d]&&"primary"} onClick={()=>dispatch.models.SET({
            M:{
                t: t("选择模式"),
                c: <SelectMode re={(v)=>{
                    DHSS[d]=[v[0],v[1]];
                    dispatch.models.SET({M:'',DHSS});
                }} />
            }
        })}>{_t}</Button>;
    }
    const DH = props => 
    {
        let _t = type;
        _t = _t=='28gd' ? '28' : _t;
        let numbers = _numbers[_t];
        // 
        return <>
            <Row gutter={20}>
                {numbers&&numbers.map((vv,kk)=>(
                    <Col span={12}>
                        <div className="boe br5">
                            <div className="table" key={kk} style={{marginBottom:-1}}>
                                <table className='hover'>
                                    <tr><th width="80">{t("号码")}</th><th>{t("使用模式")}</th></tr>
                                    {vv.map((v,k)=>(
                                        <tr key={k}>
                                            <td><span className="ball small">{_jgTxt[v]||v}</span></td>
                                            <td>{DHT(v)}</td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
            <div className="boe br5" style={{marginTop:15}}>
                <div className="table" style={{marginBottom:-1,marginTop:-1}}>
                    <table>
                        <tr><td><Button size="small" onClick={()=>dispatch.models.SET({DHSS:{}})}>{t("重置")}</Button></td></tr>
                    </table>
                </div>
            </div>
        </>
    }
    //
    const checkMode = () => 
    {
        if(ZdMode==2)
        {
            if(!DHSS||Object.keys(DHSS).length<=0)
            {
                dispatch.models.SET({
                    M:{
                        c:t("至少选择一个对应号码模式！")
                    }
                })
                return false;
            }
        }
        if(!ZdMode || ZdMode==1)
        {
            let _istrue = true;
            for(let i in ZDYSS)
            {
                let _zdyss_i = ZDYSS[i];
                if(!_zdyss_i[0][0] || !_zdyss_i[1][0])
                {
                    _istrue = false;
                    break;
                }
            }
            if(!_istrue)
            {
                dispatch.models.SET({
                    M:{
                        c:t("请选择完整的输赢模式！")
                    }
                })
                return false;
            }
        }
        return true;
    } 
    // 
    const ZDYSS_check = (d) => 
    {
        let _new = [];
        for(let i in d)
        {
            let _di = d[i];
            _new[i] = [ _di[0][0], _di[1][0] ];
        }
        return _new;
    }
    const DHSS_check = (d) => 
    {
        let _new = {};
        for(let i in d)
        {
            _new[i] = d[i][0];
        }
        return _new;
    }
    //
    const onFinish = (e) => 
    {
        const _is_ok = checkMode();
        if(!_is_ok) return;
        const vals = (!ZdMode||ZdMode==1)?ZDYSS_check(ZDYSS):DHSS_check(DHSS);
        e = { 
            game:category+''+type,
            category,
            type,
            ...e, 
            vals, 
            mode:ZdMode 
        };
        dispatch.models.SET({ZdBtnLoading:1});
        SEND('game/autobet',e);
    }
    //
    const wst = {
        1: t("输赢循环"),
        2: t("对号模式")
    }
    const wk = (a) => 
    {
        if(!a) return '-';
        if(a>0) return <><b>+ {nTom(a)}</b> {t("豆")}</>;
        return nTom(a)+t(" 豆");
    }
    const __sd = (a) => 
    {
        if(!a) return '-';
        if(a>0) return <>{nTom(a)} {t("豆")}</>;
        return nTom(a)+t(" 豆");
    }
    const _status = 
    {
        2: t("投注中"),
        31: <>{t("因")}<b>{t("金豆余额低于下限")}</b>{t("而停止")}</>,
        32: <>{t("因")}<b>{t("金豆余额高于上限")}</b>{t("而停止")}</>,
        33: <>{t("因")}<b>{t("投注模式不存在")}</b>{t("而停止")}</>,
        34: <>{t("因")}<b>{t("投金豆余额不足以投注")}</b>{t("而停止")}</>,
    }
    const ZdInfo = () => 
    {
        return <>
            <div className="table_search">
                <Button 
                    type="primary" 
                    loading={ZdStopLoading}
                    onClick={()=>{
                        dispatch.models.SET({ZdStopLoading: 1});
                        SEND('game/zdstop',{category,type});
                    }}
                >
                    {t("停止自动投注")}
                </Button>
            </div>
            <div className="table_search">
                <Row gutter="20">
                    <Col span="12">
                        <div className="boe br5">
                            <div className="table" style={{margin:'-1px 0'}}>
                                <table className='hover g'>
                                    <tr><th colSpan="2">{t("当前")}</th></tr>
                                    <tr>
                                        <td>{t("当前状态")}</td><td>{_status[ZdData.status]||'-'}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("进行到")}</td><td>{t("第")} <b>{ZdData.pn}</b> {t("期")}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("总期数")}</td><td>{(ZdData.end_peroids-ZdData.start_peroids)}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("投注金豆")}</td><td>{__sd(ZdData.dou)}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("投注盈亏")}</td><td>{wk(ZdData.win)}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </Col>
                    <Col span="12">
                        <div className="boe br5">
                            <div className="table" style={{margin:'-1px 0'}}>
                                <table className='hover g'>
                                    <tr><th colSpan="2">{t("参数")}</th></tr>
                                    <tr>
                                        <td>{t("投注模式")}</td><td>{wst[ZdData.mode]}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("开始期数")}</td><td>{ZdData.start_peroids}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("结束期数")}</td><td>{ZdData.end_peroids}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("金豆下限")}</td><td>{nTom(ZdData.min_dou)} {t("豆")}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("金豆上限")}</td><td>{nTom(ZdData.max_dou)} {t("豆")}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    }
    // 
    const showtype = () => 
    {
        if(ZdMode==2) return <DH />;
        return <YS />;
    }
    const showpage = () => 
    {
        if(ZdData) return <ZdInfo />;
        return <>
            <div className="table_search zdtz" style={{paddingLeft:75}}>
                <Form
                    form={form}
                    layout="inline"
                    onFinish={onFinish}
                >
                    <Form.Item name="start_peroids">
                        <Input 
                            style={{width:200}}
                            addonBefore={t("开始期数")}
                        />
                    </Form.Item>
                    <Form.Item name="end_peroids">
                        <Input 
                            style={{width:200}}
                            addonBefore={t("结束期数")}
                        />
                    </Form.Item>
                    <Form.Item name="min_dou">
                        <Input 
                            style={{width:220}}
                            addonBefore={t("下限")}
                            addonAfter={t("豆")}
                        />
                    </Form.Item>
                    <Form.Item name="max_dou">
                        <Input 
                            style={{width:240}}
                            addonBefore={t("上限")}
                            addonAfter={t("豆")}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            loading={ZdBtnLoading}
                        >
                        {t("开始自动投注")}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="table_search">
                <span style={{marginRight:10}}>{t("模式选择：")}</span>
                <Checkbox
                    checked={!ZdMode||ZdMode==1}
                    onChange={()=>dispatch.models.SET({ ZdMode:1 })}
                >
                    {t("输赢循环")}
                </Checkbox>
                <Checkbox
                    checked={ZdMode==2} 
                    onChange={()=>dispatch.models.SET({ ZdMode:2 })}
                >
                    {t("对号投注")}
                </Checkbox>
            </div>
            <div className="table_search">
                {showtype()}
            </div>
        </>
    }
    // 
    return <div className="bf br5">
        <div className="table_search"><b>{GameName(category,type)} {t("- 自动投注")}</b></div>
        <BlockLoading loading={!ZdLoading} m={'45px 0'}>
            {showpage()}
        </BlockLoading>
        <div className="bf tl" style={{padding:'15px 20px'}}>
            <p><b>{t("自动投注说明书：")}</b></p>
            <p>{t("1．不在期数范围内，则自动停止投注。")}</p>
            <p>{t("2．当账户金豆，低于下限，或高于上限时，则自动停止投注。")}</p>
            <p>{t("3．确认并开始自动投注后，系统将会进行自动投注，无论你离线或在线都会持续运行。")}</p>
            <p>{t("4．运行期间可手动进行停止自动投注。")}</p>
            <p>{t("5．银行的金豆不能用于自动投注。")}</p>
            <p>{t("6．输赢详情在投注记录中查看。")}</p>
        </div>
    </div>
}