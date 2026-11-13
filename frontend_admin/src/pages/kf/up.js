//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { nTom, mTon, formValue } from '@/utils/tool';
import { Row, Col, Form, Input, Button, Select } from 'antd';
//
const { Option } = Select;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const AgentDouUp = dynamic({
  loader: () => import('@/components/Form/agent_dou_up'),
});
const AgentDouUp2 = dynamic({
  loader: () => import('@/components/Form/agent_dou_up_2'),
});
//
export default (props) => {
  //
  const {
    SET,
    SEND,
    AgentDouUpList,
    AgentDouUpLoading,
    AgentDouUpReload,
    AgentDouUpGet,
  } = useModel('data');
  const [form] = Form.useForm();
  const [formGet] = Form.useForm();
  const [formUp] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      AgentDouUpList: [],
      AgentDouUpLoading: 1,
      AgentDouUpReload: '',
    });
    SEND('agent_dou_up/list', v);
  };
  useEffect(() => getD(), []);
  useEffect(() => getD(), [AgentDouUpReload]);
  //
  const agentGet = () => {
    SET({
      M: {
        t: 'Charge Agent',
        c: (
          <AgentDouUp
            form={formGet}
            onFinish={(v) => SEND('agent_dou_up/get', { ...formValue(v) })}
            status="AgentDouUpGetStatus"
          />
        ),
        bt: 'Next',
        b: () => formGet.submit(),
        bc: () => {
          SET({ M: '', AgentDouUpGet: '', AgentDouUpGetStatus: '' });
          formGet.resetFields();
        },
      },
    });
  };
  useEffect(() => {
    if (!AgentDouUpGet) return;
    SET({
      M: {
        t: '代理上分',
        c: (
          <AgentDouUp2
            form={formUp}
            onFinish={(v) =>
              SEND('agent_dou_up/up', { ...formValue(v), money: mTon(v.money) })
            }
            status="AgentDouUpUpStatus"
          />
        ),
        bt: 'Confirm',
        b: () => formUp.submit(),
        bc: () => {
          SET({
            M: '',
            AgentDouUpGet: '',
            AgentDouUpGetStatus: '',
            AgentDouUpUpStatus: '',
          });
          formUp.resetFields();
        },
      },
    });
    formUp.setFieldsValue({ ...AgentDouUpGet, dou: nTom(AgentDouUpGet.dou) });
  }, [AgentDouUpGet]);
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div
        className="mb16 tl"
        style={{ borderBottom: '1px dotted #ddd', paddingBottom: 16 }}
      >
        <Button type="primary" onClick={() => agentGet()}>
          Charge Agent
        </Button>
      </div>
      <div className="mb16">
        <Form form={form} onFinish={(v) => getD(v)}>
          <Row gutter="16">
            <Col flex="180px">
              <Form.Item name="_admin_id" noStyle>
                <Input addonBefore="ID" />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="_agent_id" noStyle>
                <Input addonBefore="Agent ID" />
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={AgentDouUpLoading}
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
            ['Balance', (v) => nTom(v[2])],
            [
              'Charge Bean',
              (v) => (
                <>
                  <b>{nTom(v[3])}</b> 豆
                </>
              ),
            ],
            ['Agent ID'],
            ['Agent Name'],
            ['Agent Balance', (v) => nTom(v[6])],
            ['Time'],
          ]}
          data={AgentDouUpList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
