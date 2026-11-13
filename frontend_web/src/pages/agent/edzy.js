import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';
import { nTom, mTon } from 'utils/tool';
import { ___gamename } from 'utils/betData';
import { formStatus } from 'utils/tool';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const { Option } = Select;
const Table = lazy(() => import('components/Table'));
//
export default () => 
{
    const { AgentedzyStatus, AgentEdzyList, AgentEdzyReload, AgentEdzySelectList, AgentEdzySelectLoading} = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auths);
    // 
    const dispatch = useDispatch();
    // 
    const [form] = Form.useForm();
    // 
    const _agent_dou = parseInt(Auth&&Auth.dou||0);
    const _agent_money = parseInt(_agent_dou/1000);
    // 
    useEffect(() => {
        dispatch.models.SET({
            AgentedzyUserCheckLoading:'',
            AgentedzyStatus:'',
            AgentEdzyReload:'',
        })
        SEND('agent_edzy/list')
    }, []);
    useEffect(() => {
        if(!AgentEdzyReload) return;
        SEND('agent_edzy/list');
        form.resetFields();
        dispatch.models.SET({
            AgentEdzyReload:'',
            AgentedzyStatus:''
        })
    }, [AgentEdzyReload]);
    // 
    const onFinish = (v) => 
    {
        if(!v || !v._user_id || !v.money)
        {
            dispatch.models.SET({ M:{c:t("请输入完整！")} });
            return;
        }
        dispatch.models.SET({
            M:{
                t: t("额度转移"),
                c: <div className="kmp tl">
                    <p>{t("代理ID")}<span>{v._user_id}</span></p>
                    <p>{t("转移金额")}<span><b>{nTom(v.money)}</b> {t("元")}</span></p>
                </div>,
                bt: t("确定"),
                b: () => SEND('agent_edzy/go', { 
                    _user_id: v._user_id,
                    money: mTon(v.money)
                })
            }
        });
    }
    //
    const moneys = [ 100, 1000, 10000, 50000, 100000 ];
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
    }
    const moneyCheck = (m) =>
    {
        if(m>_agent_money) m = _agent_money;
        form.setFieldsValue({money:nTom(m)});
    }
    const qr = (v) => 
    {
        const _t = {1:t("转出"),2:t("接收")};
        const _u = {1:'thr',2:'two'};
        dispatch.models.SET({
            M:{
                t: t("额度")+_t[v[1]],
                c: <div className="kmp tl">
                        <p>{t("代理ID:")} <span>{v[2]}</span></p>
                        <p>{t("代理昵称:")} <span>{v[3]}</span></p>
                        <p>{t("转移金额:")} <span><b>{nTom(v[4])}</b> {t("元")}</span></p>
                    </div>,
                bt: t("确定")+_t[v[1]],
                b: () => SEND('agent_edzy/'+_u[v[1]],{_id:v[6]})
            }
        })
    }
    const types = (d) => 
    {
        if(d==1) return t("转出");
        return <b>{t("转入")}</b>;
    }
    const status = (v) =>
    {
        const d = v[1]+''+v[5];
        if(d=='11') return <Button size="small" disabled>{t("等待接收")}</Button>;
        if(d=='21') return <Button size="small" type="primary" onClick={()=>qr(v)}>{t("确定接收")}</Button>;
        if(d=='12') return <Button size="small" type="primary" onClick={()=>qr(v)}>{t("确定转出")}</Button>;
        if(d=='22') return <Button size="small" disabled>{t("等待确认")}</Button>;
        return <Button size="small" disabled>{t("完成")}</Button>;
    }
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("额度转移")}
        </div>
        <div className="boe br5 ov p24 agent_form">
            <div style={{margin:'5px 0 26px'}} className="txtba">
                <span b={t("余额")} a={t("豆")}><b>{nTom(_agent_dou)}</b></span>
            </div>
            <Form
                form={form}
                onFinish={onFinish}
                onValuesChange={(v)=>onFormChange(v)}
                initialValues={{
                    _user_id:''
                }}
            >
                <Form.Item>
                    <Form.Item 
                        style={{width:220,display:'inline-block',margin:'0 10px 0 0'}}
                        name="_user_id" 
                        {...formStatus(AgentedzyStatus,'_user_id')}
                    >
                        <Select style={{ width: 220 }} loading={!AgentEdzySelectLoading}>
                            <Option value="">{t("选择代理")}</Option>
                            {AgentEdzySelectList&&Object.keys(AgentEdzySelectList).map(k=>(
                                <Option key={k} value={k}>{AgentEdzySelectList[k]}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item>
                    <Form.Item 
                        name="money" 
                        style={{width:220,display:'inline-block',margin:'0 10px 0 0'}}
                        {...formStatus(AgentedzyStatus,'money')}
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
                        style={{width:220}}
                    >
                        {t("确定转移")}
                    </Button>
                </Form.Item>
            </Form>
        </div>
        <div className="tit" n="WO DE XINXI">
            {t("转移记录")}
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={[
                    [ t("时间") ],
                    [ t("类型"),(v)=>types(v[1]) ],
                    [ t("代理ID") ],
                    [ t("代理昵称") ],
                    [ t("转移金额"),(v)=><><b>{nTom(v[4])}</b> {t("元")}</> ],
                    [ t("状态"),(v)=>status(v) ],
                ]}
                data={ AgentEdzyList||[] }
                pageChange={ page=>SEND('agent_edzy/list', { page }) }
            />
        </div>
    </>
}