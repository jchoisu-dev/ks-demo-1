//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Radio, Form, Input, Button, Checkbox } from 'antd';
//
export default (props) => {
  const { SET, SEND, Login, AuthLoading, A } = useModel('data');
  const [form] = Form.useForm();
  //
  const onFinish = (v) => {};
  const onFormChange = (v) => {};
  //
  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={(v) => onFormChange(v)}
      >
        <Row gutter="30">
          <Col span="8">
            <Form.Item name="perent">
              <Input addonBefore="手机号码" />
            </Form.Item>
          </Col>
          <Col span="8">
            <Form.Item name="user_id">
              <Input addonBefore="昵称" />
            </Form.Item>
            <Form.Item name="user">
              <Input addonBefore="简介" />
            </Form.Item>
            <Form.Item name="user">
              <Input addonBefore="QQ" />
            </Form.Item>
            <Form.Item name="user">
              <Input addonBefore="微信" />
            </Form.Item>
          </Col>
          <Col span="8">
            <Form.Item name="user">
              <Input addonBefore="上分折扣" />
            </Form.Item>
            <Form.Item name="user">
              <Input addonBefore="下分折扣" />
            </Form.Item>
            <Form.Item name="user">
              <Input addonBefore="铺货金额" addonAfter="$" />
            </Form.Item>
            <Form.Item name="user">
              <Input addonBefore="最大上分" />
            </Form.Item>
          </Col>
          {/* <Form.Item name="user">
                    <Checkbox>正常</Checkbox>
                    <Checkbox>冻结</Checkbox>
                </Form.Item> */}
          {/* <Form.Item name="user">
                    <Input 
                        addonBefore="会员ID"
                    />
                </Form.Item> */}
        </Row>
      </Form>
    </>
  );
};
