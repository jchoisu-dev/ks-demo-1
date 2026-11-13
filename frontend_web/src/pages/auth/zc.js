import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { Divider, Button, Input, Form, Typography } from 'antd';
import { formStatus, formFieldChange } from 'utils/tool';
import { SEND } from 'store';
// 
const { Title } = Typography;
// 
import { DownOutlined } from '@ant-design/icons';
// 
const Main = lazy(() => import('components/Layout/auth'));
import CountrySelect from 'components/Tool/CountrySelect';
import { t } from 'i18n';
// 
let phone;
let calling;
// 
export default () => 
{
    const { CountrySelects, Register, RegisterStatus, RegisterLoading} = useSelector((state) => state.models);
    const [ form ] = Form.useForm();
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let params = useParams();
    // 
    calling = CountrySelects&&CountrySelects.calling || 86;
    const _ds = {color:'#888', fontSize:'14px', fontWeight:400};
    const parent = params.parent || '';
    // 
    useEffect(() => {
        if (!/^[0-9]{6,12}$/.test(parent)) return;
        form.setFieldsValue({ parent });
    }, []);
    // 
    const time = Register&&Register.SendTime || 0;
    useEffect(() => {
        let timeoutr;
        if(time>0)
        {
            if(timeoutr) clearTimeout(timeoutr);
            timeoutr = setTimeout(()=>
            {
                dispatch.models.SET({ Register:{ ...Register, SendTime: time-1 } });
            }, 1000);
        }
    }, [time]);
    //
    const SendCode = () => 
    {
        form.validateFields(['phone']).then(v => 
        {
            dispatch.models.SET({ RegisterLoading:{ phone: true } });
            phone = v.phone;
            SEND('auth_ncp/registercode',{
                calling,
                phone
            })
        }).catch(e=>{});
    }
    // 
    const onFinish = (v) => {
        // console.log('Finish:', v);
        if(!(Register&&Register._code))
        {
            dispatch.models.SET({ M:{c:t("请先获取验证码，谢谢！")} });
            return;
        }
        dispatch.models.SET({ RegisterLoading:{ post: true } });
        SEND('auth/register',{...v,calling,_code:Register._code});
    };
    // 
    const PhoneCheck = (r, v, c) =>
    {
        if (c==86&&(!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(v))) return Promise.reject(t("格式为 11位数字"));
        if (!/^\d{6,11}$/.test(v)) return Promise.reject(t("格式为 6-11位数字"));
        return Promise.resolve();
    }
    // 
    return <Main img="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/bg/auth/zc.png">
        <div className="mb24">
            <Title level={3}>{t("账号注册")}</Title>
        </div>
        <div className="aigaw">
            <Form
                form={form}
                onFinish={onFinish}
                // onFieldsChange={()=>SET({RegisterStatus:''})}
            >
                <Divider style={_ds}>{t("登录信息")}</Divider>
                <Form.Item
                    name="user"
                    rules={[{ required:true, pattern:/^[a-zA-Z0-9\_\-\@\.]{6,26}$/, min:6, max:26, message:t("格式为 a-zA-Z0-9_-@.，长度6-26") }]}
                    {...formStatus(RegisterStatus,'user')}
                >
                    <Input 
                        addonBefore={t("登录账号")}
                        size="large" 
                        onChange={()=>formFieldChange(dispatch.models.SET({}),RegisterStatus,'user')}
                    />
                </Form.Item>
                <Form.Item
                    name="pass"
                    rules={[{ required:true, pattern:/^[a-zA-Z0-9\_\-\@\.]{6,26}$/, min:6, max:26, message:t("格式为 a-zA-Z0-9_-@.，长度6-26") }]}
                    {...formStatus(RegisterStatus,'pass')}
                >
                    <Input.Password
                        type="password"
                        addonBefore={t("登录密码")}
                        size="large"
                        onChange={()=>formFieldChange(dispatch.models.SET({}),RegisterStatus,'pass')}
                    />
                </Form.Item>
                <Divider style={_ds}>{t("基本信息")}</Divider>
                <Form.Item
                    name="nick"
                    rules={[{ required:true, pattern:/^[a-zA-Z0-9_\u4E00-\u9FA5]{2,16}$/, min:2, max:16, message:t("格式为 a-zA-Z0-9_或中文，长度2-16") }]}
                    {...formStatus(RegisterStatus,'nick')}
                >
                    <Input 
                        addonBefore={t("昵称")}
                        size="large" 
                        onChange={()=>formFieldChange(dispatch.models.SET({}),RegisterStatus,'nick')}
                    />
                </Form.Item>
                <Form.Item
                    name="parent"
                    rules={[{ pattern:/^\d{6,12}$/, message:t("格式为 6-12位数字") }]}
                    {...formStatus(RegisterStatus,'parent')}
                >
                    <Input 
                        addonBefore={t("推荐人ID")}
                        addonAfter={<small>{t("选填")}</small>}
                        size="large"
                        onChange={()=>formFieldChange(dispatch.models.SET({}),RegisterStatus,'parent')}
                    />
                </Form.Item>
                <Divider style={_ds}><b>{CountrySelects&&CountrySelects.name||t("中国")}</b> {t("- 手机验证")}</Divider>
                <Form.Item
                    name="phone"
                    rules={[{ validator:(r,v)=>PhoneCheck(r,v,calling) }]}
                    {...formStatus(RegisterStatus,'phone')}
                >
                    <Input 
                        addonBefore={<>{!time?<div className="cu" onClick={()=>dispatch.models.SET({ M:{t:t("点击国家选择区号"),c:<CountrySelect />} })}>
                            <DownOutlined style={{fontSize:12,color:'#999',margin:'0 10px 0 -3px'}} />
                            <b>+ {calling}</b>
                        </div>:<b>+ {calling}</b>}</>}
                        addonAfter={<Button 
                            style={{minWidth:'92px'}}
                            disabled={time>0} 
                            loading={RegisterLoading&&RegisterLoading.phone} 
                            onClick={()=>SendCode()}
                        >
                            { time>0 ? time+t(" 秒") : t("获取验证码") }
                        </Button>}
                        size="large" 
                        disabled={time}
                        onChange={()=>formFieldChange(dispatch.models.SET({}),RegisterStatus,'phone')}
                    />
                </Form.Item>
                <Form.Item
                    name="code"
                    rules={[{ required:true, pattern:/^\d{6}$/, message:t("格式为 6位数字") }]}
                    {...formStatus(RegisterStatus,'code')}
                >
                    <Input 
                        addonBefore={t("短信验证码")}
                        size="large" 
                        onChange={()=>formFieldChange(dispatch.models.SET({}),RegisterStatus,'code')}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" block 
                        loading={RegisterLoading&&RegisterLoading.post}
                        disabled={RegisterLoading&&RegisterLoading.phone}
                    >
                        {t("注 册")}
                    </Button>
                </Form.Item>
                <Divider style={{color:'#666',fontSize:'14px'}}>{t("已有账号？")}</Divider>
                <Form.Item noStyle>
                    <Button block onClick={()=>navigate('/dl')}>
                        {t("账号登录")}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </Main>
}