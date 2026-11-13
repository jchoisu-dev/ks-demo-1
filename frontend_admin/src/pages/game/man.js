//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Divider,
  Checkbox,
  Radio,
  DatePicker,
} from 'antd';
import moment from 'moment';
// import { nTom,mTon } from '@/utils/tool';
const Ygz = dynamic({ loader: () => import('@/components/Form/setting/ygz') });
const Scfl = dynamic({ loader: () => import('@/components/Form/setting/sc') });
const Ksfl = dynamic({ loader: () => import('@/components/Form/setting/ks') });
//
const Other = dynamic({
  loader: () => import('@/components/Form/setting/other'),
});
const BtcKill = dynamic({
  loader: () => import('@/components/Form/setting/killbtc'),
});
const KrKill = dynamic({
  loader: () => import('@/components/Form/setting/killkr'),
});
const AuKill = dynamic({
  loader: () => import('@/components/Form/setting/killau'),
});
//
const Occ = dynamic({ loader: () => import('@/components/Form/setting/occ') });
const Member = dynamic({
  loader: () => import('@/components/Form/setting/member'),
});
const NewComers = dynamic({
  loader: () => import('@/components/Form/setting/newcomers'),
});
//
export default (props) => {
  const { SET, SEND, Settings, SettingLoading } = useModel('data');
  const form = [
    ...Form.useForm(),
    ...Form.useForm(),
    ...Form.useForm(),
    ...Form.useForm(),
    ...Form.useForm(),
    ...Form.useForm(),
    ...Form.useForm(),
    //
    ...Form.useForm(), // 7 other
    ...Form.useForm(), // 8 killbtc
    ...Form.useForm(), // 9 killkr
    ...Form.useForm(), // 10 killau
    //
    ...Form.useForm(), // 11 wallet
    ...Form.useForm(), // 12 occasion
    ...Form.useForm(), // 13 new member registration
    ...Form.useForm(), // 14 new comers
  ];
  //
  useEffect(() => {
    SET({
      Settings: '',
      SettingLoading: 1,
    });
    SEND('game/setting_get');
  }, []);
  useEffect(() => {
    if (!Settings) return;
    const _arr = [
      'GameSet',
      'PhbjlSet',
      'HdflScfl',
      'HdflKsfl',
      'HdflYgz',
      'HdflTzfl',
      'HdflXxfl',
      'settingother',
      'KillBtc',
      'KillKr',
      'KillAu',
      'WalletSet',
      'HdflDl',
      'HdZc',
      'HdFirstCharge',
    ];
    //
    for (let i in _arr) {
      if (Settings[_arr[i]])
        form[i].setFieldsValue({ ...timeBack(Settings[_arr[i]]) });
    }
  }, [Settings]);
  //
  var phblist = Array.from(Array(30), (v, k) => k);
  //
  const setGo = (name, data) => {
    SET({ SettingLoading: 1 });
    SEND('game/setting_set', {
      name,
      data,
    });
    // console.log(name,data)
  };
  const timeBack = (v) => {
    let _r = {};
    for (let i in v) {
      let _vi = v[i];
      if (['start_time', 'end_time'].find((v) => v == i)) {
        _r[i] = moment(_vi, 'YYYY-MM-DD');
      } else {
        _r[i] = _vi;
      }
    }
    return _r;
  };
  const timeChange = (v) => {
    return {
      ...v,
      start_time: v['start_time'].format('YYYY-MM-DD'),
      end_time: v['end_time'].format('YYYY-MM-DD'),
    };
  };
  const PhbSet = (e) => {
    let _pk = {};
    for (let i = 1; i < 31; i++) {
      if (i >= e) {
        _pk['pk' + i] = true;
      } else {
        _pk['pk' + i] = false;
      }
    }
    // console.log(_pk);
    form[1].setFieldsValue(_pk);
  };
  //
  const killArray = [
    <BtcKill form={form[8]} setGo={setGo} timeChange={timeChange} />,
    <KrKill form={form[9]} setGo={setGo} timeChange={timeChange} />,
    <AuKill form={form[10]} setGo={setGo} timeChange={timeChange} />,
    <Other form={form[7]} setGo={setGo} timeChange={timeChange} />,
  ];
  console.log(Settings && Settings);
  //
  return (
    <div className="tc">
      <div className="mb10">
        <Row gutter="10">
          <Col span="6">
            <div className="bf p16 br5 mb10" style={{ height: 499 }}>
              <h3>Game Betting Quota</h3>
              <Divider />
              <Form form={form[0]} onFinish={(data) => setGo('GameSet', data)}>
                <Form.Item name="min-bet">
                  <Input addonBefore="Minimim Bet" addonAfter="豆" />
                </Form.Item>
                {/* <Form.Item name="max-bet">
                                <Input addonBefore="Maximum Bet" addonAfter="豆" />
                            </Form.Item> */}
                <Form.Item name="max-open">
                  <Input addonBefore="Maximum Win" addonAfter="豆" />
                </Form.Item>
                <Divider />
                <Form.Item>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={SettingLoading}
                  >
                    Confirm
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className="bf p16 br5" style={{ height: 270 }}>
              <h3>Wallet Sender Credentials</h3>
              <Divider />
              <Form
                form={form[11]}
                onFinish={(data) => setGo('WalletSet', data)}
              >
                <Form.Item name="wallet">
                  <Input addonBefore="Wallet" />
                </Form.Item>
                <Form.Item name="priv_key">
                  <Input.Password type="" addonBefore="Priv-K" />
                </Form.Item>
                <Form.Item>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={SettingLoading}
                  >
                    Confirm
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col span="18">
            <div className="bf p16 br5">
              <h3>Leaderboard Rewards</h3>
              <Divider />
              <Form form={form[1]} onFinish={(data) => setGo('PhbjlSet', data)}>
                <Row gutter="30">
                  {phblist.map((v, k) => (
                    <Col span="4" key={k}>
                      <Row gutter="16">
                        <Col>
                          <Form.Item
                            name={'pk' + (v + 1)}
                            valuePropName="checked"
                          >
                            <Checkbox onClick={() => PhbSet(v + 1)} />
                          </Form.Item>
                        </Col>
                        <Col flex="auto">
                          <Form.Item name={'p' + (v + 1)}>
                            <Input
                              addonBefore={
                                <div
                                  className="cu"
                                  onClick={() => PhbSet(v + 1)}
                                >
                                  <b>{v + 1}</b>
                                </div>
                              }
                              placeholder="100"
                              style={{ width: '150px' }}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </Row>
                <Divider />
                <Form.Item>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={SettingLoading}
                  >
                    Confirm
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter="10">
          {killArray.map((v, k) => (
            <Col flex="1" key={k}>
              {v}
            </Col>
          ))}
        </Row>
      </div>
      <div className="mb10">
        <Row gutter="10">
          <Col span="5">
            <Scfl form={form[2]} setGo={setGo} timeChange={timeChange} />
          </Col>
          <Col span={5}>
            <Ksfl form={form[3]} setGo={setGo} timeChange={timeChange} /> ,
          </Col>
          <Col span="5">
            <Ygz form={form[4]} setGo={setGo} timeChange={timeChange} />
          </Col>
          <Col span="5">
            <div className="bf p16 br5 h-full">
              <h3>Bet Bonus</h3>
              <Divider />
              <Form
                form={form[5]}
                onFinish={(data) => setGo('HdflTzfl', timeChange(data))}
              >
                <Form.Item name="ls">
                  <Input addonBefore="Effective" addonAfter="x" />
                </Form.Item>
                <Form.Item name="odd">
                  <Input addonBefore="Bonus" addonAfter="%" />
                </Form.Item>
                <Form.Item name="max">
                  <Input addonBefore="Max Bonus" addonAfter="豆" />
                </Form.Item>
                <Form.Item name="start_time" label="Start">
                  <DatePicker onChange={() => {}} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="end_time" label="End">
                  <DatePicker onChange={() => {}} style={{ width: '100%' }} />
                </Form.Item>
                <Divider />
                <Form.Item>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={SettingLoading}
                  >
                    Confirm
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col span="4">
            <div className="bf p16 br5 h-full">
              <h3>Offline Bonus</h3>
              <Divider />
              <Form
                form={form[6]}
                onFinish={(data) => setGo('HdflXxfl', timeChange(data))}
              >
                <Form.Item name="dou">
                  <Input addonBefore="Offline Bet" addonAfter="豆" />
                </Form.Item>
                <Form.Item name="odd">
                  <Input addonBefore="Bonus" addonAfter="%" />
                </Form.Item>
                <Form.Item name="max">
                  <Input addonBefore="Max Bonus" addonAfter="豆" />
                </Form.Item>
                <Form.Item name="start_time" label="Start">
                  <DatePicker onChange={() => {}} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="end_time" label="End">
                  <DatePicker onChange={() => {}} style={{ width: '100%' }} />
                </Form.Item>
                <Divider />
                <Form.Item>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    loading={SettingLoading}
                  >
                    Confirm
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter="10">
          <Col span="5">
            <Occ form={form[12]} setGo={setGo} timeChange={timeChange} />
          </Col>
          <Col span="5">
            <Member form={form[13]} setGo={setGo} timeChange={timeChange} />
          </Col>
          <Col span="5">
            <NewComers form={form[14]} setGo={setGo} timeChange={timeChange} />
          </Col>
        </Row>
      </div>
    </div>
  );
};
