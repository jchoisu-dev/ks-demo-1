//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Button, Form } from 'antd';
import { nTom, mTon } from '@/utils/tool';
//
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
const KMHS = dynamic({ loader: () => import('@/components/Mdata/kmhs') });
//
export default (props) => {
  const { SET, SEND, KamiDuihuang, KamiDuihuangs, ReloadUserCredMdata } =
    useModel('data');
  useEffect(() => {
    if (!KamiDuihuang) return;
    if (KamiDuihuangs) {
      SET({
        KamiDuihuangs: [KamiDuihuang, ...KamiDuihuangs].slice(0, 50),
        KamiDuihuang: '',
        MP3: 'kami',
      });
      return;
    }
    SET({
      KamiDuihuangs: [KamiDuihuang],
      KamiDuihuang: '',
    });
  }, [KamiDuihuang]);
  //
  useEffect(() => {
    if (!ReloadUserCredMdata) return;
    SEND('home/KamiDuihuangs');
    SET({ ReloadUserCredMdata: '' });
  }, [ReloadUserCredMdata]);
  //
  const [form] = Form.useForm();
  //
  const but = (v) => {
    if (v[4] == 4) {
      return (
        <Button size="small" disabled>
          Denied
        </Button>
      );
    }
    if (v[4] == 1) {
      return (
        <Row gutter={10}>
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
                        <b>{v[1]}</b> - {v[2]}
                        <br />
                        {v[3]}
                      </>
                    ),
                    bt: 'Confirm Approval',
                    b: () => {
                      SEND('user_kami/sh', {
                        status: 2,
                        kami_id: v[5],
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
                        <b>{v[1]}</b> - {v[2]}
                        <br />
                        {v[3]}
                      </>
                    ),
                    bt: 'DENY',
                    b: () => {
                      SEND('user_kami/sh', {
                        status: 4,
                        kami_id: v[5],
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
    }
    if (v[4] == 3) {
      return (
        <Button disabled size="small">
          Withdrawed
        </Button>
      );
    }
    return (
      <Row justify="space-between">
        <Col>
          <Button size="small" disabled>
            Approved
          </Button>
        </Col>
        <Col>
          <Button
            type="default"
            size="small"
            onClick={() => {
              SET({
                M: {
                  t: 'Review Cancel Withdrawal',
                  c: (
                    <>
                      {v[0]}
                      <br />
                      <b>{v[1]}</b> - {v[2]}
                      <br />
                      {v[3]}
                    </>
                  ),
                  bt: 'Cancel Approval',
                  b: () => {
                    SEND('user_kami/sh', {
                      status: 1,
                      kami_id: v[5],
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
                        user_id: v[1],
                        amount: v[6],
                        km: v[3],
                        user_card_id: v[5],
                        user_name: v[2],
                      }}
                      form={form}
                    />
                  ),
                  bt: 'Confirm Transaction',
                  b: () => {
                    form.submit();
                    form.setFieldsValue({
                      senders: null,
                    });
                  },
                  bc: () => {
                    form.setFieldsValue({
                      man_priv_key: '',
                      man_sender: '',
                      sender: null,
                      senders: null,
                      search_sender: '',
                    });
                    SET({
                      er: null,
                      LiveBalance: '',
                      TRX: '',
                      LiveBalanceLoading: '',
                      TrxModes: 'Selection',
                      LiveBalanceError: '',
                    });
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
  };
  //
  return (
    <div className="nowlist tl">
      {KamiDuihuangs &&
        KamiDuihuangs.map((v, k) => (
          <div key={k} className="item" n={k + 1}>
            <em>{v[0]}</em>
            <br />
            <MUSER t={v[1]} /> - {v[2]}
            <br />
            <small
              style={
                v[4] == 4
                  ? { textDecoration: 'line-through' }
                  : { fontSize: 11 }
              }
            >
              {v[3]}
            </small>
            <br />
            <div style={{ padding: '6px 0px' }}>{but(v)}</div>
          </div>
        ))}
    </div>
  );
};
