//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, Select } from 'antd';
//
const { Option } = Select;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
//
export default (props) => {
  //
  const { SEND, UserList } = useModel('data');
  const [form] = Form.useForm();
  //
  const pageChange = (page) => {
    // SEND('user/list', { page });
  };
  //
  const columns = [
    ['时间'],
    ['序号'],
    ['代理ID'],
    ['提现金额 $'],
    ['客服ID'],
    ['操作'],
  ];
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form>
          <Row gutter="16">
            <Col flex="220px">
              <Form.Item name="perent" noStyle>
                <Input addonBefore="客服ID" />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="user_id" noStyle>
                <Input addonBefore="代理ID" />
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item noStyle>
                <Button type="primary" htmlType="submit" block>
                  搜索
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="boe br5 ov">
        <Table
          tableClass={'hover'}
          columns={columns}
          data={UserList || []}
          pageChange={pageChange}
        />
      </div>
    </div>
  );
};
