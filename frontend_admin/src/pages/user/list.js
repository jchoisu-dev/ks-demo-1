//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import { nTom, mTon, formValue } from '@/utils/tool';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
//
const { Option } = Select;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const UserEdit = dynamic({
  loader: () => import('@/components/Form/user_edit'),
});
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
//
export default (props) => {
  //
  const { SET, SEND, UserList, UserListLoading, UserOne, UserLoginNums } =
    useModel('data');
  const [form] = Form.useForm();
  const [formadd] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      UserList: [],
      UserListLoading: 1,
    });
    SEND('user/list', v);
  };
  useEffect(() => getD(), []);
  //
  const onUpdateFinish = (v) => {
    SEND('user/update', { ...formValue(v), _id: UserOne.id });
  };
  useEffect(() => {
    if (!UserOne) return;
    SET({
      M: {
        t: 'Member Edit',
        c: (
          <UserEdit
            form={formadd}
            onFinish={onUpdateFinish}
            status="UserStatus"
          />
        ),
        bt: 'Confirm',
        b: () => formadd.submit(),
        bc: () => {
          SET({ M: '', UserOne: '', UserStatus: '' });
          formadd.resetFields();
        },
      },
    });
    formadd.setFieldsValue({ ...UserOne });
  }, [UserOne]);
  //
  const kms = {
    1: <b>Require</b>,
    2: 'No',
  };
  const css = {
    2: <b>Test</b>,
    1: 'Normal',
  };
  const sss = {
    1: 'On',
    2: <b>Off</b>,
  };
  const status = {
    1: 'Normal',
    2: <b>Banned</b>,
  };
  // UserLoginNums
  useEffect(() => {
    if (!UserLoginNums) return;
    SET({
      M: {
        t: 'Login Information',
        c: (
          <div className="boe br5 ov" style={{ width: 800 }}>
            <div style={{ marginBottom: -1 }}>
              <Table
                tableClass={'hover'}
                columns={[
                  ['ID'],
                  ['Account'],
                  ['Password'],
                  ['Status', (v) => (v[3] == 1 ? 'Remove' : <b>Error</b>)],
                  ['Time'],
                ]}
                data={UserLoginNums || []}
              />
            </div>
          </div>
        ),
        bt: 'Remove',
        b: () => {
          SEND('user/jc_login', { _user_id: UserLoginNums[1][0][0] });
        },
        bc: () => {
          SET({ M: '', UserLoginNums: '' });
        },
      },
    });
  }, [UserLoginNums]);
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form
          form={form}
          onFinish={(v) => getD(v)}
          initialValues={{
            km: '',
            cs: '',
            status: '',
          }}
        >
          <Row gutter="16">
            <Col flex="220px">
              <Form.Item name="parent" noStyle>
                <Input addonBefore="Ref-ID" />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="user_id" noStyle>
                <Input addonBefore="ID" />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="user" noStyle>
                <Input addonBefore="Account" />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="nick" noStyle>
                <Input addonBefore="Name" />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="telegram_tag" noStyle>
                <Input addonBefore="Telegram" />
              </Form.Item>
            </Col>
            {/* <Col flex="180px">
                        <Form.Item name="phone" noStyle>
                            <Input addonBefore="Phone" />
                        </Form.Item>
                    </Col>
                    <Col flex="130px">
                        <Form.Item name="km" noStyle>
                            <Select name="km" style={{ width:'100%' }}>
                                <Option value="">Card Ex.</Option>
                                <Option value="1">Required</Option>
                                <Option value="2">Unrequired</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    */}
            <Col flex="150px">
              <Form.Item name="cs" noStyle>
                <Select name="cs" style={{ width: '100%' }}>
                  <Option value="">Account</Option>
                  <Option value="1">Normal</Option>
                  <Option value="2">Test</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col flex="200px">
              <Form.Item name="status" noStyle>
                <Select name="status" style={{ width: '100%' }}>
                  <Option value="">Status</Option>
                  <Option value="1">Normal</Option>
                  <Option value="2">Banned</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col flex="130px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={UserListLoading}
                >
                  Search
                </Button>
              </Form.Item>
            </Col>
            <Col flex="80px">
              <Form.Item noStyle>
                <Button block onClick={() => form.resetFields()}>
                  Clear
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
            ['Ref ID', (v) => v[0] || '-'],
            ['ID', (v) => <MUSER t={v[1]} />],
            ['Account'],
            ['Name'],
            ['Deposit', (v) => v[12]],
            ['Withdraw', (v) => v[13]],
            ['Telegram', (v) => v[14]],
            // [ 'Phone',(v)=><>{v[4]}</> ],
            [
              'Balance',
              (v) => <b>{v[5] == '-' ? 0 : (v[5] / 1000).toFixed(2)}</b>,
            ],
            ['Bank', (v) => <b>{v[6] == 0 ? 0 : (v[6] / 1000).toFixed(2)}</b>],
            // [ 'XP',(v)=>nTom(v[7]) ],
            // [ 'Control',(v)=>kms[v[8]] ],
            ['Account', (v) => css[v[9]]],
            // [ 'Sound',(v)=>sss[v[10]] ],
            ['Status', (v) => status[v[11]]],
            [
              'Edit',
              (v) => (
                <Button
                  size="small"
                  onClick={() => SEND('user/get', { _id: v[1] })}
                >
                  <EditOutlined />
                </Button>
              ),
            ],
            // [ 'Login',(v)=><Button size="small" onClick={()=>SEND('user/get_login',{_id:v[1]})}><DeleteOutlined /></Button> ],
          ]}
          data={UserList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
