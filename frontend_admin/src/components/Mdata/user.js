//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { nTom } from '../../utils/tool';
import { Row, Col, Form, Input, Button } from 'antd';
//
const UserChange = dynamic({
  loader: () => import('@/components/Mdata/user_change'),
});
const UserShow = dynamic({
  loader: () => import('@/components/Mdata/user_show'),
});
//
export default (props) => {
  //
  const id = props.t;
  const { SET, SEND } = useModel('data');
  const [form] = Form.useForm();
  //
  const _get = (d) => {
    SET({
      MdataUser: '',
      BLM: '',
      BLL: 1,
    });
    SEND('mdata/user', { ...d });
  };
  //
  const TypeChange = () => {
    const { MdataUserType } = useModel('data');
    //
    if (MdataUserType == 2) return <UserChange user_id={id} />;
    return <UserShow />;
  };
  //
  return (
    <b
      style={{ cursor: 'pointer' }}
      onClick={() => {
        _get({ _user_id: id });
        form.setFieldsValue({ _user_id: parseInt(id) });
        SET({
          M: {
            t: (
              <div className="aigaw">
                <Form
                  form={form}
                  onFinish={(v) => {
                    _get(v);
                  }}
                  onValuesChange={(v) => {
                    let _user_id = parseInt(v._user_id);
                    if (!_user_id || _user_id == NaN) _user_id = id;
                    form.setFieldsValue({ _user_id });
                  }}
                >
                  <Form.Item noStyle="1">
                    <Button
                      style={{ marginRight: 20 }}
                      onClick={() => SET({ MdataUserType: 1 })}
                    >
                      Profile Overview
                    </Button>
                  </Form.Item>
                  <Form.Item noStyle="1">
                    <Button
                      style={{ marginRight: 20 }}
                      onClick={() => SET({ MdataUserType: 2 })}
                    >
                      Deduct Points
                    </Button>
                  </Form.Item>
                  <Form.Item name="_user_id" noStyle="1">
                    <Input
                      style={{ width: 450 }}
                      placeholder={id}
                      addonBefore={<b>Member ID</b>}
                      addonAfter={<Button htmlType="submit">Search</Button>}
                    />
                  </Form.Item>
                </Form>
              </div>
            ),
            c: <TypeChange />,
            bc: () => {
              SET({
                MdataUserType: 1,
              });
            },
          },
        });
      }}
    >
      {props.t}
    </b>
  );
};
