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
  const { SET, SEND, AgentDltxList, AgentDltxLoading, AgentDltxReload } =
    useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      AgentDltxList: [],
      AgentDltxLoading: 1,
      AgentDltxReload: '',
    });
    SEND('agent_dltx/list', v);
  };
  useEffect(() => getD(), []);
  useEffect(() => getD(), [AgentDltxReload]);
  //
  const caozuo = (status, v) => {
    const _title = {
      2: '代理提现 - 审核通过',
      3: '代理提现 - 撤销',
    };
    //
    let M = {
      t: _title[status],
      c: (
        <div className="kmp tl">
          <p>
            代理ID
            <span>
              <b>{v[1]}</b>
            </span>
          </p>
          <p>
            代理昵称<span>{v[2]}</span>
          </p>
          <p>
            提现金额
            <span>
              <b>{nTom(v[3])}</b> $
            </span>
          </p>
          <p>
            发起时间<span>{v[0]}</span>
          </p>
        </div>
      ),
      bt: '审核通过',
      b: () => {
        SEND('agent_dltx/status_change', { status, _id: v[7] });
      },
    };
    if (status == 3) M = { ...M, bt: '确定撤销' };
    //
    SET({ M });
  };
  //
  const status = (v) => {
    const s = v[6];
    if (s == 1) {
      return (
        <>
          <Button size="small" type="primary" onClick={() => caozuo(2, v)}>
            Approved
          </Button>
          <Button
            size="small"
            style={{ marginLeft: 20 }}
            onClick={() => caozuo(3, v)}
          >
            Revoked
          </Button>
        </>
      );
    }
    if (s == 2) return <b>Approved</b>;
    if (s == 3)
      return (
        <Button size="small" disabled>
          Cancelled
        </Button>
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
            <Col flex="350px">
              <Form.Item name="_admin_id" noStyle>
                <Input addonBefore="Cusomter Service ID" />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="_agent_id" noStyle>
                <Input addonBefore="Agent ID" />
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item name="status" noStyle>
                <Select name="status" style={{ width: '100%' }}>
                  <Option value="">Status</Option>
                  <Option value="1">To be Reviewed</Option>
                  <Option value="2">Approved</Option>
                  <Option value="3">Cancelled</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={AgentDltxLoading}
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
            ['Agent ID'],
            ['Agent Name'],
            [
              'Withdraw Amount',
              (v) => (
                <>
                  <b>{nTom(v[3])}</b> $
                </>
              ),
            ],
            ['CS ID', (v) => v[4] || '-'],
            ['CS Name'],
            ['Status', (v) => status(v)],
          ]}
          data={AgentDltxList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
