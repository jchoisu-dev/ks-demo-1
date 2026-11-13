import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Divider, Button, Input, Form } from 'antd';
import { formStatus, formFieldChange } from 'utils/tool';
import { nTom, mTon } from 'utils/tool';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
// 
export default () => 
{
    const { Userwdyh, UserwdyhList, 
        UserdbankcunStatus, UserdbankcunLoading,
        UserdbankquStatus, UserdbankquLoading,
        UserdbankReload  
    } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    const form = [
        ...Form.useForm(),
        ...Form.useForm()
    ];
    //
    const getD = (v) => 
    {
        dispatch.models.SET({
            UserdbankcunStatus:'', 
            UserdbankcunLoading:'',
            UserdbankquStatus:'', 
            UserdbankquLoading:'',
            UserdbankReload:''
        });
        form[0].setFieldsValue({num:'',safe:''});
        form[1].setFieldsValue({num:'',safe:''});
        SEND('user_wdyh/now',v);
    }
    useEffect(() => getD(), []);
    useEffect(() => getD(), [UserdbankReload]);
    // 
    const cunFinish = (values) => 
    {
        dispatch.models.SET({ UserdbankcunLoading:true });
        values['num'] = mTon(values['num']);
        // console.log(values)
        SEND('user_wdyh/cun', values);
    };
    const quFinish= (values) => 
    {
        dispatch.models.SET({ UserdbankquLoading:true });
        values['num'] = mTon(values['num']);
        SEND('user_wdyh/qu', values);
    };
    // 
    const forms = [
        [ cunFinish, UserdbankcunStatus, UserdbankcunLoading, t("存豆") ],
        [ quFinish, UserdbankquStatus, UserdbankquLoading, t("取豆") ],
    ];
    // 
    const barr = [ t("全部"),'1/10','1/4','1/3','1/2' ];
    const types = {
        1: <b>{t("存豆")}</b>,
        2: t("取豆"),
        3: t("卡密兑换"),
        4: t("客服扣除")
    }
    const numc = (v) => 
    {
        if(v[1]==1) return <b>+ {nTom(v[2])}</b>
        return <>- {nTom(v[2])}</>
    }
    // 
    const columns = [
        [ t("时间") ],
        [ t("类型"), (v)=>types[v[1]] ],
        [ t("数量"), (v)=>numc(v) ],
        [ t("银行金豆"), (v)=>nTom(v[4]) ],
        [ t("金豆余额"), (v)=>nTom(v[3]) ],
    ];
    // 
    const _d_b = [ Userwdyh&&Userwdyh.dou||0, Userwdyh&&Userwdyh.bank||0 ];
    // 
    const setiv = (kk, k) => 
    {
        const _v = [ 1, .1, .25, .33, .5 ];
        form[kk].setFieldsValue({
            num: nTom(parseInt(_v[k]*_d_b[kk]))
        })
    }
    const onFormChange = ((kk,v) => 
    {
        if(!v||!v.num) return;
        let _vn = mTon(v.num);
        if(v.num>parseInt(_d_b[kk])) _vn = _d_b[kk];
        form[kk].setFieldsValue({
            num: nTom(_vn)
        })
    })
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("大豹国际中心银行")}
        </div>
        <div className="table boe br5 ov">
            <table style={{marginBottom:-1}}>
                <thead>
                    <tr>
                        <th>{t("金豆余额")}</th>
                        <th>{t("银行金豆")}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div style={{padding:'8px 0',fontSize:18}}>
                                <b>{nTom(_d_b[0])}</b>
                            </div>
                        </td>
                        <td>
                            <div style={{padding:'8px 0',fontSize:18}}>
                                <b>{nTom(_d_b[1])}</b>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>{t("存豆")}</td>
                        <td>{t("取豆")}</td>
                    </tr>
                    <tr>
                    {forms.map((vv,kk)=>(
                        <td key={kk}>
                            <div style={{width:'86%',margin:'30px auto 0'}} className="aigaw">
                                <div style={{paddingBottom:20}}>
                                    <Row gutter="22">
                                        {barr.map((v,k)=>(
                                            <Col flex="auto" key={k}>
                                                <Button
                                                    block
                                                    onClick={()=>setiv(kk,k)}
                                                >
                                                    {v}
                                                </Button>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                                <Form
                                    name={'form-mm-'+kk}
                                    form={form[kk]}
                                    onFinish={vv[0]}
                                    onValuesChange={(v)=>onFormChange(kk,v)}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        name="num"
                                        {...formStatus(vv[1],'num')}
                                    >
                                        <Input
                                            addonBefore={t("数量")}
                                            onChange={()=>formFieldChange(dispatch.models.SET,vv[1],'num')}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="safe"
                                        rules={[{ required:true, pattern:/^[a-zA-Z0-9\_\-\@\.]{6,26}$/, min:6, max:26, message:t("格式为 a-zA-Z0-9_-@.，长度6-26") }]}
                                        {...formStatus(vv[1],'safe')}
                                    >
                                        <Input.Password
                                            addonBefore={t("安全码")}
                                            onChange={()=>formFieldChange(dispatch.models.SET,vv[1],'safe')}
                                        />
                                    </Form.Item>
                                    <Divider />
                                    <Form.Item>
                                        <Button 
                                            type="primary" 
                                            htmlType="submit" 
                                            size="large"
                                            block
                                            loading={vv[2]}
                                        >
                                            {vv[3]}
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </td>
                    ))}
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="tit" n="WO DE XINXI">
            {t("存取记录")}
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={columns} 
                data={ UserwdyhList||[[1,1],[]] }
                pageChange={ page => getD({page}) }
            />
        </div>
    </>
}