//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { nTom, mTon, formValue } from '@/utils/tool';
import { Row, Col, Form, Input, Button, Select } from 'antd';
//
const { Option } = Select;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const KefuDou = dynamic({ loader: () => import('@/components/Form/kefu_dou') });
//
export default (props) => {
  //
  const {
    SET,
    SEND,
    AdminDouUpList,
    AdminDouUpListLoading,
    AdminDouUpListReload,
    AdminDouUpKf,
    AdminDouUpKfLoading,
  } = useModel('data');
  const [form] = Form.useForm();
  const [formUp] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      AdminDouUpList: [],
      AdminDouUpListLoading: 1,
      AdminDouUpListReload: '',
      AdminDouUpGetStatus: '',
      AdminDouUpKf: '',
      AdminDouUpKfLoading: false,
    });
    SEND('admin_charge/list', v);
    formUp.resetFields();
  };
  useEffect(() => getD(), []);
  useEffect(() => getD(), [AdminDouUpListReload]);
  //
  useEffect(() => {
    if (!AdminDouUpKf) return;
    SET({
      M: {
        t: 'System Charge',
        c: (
          <KefuDou
            form={formUp}
            onFinish={(v) => SEND('admin_charge/up', v)}
            status="AdminChargeStatus"
          />
        ),
        bt: 'Confirm',
        b: () => formUp.submit(),
        bc: () => {
          SET({ M: '', AdminDouUpGetStatus: '', AdminDouUpKf: '' });
          formUp.resetFields();
        },
      },
    });
  }, [AdminDouUpKf]);
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div
        className="mb16 tl"
        style={{ borderBottom: '1px dotted #ddd', paddingBottom: 16 }}
      >
        <Button
          type="primary"
          loading={AdminDouUpKfLoading}
          onClick={() => {
            SET({ AdminDouUpKfLoading: 1 });
            SEND('admin_charge/kf');
          }}
        >
          Charge
        </Button>
      </div>
      <div className="mb16">
        <Form form={form} onFinish={(v) => getD(v)}>
          <Row gutter="16">
            <Col flex="220px">
              <Form.Item name="_admin_id" noStyle>
                <Input addonBefore="ID" />
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={AdminDouUpListLoading}
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
            ['ID'],
            ['Name'],
            [
              'Charge',
              (v) => (
                <>
                  <b>{nTom(v[2])}</b> $
                </>
              ),
            ],
            [
              'Beans',
              (v) => (
                <>
                  <b>{nTom(v[3])}</b> 豆
                </>
              ),
            ],
            ['Time'],
          ]}
          data={AdminDouUpList || []}
          pageChange={(page) => SEND('agent_dou_up/list', { page })}
        />
      </div>
    </div>
  );
};
