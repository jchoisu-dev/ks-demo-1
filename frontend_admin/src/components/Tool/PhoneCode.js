import { useModel } from 'umi';
import { Button,Input,Form } from 'antd';
import { formStatus, formFieldChange } from '@/utils/tool';

export default props =>
{
    const { SET, PhoneCodeLoading, PhoneCodeStatus } = useModel('data');
    const { phone, phoneCodeReturn } = props;
    // 
    return <>
        <p>短信验证码已发送至手机号</p>
        <p style={{margin:'10px 0 25px',fontSize:16}}><b>+{phone}</b></p>
        <div>
            <Form
                onFinish={phoneCodeReturn}
            >
                <Form.Item
                    name="code"
                    rules={[{ required:true, pattern:/^\d{6}$/, message:'格式为 6位数字' }]}
                    {...formStatus(PhoneCodeStatus,'code')}
                >
                    <Input 
                        addonBefore="短信验证码"
                        size="large" 
                        onChange={()=>formFieldChange(SET,PhoneCodeStatus,'code')}
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
                    确 定
                    </Button>
                </Form.Item>

            </Form>
            <p className="c6"><small>如仍未收到短信验证码，请联系客服获取</small></p>
        </div>
    </>
}