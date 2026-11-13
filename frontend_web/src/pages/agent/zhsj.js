import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Radio } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ___gamename } from 'utils/betData';
import { formStatus } from 'utils/tool';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
// 
export default () => 
{
    const { AgentzhsjStatus, AgentzhsjUserCheckLoading, AgentZhsjList, AgentZhsjReload} = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    const [form] = Form.useForm();
    // 
    const levels = [ 1, 2, 3, 4, 5, 6, 7 ];
    // 
    useEffect(() => {
        dispatch.models.SET({
            AgentzhsjStatus:'', 
            AgentzhsjUserCheckLoading:''
        });
        form.setFieldsValue({vip:7});
        SEND('agent_zhsj/list');
    }, []);
    useEffect(() => {
        if(!AgentZhsjReload) return;
        SEND('agent_zhsj/list');
        form.resetFields();
        dispatch.models.SET({
            AgentzhsjStatus:'', 
            AgentzhsjUserCheckLoading:''
        })
    }, [AgentZhsjReload]);
    // 
    const onFinish = (v) => 
    {
        if(!v || !v._user_id || !v.vip)
        {
            dispatch.models.SET({ M:{c:t("请输入以及选择完整！")} });
            return;
        }
        dispatch.models.SET({
            M:{
                t: t("账号升级"),
                c: <div className="kmp tl">
                    <p>{t("用户ID")}<span>{v._user_id}</span></p>
                    <p>{t("升至级别")}<span><b>VIP{v.vip}</b></span></p>
                </div>,
                bt: t("确定升级"),
                b: () => SEND('agent_zhsj/go', v)
            }
        });
    }
    //
    const checkUserid = () => 
    {
        let _user_id = form.getFieldValue('_user_id');
        if(!_user_id) return;
        dispatch.models.SET({
            AgentzhsjUserCheckLoading: true
        });
        SEND('agent_zhsj/id_check', { _user_id });
    } 
    const columns = [
        [ t("时间") ],
        [ t("用户ID") ],
        [ t("用户昵称") ],
        [ t("升级级别") ],
    ];
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("账号升级")}
        </div>
        <div className="boe br5 ov p24 agent_form">
            <Form
                form={form}
                onFinish={onFinish}
            >
                <Form.Item>
                    <Form.Item 
                        style={{width:220,display:'inline-block',margin:'0 10px 0 0'}}
                        name="_user_id" 
                        {...formStatus(AgentzhsjStatus,'_user_id')}
                    >
                        <Input 
                            addonBefore={<UserOutlined />}
                        />
                    </Form.Item>
                    <Button
                        loading={AgentzhsjUserCheckLoading}
                        onClick={()=>checkUserid()}
                    >
                        {t("检测")}
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Form.Item 
                        style={{margin:'0 10px 0 0'}}
                        name="vip"
                    >
                        <Radio.Group defaultValue={7} buttonStyle="solid">
                            <Radio.Button disabled={true}>{t("级别")}</Radio.Button>
                            {levels.map((v,k)=>(
                                <Radio.Button value={v}>VIP {v}</Radio.Button>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                </Form.Item>
                <Form.Item noStyle={true}>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        size="large"
                        style={{width:220}}
                    >
                        {t("确定升级")}
                    </Button>
                </Form.Item>
            </Form>
        </div>
        <div className="tit" n="WO DE XINXI">
            {t("升级记录")}
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={columns} 
                data={ AgentZhsjList||[] }
                pageChange={ page=>SEND('agent_zhsj/list', { page }) }
            />
        </div>
    </>
}