//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import { nTom } from '@/utils/tool';
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
//
export default (props) => {
  //
  const { SET, SEND, UserWdhbList, UserWdhbLoading } = useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({ UserWdhbLoading: 1, UserWdhbList: '' });
    SEND('user_jyhd/list', v);
  };
  useEffect(() => getD({}), []);
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form form={form} onFinish={(v) => getD(v)}>
          <Row gutter="16">
            <Col flex="220px">
              <Form.Item name="_user_id" noStyle>
                <Input addonBefore="ID" />
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={UserWdhbLoading}
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
            ['Experience', (v) => nTom(v[3])],
            ['Conversion', (v) => <b>{(v[4] / 1000).toFixed(2)}</b>],
            ['Balance', (v) => (v[5] / 1000).toFixed(2)],
          ]}
          data={UserWdhbList || []}
          pageChange={(page) => getD({ page })}
        />
      </div>
    </div>
  );
};
