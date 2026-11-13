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
    const { UserPhbNow, UserPhbList, UserPhbLoading, UserPhbReload, UserPhbHave  } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    const getD = (v) => 
    {
        SEND('user_phb/now', v);
        dispatch.models.SET({
            UserPhbLoading:1,
            UserPhbReload:''
        })
    }
    useEffect(() => getD(), []);
    useEffect(() => getD(), [UserPhbReload]);
    // 
    const _m = (e) => 
    {
        if(!e || e=='-') return '-';
        return <b>{nTom(e)}</b>;
    }
    // 
    const _status = (e) => 
    {
        if(e==1) return t("待领取");
        if(e==2) return t("已领取");
        return '-';
    }
    // 
    const lq = () => 
    {
        if(!UserPhbHave)
        {
            return <Button size="large" type="primary" disabled loading={UserPhbLoading} style={{width:300}}>{t("领 取")}</Button>
        }
        return <Button 
            size="large" 
            type="primary" 
            style={{width:300}} 
            loading={UserPhbLoading}
            onClick={()=>{
                dispatch.models.SET({UserPhbLoading:1});
                SEND('user_phb/go');
            }}
        >
            {t("立即领取")}
        </Button>
    }
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("排行榜奖励")}
        </div>
        <div className="boe br5 ov">
            <div style={{marginBottom:-1}}>
                <Table 
                    columns={[
                        [t("时间"),],
                        [t("昨日排名"),],
                        [t("获得奖励"),v=>_m(v[2]) ],
                        [t("状态"),v=>_status(v[3]) ]
                    ]} 
                    data={ [[],[UserPhbNow||['-','-','-','-']]] }
                />
            </div>
        </div>
        <div className="tc" style={{paddingTop:30}}>
            {lq()}
        </div>
        <div className="tit" n="WO DE XINXI">
            {t("领取列表")}
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={[
                    [ t("时间") ],
                    [ t("昨日排名"), (v)=>v[1] ],
                    [ t("领取金豆"), (v)=>nTom(v[2]) ],
                    [ t("金豆余额"), (v)=>nTom(v[3]) ],
                ]} 
                data={ UserPhbList||[] }
                pageChange={ page=>getD({page}) }
            />
        </div>
    </>
}