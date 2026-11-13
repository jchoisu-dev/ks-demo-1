//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, DatePicker, Select } from 'antd';
import { nTom, mTon, formValue } from '@/utils/tool';
//
const { RangePicker } = DatePicker;
const { Option } = Select;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
//
export default (props) => {
  const { SET, SEND, UserMingxiList, UserMingxiListLoading } = useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      UserMingxiList: [],
      UserMingxiListLoading: 1,
    });
    if (v && v['time']) {
      v['time_start'] = v['time'][0].format('YYYY-MM-DD HH:mm');
      v['time_end'] = v['time'][1].format('YYYY-MM-DD HH:mm');
      delete v['time'];
    }
    SEND('user/mingXiList', v);
  };
  //
  useEffect(() => getD(), []);
  //
  const orderOptions = {
    charge: 'Charge',
    win: 'Win',
    ls: 'LS',
  };
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form form={form} onFinish={(v) => getD(v)}>
          <Row gutter="16" align="middle">
            <Col flex="220px">
              <Form.Item name="user_id" noStyle>
                <Input addonBefore="ID" />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="nick" noStyle>
                <Input addonBefore="Name" />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="order" noStyle>
                <Select placeholder="Select Highest" style={{ width: '100%' }}>
                  {Object.keys(orderOptions).map((k) => (
                    <Option value={k}>{orderOptions[k]}</Option>
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
            <Col flex="140px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={UserMingxiListLoading}
                >
                  Search
                </Button>
              </Form.Item>
            </Col>
            <Col flex="90px">
              <Form.Item noStyle>
                <Button block onClick={() => form.resetFields()}>
                  Clear
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
            ['Charge', (v) => '$' + v[2]],
            ['Daily First Charge', (v) => '$' + v[3]],
            ['Charge Quantity', (v) => v[4]],
            ['Bet Win', (v) => (v[5] / 1000).toFixed(2)],
            [
              'Bet Profit',
              (v) =>
                v[6] > 0 ? (
                  <b>{(v[6] / 1000).toFixed(2)}</b>
                ) : (
                  (v[6] / 1000).toFixed(2)
                ),
            ],
            ['LS', (v) => (v[7] / 1000).toFixed(2)],
            ['LS After Charge', (v) => (v[8] / 1000).toFixed(2)],
            ['Time', (v) => v[9]],
          ]}
          //
          data={UserMingxiList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
