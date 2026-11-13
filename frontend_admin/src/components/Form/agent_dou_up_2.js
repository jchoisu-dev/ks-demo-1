//
import { useEffect } from 'react';
import { useModel } from 'umi';
import { Row, Col, Form, Input, Radio, Select, Button, Steps } from 'antd';
import { nTom, mTon, nToz, formStatus, formFieldChange } from '@/utils/tool';
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
    if (v['money']) v['money'] = nTom(mTon(v['money']));
    form.setFieldsValue({ ...v });
    SET({ M: { ...M, money: mTon(v.money) } });
  };
  const onFieldsChange = (v) => {
    // console.log(v);
  };
  const moneyAdd = (v) => {
    let money = mTon(v);
    const _m = form.getFieldsValue()['money'];
    if (_m) money = money + mTon(_m);
    form.setFieldsValue({ money: nTom(money) });
    SET({ M: { ...M, money: mTon(money) } });
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
        <Steps size="small" current={1}>
          <Step title="Check Agent ID" />
          <Step title="Bean Amount" />
          <Step title="Confirm" />
        </Steps>
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={(v) => onFormChange(v)}
        onFieldsChange={(v) => onFieldsChange(v)}
      >
        <div style={{ padding: '30px 0 15px' }}>
          <Row gutter="30">
            <Col span="8">
              <Form.Item name="agent_id">
                <Input addonBefore="Agent ID" disabled />
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item name="nick">
                <Input addonBefore="Agent Name" disabled />
              </Form.Item>
            </Col>
            <Col span="8">
              <Form.Item name="dou">
                <Input addonBefore="Bean" disabled />
              </Form.Item>
            </Col>
          </Row>
          <div style={{ padding: '10px 0 30px' }}>
            <Row gutter="20" justify="center">
              {[1000, 10000, 20000, 50000, 100000].map((v, k) => (
                <Col key={k}>
                  <Button onClick={() => moneyAdd(v)}>{nTom(v)} $</Button>
                </Col>
              ))}
              <Col>
                <Button
                  onClick={() => {
                    form.setFieldsValue({ money: 0 });
                    SET({ M: { ...M, money: 0 } });
                  }}
                >
                  Clear
                </Button>
              </Col>
            </Row>
          </div>
          <Row>
            <Col span="6"></Col>
            <Col span="12">
              <Form.Item name="money" {...formStatus(_status, 'money')}>
                <Input
                  addonBefore="Charge"
                  addonAfter={M && M.money && nToz(M.money) + ' $'}
                />
              </Form.Item>
            </Col>
            <Col span="6"></Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
