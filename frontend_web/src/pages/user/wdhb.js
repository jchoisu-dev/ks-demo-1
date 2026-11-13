import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form,Button,Input } from 'antd';
import { nTom } from 'utils/tool';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
// 
export default () => 
{
    const { UserWdhbList, UserWdhbLoading, UserWdhbReload } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    const [ form ] = Form.useForm();
    // 
    const getD = () => 
    {
        dispatch.models.SET({UserWdhbReload:'',UserWdhbLoading:1});
        SEND('user_wdhb/list');
    }
    useEffect(() => getD(), []);
    useEffect(() => {
        if(!UserWdhbReload) return;
        getD();
    }, [UserWdhbReload]);
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("红包领取")}
        </div>
        <div className="boe br5 ov aigaw">
            <div className="tc" style={{padding:'50px 0 50px'}}>
                <Form
                    form={form}
                    onFinish={(v)=>{
                        dispatch.models.SET({UserWdhbLoading:1});
                        SEND('user_wdhb/go',v)
                    }}
                >
                    <Form.Item name='hbm'>
                        <Input 
                            style={{width:450}} 
                            size="large"
                            addonBefore={t("红包码")}
                        />
                    </Form.Item>
                    <Form.Item noStyle>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            size="large" 
                            style={{width:450}}
                            loading={UserWdhbLoading}
                        >
                            {t("领取红包")}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
        <div className="tit" n="WO DE XINXI">
            {t("红包列表")}
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={[
                    [ t("时间") ],
                    [ t("红包码") ],
                    [ t("获得金豆"),v=><b>{nTom(v[2])}</b> ],
                    [ t("金豆余额"),v=>nTom(v[3]) ],
                ]} 
                data={ UserWdhbList||[] }
                pageChange={ page => SEND('user_wdhb/list', { page }) }
            />
        </div>
    </>
}