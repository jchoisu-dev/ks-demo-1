import { useEffect } from 'react';
import { useModel, dynamic, history } from 'umi';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Modal = dynamic({ loader: () => import('@/components/Modal') });
const PhoneCode = dynamic({
  loader: () => import('@/components/Tool/PhoneCode'),
});

export default (props) => {
  const { SET, SEND, Login, AuthLoading, A } = useModel('data');
  const [form] = Form.useForm();
  //
  const onFinish = (v) => {
    SET({ AuthLoading: true });
    // SEND('auth/logincode',v);
    SEND('auth/login', v);
    //
    // new TencentCaptcha('2038774995', (res)=>
    // {
    //     if(res.ret>0)
    //     {
    //         SET({ AuthLoading: false });
    //         return;
    //     }
    //     SEND('auth/logincode',{
    //         ticket: res.ticket,
    //         randstr: res.randstr,
    //         ...v
    //     })
    // }).show();
  };
  //
  // const phoneCodeReturn = (values) =>
  // {
  //     SET({ PhoneCodeLoading:true });
  //     SEND('auth/login',{
  //         _code: Login._code,
  //         ...values
  //     })
  // };
  //
  // useEffect(() => {
  //     if(Login&&Login._code)
  //     {
  //         SET({
  //             M:{
  //                 t: '登录安全验证',
  //                 c: <PhoneCode phone={Login.phone} phoneCodeReturn={phoneCodeReturn}  />
  //             }
  //         })
  //     }
  // }, [Login]);
  // 动作
  useEffect(() => {
    if (A && A.u) {
      history.push('/' + A.u);
      SET({ A: '' });
    }
  }, [A]);
  //
  const onFormChange = (v) => {
    // console.log(v);
  };
  return (
    <>
      <div className="main">
        <div className="block">
          <div className="login">
            {/* <h2 className="tc mb24">???</h2> */}
            <Form
              form={form}
              onFinish={onFinish}
              onValuesChange={(v) => onFormChange(v)}
            >
              <Form.Item name="user">
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  size="large"
                />
              </Form.Item>
              <Form.Item name="pass">
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={AuthLoading}
                >
                  LOG IN
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Modal />
    </>
  );
};
