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
  const { SET, SEND, AgentCardList, AgentCardLoading } = useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      AgentCardList: '',
      AgentCardLoading: 1,
    });
    if (v && v['time']) {
      v['time_start'] = v['time'][0].format('YYYY-MM-DD HH:mm');
      v['time_end'] = v['time'][1].format('YYYY-MM-DD HH:mm');
      delete v['time'];
    }
    SEND('agent_card/list', v);
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
  useEffect(() => {
    getD();
  }, []);
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form form={form} onFinish={(v) => getD(v)}>
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
                  loading={AgentCardLoading}
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
            ['Member ID', (v) => <MUSER t={v[1]} />],
            ['Member Signature'],
            ['Withdrawal Code'],
            ['Agent ID'],
            ['Agent Name'],
            ['Withdrawal %', (v) => _zhekou(v[6])],
            ['Receive', (v) => <b>{(v[7] / 1000).toFixed(2)}</b>],
            ['Profit', (v) => v[8]],
          ]}
          data={AgentCardList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
