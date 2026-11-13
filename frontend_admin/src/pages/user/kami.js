//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import { nTom } from '@/utils/tool';
//
const { Option } = Select;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
//
const KMHS = dynamic({ loader: () => import('@/components/Mdata/kmhs') });
//
export default (props) => {
  //
  const {
    SET,
    SEND,
    UserKamiList,
    UserKamiListLoading,
    ReloadUserCredMdata,
    TrxModes,
  } = useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      UserKamiList: [],
      UserKamiListLoading: 1,
    });
    SEND('user_kami/list', v);
  };
  useEffect(() => getD(), []);
  useEffect(() => {
    if (!ReloadUserCredMdata) return;
    SET({ ReloadUserCredMdata: '' });
    SEND('user_kami/list');
  }, [ReloadUserCredMdata]);
  //
  const [form1] = Form.useForm();
  //
  const cz = (v) => {
    if (v[7] == 4) {
      return (
        <Button size="small" disabled>
          Denied
        </Button>
      );
    }
    if (v[7] == 2) {
      return (
        <Row justify="space-evenly">
          <Col>
            <Button size="small" disabled>
              Approved
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                SET({
                  M: {
                    t: 'Approve Card',
                    c: (
                      <>
                        {v[0]}
                        <br />
                        <b>{v[2]}</b> - {v[3]}
                        <br />
                        {v[5]}
                      </>
                    ),
                    bt: 'Undo Approval',
                    b: () => {
                      SEND('user_kami/sh', {
                        status: 1,
                        kami_id: v[1],
                      });
                    },
                  },
                });
              }}
            >
              Undo
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                SET({
                  M: {
                    t: 'Review Transaction',
                    c: (
                      <KMHS
                        data={{
                          user_id: v[2],
                          amount: v[4],
                          km: v[5],
                          user_card_id: v[1],
                          user_name: v[3],
                        }}
                        form={form1}
                      />
                    ),
                    bt: 'Confirm Transaction',
                    b: () => {
                      form1.submit();
                      form1.setFieldsValue({
                        senders: null,
                      });
                    },
                    bc: () => {
                      form1.setFieldsValue({
                        man_priv_key: '',
                        man_sender: '',
                        senders: null,
                      });
                      SET({ er: null });
                    },
                  },
                });
              }}
            >
              Send
            </Button>
          </Col>
        </Row>
      );
      // return <Button size="small" disabled>已通过</Button>
    }
    if (v[7] == 3)
      return (
        <Button size="small" disabled>
          Received
        </Button>
      );
    return (
      <Row justify="center" gutter={'10'}>
        <Col>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              SET({
                M: {
                  t: 'Review Approve Withdrawal',
                  c: (
                    <>
                      {v[0]}
                      <br />
                      <b>{v[2]}</b> - {v[3]}
                      <br />
                      {v[5]}
                    </>
                  ),
                  bt: 'Confirm Approval',
                  b: () => {
                    SEND('user_kami/sh', {
                      status: 2,
                      kami_id: v[1],
                    });
                  },
                },
              });
            }}
          >
            Approve
          </Button>
        </Col>
        <Col>
          <Button
            size="small"
            onClick={() => {
              SET({
                M: {
                  t: 'Review Deny Withdrawal',
                  c: (
                    <>
                      {v[0]}
                      <br />
                      <b>{v[2]}</b> - {v[3]}
                      <br />
                      {v[5]}
                    </>
                  ),
                  bt: 'DENY',
                  b: () => {
                    SEND('user_kami/sh', {
                      status: 4,
                      kami_id: v[1],
                    });
                  },
                },
              });
            }}
          >
            Deny
          </Button>
        </Col>
      </Row>
    );
  };
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form
          form={form}
          onFinish={(v) => getD(v)}
          initialValues={{
            status: '',
          }}
        >
          <Row gutter="16">
            <Col flex="220px">
              <Form.Item name="user_id" noStyle>
                <Input addonBefore="ID" />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="status" noStyle>
                <Select name="status" style={{ width: '100%' }}>
                  <Option value="">- Select -</Option>
                  <Option value="1">Open</Option>
                  <Option value="2">Approved</Option>
                  <Option value="3">Withdrawed</Option>
                  <Option value="4">Denied</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={UserKamiListLoading}
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
            ['ID', (v) => <MUSER t={v[2]} />],
            ['Name', (v) => v[3]],
            ['Amount', (v) => v[4].toFixed(2)],
            ['Referal Code', (v) => v[5]],
            ['Exchange Fee', (v) => (v[6] / 1000).toFixed(2)],
            ['Agent', (v) => v[9]],
            ['Action', (v) => cz(v)],
            ['Controlled By', (v) => v[8]],
          ]}
          data={UserKamiList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
