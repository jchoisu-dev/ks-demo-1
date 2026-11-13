import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Divider, Button, Input, Form } from 'antd';
import { formStatus, formFieldChange } from 'utils/tool';
import { SEND } from 'store';
// 
import { DownOutlined, LockOutlined } from '@ant-design/icons';
// 
import CountrySelect from 'components/Tool/CountrySelect';
import { t } from 'i18n';
// 
let phone;
let calling;
// 
export default () => 
{
    const { CountrySelects, Forgot, ForgotStatus, ForgotLoading } = useSelector((state) => state.models);
    const [ form ] = Form.useForm();
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 
    calling = CountrySelects&&CountrySelects.calling || 86;
    const _ds = {color:'#888',fontSize:'14px',fontWeight:400};
    // 
    const time = Forgot&&Forgot.SendTime || 0;
    useEffect(() => {
        let timeoutr;
        if(time>0)
        {
            if(timeoutr) clearTimeout(timeoutr);
            timeoutr = setTimeout(()=>
            {
                dispatch.models.SET({ Forgot:{ ...Forgot, SendTime: time-1 } });
            }, 1000);
        }
    }, [time]);
    //
    const SendCode = () => 
    {
        form.validateFields(['phone']).then(v => 
        {
            dispatch.models.SET({ ForgotLoading:{ phone: true } });
            phone = v.phone;
            // SEND('auth_ncp/forgotcode',{
            //     calling,
            //     phone
            // })
        }).catch(e=>{});
    }
    // 
    const onFinish = (v) => 
    {
        if(!(Forgot&&Forgot._code))
        {
            dispatch.models.SET({ M:{c:t("请先获取验证码，谢谢！")} });
            return;
        }
        dispatch.models.SET({ ForgotLoading:{ post: true } });
        SEND('auth/forgot',{...v,calling,_code:Forgot._code});
    };
    // 
    const PhoneCheck = (r, v, c) =>
    {
        if (c==86&&(!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(v))) return Promise.reject(t("格式为 11位数字"));
        if (!/^\d{6,11}$/.test(v)) return Promise.reject(t("格式为 6-11位数字"));
        return Promise.resolve();
    }
    //
    return <div className="w">
        <div className="auth bf p24 mbt24 br10">
            <div style={{marginBottom:20,fontSize:16,fontWeight:'bold'}} className="tc">
                {t("忘记密码")}
            </div>
            <Divider />
            <div className="aigaw tc" style={{width:400,margin:'0 auto',padding:'10px 0 40px'}}>
                <Form
                    form={form}
                    onFinish={onFinish}
                    // onFieldsChange={()=>SET({ForgotStatus:''})}
                    // autoComplete={false}
                >

                    <Divider style={_ds}><b>{CountrySelects&&CountrySelects.name||t("中国")}</b> {t("- 手机验证")}</Divider>
                    <Form.Item
                        name="phone"
                        rules={[{ validator:(r,v)=>PhoneCheck(r,v,calling) }]}
                        {...formStatus(ForgotStatus,'phone')}
                    >
                        <Input 
                            addonBefore={<>{!time?<div className="cu" onClick={()=>dispatch.models.SET({ M:{t:t("点击国家选择区号"),c:<CountrySelect />} })}>
                                <DownOutlined style={{fontSize:12,color:'#999',margin:'0 10px 0 -3px'}} />
                                <b>+ {calling}</b>
                            </div>:<b>+ {calling}</b>}</>}
                            addonAfter={<Button 
                                style={{minWidth:'92px'}}
                                disabled={time>0} 
                                loading={ForgotLoading&&ForgotLoading.phone} 
                                onClick={()=>SendCode()}
                            >
                                { time>0 ? time+t(" 秒") : t("获取验证码") }
                            </Button>}
                            size="large" 
                            disabled={time}
                            onChange={()=>formFieldChange(dispatch.models.SET({}),ForgotStatus,'phone')}
                        />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[{ required:true, pattern:/^\d{6}$/, message:t("格式为 6位数字") }]}
                        {...formStatus(ForgotStatus,'code')}
                    >
                        <Input 
                            addonBefore={t("短信验证码")}
                            size="large" 
                            onChange={()=>formFieldChange(dispatch.models.SET({}),ForgotStatus,'code')}
                        />
                    </Form.Item>
                    <Divider style={_ds}>{t("输入新密码")}</Divider>
                    <Form.Item
                        name="pass"
                        rules={[{ required:true, pattern:/^[a-zA-Z0-9\_\-\@\.]{6,26}$/, min:6, max:26, message:t("格式为 a-zA-Z0-9_-@.，长度6-26") }]}
                        {...formStatus(ForgotStatus,'pass')}
                    >
                        <Input
                            prefix={<div style={{paddingRight:6}}><LockOutlined className="site-form-item-icon" /></div>}
                            type="password"
                            placeholder={t("新登录密码")}
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        name="repass"
                        rules={[{ required:true, pattern:/^[a-zA-Z0-9\_\-\@\.]{6,26}$/, min:6, max:26, message:t("格式为 a-zA-Z0-9_-@.，长度6-26") }]}
                        {...formStatus(ForgotStatus,'repass')}
                    >
                        <Input
                            prefix={<div style={{paddingRight:6}}><LockOutlined className="site-form-item-icon" /></div>}
                            type="password"
                            placeholder={t("重复新密码")}
                            size="large"
                        />
                    </Form.Item>
                    <Divider />
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block 
                            loading={ForgotLoading&&ForgotLoading.post}
                            disabled={ForgotLoading&&ForgotLoading.phone}
                        >
                            {t("确定")}
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
        </div>
    </div>
}