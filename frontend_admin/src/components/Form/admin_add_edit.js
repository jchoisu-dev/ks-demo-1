//
import { useEffect } from 'react';
import { useModel } from 'umi';
import { Row, Col, Form, Input, Radio } from 'antd';
import { nTom, mTon, formStatus, formFieldChange } from '@/utils/tool';
//
export default (props) => {
  const { form, onFinish, status } = props;
  const DATA = useModel('data');
  const { SET, M } = DATA;
  //
  let _status = DATA && DATA[status];
  //
  const onFormChange = (v) => {
    let _k = Object.keys(v)[0];
    formFieldChange(SET, _status, _k);
    //
    if (v['dou']) v['dou'] = nTom(mTon(v['dou']));
    if (v['up_max']) v['up_max'] = nTom(mTon(v['up_max']));
    form.setFieldsValue({ ...v });
  };
  //
  useEffect(() => {
    if (!_status) return;
    SET({ M: { ...M, bl: '' } });
  }, [_status]);
  //
  return (
    <div className="xform" style={{ marginBottom: -22 }}>
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={(v) => onFormChange(v)}
      >
        <div>
          <Row gutter={30}>
            <Col span="12">
              <Form.Item name="user" {...formStatus(_status, 'user')}>
                <Input addonBefore="Account" />
              </Form.Item>
              <Form.Item name="nick" {...formStatus(_status, 'nick')}>
                <Input addonBefore="Name" />
              </Form.Item>
              <Form.Item name="calling" {...formStatus(_status, 'calling')}>
                <Input addonBefore="Country Code" />
              </Form.Item>
              <Form.Item name="phone" {...formStatus(_status, 'phone')}>
                <Input addonBefore="Phone" />
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item name="pass" {...formStatus(_status, 'pass')}>
                <Input addonBefore="Password" />
              </Form.Item>
              {/* <Form.Item 
                            name="up_max" 
                            {...formStatus(_status,'up_max')}
                        >
                            <Input 
                                addonBefore="Max Charge" 
                                addonAfter="豆"
                            />
                        </Form.Item> */}
              <Form.Item name="role">
                <Radio.Group name="role" buttonStyle="solid">
                  <Radio.Button value="1">IT</Radio.Button>
                  <Radio.Button value="2">Customer Service</Radio.Button>
                  <Radio.Button value="3">Manager</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="status" noStyle>
                <Radio.Group name="status" buttonStyle="solid">
                  <Radio.Button value="1">Normal</Radio.Button>
                  <Radio.Button value="2">Banned</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
