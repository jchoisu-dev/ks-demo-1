//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import { nTom } from '../../utils/tool';
//
const { Option } = Select;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
//
export default (props) => {
  //
  const { SET, SEND, AgentEdzyList, AgentEdzyLoading } = useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      AgentEdzyList: [],
      AgentEdzyLoading: 1,
    });
    SEND('agent_edzy/list', v);
  };
  useEffect(() => {
    getD();
  }, []);
  //
  const status = {
    1: 'To Receive',
    2: 'To be Confirmed',
    3: <b>Completed</b>,
    4: 'Cancelled',
  };
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form
          form={form}
          onFinish={(v) => getD(v)}
          initialValues={{
            status: '',
          }}
        >
          <Row gutter="16">
            <Col flex="220px">
              <Form.Item name="perent" noStyle>
                <Input addonBefore="Sender ID" />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="user" noStyle>
                <Input addonBefore="Receiver ID" />
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item name="status" noStyle>
                <Select name="status" style={{ width: '100%' }}>
                  <Option value="">Select</Option>
                  {Object.keys(status).map((k) => (
                    <Option key={k} value={k}>
                      {status[k]}
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
                  loading={AgentEdzyLoading}
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
            ['Sender ID'],
            ['Sender Name'],
            ['Receiver ID'],
            ['Receiver Name'],
            ['Transfer Amount', (v) => nTom(v[5]) + ' $'],
            ['Status', (v) => status[v[6]]],
          ]}
          data={AgentEdzyList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
