import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Divider, Button, Checkbox, Input, Form, Typography } from 'antd';
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { SEND } from 'store';
// 
const { Title } = Typography;
// 
const Main = lazy(() => import('components/Layout/auth'));
import PhoneCode from 'components/Tool/PhoneCode';
import { t } from 'i18n';
// 
export default () => 
{
    const { Login, LoginLoading } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 
    const onFinish = (values) => 
    {
        dispatch.models.SET({ LoginLoading: true });
        SEND('auth_ncp/logincode', values);
        
    };
    // 
    const phoneCodeReturn = (values) => 
    {
        dispatch.models.SET({ PhoneCodeLoading:true });
        SEND('auth/login',{
            _code: Login._code,
            ...values
        })
    };
    // 
    useEffect(() => {
        if(Login&&Login._code)
        {
            dispatch.models.SET({
                M:{
                    t: t("登录安全验证"),
                    c: <PhoneCode phone={Login.phone} phoneCodeReturn={phoneCodeReturn}  />
                }
            })
        }
    }, [Login]);
    // 
    return <Main img="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/bg/auth/dl.jpeg">
        <div className="mb24">
            <Title level={3}>{t("账号登录")}</Title>
        </div>

        <Form
            onFinish={onFinish}
        >
            <Form.Item
                name="user"
                rules={[{ required:true, pattern:/^[a-zA-Z0-9\_\-\@\.]{6,26}$/, min:6, max:26, message:t("格式为 a-zA-Z0-9_-@.，长度6-26") }]}
            >
                <Input 
                    prefix={<div style={{paddingRight:6}}><UserOutlined className="site-form-item-icon" /></div>} 
                    placeholder={"demo123"} 
                    size="large" 
                />
            </Form.Item>

            <Form.Item
                name="pass"
                rules={[{ required:true, pattern:/^[a-zA-Z0-9\_\-\@\.]{6,26}$/, min:6, max:26, message:t("格式为 a-zA-Z0-9_-@.，长度6-26") }]}
            >
                <Input
                    prefix={<div style={{paddingRight:6}}><LockOutlined className="site-form-item-icon" /></div>}
                    type="password"
                    placeholder={"123123"}
                    size="large"
                />
            </Form.Item>

            <Form.Item>
                <Row justify="space-between">
                    <Col>
                        <Checkbox>{t("记住我")}</Checkbox>
                    </Col>
                    <Col>
                        <a className="login-form-forgot" onClick={()=>navigate('/wjmm')}>
                            {t("忘记密码？")}
                        </a>
                    </Col>
                </Row>
            </Form.Item>

            <Form.Item>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    size="large" 
                    block 
                    loading={LoginLoading}
                >
                {t("登 录")}
                </Button>
            </Form.Item>

            <Divider style={{color:'#666',fontSize:'14px'}}>{t("还没有账号？")}</Divider>

            <Form.Item noStyle>
                <Button block onClick={()=>navigate('/zc')}>
                    {t("注册账号")}
                </Button>
            </Form.Item>

        </Form>
    </Main>
}