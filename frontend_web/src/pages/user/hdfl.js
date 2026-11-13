import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { nTom } from 'utils/tool';
import { ___gamename } from 'utils/betData';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
// 
export default () => 
{
    const { UserHdfl, UserHdflHave, UserHdflList, UserHdflLoading, UserHdflReload } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    const getD = (v) => 
    {
        dispatch.models.SET({
            UserHdflLoading:1,
            UserHdflReload:''
        })
        SEND('user_hdfl/now', v);
    }
    useEffect(() => {
        getD()
    }, []);
    useEffect(() => {
        if(!UserHdflReload) return;
        getD()
    }, [UserHdflReload]);
    // 
    const _types = 
    {
        1: t("首充返利"),
        2: t("投注返利"),
        3: t("亏损返利"),
        4: t("推广返利"),
    }
    const dw = (k,v) => 
    {
        if(k==0) return t("元"); 
        return t("豆");
    }
    const _shue = (v,k) => 
    {
        if(!v[1]) return '-';
        return <>{nTom(v[1])} {dw(k)}</>;
    }
    const _lilv = (v) => 
    {
        if(!v[2]) return '-';
        return <>{v[2]} %</>;
    }
    const _fanli = (v) => 
    {
        if(!v[3]) return '-';
        return <><b>{nTom(v[3])}</b> {t("豆")}</>;
    }
    const _zt = (v) =>
    {
        if(!v[4]) return '-'; 
        if(v[4]==1) return <b>{t("可领取")}</b>;
        return v[4];
    };
    // 
    const lq = () => 
    {
        if(!UserHdflHave)
        {
            return <Button size="large" type="primary" disabled loading={UserHdflLoading} style={{width:300}}>{t("领 取")}</Button>
        }
        return <Button size="large" type="primary" style={{width:300}} 
            loading={UserHdflLoading}
            onClick={()=>{
                dispatch.models.SET({ UserHdflLoading:1 })
                SEND('user_hdfl/go')
            }}
        >
            {t("一键领取")}
        </Button>
    }
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("活动返利")}
        </div>
        <div className="boe br5 ov">
            <div style={{marginBottom:-1}}>
                <Table 
                    columns={[
                        [t("类型")],
                        [t("数额"),(v,k)=>_shue(v,k)],
                        [t("利率"),v=>_lilv(v)],
                        [t("返利"),v=>_fanli(v)],
                        [t("状态"),v=>_zt(v)]
                    ]} 
                    data={ [1, UserHdfl||[]] }
                />
            </div>
        </div>

        <div className="tc" style={{paddingTop:30}}>{lq()}</div>

        <div className="tit" n="WO DE XINXI">
            {t("领取列表")}
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={[
                    [ t("时间") ],
                    [ t("类型"), v=>_types[v[1]] ],
                    [ t("领取金豆"), v=>nTom(v[2]) ],
                    [ t("金豆余额"), v=>nTom(v[3]) ],
                ]} 
                data={ UserHdflList||[] }
                pageChange={ page => getD({page}) }
            />
        </div>
    </>
}