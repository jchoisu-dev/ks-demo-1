//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, DatePicker, Select } from 'antd';
import { nTom } from '../../utils/tool';
//
const { Option } = Select;
const { RangePicker } = DatePicker;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
//
export default (props) => {
  //
  const { SET, SEND, AgentChargeList, AgentChargeListLoading } =
    useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      AgentChargeList: [],
      AgentChargeListLoading: 1,
    });
    if (v && v['time']) {
      v['time_start'] = v['time'][0].format('YYYY-MM-DD HH:mm');
      v['time_end'] = v['time'][1].format('YYYY-MM-DD HH:mm');
      delete v['time'];
    }
    SEND('agent_charge/list', v);
  };
  useEffect(() => {
    getD();
  }, []);
  //
  const status = {
    1: 'Charged',
    3: (
      <del>
        <b>Returned</b>
      </del>
    ),
  };
  //
  const _zhekou = (e) => {
    if (e == 1) return 'None';
    return (
      <>
        <b>{e * 100}</b>
      </>
    );
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
            <Col flex="250px">
              <Form.Item name="_agent_id" noStyle>
                <Input addonBefore="Agent ID" />
              </Form.Item>
            </Col>
            <Col flex="250px">
              <Form.Item name="_user_id" noStyle>
                <Input addonBefore="Member ID" />
              </Form.Item>
            </Col>
            <Col flex="200px">
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
                  loading={AgentChargeListLoading}
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
            [
              'Agent ID',
              (v) => {
                v[1];
              },
            ],
            ['Agent Name'],
            ['Member ID', (v) => <MUSER t={v[3]} />],
            ['Member Name'],
            [
              'Charge Amount',
              (v) => (
                <>
                  <b>${v[5]}</b>
                </>
              ),
            ],
            ['Charge %', (v) => _zhekou(v[6])],
            ['Agent Cut', (v) => '$' + (v[7] / 1000).toFixed(2)],
            ['Status', (v) => status[v[8]]],
          ]}
          data={AgentChargeList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
