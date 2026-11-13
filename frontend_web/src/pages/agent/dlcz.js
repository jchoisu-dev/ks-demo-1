import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, DatePicker, Row, Col, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { nTom,mTon } from 'utils/tool';
import { ___gamename } from 'utils/betData';
import { formStatus } from 'utils/tool';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const { Option } = Select;
const { RangePicker } = DatePicker;
// 
const Table = lazy(() => import('components/Table'));
// 
export default () => 
{
    const { 
        AgentdlczStatus, 
        AgentdlczUserCheckLoading, AgentChargeList, AgentChargeReload, 
        AgentChargeLoadingx,
        AgentdlczUserInfo, AgentChargeLoading
    } = useSelector((state) => state.models);
    //
    const Auth = useSelector((state) => state.auths);
    //
    const dispatch = useDispatch();
    //
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    // 
    const _agent_dou = Auth&&Auth.dou||0;
    // 
    const getD = (v) => 
    {
        dispatch.models.SET({
            AgentdlczStatus:'',
            AgentdlczUserCheckLoading:false,
            AgentdlczUserInfo: '',
            AgentChargeLoadingx: false
        });
        if(v&&v['time'])
        {
            v['time_start'] = v['time'][0].format('YYYY-MM-DD HH:mm');
            v['time_end'] = v['time'][1].format('YYYY-MM-DD HH:mm');
            delete v['time'];
        }
        SEND('agent_charge/list',v);
    }
    useEffect(() => getD(), []);
    useEffect(() => {
        if(!AgentChargeReload) return;
        form.resetFields();
        getD();
    }, [AgentChargeReload]);
    // 
    useEffect(() => {
        if(!AgentdlczUserInfo || !AgentChargeLoadingx) return;
        let _v = form.getFieldValue();
        dispatch.models.SET({
            M:{
                t: t("充值确认"),
                c: <div className="kmp tl">
                    <p>{t("用户ID")}<span>{_v._user_id}</span></p>
                    <p>{t("昵称")}<span>{AgentdlczUserInfo[0]}</span></p>
                    <p>{t("充值金额")}<span><b>{nTom(_v.money)}</b> {t("元")}</span></p>
                </div>,
                bt: t("确定充值"),
                b: () => SEND('agent_charge/go', { 
                    _user_id: _v._user_id,
                    money: mTon(_v.money)
                })
            },
            AgentChargeLoadingx:false
        });
    }, [AgentdlczUserInfo&&AgentChargeLoadingx]);
    // 
    const onFinish = (v) => 
    {
        if(!v || !v._user_id || !v.money)
        {
            dispatch.models.SET({ M:{c:t("请输入完整！")} });
            return;
        }
        // 
        dispatch.models.SET({AgentChargeLoadingx:1});
        SEND('agent_charge/id_check', { _user_id: v._user_id });
    }
    //
    const checkUserid = () => 
    {
        let _user_id = form.getFieldValue('_user_id');
        if(!_user_id) return;
        dispatch.models.SET({
            AgentdlczUserCheckLoading: true
        });
        SEND('agent_charge/id_check', { _user_id });
    } 
    const moneys = [ 100, 500, 1000, 5000, 10000, 50000 ];
    const setm = (m) => 
    {
        let money = '';
        if(m)
        {
            money = mTon(form.getFieldValue('money'));
            money = money+parseInt(m);
        }
        moneyCheck(money);
    }
    const onFormChange = (v) => 
    {
        if(v&&v.money) moneyCheck(mTon(v.money));
        if(v&&v._user_id)
        {
            if(AgentdlczStatus&&AgentdlczStatus._user_id)
            {
                dispatch.models.SET({
                    AgentdlczStatus:{...AgentdlczStatus,_user_id:''},
                    AgentdlczUserInfo: ''
                });
            }
            let _ui = parseInt(v._user_id);
            if(!_ui || _ui<=0) _ui = '';
            form.setFieldsValue({_user_id: _ui})
        }
    }
    const moneyCheck = (m) =>
    {
        if(m>_agent_dou) m = _agent_dou;
        form.setFieldsValue({money:nTom(m)});
    }
    const chargeBack = (v) => 
    {
        dispatch.models.SET({
            M:{
                t: t("充值撤回"),
                c: <div className="kmp tl">
                        <p>{t("用户昵称:")} <span>{v[2]}</span></p>
                        <p>{t("充值金额:")} <span><b>{nTom(v[3])}</b> {t("元")}</span></p>
                        <p>{t("充值时间:")} <span>{v[0]}</span></p>
                    </div>,
                bt: t("确定撤回"),
                b: () => SEND('agent_charge/back',{_id:v[7]})
            }
        })
    }
    const chehui = (v) => 
    {
        if(v[6]==1) return <Button size="small" type="primary" onClick={()=>chargeBack(v)}>{t("撤回")}</Button>
        if(v[6]==3) return <Button size="small" disabled>{t("已撤回")}</Button>
        return <Button size="small" disabled>{t("完成")}</Button>
    }
    const _zhekou = (e) => 
    {
        if(e==1) return t("无折扣");
        return <>{Math.round((e*10)*1000)/1000} {t("折")}</>;
    }
    const columns = [
        [ t("时间") ],
        [ t("用户ID") ],
        [ t("用户昵称") ],
        [ t("充值金额"),(v)=><><b>{nTom(v[3])}</b> {t("元")}</> ],
        [ t("充值折扣"),(v)=><>{_zhekou(v[4])}</> ],
        [ t("实际扣除"),(v)=><><b>{nTom(v[5])}</b> {t("豆")}</> ],
        [ t("操作"),(v)=>chehui(v) ],
    ];
    // 
    const status = 
    {
        1: t("已充值"),
        3: <del><b>{t("已撤回")}</b></del>
    };
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("代理充值")}
        </div>
        <div className="boe br5 ov p24 agent_form">
            <div style={{margin:'5px 0 26px'}} className="txtba">
                <span b={t("余额")} a={t("豆")}><b>{nTom(_agent_dou)}</b></span>
                <span b={t("上分")}><b>{Auth&&Auth.up_rate}</b></span>
            </div>
            <Form
                form={form}
                onFinish={onFinish}
                onValuesChange={(v)=>onFormChange(v)}
            >
                <Form.Item>
                    <Form.Item 
                        style={{width:220,display:'inline-block',margin:'0 10px 0 0'}}
                        name="_user_id" 
                        {...formStatus(AgentdlczStatus,'_user_id')}
                    >
                        <Input 
                            addonBefore={<UserOutlined />}
                        />
                    </Form.Item>
                    <Button
                        loading={AgentdlczUserCheckLoading}
                        onClick={()=>checkUserid()}
                    >
                        {t("检测")}
                    </Button>
                    {AgentdlczUserInfo&&AgentdlczUserInfo.map((v,k)=>(
                        <span className="auinfo" key={k}>
                            {v}
                        </span>
                    ))}
                </Form.Item>
                <Form.Item>
                    <Form.Item 
                        name="money" 
                        style={{width:220,display:'inline-block',margin:'0 10px 0 0'}}
                        {...formStatus(AgentdlczStatus,'money')}
                    >
                        <Input 
                            addonBefore={'¥'}
                            style={{width:220,marginRight:10}}
                        />
                    </Form.Item>
                        {moneys.map((v,k)=>(
                            <Button key={k} style={{marginRight:10}} onClick={()=>setm(v)}>{nTom(v)} {t("元")}</Button>
                        ))}
                        <Button onClick={()=>setm('')}>{t("清除")}</Button>
                    </Form.Item>
                <Form.Item noStyle={true}>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        size="large"
                        loading={AgentChargeLoadingx}
                        style={{width:220}}
                    >
                        {t("确定充值")}
                    </Button>
                </Form.Item>
            </Form>
        </div>
        <div className="tit" n="WO DE XINXI">
            {t("充值记录")}
        </div>
        <div className="mb16">
            <Form
                form={form1}
                onFinish={(v)=>getD(v)}
                initialValues={{
                    status:''
                }}
            >
                <Row gutter="16" justify="center">
                    <Col flex="220px">
                        <Form.Item name="_user_id" noStyle>
                            <Input addonBefore={t("用户ID")} />
                        </Form.Item>
                    </Col>
                    <Col flex="150px">
                        <Form.Item name="status" noStyle>
                            <Select name="status" style={{ width:'100%' }}>
                                <Option value="">{t("所有类型")}</Option>
                                {Object.keys(status).map(k=>(
                                     <Option key={k} value={k}>{status[k]}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col flex="380px">
                        <Form.Item name="time" noStyle>
                            <RangePicker
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                            />
                        </Form.Item>
                    </Col>
                    <Col flex="150px">
                        <Form.Item noStyle>
                            <Button type="primary" htmlType="submit" block loading={AgentChargeLoading}>{t("搜索")}</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={columns} 
                data={ AgentChargeList||[] }
                pageChange={ page => getD({page, ...form1.getFieldValue() })}
            />
        </div>
    </>
}