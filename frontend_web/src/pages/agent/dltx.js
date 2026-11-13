import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { nTom,mTon } from 'utils/tool';
import { ___gamename } from 'utils/betData';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
// 
export default () => 
{
    const { AgentdDltxList, AgentDltxReload} = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auths);
    // 
    const dispatch = useDispatch();
    // 
    const [form] = Form.useForm();
    // 
    const _agent_dou = Auth&&Auth.dou||0;
    const _agent_money = parseInt(_agent_dou/1000);
    // 
    useEffect(() => {
        dispatch.models.SET({
            AgentDltxReload:'', 
        })
        SEND('agent_dltx/list')
    }, []);
    useEffect(() => {
        if(!AgentDltxReload) return;
        SEND('agent_dltx/list');
        form.resetFields();
        dispatch.models.SET({
            AgentDltxReload:''
        })
    }, [AgentDltxReload]);
    // 
    const onFinish = (v) => 
    {
        if(!v || !v.money)
        {
            dispatch.models.SET({ M:{c:t("请输入提现金额！")} });
            return;
        }
        dispatch.models.SET({
            M:{
                t: t("金豆提现"),
                c: <div className="kmp tl">
                    <p>{t("提现金额")}<span><b>{nTom(v.money)}</b> {t("元")}</span></p>
                </div>,
                bt: t("确定"),
                b: () => SEND('agent_dltx/go', { 
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
    const status = 
    {
        1: t("待审核"),
        2: <b>{t("审核通过")}</b>,
        3: <del>{t("已撤销")}</del>,
    }
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("代理提现")}
        </div>
        <div className="boe br5 ov p24 agent_form">
            <div style={{margin:'5px 0 26px'}} className="txtba">
                <span b={t("余额")} a={t("豆")}><b>{nTom(_agent_dou)}</b></span>
            </div>
            <Form
                form={form}
                onFinish={onFinish}
                onValuesChange={(v)=>onFormChange(v)}
            >
                <Form.Item>
                    <Form.Item 
                        name="money" 
                        style={{width:220,display:'inline-block',margin:'0 10px 0 0'}}
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
                        {t("确定提现")}
                    </Button>
                </Form.Item>
            </Form>
        </div>
        <div className="tit" n="WO DE XINXI">
            {t("提现记录")}
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={[
                    [ t("时间") ],
                    [ t("提现金额"),(v)=><><b>{nTom(v[1])}</b> {t("元")}</> ],
                    [ t("状态"),(v)=>status[v[2]] ],
                ]} 
                data={ AgentdDltxList||[] }
                pageChange={ page=>SEND('agent_dltx/list', { page }) }
            />
        </div>
    </>
}