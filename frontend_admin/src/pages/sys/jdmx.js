//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import { nTom } from '../../utils/tool';
//
const { Option } = Select;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
//
export default (props) => {
  //
  const { SET, SEND, AdminDouList, AdminDouLoading, AdminDouReload } =
    useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      AdminDouList: [],
      AdminDouLoading: 1,
      AdminDouReload: '',
    });
    SEND('admin_dou/list', v);
  };
  useEffect(() => getD(), []);
  // useEffect(() => getD(), [AdminDouReload]);
  //
  const types = {
    1: 'Manager Charge',
    11: 'System Charge',
    12: 'Customer Service Charge',
    2: 'Agent Charge',
    3: 'Agent Return',
    4: 'Member Deduction',
  };
  const modeDou = (mode, dou) => {
    if (mode == 2) return <b>+ {nTom(dou)}</b>;
    return <>- {nTom(dou)}</>;
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
              <Form.Item name="_admin_id" noStyle>
                <Input addonBefore="ID" />
              </Form.Item>
            </Col>
            <Col flex="260px">
              <Form.Item name="type" noStyle>
                <Select name="type" style={{ width: '100%' }}>
                  <Option value="">Select Types</Option>
                  {Object.keys(types).map((k) => (
                    <Option key={k} value={k}>
                      {types[k]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={AdminDouLoading}
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
            ['ID'],
            ['Name'],
            ['Type', (v) => types[v[3]]],
            ['Amount', (v) => modeDou(v[4], v[5])],
            ['Balance', (v) => <>{nTom(v[6])} 豆</>],
            ['Description', (v) => v[7] || '-'],
          ]}
          data={AdminDouList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
