//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, Radio } from 'antd';
import { nTom, mTon, nToz, formStatus, formFieldChange } from '@/utils/tool';
//
const BlockLoading = dynamic({
  loader: () => import('@/components/Loading/BlockLoading'),
});
//
export default (props) => {
  const DATA = useModel('data');
  const { SET, SEND, M, MdataUserd, KcModes, KcLoading } = DATA;
  const [form] = Form.useForm();
  //
  const { id, nick, dou, bank } = MdataUserd || {};
  //
  let _status = DATA && DATA['KcStatus'];
  //
  useEffect(() => {
    form.resetFields();
    SET({ KcStatus: '', KcModes: 'dou', KcLoading: false });
  }, []);
  //
  const onFormChange = (v) => {
    SET({ KcStatus: '' });
    let _m = mTon(v['money']);
    _m = Math.abs(_m);
    moneySet(_m);
  };
  const moneyAdd = (v) => {
    SET({ KcStatus: '' });
    let money = mTon(v);
    let _m = form.getFieldsValue()['money'];
    if (_m) money = money + mTon(_m);
    moneySet(money);
  };
  const moneySet = (m) => {
    const _max = getMaxDou();
    if (m > _max) {
      SET({
        KcStatus: { money: { s: 'error', h: '超过可扣除范围，请修改！' } },
      });
      m = _max;
    }
    form.setFieldsValue({ money: nTom(m) });
  };
  const onFinish = (v) => {
    let { money } = v || {};
    if (!money || money == 'undefined' || money <= 0) {
      SET({ KcStatus: { money: { s: 'error', h: '请输入正确的金豆！' } } });
      return;
    }
    money = mTon(money);
    money = parseInt(money);
    //
    SET({ KcLoading: 1 });
    SEND('mdata/user_kc', { dou: money, _user_id: id, mode: KcModes || 'dou' });
  };
  //
  useEffect(() => {
    if (!_status) return;
    SET({ M: { ...M, bl: '' } });
  }, [_status]);
  //
  const _modes = {
    dou: 'Balance Amount',
    bank: 'Bank Amount',
  };
  //
  const getMaxDou = () => {
    const mode = KcModes || 'dou';
    //
    if (MdataUserd) {
      let money = dou || 0;
      if (mode == 'bank') money = bank || 0;
      return money;
    }
    return 0;
  };
  //
  const allClick = () => form.setFieldsValue({ money: nTom(getMaxDou()) });
  //
  return (
    <div className="xform" style={{ marginBottom: -22, width: 1000 }}>
      <BlockLoading m={'30px 0 20px'}>
        <div style={{ padding: '10px 0 0' }}>
          <Radio.Group
            options={[
              { label: 'Deduct - Balance', value: 'dou' },
              { label: 'Deduct - Bank', value: 'bank' },
            ]}
            onChange={(e) => {
              SET({ KcModes: e.target.value });
              form.setFieldsValue({ money: 0 });
            }}
            value={KcModes}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
        <div style={{ padding: '20px 0 0' }}>
          <Row gutter="20">
            <Col flex="1">
              <Input addonBefore="Member ID" value={id || '-'} readOnly />
            </Col>
            <Col flex="1">
              <Input addonBefore="Member Name" value={nick || '-'} readOnly />
            </Col>
            <Col flex="1">
              <Input
                addonBefore="Balance"
                value={(dou && nTom(dou)) || '-'}
                readOnly
              />
            </Col>
            <Col flex="1">
              <Input
                addonBefore="Bank"
                value={(MdataUserd && nTom(MdataUserd.bank)) || '-'}
                readOnly
              />
            </Col>
          </Row>
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          onValuesChange={(v) => onFormChange(v)}
        >
          <div style={{ padding: '20px 0' }}>
            <div style={{ padding: '20px 0 30px' }}>
              <Row gutter="20" justify="center">
                <Col>
                  <Button onClick={() => allClick()}>All</Button>
                </Col>
                {[1000, 10000, 100000, 1000000, 10000000].map((v, k) => (
                  <Col key={k}>
                    <Button onClick={() => moneyAdd(v)}>{nTom(v)} 豆</Button>
                  </Col>
                ))}
                <Col>
                  <Button
                    onClick={() => {
                      form.setFieldsValue({ money: 0 });
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
                  <Input addonBefore={_modes[KcModes || 'dou']} />
                </Form.Item>
              </Col>
              <Col span="6"></Col>
            </Row>
            <div style={{ padding: '10px 0 0px' }}>
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={KcLoading}
                >
                  Confirm Deduction - {_modes[KcModes || 'dou']}
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </BlockLoading>
    </div>
  );
};
