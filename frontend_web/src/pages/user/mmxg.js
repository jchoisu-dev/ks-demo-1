import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, Button, Input, Form } from 'antd';
import { formStatus, formFieldChange } from 'utils/tool';
import { SEND } from 'store';
import { t } from 'i18n';
// 
export default () => 
{
    const { UserdlmmStatus, UserdlmmLoading, UseraqmStatus, UseraqmLoading } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    const dlFinish = (values) => 
    {
        dispatch.models.SET({ UserdlmmLoading:true });
        SEND('user/wdzl_dlmm_change', values);
    };
    const aqFinish= (values) => 
    {
        dispatch.models.SET({ UseraqmLoading:true });
        SEND('user/wdzl_aqm_change', values);
    };
    // 
    const dlitem = {
        old: t("旧密码"),
        pass: t("新密码"),
        re: <small>{t("确认新密码")}</small>
    };
    const aqitem = {
        old: t("旧安全码"),
        pass: t("新安全码"),
        re: <small>{t("确认安全码")}</small>
    };
    const forms = [
        [ t("登录密码"), 'WO DE XINXI', dlFinish, dlitem, UserdlmmStatus, UserdlmmLoading ],
        [ t("安全码"), 'WO DE XINXI', aqFinish, aqitem, UseraqmStatus, UseraqmLoading ],
    ];
    //
    useEffect(() => 
    {
        dispatch.models.SET({
            UserdlmmStatus:'', 
            UserdlmmLoading:'',
            UseraqmStatus:'', 
            UseraqmLoading:'',
        })
    }, []);
    // 
    return <>
        {forms.map((vv,kk)=>(
            <div key={kk}>
                <div className="tit" n={vv[1]}>
                    {vv[0]}
                </div>
                <div style={{width:500,margin:'0 auto'}}>
                    <div style={{padding:'20px 0'}} className="aigaw">
                        <Form
                            name={'form-mm-'+kk}
                            onFinish={vv[2]}
                        >
                            {Object.keys(vv[3]).map(k=>(
                                <Form.Item
                                    key={k}
                                    name={k}
                                    rules={[{ required:true, pattern:/^[a-zA-Z0-9\_\-\@\.]{6,26}$/, min:6, max:26, message:t("格式为 a-zA-Z0-9_-@.，长度6-26") }]}
                                    {...formStatus(vv[4],k)}
                                >
                                    <Input.Password
                                        addonBefore={vv[3][k]}
                                        size="large" 
                                        onChange={()=>formFieldChange(dispatch.models.SET({}),vv[4],k)}
                                    />
                                </Form.Item>
                            ))}
                            <Divider />
                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    size="large" 
                                    block 
                                    loading={vv[5]}
                                >
                                    {t("修改")}{vv[0]}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        ))}
        <div style={{width:500,margin:'0 auto'}}>
            <Divider style={{fontWeight:300,color:'#666'}}>{t("温馨提示")}</Divider>
            <div style={{color:'#666',fontSize:13}}>
                <p className="tc">{t("初始安全码，与注册时的登录密码一样")}</p>
            </div>
        </div>
    </>
}