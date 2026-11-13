//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Cascader,
  DatePicker,
  Select,
} from 'antd';
import { CategoryTypes, GameName, ___gamename } from '@/utils/game';
import { nTom, __urlname } from '@/utils/tool';
//
const { Option } = Select;
const { RangePicker } = DatePicker;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
const MLOTTERY = dynamic({
  loader: () => import('@/components/Mdata/lottery'),
});
//
export default (props) => {
  //
  const { SET, SEND, UserBetList, UserBetListLoading } = useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      UserBetList: [],
      UserBetListLoading: true,
    });
    if (v && v['time']) {
      v['time_start'] = v['time'][0].format('YYYY-MM-DD HH:mm');
      v['time_end'] = v['time'][1].format('YYYY-MM-DD HH:mm');
      delete v['time'];
    }
    SEND('user_bet/list', v);
  };
  useEffect(() => getD(), []);
  //
  const tabx = (k) => {
    if (k == 2) return <b>Automatic</b>;
    return 'Manual';
  };
  const windou = (a, b) => {
    if (!b || b < 0) return '-';
    const c = parseInt(b - a);
    if (c < 0) return (c / 1000).toFixed(2);
    return <b>{((b - a) / 1000).toFixed(2)}</b>;
  };
  const status = (s) => {
    if (s == 2) return <b>WIN</b>;
    if (s == 3) return 'LOSE';
    return 'PENDING';
  };
  const ls = {
    1: 'Yes',
    2: <b>No</b>,
  };
  const _gamelist = [];
  for (let i in CategoryTypes) {
    const _cti = CategoryTypes[i];
    let children = [];
    for (let j in _cti) {
      children.push({
        value: _cti[j],
        label: _cti[j],
      });
    }
    _gamelist.push({
      value: i,
      label: GameName(i, ''),
      children,
    });
  }
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form
          form={form}
          onFinish={(v) => getD(v)}
          initialValues={{
            status: '',
            jc: '',
          }}
        >
          <Row gutter="16">
            <Col flex="220px">
              <Form.Item name="user_id" noStyle>
                <Input addonBefore="ID" />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="game" noStyle>
                <Cascader
                  options={_gamelist}
                  placeholder="Select Game"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="peroids" noStyle>
                <Input addonBefore="Period" />
              </Form.Item>
            </Col>
            <Col flex="380px">
              <Form.Item name="time" noStyle>
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                />
              </Form.Item>
            </Col>
            <Col flex="200px">
              <Form.Item name="status" noStyle>
                <Select name="status" style={{ width: '100%' }}>
                  <Option value="">Status</Option>
                  <Option value="1">Pending</Option>
                  <Option value="2">Win</Option>
                  <Option value="3">Lose</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col flex="140px">
              <Form.Item name="jc" noStyle>
                <Select name="jc" style={{ width: '100%' }}>
                  <Option value="">Detect</Option>
                  <Option value="1">Normal</Option>
                  <Option value="2">
                    <b>Abnormal</b>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={UserBetListLoading}
                >
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="boe br5 ov">
        <Table
          tableClass={'hover'}
          columns={[
            ['#'],
            ['ID', (v) => <MUSER t={v[1]} />],
            ['Name'],
            ['Mode', (v) => tabx(v[3])],
            ['Game', (v) => __urlname(v[4])],
            ['Period', (v) => <MLOTTERY u={v[1]} n={v[2]} g={v[4]} p={v[5]} />],
            ['LS', (v) => ls[v[10]]],
            ['Bet Amount', (v) => v[6] / 1000],
            ['Profit', (v) => windou(v[6], v[7])],
            ['Status', (v) => status(v[8])],
            ['Time', (v) => v[9]],
          ]}
          data={UserBetList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
