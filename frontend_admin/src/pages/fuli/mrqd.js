//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, DatePicker } from 'antd';
import { nTom } from '../../utils/tool';
//
const { RangePicker } = DatePicker;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
//
export default (props) => {
  //
  const { SET, SEND, MrqdList, MrqdLoading } = useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      MrqdLoading: 1,
    });
    let _form = { ...form.getFieldValue() };
    if (_form['time']) {
      _form['time_start'] = _form['time'][0].format('YYYY-MM-DD');
      _form['time_end'] = _form['time'][1].format('YYYY-MM-DD');
      delete _form.time;
    }
    SEND('fuli_mrqd/list', { ..._form, ...v });
  };
  useEffect(() => getD(), []);
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form form={form} onFinish={(v) => getD()}>
          <Row gutter="16">
            <Col flex="220px">
              <Form.Item name="_user_id" noStyle>
                <Input addonBefore="ID" />
              </Form.Item>
            </Col>
            <Col flex="300px">
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
                  loading={MrqdLoading}
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
            ['VIP'],
            ['Withdrawl Bonus', (v) => (v[4] / 1000).toFixed(2)],
            ['Balance', (v) => (v[5] / 1000).toFixed(2)],
          ]}
          data={MrqdList || []}
          pageChange={(page) => getD({ page })}
        />
      </div>
    </div>
  );
};
