//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, Radio } from 'antd';
import { nTom, mTon, nToz, formStatus, formFieldChange } from '@/utils/tool';
//
export default (props) => {
  const { form, onFinish, status } = props;
  const DATA = useModel('data');
  const { SET, M, AdminDouUpKf } = DATA;
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
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={(v) => onFormChange(v)}
      >
        <div style={{ padding: '15px 0 15px' }}>
          <Form.Item name="_admin_id">
            <Radio.Group name="_admin_id" buttonStyle="solid">
              <Radio.Button value="" disabled>
                Choose User
              </Radio.Button>
              {AdminDouUpKf &&
                AdminDouUpKf.map((v, k) => (
                  <Radio.Button value={v[0]} key={k}>
                    {v[1]}
                  </Radio.Button>
                ))}
            </Radio.Group>
          </Form.Item>
          <div style={{ padding: '10px 0 30px' }}>
            <Row gutter="20" justify="center">
              {[100000, 500000, 1000000, 5000000].map((v, k) => (
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
