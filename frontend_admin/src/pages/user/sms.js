//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, Select, DatePicker } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
//
const { Option } = Select;
const { RangePicker } = DatePicker;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
//
export default (props) => {
  //
  const { SET, SEND, UserSmsList, UserSmsListLoading } = useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      UserSmsList: [],
      UserSmsListLoading: true,
    });
    if (v && v['time']) {
      v['time_start'] = v['time'][0].format('YYYY-MM-DD HH:mm');
      v['time_end'] = v['time'][1].format('YYYY-MM-DD HH:mm');
      delete v['time'];
    }
    SEND('user_sms/list', v);
  };
  useEffect(() => getD(), []);
  //
  const types = {
    shopbuy: 'Card Exchange',
    login: 'Login',
    register: 'Register',
    wjmm: 'Forgot',
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
            <Col flex="220px">
              <Form.Item name="phone" noStyle>
                <Input addonBefore="Phone" />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="_ip" noStyle>
                <Input addonBefore="IP" />
              </Form.Item>
            </Col>
            <Col flex="150px">
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
                  loading={UserSmsListLoading}
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
            ['Time'],
            ['Type', (v) => types[v[1]]],
            ['Member ID', (v) => (v[2] !== '-' ? <MUSER t={v[2]} /> : '-')],
            ['Name', (v) => v[3]],
            ['Phone'],
            [
              'Code',
              (v) => (
                <CopyToClipboard text={v[5]}>
                  <Button size="small">
                    <b>{v[5]}</b>
                  </Button>
                </CopyToClipboard>
              ),
            ],
            ['IP'],
          ]}
          data={UserSmsList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
