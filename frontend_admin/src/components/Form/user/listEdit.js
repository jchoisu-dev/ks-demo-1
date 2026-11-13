// 
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Radio, Form, Input, Button, Select } from 'antd';
// 
export default props => 
{
    const { SET,SEND, Login, AuthLoading, A } = useModel('data');
    const [form] = Form.useForm();
    // 
    const onFinish = (v) => 
    {

    }
    const onFormChange = (v) => 
    {

    }
    //
    return <>   
        <Form
            form={form}
            onFinish={onFinish}
            onValuesChange={(v)=>onFormChange(v)}
        >
            <Form.Item name="role">
                <Radio.Group name="radiogroup" defaultValue={1} buttonStyle="solid">
                    <Radio value={1}>客服组</Radio>
                    <Radio value={2}>主管组</Radio>
                    <Radio value={3}>管理员</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item name="perent">
                <Input 
                    addonBefore="用户ID" 
                />
            </Form.Item>
            <Form.Item name="user_id">
                <Input 
                    addonBefore="上级ID" 
                />
            </Form.Item>
            <Form.Item name="user">
                <Input 
                    addonBefore="VIP级别" 
                />
            </Form.Item>
            <Form.Item name="perent">
                <Input 
                    addonBefore="登录账号" 
                />
            </Form.Item>
            <Form.Item name="user_id">
                <Input 
                    addonBefore="手机号码" 
                />
            </Form.Item>
            <Form.Item name="user">
                <Input 
                    addonBefore="昵称" 
                />
            </Form.Item>
            <Form.Item name="user">
                <Input 
                    addonBefore="QQ" 
                />
            </Form.Item>
            <Form.Item name="user">
                <Input 
                    addonBefore="微信"
                />
            </Form.Item>
            <Form.Item name="user">
                <Input 
                    addonBefore="真实姓名" 
                />
            </Form.Item>
            <Form.Item name="user">
                <Input 
                    addonBefore="身份证号码" 
                />
            </Form.Item>
            <Form.Item>
                <Checkbox>正常</Checkbox>
                <Checkbox>冻结</Checkbox>
            </Form.Item>
            <Form.Item name="user">
                <Input 
                    addonBefore="登录密码" 
                />
            </Form.Item>
            <Form.Item name="user">
                <Input 
                    addonBefore="安全码" 
                />
            </Form.Item>
            <Form.Item name="user">
                <Checkbox>正常</Checkbox>
                <Checkbox>冻结</Checkbox>
            </Form.Item>
            <Form.Item name="user">
                <Checkbox>正常会员</Checkbox>
                <Checkbox>测试号</Checkbox>
            </Form.Item>
            <Form.Item name="user">
                <Checkbox>需要审核卡密</Checkbox>
                <Checkbox>不需要审核卡密</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>确 定</Button>
            </Form.Item>
        </Form>
    </>
}