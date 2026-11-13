import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nTom } from 'utils/tool';
import { ___gamename } from 'utils/betData';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
// 
export default () => 
{
    const { Agentjdmx } = useSelector((state) => state.models);
    // 
    useEffect(() => SEND('agent_jdmx/list'), []);
    // 1用户充值 11充值撤回 2回收卡密 3额度转出 4额度接收 5客服充值
    const types = {
        1: t("用户充值"),
        11: <b>{t("充值撤回")}</b>,
        2: <b>{t("回收卡密")}</b>,
        3: t("额度转出"),
        31: <b>{t("额度接收")}</b>,
        5: <b>{t("客服充值")}</b>,
        6: t("金豆提现"),
        61: <b>{t("提现取消")}</b>,
        // 
        64: <b>{t("推广返利")}</b>,
    }
    const modeDou = (mode, dou) => 
    {
        if(mode==2) return <b>+ {nTom(dou)}</b>;
        return <>- {nTom(dou)}</>;
    }
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("金豆明细")}
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={[
                    [ t("分类"), (v)=>types[v[0]]||v[0] ],
                    [ t("数量"), (v)=>modeDou(v[1],v[2]) ],
                    [ t("金豆余额"), (v)=>nTom(v[3]) ],
                    [ t("描述"), (v)=>v[4]||'-' ],
                    [ t("时间"), (v)=>v[5] ]
                ]} 
                data={ Agentjdmx||[] }
                pageChange={ page => SEND('agent_jdmx/list', { page }) }
            />
        </div>
    </>
}