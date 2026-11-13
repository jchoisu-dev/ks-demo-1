import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { nTom } from 'utils/tool';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
// 
export default () => 
{
    const { UserMrqdList, UserMrqdLoading, UserMrqdReload  } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    const getD = (v) => 
    {
        SEND('user/mrqd_list', v);
        dispatch.models.SET({UserMrqdLoading:'',UserMrqdReload:''})
    }
    useEffect(() => getD(), []);
    useEffect(() => getD(), [UserMrqdReload]);
    // 
    const qd = () => 
    {
        dispatch.models.SET({UserMrqdLoading:true});
        SEND('user/mrqd_go');
    }
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("每日签到")}
        </div>
        <div className="boe br5 ov">
            <div style={{marginBottom:-1}}>
                <Table 
                    columns={[
                        ['VIP 1'],
                        ['VIP 2'],
                        ['VIP 3'],
                        ['VIP 4'],
                        ['VIP 5'],
                        ['VIP 6'],
                        ['VIP 7']
                    ]} 
                    data={ [1,[[
                        100,
                        200,
                        300,
                        400,
                        500,
                        999,
                        1080
                    ]]] }
                />
            </div>
        </div>
        <div className="tc" style={{paddingTop:30}}>
            <Button size="large" type="primary" style={{width:300}} onClick={()=>qd()} loading={UserMrqdLoading}>
                {t("立即签到")}
            </Button>
        </div>
        <div className="tit" n="WO DE XINXI">
            {t("签到列表")}
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={[
                    [ t("时间") ],
                    [ t("级别"), (v)=><>VIP {v[1]}</> ],
                    [ t("领取金豆"), (v)=>nTom(v[2]) ],
                    [ t("金豆余额"), (v)=>nTom(v[3]) ],
                ]} 
                data={ UserMrqdList||[] }
                pageChange={ page => getD({page}) }
            />
        </div>
    </>
}