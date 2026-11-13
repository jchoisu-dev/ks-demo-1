import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { nTom, mTon, formValue } from '@/utils/tool';
import { EditOutlined } from '@ant-design/icons';
import { Row, Col, Form, Input, Button, Select } from 'antd';
//
const { Option } = Select;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const AdminAddEdit = dynamic({
  loader: () => import('@/components/Form/admin_add_edit'),
});
//
export default (props) => {
  //
  const { SET, SEND, AdminList, AdminListLoading, AdminOne, AdminStatus, M } =
    useModel('data');
  const [form] = Form.useForm();
  const [formadd] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      AdminList: [],
      AdminListLoading: 1,
    });
    SEND('admin/list', v);
  };
  useEffect(() => getD(), []);
  //
  const adminAdd = () => {
    formadd.resetFields();
    SET({
      AdminOne: '',
      M: {
        t: 'Add/Edit Account',
        c: (
          <AdminAddEdit
            form={formadd}
            onFinish={(v) => {
              if (v['dou']) v['dou'] = mTon(v['dou']);
              if (v['up_max']) v['up_max'] = mTon(v['up_max']);
              SEND('admin/add', formValue(v));
            }}
            status="AdminStatus"
          />
        ),
        bt: 'Confirm',
        b: () => formadd.submit(),
        bc: () => {
          SET({ M: '', AdminOne: '', AdminStatus: '' });
          formadd.resetFields();
        },
      },
    });
    formadd.setFieldsValue({ role: '1', status: '1' });
  };
  useEffect(() => {
    if (!AdminOne) return;
    formadd.resetFields();
    SET({
      M: {
        t: 'Edit Information',
        c: (
          <AdminAddEdit
            form={formadd}
            onFinish={(v) => {
              if (v['dou']) v['dou'] = mTon(v['dou']);
              if (v['up_max']) v['up_max'] = mTon(v['up_max']);
              SEND('admin/update', { ...formValue(v), _id: AdminOne.id });
            }}
            status="AdminStatus"
          />
        ),
        bt: 'Confirm',
        b: () => formadd.submit(),
        bc: () => {
          SET({ M: '', AdminOne: '', AdminStatus: '' });
          formadd.resetFields();
        },
      },
    });
    let dou = nTom(AdminOne.dou);
    let up_max = nTom(AdminOne.up_max);
    formadd.setFieldsValue({ ...AdminOne, dou, up_max });
  }, [AdminOne]);
  //
  const role = {
    1: 'Technology',
    2: 'Customer Service',
    3: 'Manager',
  };
  const status = {
    1: 'Normal',
    2: <b>Banned</b>,
  };
  const _dou = (d) => {
    if (!d) return '-';
    return (
      <>
        <b>{nTom(d)}</b> 豆
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
        <Button type="primary" onClick={() => adminAdd()}>
          Add
        </Button>
      </div>
      <div className="mb16">
        <Form
          form={form}
          onFinish={(v) => getD(v)}
          initialValues={{
            role: '',
            status: '',
          }}
        >
          <Row gutter="16">
            <Col>
              <Form.Item name="user" noStyle>
                <Input addonBefore="Account" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="nick" noStyle>
                <Input addonBefore="Name" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="phone" noStyle>
                <Input addonBefore="Phone" />
              </Form.Item>
            </Col>
            <Col flex="200px">
              <Form.Item name="role" noStyle>
                <Select name="role" style={{ width: '100%' }}>
                  <Option value="">Select Role</Option>
                  {Object.keys(role).map((k) => (
                    <Option key={k} value={k}>
                      {role[k]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item name="status" noStyle>
                <Select name="status" style={{ width: '100%' }}>
                  <Option value="">Select Status</Option>
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
                  loading={AdminListLoading}
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
            ['Role', (v) => role[v[1]]],
            ['Account'],
            ['Name'],
            ['Country Code'],
            ['Phone'],
            // [ 'Balance',(v)=>_dou(v[6]) ],
            // [ 'Max Charge',(v)=>(v[7]/1000) ],
            ['Status', (v) => status[v[8]]],
            ['Time', (v) => v[9]],
            [
              'Edit',
              (v) => (
                <Button onClick={() => SEND('admin/get', { _id: v[0] })}>
                  <EditOutlined />
                </Button>
              ),
            ],
          ]}
          data={AdminList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
