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
    const { UserJyhd, UserJyhdList, UserJyhdReload } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    useEffect(() => SEND('user_jyhd/now', { page:1 }), []);
    // 
    useEffect(() => 
    {
        if(!UserJyhdReload) return;
        dispatch.models.SET({UserJyhdReload:''});
        SEND('user_jyhd/now');
    }, [UserJyhdReload]);
    // 
    const _exp = UserJyhd&&UserJyhd[0]||0;
    const _odd = UserJyhd&&UserJyhd[1]||0;
    const _dh = UserJyhd&&UserJyhd[2]||0;
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("经验换豆")}
        </div>
        <div className="boe br5 ov">
            <div style={{marginBottom:-1}}>
                <Table 
                    columns={[
                        [t("当前经验"), v=>nTom(v[0])],
                        [t("兑换比率"), v=>nTom(v[1])+' %'],
                        [t("可换金豆"), v=>nTom(v[2])],
                    ]} 
                    data={ [1,[[_exp,_odd,_dh]]] }
                />
            </div>
        </div>
        <div className="tc" style={{paddingTop:30}}>
            <Button size="large" type="primary" style={{width:300}} onClick={()=>{
                let M = {
                    t: t("经验兑换"),
                    c: t("最低领兑换经验为 1,000 豆")
                };
                if(_dh>999)
                {
                    M = {
                        t: t("经验兑换"),
                        c: <div className="kmp tl">
                            <p>{t("当前经验")}<span>{nTom(_exp)}</span></p>
                            <p>{t("兑换比率")}<span>{nTom(_odd)} %</span></p>
                            <p>{t("可换金豆")}<span><b>{nTom(_dh)}</b> {t("豆")}</span></p>
                        </div>,
                        bt: t("确定"),
                        b: () => SEND('user_jyhd/go')
                    }
                }
                dispatch.models.SET({ M });
            }}>
                {t("立即兑换")}
            </Button>
        </div>
        <div className="tit" n="WO DE XINXI">
            {t("兑换列表")}
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={[
                    [ t("时间") ],
                    [ t("兑换经验"), v=>nTom(v[1]) ],
                    [ t("兑换金豆"), v=>nTom(v[2]) ],
                    [ t("金豆余额"), v=>nTom(v[3]) ],
                ]} 
                data={ UserJyhdList||[] }
                pageChange={ page => SEND('user_jyhd/list', { page }) }
            />
        </div>
    </>
}