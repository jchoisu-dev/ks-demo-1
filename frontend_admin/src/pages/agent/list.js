//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { nTom, mTon, formValue } from '@/utils/tool';
import { Row, Col, Form, Input, Button, Select } from 'antd';
//
const { Option } = Select;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const AgentAdd = dynamic({
  loader: () => import('@/components/Form/agent_add'),
});
const AgentAdd2 = dynamic({
  loader: () => import('@/components/Form/agent_add_2'),
});
const AgentEdit = dynamic({
  loader: () => import('@/components/Form/agent_edit'),
});
//
export default (props) => {
  //
  const {
    SET,
    SEND,
    AgentList,
    AgentListLoading,
    AgentOne,
    AgentStatus,
    AgentUser,
    AgentUserStatus,
  } = useModel('data');
  const [form] = Form.useForm();
  const [formadd] = Form.useForm();
  const [formedit] = Form.useForm();
  //
  useEffect(() => {
    SET({
      AgentList: [],
      AgentListLoading: true,
    });
    SEND('agent/list');
  }, []);
  //
  const onAddFinish = (v) => SEND('agent/get_user', { ...formValue(v) });
  const agentAdd = () => {
    SET({
      AdminOne: '',
      M: {
        t: 'Add Agent',
        c: (
          <AgentAdd
            form={formadd}
            onFinish={onAddFinish}
            status="AgentUserStatus"
          />
        ),
        bt: 'Check ID',
        b: () => formadd.submit(),
        bc: () => {
          SET({ M: '', AgentUser: '', AgentUserStatus: '' });
          formadd.resetFields();
        },
      },
    });
  };
  const onAgentAddFinish = (v) => {
    if (v['up_max']) v['up_max'] = mTon(v['up_max']);
    SEND('agent/add', { ...formValue(v) });
  };
  useEffect(() => {
    if (!AgentUser) return;
    SET({
      M: {
        t: 'Agent Information',
        c: (
          <AgentAdd2
            form={formadd}
            onFinish={onAgentAddFinish}
            status="AgentStatus"
          />
        ),
        bt: 'Next',
        b: () => formadd.submit(),
        bc: () => {
          SET({
            M: '',
            AgentOne: '',
            AgentStatus: '',
            AgentUser: '',
            AgentUserStatus: '',
          });
          formadd.resetFields();
        },
      },
    });
    formadd.setFieldsValue({ ...AgentUser, up_max: nTom(AgentUser.up_max) });
  }, [AgentUser]);
  const onAgentEditFinish = (v) => {
    if (v['up_max']) v['up_max'] = mTon(v['up_max']);
    SEND('agent/update', { ...formValue(v) });
  };
  useEffect(() => {
    if (!AgentOne) return;
    formedit.resetFields();
    SET({
      M: {
        t: '编辑代理',
        c: (
          <AgentEdit
            form={formedit}
            onFinish={onAgentEditFinish}
            status="AgentStatus"
          />
        ),
        bt: 'Confirm',
        b: () => formedit.submit(),
        bc: () => {
          SET({
            M: '',
            AgentOne: '',
            AgentStatus: '',
            AgentUser: '',
            AgentUserStatus: '',
          });
          formedit.resetFields();
        },
      },
    });
    formedit.setFieldsValue({ ...AgentOne, up_max: nTom(AgentOne.up_max) });
  }, [AgentOne]);
  //
  const css = {
    2: <b>Hidden</b>,
    1: 'Revealed',
  };
  const status = {
    1: 'Normal',
    2: <b>Banned</b>,
  };
  const _zhekou = (e) => {
    if (e == 1) return 'None';
    return (
      <>
        <b>{e * 100}</b>
      </>
    );
  };
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div
        className="mb16 tl"
        style={{ borderBottom: '1px dotted #ddd', paddingBottom: 16 }}
      >
        <Button type="primary" onClick={() => agentAdd()} disabled>
          Add Agent
        </Button>
      </div>
      <div className="mb16">
        <Form
          form={form}
          initialValues={{
            status: '',
            cs: '',
          }}
          onFinish={(v) => {
            SET({
              AgentList: [],
              AgentListLoading: true,
            });
            SEND('agent/list', { page: 1, ...v });
          }}
        >
          <Row gutter="16">
            <Col flex="220px">
              <Form.Item name="agent_id" noStyle>
                <Input addonBefore="Agent ID" />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="agent_nick" noStyle>
                <Input addonBefore="Name" />
              </Form.Item>
            </Col>
            {/* <Col flex="150px">
                        <Form.Item name="cs" noStyle>
                            <Select name="cs" style={{ width:'100%' }}>
                                <Option value="">Display</Option>
                                {Object.keys(css).map(k=>(
                                     <Option key={k} value={k}>{css[k]}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col> */}
            <Col flex="150px">
              <Form.Item name="status" noStyle>
                <Select name="status" style={{ width: '100%' }}>
                  <Option value="">Status</Option>
                  {Object.keys(status).map((k) => (
                    <Option key={k} value={k}>
                      {status[k]}
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
                  loading={AgentListLoading}
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
            ['Agent ID'],
            ['Account'],
            ['Agent Name'],
            ['Balance', (v) => <b>{(v[3] / 1000).toFixed(2)}</b>],
            ['Charge Royalty', (v) => _zhekou(v[4])],
            ['Withdrawal Royalty', (v) => _zhekou(v[5])],
            // [ 'Highest Charge',(v)=>nTom(v[6])+' $' ],
            // [ 'Buffer',(v)=> "$" + (v[7]/1000).toFixed(2) ],
            // [ 'Display',v=>css[v[8]] ],
            ['Status', (v) => status[v[9]]],
            [
              'Edit',
              (v) => (
                <Button
                  disabled
                  size="small"
                  onClick={() => SEND('agent/get', { user_id: v[0] })}
                >
                  Edit
                </Button>
              ),
            ],
          ]}
          data={AgentList || []}
          pageChange={(page) => {
            SET({
              AgentList: [],
              AgentListLoading: true,
            });
            SEND('agent/list', { page, ...form.getFieldValue() });
          }}
        />
      </div>
    </div>
  );
};
