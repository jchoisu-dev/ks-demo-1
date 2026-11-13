//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import { nTom, mTon, formValue } from '@/utils/tool';
//
const { Option } = Select;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
//
export default (props) => {
  //
  const { SET, SEND, AgentDouList, AgentDouLoading } = useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      AgentDouList: [],
      AgentDouLoading: 1,
    });
    SEND('agent_dou/list', v);
  };
  useEffect(() => {
    getD();
  }, []);
  //
  const types = {
    1: 'Member Charge',
    11: <b>Charge Cancel</b>,
    2: <b>Withdrawal</b>,
    3: 'Transfer Out',
    31: <b>Transfer Result</b>,
    5: <b>Customer Service Charge</b>,
    6: 'Bean Transfer',
    61: <b>Withdrawal Cancel</b>,
    //
    64: <b>Rebate Bonus</b>,
  };
  const nums = (v) => {
    if (v[4] == 2) return <b>+ {(v[5] / 1000).toFixed(2)}</b>;
    return '- ' + (v[5] / 1000).toFixed(2);
  };
  //
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
            <Col flex="250px">
              <Form.Item name="_agent_id" noStyle>
                <Input addonBefore="Agent ID" />
              </Form.Item>
            </Col>
            <Col flex="300px">
              <Form.Item name="type" noStyle>
                <Select name="type" style={{ width: '100%' }}>
                  <Option value="">Select</Option>
                  {Object.keys(types).map((k) => (
                    <Option key={k} value={k}>
                      {types[k]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={AgentDouLoading}
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
            ['Date'],
            ['Agent ID'],
            ['Agent Name'],
            ['Type', (v) => types[v[3]]],
            ['Amount', (v) => nums(v)],
            ['Balance', (v) => nTom(v[6])],
            ['Description', (v) => v[7]],
          ]}
          data={AgentDouList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
