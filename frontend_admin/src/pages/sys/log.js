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
  const { SET, SEND, AdminLogList, AdminLogListLoading } = useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      AdminLogList: [],
      AdminLogListLoading: 1,
    });
    SEND('admin/log_list', v);
  };
  useEffect(() => getD(), []);
  //
  const columns = [
    ['ID'],
    ['Operator ID'],
    ['Operator'],
    ['Description'],
    ['IP'],
    ['Time'],
  ];
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form form={form} onFinish={(v) => getD(v)}>
          <Row gutter="16">
            <Col flex="220px">
              <Form.Item name="admin_id" noStyle>
                <Input addonBefore="ID" />
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={AdminLogListLoading}
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
          columns={columns}
          data={AdminLogList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
