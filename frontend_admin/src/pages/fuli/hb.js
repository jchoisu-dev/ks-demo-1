//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button } from 'antd';
import { nTom } from '@/utils/tool';
import { CopyToClipboard } from 'react-copy-to-clipboard';
//
const Table = dynamic({ loader: () => import('@/components/Table') });
//
export default (props) => {
  //
  const { SET, SEND, HbList, HbLoading } = useModel('data');
  const [form] = Form.useForm();
  //
  const getD = () => {
    SET({ HbLoading: 1 });
    SEND('fuli_hb/list');
  };
  useEffect(() => getD(), []);
  //
  const status = (v) => {
    const _s = v[4];
    if (_s == 1)
      return (
        <Button
          size="small"
          type="primary"
          onClick={() => {
            SET({
              M: {
                t: 'Cancel Red Pocket',
                c: (
                  <div className="kmp tl">
                    <p>
                      Created<span>{v[0]}</span>
                    </p>
                    <p>
                      Red Pocket<span>{v[2]}</span>
                    </p>
                    <p>
                      Creator<span>{v[1]}</span>
                    </p>
                    <p>
                      Amount
                      <span>
                        <b>{nTom(v[3])}</b> $
                      </span>
                    </p>
                  </div>
                ),
                bt: 'Confirm',
                b: () => SEND('fuli_hb/stop', { _id: v[6] }),
              },
            });
          }}
        >
          Cancel
        </Button>
      );
    if (_s == 2) return <b>Used</b>;
    if (_s == 3) return 'Revoked';
    if (_s == 4) return 'Expired';
  };
  //
  const cpb = (v) => {
    if (v[4] == 1)
      return (
        <CopyToClipboard
          text={v[2]}
          onCopy={() =>
            SET({
              M: {
                t: 'Red Pocket code copied to the clipboard',
                c: <b>{v[2]}</b>,
              },
            })
          }
        >
          <Button size="small" style={{ width: 220 }}>
            {v[2]}
          </Button>
        </CopyToClipboard>
      );
    return (
      <Button size="small" disabled style={{ width: 220 }}>
        {v[2]}
      </Button>
    );
  };
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form
          form={form}
          initialValues={{
            num: 1,
            money: 10,
          }}
          onFinish={(v) => {
            if (!v || !v.num || !v.money) {
              SET({ M: { c: '请输入完整' } });
              return;
            }
            SEND('fuli_hb/go', v);
            SET({ HbLoading: 1 });
          }}
        >
          <Row gutter="16">
            <Col flex="220px">
              <Form.Item name="num" noStyle>
                <Input addonBefore="Quantity" />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="money" noStyle>
                <Input addonAfter="$" />
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={HbLoading}
                >
                  Add Red Pocket
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Button onClick={() => getD()} loading={HbLoading}>
                Refresh List
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="boe br5 ov">
        <Table
          tableClass={'hover'}
          columns={[
            ['Time'],
            ['Creator'],
            ['Red Pocket', (v) => cpb(v)],
            [
              'Amount',
              (v) => (
                <>
                  <b>${nTom(v[3])}</b>
                </>
              ),
            ],
            ['Status', (v) => status(v)],
            ['Edited by'],
          ]}
          data={HbList || []}
          pageChange={(page) => SEND('fuli_hb/list', { page })}
        />
      </div>
    </div>
  );
};
