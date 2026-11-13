//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, Select, DatePicker } from 'antd';
import { nTom } from '@/utils/tool';
//
const { Option } = Select;
const { RangePicker } = DatePicker;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
//
export default (props) => {
  //
  const { SET, SEND, AgentRankList, AgentRankLoading } = useModel('data');
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  //
  const getD = (v) => {
    // console.log(v);
    SET({
      AgentRankList: '',
      AgentRankLoading: 1,
    });
    if (v && v['time']) {
      v['time'] = v['time'].format('YYYY-MM-DD');
    }
    SEND('agent_rank/list', v);
  };
  useEffect(() => {
    getD();
  }, []);
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Row gutter="16">
          <Col flex="200px">
            <Form
              form={form2}
              onFinish={(v) => {
                form.resetFields();
                form1.resetFields();
                SEND('agent_rank/list');
                SET({ AgentRankLoading: 1 });
              }}
            >
              <Form.Item noStyle={true}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={AgentRankLoading}
                >
                  Today
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col flex="1">
            <Form
              form={form}
              onFinish={(v) => {
                if (!v || !v.day) {
                  SET({ M: { c: 'Please select a date to inquire first!' } });
                  return;
                }
                form1.resetFields();
                SEND('agent_rank/list', { day: v['day'].format('YYYY-MM-DD') });
                SET({ AgentRankLoading: 1 });
              }}
            >
              <Form.Item name="day" noStyle={true}>
                <DatePicker style={{ marginRight: 10 }} />
              </Form.Item>
              <Form.Item noStyle={true}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={AgentRankLoading}
                >
                  Filter Date
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col flex="1">
            <Form
              form={form1}
              onFinish={(v) => {
                if (!v || !v.month) {
                  SET({
                    M: { c: 'Please select the month to inquiry first!' },
                  });
                  return;
                }
                form.resetFields();
                SEND('agent_rank/list', {
                  month: v['month'].format('YYYY-MM'),
                });
                SET({ AgentRankLoading: 1 });
              }}
            >
              <Form.Item name="month" noStyle={true}>
                <DatePicker picker="month" style={{ marginRight: 10 }} />
              </Form.Item>
              <Form.Item noStyle={true}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={AgentRankLoading}
                >
                  Filter Month
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
      <div className="boe br5 ov">
        <Table
          tableClass={'hover'}
          columns={[
            ['Date'],
            ['Agent ID'],
            ['Name'],
            [
              'Total Charge',
              (v) => (
                <>
                  <b>${v[3]}</b>
                </>
              ),
            ],
            ['Total Charge Profit', (v) => '$' + v[4]],
            [
              'Total Withdrawal',
              (v) => (
                <>
                  <b>${v[5]}</b>
                </>
              ),
            ],
            ['Total Withdrawal Profit', (v) => '$' + v[6]],
            ['Total Profit', (v) => '$' + v[7]],
          ]}
          data={AgentRankList || []}
        />
      </div>
    </div>
  );
};
