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
                <Input 
                    addonBefore="账号" 
                />
            </Form.Item>
            <Form.Item name="perent">
                <Input 
                    addonBefore="账号" 
                />
            </Form.Item>
            <Form.Item name="user_id">
                <Input 
                    addonBefore="昵称" 
                />
            </Form.Item>
            <Form.Item name="user">
                <Input 
                    addonBefore="手机" 
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>确 定</Button>
            </Form.Item>
        </Form>
    </>
}