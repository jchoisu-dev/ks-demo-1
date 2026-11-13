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
    const { HdflYgz, UserYgzHave, UserYgzList, UserYgzLoading, UserYgzReload } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    const getD = (v) => 
    {
        dispatch.models.SET({
            UserYgzLoading:1,
            UserYgzReload:''
        })
        SEND('user_hdfl/ygz', v);
    }
    useEffect(() => {
        getD()
    }, []);
    useEffect(() => {
        if(!UserYgzReload) return;
        getD()
    }, [UserYgzReload]);
    const _shue = (v,k) => 
    {
        if(!v[1]) return '-';
        return <>{nTom(v[1])}</>;
    }
    const _fanli = (v) => 
    {
        if(!v[2]||v[2]=='-') return '-';
        return <><b>{nTom(v[2])}</b></>;
    }
    const _status = (e) => 
    {
        if(e==1) return <b>{t("可领取")}</b>;
        if(e==2) return <del>{t("已领取")}</del>;
        return e;
    } 
    // 
    const lq = () => 
    {
        if(!UserYgzHave || UserYgzHave=='2')
        {
            return <Button size="large" type="primary" disabled loading={UserYgzLoading} style={{width:300}}>{t("已 领 取")}</Button>
        }
        return <Button size="large" type="primary" style={{width:300}} 
            loading={UserYgzLoading}
            onClick={()=>{
                dispatch.models.SET({ UserYgzLoading:1 })
                SEND('user_hdfl/ygz_go')
            }}
        >
            {t("一键领取")}
        </Button>
    }
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("每月工资")}
        </div>
        <div className="boe br5 ov">
            <div style={{marginBottom:-1}}>
                <Table 
                    tableClass={'hover'}
                    columns={[
                        [t("日期")],
                        [t("有效流水"),(v,k)=>_shue(v,k)],
                        [t("返利金豆"),v=>_fanli(v)],
                        [t("状态"),v=>_status(v[3])]
                    ]} 
                    data={ [1, HdflYgz||[]] }
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
                    [ t("日期") ],
                    [ t("领取返利"), v=>nTom(v[2]) ],
                    [ t("金豆余额"), v=>nTom(v[3]) ],
                ]} 
                data={ UserYgzList||[] }
                pageChange={ page => getD({page}) }
            />
        </div>
    </>
}