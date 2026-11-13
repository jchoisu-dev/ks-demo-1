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
  const { SET, SEND, HdflList, HdflLoading } = useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      HdflLoading: 1,
    });
    let _form = { ...form.getFieldValue() };
    if (_form['time']) {
      _form['time_start'] = _form['time'][0].format('YYYY-MM-DD');
      _form['time_end'] = _form['time'][1].format('YYYY-MM-DD');
      delete _form.time;
    }
    SEND('fuli_hdfl/list', { ..._form, ...v });
  };
  useEffect(() => getD(), []);
  //
  const _types = {
    1: 'First Charge',
    2: 'Bet',
    3: 'Loss',
    4: 'Offline',
    6: 'Promotional Agent Charge Bonus',
    10: 'Registration One Time Bonus',
  };
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form
          form={form}
          onFinish={(v) => getD()}
          initialValues={{
            type: '',
          }}
        >
          <Row gutter="16">
            <Col flex="220px">
              <Form.Item name="_user_id" noStyle>
                <Input addonBefore="ID" />
              </Form.Item>
            </Col>
            <Col flex="200px">
              <Form.Item name="type" noStyle>
                <Select name="type" style={{ width: '100%' }}>
                  <Option value="">Rebate Type</Option>
                  {Object.keys(_types).map((k) => (
                    <Option key={k} value={k}>
                      {_types[k]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col flex="350px">
              <Form.Item name="time" noStyle>
                <RangePicker format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={HdflLoading}
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
            ['ID', (v) => <MUSER t={v[1]} />],
            ['Name'],
            ['Rebate', (v) => _types[v[3]]],
            ['Bonus Withdrawal', (v) => (v[4] / 1000).toFixed(2)],
            ['Balance', (v) => (v[5] / 1000).toFixed(2)],
          ]}
          data={HdflList || []}
          pageChange={(page) => getD({ page })}
        />
      </div>
    </div>
  );
};
