//
import { useEffect } from 'react';
import { useModel } from 'umi';
import { Row, Col, Form, Input, Radio, Select, Steps } from 'antd';
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
  };
  //
  useEffect(() => {
    if (!_status) return;
    SET({ M: { ...M, bl: '' } });
  }, [_status]);
  //
  return (
    <div className="xform" style={{ marginBottom: -22, width: 900 }}>
      <div className="p20 boe br5 mb24">
        <Steps size="small" current={0}>
          <Step title="Check Member ID" />
          <Step title="Agent Information" />
          <Step title="Finish" />
        </Steps>
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={(v) => onFormChange(v)}
      >
        <div style={{ padding: '30px 0 15px' }}>
          <Row>
            <Col span="8"></Col>
            <Col span="8">
              <Form.Item name="user_id" {...formStatus(_status, 'user_id')}>
                <Input addonBefore="Member ID" />
              </Form.Item>
            </Col>
            <Col span="8"></Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
