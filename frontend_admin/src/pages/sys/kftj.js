//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { nTom } from '@/utils/tool';
import { Row, Col, Form, Input, Button, DatePicker } from 'antd';
//
const Table = dynamic({ loader: () => import('@/components/Table') });
//
export default (props) => {
  //
  const { SET, SEND, AdminTjxx, AdminTjxxList, AdminTjxxLoading } =
    useModel('data');
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      AdminTjxx: '',
      AdminTjxxList: '',
      AdminTjxxLoading: 1,
    });
    SEND('admin_kftj/now', v);
  };
  useEffect(() => getD(), []);
  //
  const tds = (b) => {
    if (!b) return '-';
    if (b) return <b>{nTom(b)}</b>;
    return nTom(b);
  };
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Row gutter="30">
          <Col span="8">
            <Form
              form={form1}
              onFinish={(v) => {
                if (!v || !v._admin_id) {
                  SET({ M: { c: '请先输入客服ID' } });
                  return;
                }
                SEND('admin_kftj/now', v);
                SET({ AdminTjxxLoading: 1 });
              }}
            >
              <Form.Item name="_admin_id" noStyle={true}>
                <Input
                  placeholder="1"
                  style={{ width: 200, marginRight: 10 }}
                />
              </Form.Item>
              <Form.Item noStyle={true}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={AdminTjxxLoading}
                >
                  Filter ID
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span="8">
            <Form
              form={form2}
              onFinish={(v) => {
                if (!v || !v.year) {
                  SET({ M: { c: '请先选择年份，再进行查询！' } });
                  return;
                }
                form2.resetFields();
                SEND('admin_kftj/year', { year: v['year'].format('YYYY') });
                SET({ AdminTjxxLoading: 1 });
              }}
            >
              <Form.Item name="year" noStyle={true}>
                <DatePicker picker="year" style={{ marginRight: 10 }} />
              </Form.Item>
              <Form.Item noStyle={true}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={AdminTjxxLoading}
                >
                  Filter Year
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span="8">
            <Form
              form={form3}
              onFinish={(v) => {
                if (!v || !v.month) {
                  SET({ M: { c: '请先选择月份，再进行查询！' } });
                  return;
                }
                form3.resetFields();
                SEND('admin_kftj/month', {
                  month: v['month'].format('YYYY-MM'),
                });
                SET({ AdminTjxxLoading: 1 });
              }}
            >
              <Form.Item name="month" noStyle={true}>
                <DatePicker picker="month" style={{ marginRight: 10 }} />
              </Form.Item>
              <Form.Item noStyle={true}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={AdminTjxxLoading}
                >
                  Filter Month
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
      <div className="boe br5 ov mb16">
        <div style={{ marginBottom: -1 }}>
          <Table
            tableClass={'hover'}
            columns={[
              ['Name'],
              ['System Charge / 豆', (v) => nTom(v[1])],
              ['Customer Service Charge / 豆', (v) => nTom(v[2])],
              ['Agent Charge / 豆', (v) => nTom(v[3])],
              ['Agent Return / 豆', (v) => nTom(v[4])],
            ]}
            data={[[], [AdminTjxx || [0, 0, 0, 0]]]}
          />
        </div>
      </div>
      <div className="boe br5 ov">
        <Table
          tableClass={'hover'}
          columns={[
            ['Date', (v) => (v[0] == 'sum' ? 'Total' : v[0])],
            ['System Charge / 豆', (v) => tds(v[1])],
            ['Customer Service Charge / 豆', (v) => tds(v[2])],
            ['Agent Charge / 豆', (v) => tds(v[3])],
            ['Agent Return / 豆', (v) => tds(v[4])],
          ]}
          data={[[], AdminTjxxList || []]}
        />
      </div>
    </div>
  );
};
