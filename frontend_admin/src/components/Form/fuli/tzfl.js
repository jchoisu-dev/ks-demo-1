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
                    addonAfter="倍"
                />
            </Form.Item>
            <Form.Item name="user_id">
                <Input 
                    addonAfter="%"
                />
            </Form.Item>
            <Form.Item name="user">
                <Input 
                    addonAfter="金豆"
                />
            </Form.Item>
            <Form.Item name="perent">
                开始时间：<DatePicker />
            </Form.Item>
            <Form.Item name="user_id">
                结束时间：<DatePicker />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>确 定</Button>
            </Form.Item>
        </Form>
    </>
}