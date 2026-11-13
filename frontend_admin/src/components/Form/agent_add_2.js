//
import { useEffect } from 'react';
import { useModel } from 'umi';
import { Row, Col, Form, Input, Radio, Steps, Select } from 'antd';
import { nTom, mTon, formStatus, formFieldChange } from '@/utils/tool';
//
const { Step } = Steps;
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
    // if(v['up_rate']) v['up_rate'] = parseFloat(v['up_rate'])||0.985;
    // if(v['down_rate']) v['down_rate'] = parseFloat(v['down_rate'])||0.985;
    if (v['up_max']) v['up_max'] = nTom(mTon(v['up_max']));
    form.setFieldsValue({ ...v });
  };
  //
  useEffect(() => {
    if (!_status) return;
    SET({ M: { ...M, bl: '' } });
  }, [_status]);
  //
  const _selects = [
    1, 0.99, 0.995, 0.98, 0.985, 0.97, 0.975, 0.96, 0.965, 0.95, 0.955, 0.94,
    0.945,
  ];
  const _select_show = (e, t) => {
    if (e == 1) return t + 'No Comission';
    return (
      <>
        {t} <b>{e * 100}</b>
      </>
    );
  };
  //
  return (
    <div className="xform" style={{ marginBottom: -22, width: 900 }}>
      <div className="p20 boe br5 mb24">
        <Steps size="small" current={1}>
          <Step title="Check Member ID" />
          <Step title="Agent Information" />
          <Step title="Confirm" />
        </Steps>
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={(v) => onFormChange(v)}
      >
        <div>
          <Row gutter={30}>
            <Col span="8">
              <Form.Item name="user_id">
                <Input addonBefore="Member ID" disabled />
              </Form.Item>
              <Form.Item name="user">
                <Input addonBefore="Account" disabled />
              </Form.Item>
              <Form.Item name="exp">
                <Input addonBefore="Experience" disabled />
              </Form.Item>
              <Form.Item name="dou">
                <Input addonBefore="Beans" disabled />
              </Form.Item>
              <Form.Item name="bank">
                <Input addonBefore="Bank" disabled />
              </Form.Item>
              <Form.Item name="des" {...formStatus(_status, 'des')}>
                <Input addonBefore="Signature" />
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item name="nick" {...formStatus(_status, 'nick')}>
                <Input addonBefore="Name" />
              </Form.Item>
              <Form.Item name="qq" {...formStatus(_status, 'qq')}>
                <Input addonBefore="QQ" />
              </Form.Item>
              <Form.Item name="wx" {...formStatus(_status, 'wx')}>
                <Input addonBefore="Wechat" />
              </Form.Item>
              <Form.Item name="name" {...formStatus(_status, 'name')}>
                <Input addonBefore="Full Name" />
              </Form.Item>
              <Form.Item name="calling" {...formStatus(_status, 'calling')}>
                <Input addonBefore="Country Code" />
              </Form.Item>
              <Form.Item name="phone" {...formStatus(_status, 'phone')}>
                <Input addonBefore="Phone" />
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item name="ph" {...formStatus(_status, 'ph')}>
                <Input addonBefore="PH" addonAfter="$" placeholder="1000000" />
              </Form.Item>
              <Form.Item name="pass" {...formStatus(_status, 'pass')}>
                <Input addonBefore="Password" />
              </Form.Item>
              <Form.Item name="up_rate" {...formStatus(_status, 'up_rate')}>
                <Select>
                  {_selects.map((v, k) => (
                    <Select.Option key={k} value={v}>
                      {_select_show(v, 'UP')}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="down_rate" {...formStatus(_status, 'down_rate')}>
                <Select>
                  {_selects.map((v, k) => (
                    <Select.Option key={k} value={v}>
                      {_select_show(v, 'DOWN')}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="up_max" {...formStatus(_status, 'up_max')}>
                <Input
                  addonBefore="Max Charge"
                  addonAfter="豆"
                  placeholder="100,000"
                />
              </Form.Item>
              <Form.Item name="cs">
                <Radio.Group name="cs" buttonStyle="solid">
                  <Radio.Button value="1">Hidden</Radio.Button>
                  <Radio.Button value="2">Reveal</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="status">
                <Radio.Group name="status" buttonStyle="solid">
                  <Radio.Button value="1">Normal</Radio.Button>
                  <Radio.Button value="2">Frozen</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
