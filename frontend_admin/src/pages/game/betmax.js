//
import { useEffect } from 'react';
import { useModel } from 'umi';
import { Row, Col, Form, Input, Button, Divider, Radio } from 'antd';
import { CategoryTypes, GameName, ___gamename } from '@/utils/game';
import { _game, _type, _numbers, _number, _odds } from '@/utils/gameData';
//
// SysMaxbet:
// au-wh: 1
// au-xg: 50000000
// bj-wh: 1
// bj-xg: 50000000
// btc-wh: 1
// btc-xg: 50000000
// dd-wh: 1
// dd-xg: 50000000
// elg-wh: 1
// elg-xg: 50000000
// jnc-wh: 1
// jnc-xg: 50000000
// jnd-wh: 1
// jnd-xg: 50000000
// kr-wh: 1
// kr-xg: 50000000
// pk-wh: 1
// pk-xg: 50000000
// q28-wh: 1
// q28-xg: 50000000
// q214-wh: 1
// q214-xg: 50000000
// slfk-wh: 1
// slfk-xg: 50000000
//
export default (props) => {
  //
  const DATA = useModel('data');
  const { SET, SEND, SysMaxbet, SysMaxbetLoading } = DATA;
  const [form] = Form.useForm();
  //
  useEffect(() => {
    SET({ SysMaxbetLoading: 1 });
    SEND('game/getbetmax');
  }, []);
  useEffect(() => {
    form.setFieldsValue(SysMaxbet);
  }, [SysMaxbet]);
  //
  const save = () => {
    let _vs = form.getFieldsValue();
    Object.keys(CategoryTypes).map((k) => {
      _vs[k + '-wh'] = (_vs[k + '-wh'] && parseInt(_vs[k + '-wh'])) || 1;
      _vs[k + '-xg'] = (_vs[k + '-xg'] && parseInt(_vs[k + '-xg'])) || 50000000;
    });
    SET({ SysMaxbetLoading: 1 });
    // console.log(_vs);
    SEND('game/setbetmax', { data: _vs });
  };
  //
  return (
    <div className="tc bf br5 p16">
      <h3>Maximum Betting</h3>
      <Divider />
      <Form form={form}>
        <Row gutter={20}>
          {Object.keys(CategoryTypes).map((key) => (
            <Col span={6} key={key}>
              <div className="kxx">
                <h4>{GameName(key, '')}</h4>
                <Form.Item name={key + '-wh'}>
                  <Radio.Group buttonStyle="solid">
                    <Radio.Button value={1}>Operational</Radio.Button>
                    <Radio.Button value={2}>Maintenance</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name={key + '-xg'} noStyle>
                  <Input addonBefore="Maximum" addonAfter="豆" />
                </Form.Item>
              </div>
            </Col>
          ))}
        </Row>
      </Form>
      <Divider />
      <div style={{ padding: '15px 0 20px' }}>
        <Button
          size="large"
          type="primary"
          style={{ width: 200 }}
          loading={SysMaxbetLoading}
          onClick={() => save()}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};
