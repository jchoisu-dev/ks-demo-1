import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, Form } from 'antd';
import { formStatus, formFieldChange } from 'utils/tool';
import { t } from 'i18n';
// 
export default props =>
{
    const { honeCodeLoading, PhoneCodeStatus, PhoneCodeLoading } = useSelector((state) => state.models);
    const { phone, phoneCodeReturn } = props;
    // 
    const dispatch = useDispatch();
    // 
    return <>
        <p>{t("短信验证码已发送至手机号")}</p>
        <p style={{margin:'10px 0 25px',fontSize:16}}><b>+{phone}</b></p>
        <div>
            <Form
                onFinish={phoneCodeReturn}
            >
                <Form.Item
                    name="code"
                    rules={[{ required:true, pattern:/^\d{6}$/, message:t("格式为 6位数字") }]}
                    {...formStatus(PhoneCodeStatus,'code')}
                >
                    <Input 
                        addonBefore={t("短信验证码")}
                        size="large" 
                        onChange={()=>formFieldChange(dispatch.models.SET({}),PhoneCodeStatus,'code')}
                        placeholder='123123'
                    />
                </Form.Item>

                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        size="large" 
                        block 
                        loading={PhoneCodeLoading}
                    >
                    {t("确 定")}
                    </Button>
                </Form.Item>

            </Form>
            <p className="c6"><small>{t("如仍未收到短信验证码，请联系客服获取")}</small></p>
        </div>
    </>
}