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
import { nTom, __urlname } from '@/utils/tool';
//
const { Option } = Select;
const { RangePicker } = DatePicker;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
//
export default (props) => {
  //
  const { SET, SEND, TrxIncomingList, TrxIncomingListLoading } =
    useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      TrxIncomingList: [],
      TrxIncomingListLoading: true,
    });
    if (v && v['time']) {
      v['time_start'] = v['time'][0].format('YYYY-MM-DD HH:mm');
      v['time_end'] = v['time'][1].format('YYYY-MM-DD HH:mm');
      delete v['time'];
    }
    SEND('trx/incoming', v);
  };
  useEffect(() => getD(), []);
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form form={form} onFinish={(v) => getD(v)} initialValues={{}}>
          <Row gutter="16">
            <Col flex="150px">
              <Form.Item name="user_id" noStyle>
                <Input addonBefore="ID" />
              </Form.Item>
            </Col>
            <Col flex="310px">
              <Form.Item name="address_business" noStyle>
                <Input addonBefore="Deposit" />
              </Form.Item>
            </Col>
            <Col flex="200px">
              <Form.Item name="amount" noStyle>
                <Input addonBefore="Amount" />
              </Form.Item>
            </Col>
            <Col flex="200px">
              <Form.Item name="block" noStyle>
                <Input addonBefore="Block" />
              </Form.Item>
            </Col>
            <Col flex="310px">
              <Form.Item name="transaction_id" noStyle>
                <Input addonBefore="TRX" />
              </Form.Item>
            </Col>
            <Col flex="290px">
              <Form.Item name="time" noStyle>
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                />
              </Form.Item>
            </Col>
            <Col flex="130px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={TrxIncomingListLoading}
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
            ['Deposit'],
            ['Amount'],
            ['Unit'],
            ['Block'],
            [
              'Transaction',
              (v) => (
                <b
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    window
                      .open(
                        'https://tronscan.org/#/transaction/' + v[6],
                        '_blank',
                      )
                      .focus()
                  }
                >
                  {v[6]}
                </b>
              ),
            ],
            ['Time'],
          ]}
          data={TrxIncomingList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
