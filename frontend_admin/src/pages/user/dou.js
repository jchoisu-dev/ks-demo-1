//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, DatePicker, Select } from 'antd';
import { nTom } from '@/utils/tool';
//
const { Option } = Select;
const { RangePicker } = DatePicker;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
//
export default (props) => {
  //
  const { SET, SEND, UserDouList, UserDouListLoading } = useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      UserDouList: [],
      UserDouListLoading: 1,
    });
    if (v && v['time']) {
      v['time_start'] = v['time'][0].format('YYYY-MM-DD HH:mm');
      v['time_end'] = v['time'][1].format('YYYY-MM-DD HH:mm');
      delete v['time'];
    }
    SEND('user_dou_log/list', v);
  };
  useEffect(() => getD(), []);
  //
  const types = {
    1: 'Bank Deposit',
    2: <b>Bank Withdrawal</b>,
    3: 'Game Bet',
    4: <b>Game Win</b>,
    5: <b>Agent Charge</b>,
    6: <b>Promotional Agent Charge Bonus</b>,

    51: 'Cancel Charge',
    //
    61: <b>Charge Bonus</b>,
    62: <b>Bet Bonus</b>,
    63: <b>Loss Bonus</b>,
    64: <b>Offline Bonus</b>,
    //
    65: <b>Daily VIP-Bonus</b>,
    66: <b>Daily Emergency</b>,
    67: <b>Leaderboard Bonus</b>,
    //

    71: <b>Withdrawal request denied</b>,
    //
    7: <b>Exch Exp.</b>,
    8: <b>Red Pocket</b>,
    9: 'CS Deduct',
    10: <b>Registration One Time Bonus</b>,
    11: <b>First Top Up one-time Bonus</b>,
  };
  const nums = (v) => {
    if (v[3] == 2) return <b>+ {(v[4] / 1000).toFixed(2)}</b>;
    return '- ' + (v[4] / 1000).toFixed(2);
  };
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form
          form={form}
          onFinish={(v) => getD(v)}
          initialValues={{
            type: '',
          }}
        >
          <Row gutter="16">
            <Col flex="220px">
              <Form.Item name="user_id" noStyle>
                <Input addonBefore="ID" />
              </Form.Item>
            </Col>
            <Col flex="250px">
              <Form.Item name="type" noStyle>
                <Select name="type" style={{ width: '100%' }}>
                  <Option value="">Select Flow</Option>
                  {Object.keys(types).map((k) => (
                    <Option key={k} value={k}>
                      {types[k]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col flex="400px">
              <Form.Item name="time" noStyle>
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                />
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={UserDouListLoading}
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
            ['ID', (v) => <MUSER t={v[0]} />],
            ['Name'],
            ['Mode', (v) => types[v[2]]],
            ['Amount', (v) => nums(v)],
            ['Balance', (v) => (v[5] / 1000).toFixed(2)],
            // [ 'Description',(v)=>v[6] ],
            ['Time', (v) => v[7]],
          ]}
          data={UserDouList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
