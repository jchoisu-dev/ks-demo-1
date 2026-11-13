import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Divider,Button,Input,Form } from 'antd';
import { formStatus, formFieldChange } from 'utils/tool';
import { SEND } from 'store';
import { t } from 'i18n';
// 
export default () => 
{
    const { Userwdzl, UserwdzlStatus, UserwdzlLoading } = useSelector((state) => state.models);
    const dispatch = useDispatch();
    // 
    const [ form ] = Form.useForm();
    // 
    useEffect(() => SEND('user/wdzl', { page:1 }), []);
    // 
    const onFinish = (values) => 
    {
        dispatch.models.SET({ UserwdzlLoading:true });
        SEND('user/wdzl_change', values);
    };
    // 
    const item = {
        nick: [ t("昵称"), [{ required:true, pattern:/^[a-zA-Z0-9_\u4E00-\u9FA5]{2,16}$/, min:2, max:16, message:t("格式为 a-zA-Z0-9_或中文，长度2-16") }] ],
        des: [ t("个性签名"), [{ required:true, pattern:/^[a-zA-Z0-9_\u4E00-\u9FA5]{2,16}$/, min:5, max:30, message:t("格式为 a-zA-Z0-9_或中文，长度5-30") }] ],
        qq: [ 'QQ', [{ required:true, pattern:/^\d{5,15}$/, message:t("格式为 5-15位数字") }] ],
        wx: [ t("微信号"), [{ required:true, pattern:/^[a-zA-Z0-9\_\-]{6,30}$/, min:6, max:30, message:t("格式为 a-zA-Z0-9_-长度6-30") }] ],
        name: [ t("真实姓名"), [{ required:true, pattern:/^[a-zA-Z\u4E00-\u9FA5]{2,30}$/, min:2, max:30, message:t("格式为 a-zA-Z或中文，长度2-30") }] ],
    };
    // 
    useEffect(() => {
        if(Userwdzl) form.setFieldsValue({...Userwdzl});
    }, [Userwdzl]);
    // 
    let isEdit = ['nick','des'];
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("我的资料")}
        </div>
        <div style={{width:500,margin:'0 auto'}}>
            <div style={{padding:'30px 0 20px'}} className="aigaw">
                <Form
                    form={form}
                    onFinish={onFinish}
                >
                    {Object.keys(item).map(k=>(
                        <Form.Item
                            key={k}
                            name={k}
                            rules={item[k][1]}
                            {...formStatus(UserwdzlStatus,k)}
                        >
                            <Input 
                                addonBefore={item[k][0]}
                                size="large" 
                                disabled={!isEdit.find(key=>key==k)&&(Userwdzl&&Userwdzl[k])}
                                onChange={()=>formFieldChange(dispatch.models.SET,UserwdzlStatus,k)}
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
                            loading={UserwdzlLoading}
                        >
                        {t("修 改")}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <Divider style={{fontWeight:300,color:'#666'}}>{t("温馨提示")}</Divider>
            <div style={{color:'#666',fontSize:13}}>
                <p style={{marginBottom:10}}>{t("为了保证玩家的信息安全性")}</p>
                <p>{t("1、QQ只可以修改一次。")}</p>
                <p>{t("2、微信号只可以修改一次。")}</p>
                <p>{t("3、真实姓名，会影响收款，请认真填写，只可以修改一次")}</p>
            </div>
        </div>
        
    </>
}