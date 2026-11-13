//
import { useEffect } from 'react';
import { useModel } from 'umi';
import { Row, Col, Form, Input, Button, Divider } from 'antd';
import { CategoryTypes, GameName, ___gamename } from '@/utils/game';
import { _game, _type, _numbers, _number, _odds } from '@/utils/gameData';
//
export default (props) => {
  //
  const DATA = useModel('data');
  const { SET, SEND, GameOdd } = DATA;
  const form = [...Form.useForm(), ...Form.useForm()];
  //
  const category = (GameOdd && GameOdd.category) || 'jnd';
  const type = (GameOdd && GameOdd.type) || CategoryTypes[category][0] || 28;
  //
  const __data = DATA && DATA['odd-' + category + '-' + type];
  // console.log(__data)
  //
  let __numbers = _numbers[type] || [];
  let __number = _number(type) || [];
  let __odds = _odds[type];
  //
  useEffect(() => {
    if (!__data) return;
    let _iv = {};
    for (let i in __data) {
      let v = __data[i];
      _iv['min-' + i] = v[0];
      _iv['max-' + i] = v[1];
      _iv['big-' + i] = v[2];
    }
    form[1].setFieldsValue(_iv);
  }, [__data]);
  useEffect(() => {
    SEND('game/oddget', { category, type });
  }, [category + '' + type]);
  //
  const dot2 = (e) => {
    e = e.toString();
    let _vvs = e.split('.');
    if (_vvs[1]) e = _vvs[0] + '.' + _vvs[1].substring(0, 2);
    e = parseFloat(e);
    return e;
  };
  //
  const AutoInput = (e) => {
    const _this_v = form[0].getFieldValue(e);
    if (!_this_v) return;
    let _iv = {};
    __number.map((v, k) => {
      if (e == 'big') {
        _iv[e + '-' + v] = parseInt(
          parseFloat(_this_v) / parseFloat(__odds[v]),
        );
      } else {
        _iv[e + '-' + v] = dot2(parseFloat(_this_v) * parseFloat(__odds[v]));
      }
    });
    form[1].setFieldsValue(_iv);
  };
  //
  const save = () => {
    const _vs = form[1].getFieldsValue();
    let _iv = {};
    __number.map((v, k) => {
      _iv[v] = [
        _vs['min-' + v] || 0,
        _vs['max-' + v] || 0,
        _vs['big-' + v] || 0,
      ];
    });
    SEND('game/oddset', { category, type, data: _iv });
  };
  //
  const __table = () => {
    if (category == 'jnd' && (type == 'nn' || type == 'nb'))
      return (
        <Form form={form[1]}>
          <Row gutter={16}>
            {__numbers.map((vv, kk) => (
              <Col key={kk} span={12}>
                <div className="table boe br5 ov" style={{ marginBottom: 20 }}>
                  <table className="hover" style={{ marginBottom: -1 }}>
                    <thead>
                      <tr>
                        <th>牛几</th>
                        <th>赢 - 赔数</th>
                        <th>输 - 赔数</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vv.map((v, k) => (
                        <tr key={k}>
                          <td width="130">
                            <b>牛 {___gamename(v)}</b>
                          </td>
                          <td>
                            <Form.Item name={'min-' + v} noStyle>
                              <Input />
                            </Form.Item>
                          </td>
                          <td>
                            <Form.Item name={'max-' + v} noStyle>
                              <Input />
                            </Form.Item>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Col>
            ))}
          </Row>
        </Form>
      );
    return (
      <Form form={form[1]}>
        <Row gutter={16}>
          {__numbers.map((vv, kk) => (
            <Col key={kk} span={12}>
              <div className="table boe br5 ov" style={{ marginBottom: 20 }}>
                <table className="hover" style={{ marginBottom: -1 }}>
                  <thead>
                    <tr>
                      <th>NUM</th>
                      <th width="100">Highest Odd</th>
                      <th>
                        <small>Lottery Odd - MIN</small>
                      </th>
                      <th>
                        <small>Lottery Odd - MAX</small>
                      </th>
                      <th>
                        <small>Single Bet - MAX</small>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vv.map((v, k) => (
                      <tr key={k}>
                        <td width="130">
                          <b>{___gamename(v)}</b>
                        </td>
                        <td>{(__odds && __odds[v]) || '-'}</td>
                        <td>
                          <Form.Item name={'min-' + v} noStyle>
                            <Input />
                          </Form.Item>
                        </td>
                        <td>
                          <Form.Item name={'max-' + v} noStyle>
                            <Input />
                          </Form.Item>
                        </td>
                        <td>
                          <Form.Item name={'big-' + v} noStyle>
                            <Input />
                          </Form.Item>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          ))}
        </Row>
      </Form>
    );
  };
  //
  return (
    <div className="tc bf br5 p16">
      <div style={{ marginBottom: -6 }}>
        <Row gutter={16}>
          {Object.keys(CategoryTypes).map((key) => (
            <Col>
              <Button
                block
                type={category == key ? 'primary' : ''}
                onClick={() => {
                  form[1].resetFields();
                  SET({
                    GameOdd: {
                      ...GameOdd,
                      category: key,
                      type: CategoryTypes[key][0],
                    },
                  });
                }}
              >
                {GameName(key, '')}
              </Button>
            </Col>
          ))}
        </Row>
      </div>
      <Divider />
      <div style={{ margin: '-8px 0' }}>
        <Row gutter={16}>
          {CategoryTypes[category].map((v, k) => (
            <Col>
              <Button
                block
                type={type == v ? 'primary' : ''}
                onClick={() => {
                  form[1].resetFields();
                  SET({ GameOdd: { ...GameOdd, type: v } });
                }}
              >
                {GameName(category, v)}
              </Button>
            </Col>
          ))}
        </Row>
      </div>
      <Divider />
      {type != 'nn' && type != 'nb' ? (
        <div style={{ margin: '-8px 0' }} className="aigaw">
          <Form form={form[0]}>
            <Row gutter={16}>
              <Col flex="1">
                <Form.Item name={'min'} noStyle>
                  <Input
                    placeholder="0.96"
                    addonBefore={<small>Lowest Odd</small>}
                    addonAfter={
                      <Button onClick={() => AutoInput('min')}>Fill</Button>
                    }
                  />
                </Form.Item>
              </Col>
              <Col flex="1">
                <Form.Item name={'max'} noStyle>
                  <Input
                    placeholder="0.96"
                    addonBefore={<small>Highest Odd</small>}
                    addonAfter={
                      <Button onClick={() => AutoInput('max')}>Fill</Button>
                    }
                  />
                </Form.Item>
              </Col>
              <Col flex="1">
                <Form.Item name={'big'} noStyle>
                  <Input
                    placeholder="10000000000"
                    addonBefore={<small>Max Win</small>}
                    addonAfter={
                      <Button onClick={() => AutoInput('big')}>Fill</Button>
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Divider />
        </div>
      ) : (
        ''
      )}

      <div style={{ margin: '-8px 0' }}>{__table()}</div>
      <Divider />
      <div style={{ paddingBottom: 10 }}>
        <Button
          size="large"
          type="primary"
          style={{ width: 200 }}
          loading={false}
          onClick={() => save()}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};
