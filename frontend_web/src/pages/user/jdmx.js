import { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { nTom } from 'utils/tool';
import { ___gamename } from 'utils/betData';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
// 
export default () => 
{
    const { Userjdmx  } = useSelector((state) => state.models);
    // 
    const getD = (v) => {
        SEND('user_jdmx/list', v)
    }
    useEffect(() => getD(), []);
    // 
    const types = {
        1: t("银行存豆"),
        2: <b>{t("银行取豆")}</b>,
        3: t("游戏投注"),
        4: <b>{t("游戏中奖")}</b>,
        5: <b>{t("代理充值")}</b>,
        51: t("充值撤回"),
        //
        61: <b>{t("首充返利")}</b>,
        62: <b>{t("投注返利")}</b>,
        63: <b>{t("亏损返利")}</b>,
        64: <b>{t("推广返利")}</b>,
        // 
        65: <b>{t("每日签到")}</b>,
        66: <b>{t("月工资")}</b>,
        67: <b>{t("排行榜奖励")}</b>,
        //
        7: <b>{t("经验换豆")}</b>,
        8: <b>{t("红包领取")}</b>,
        9: t("客服扣除")
    }
    const modeDou = (mode, dou) => 
    {
        if(mode==2) return <b>+ {nTom(dou)}</b>;
        return <>- {nTom(dou)}</>;
    }
    // 
    const columns = [
        [ t("类型"), (v)=>types[v[0]]||v[0] ],
        [ t("数量"), (v)=>modeDou(v[1],v[2]) ],
        [ t("金豆余额"), (v)=>nTom(v[3]) ],
        [ t("描述"), (v)=>v[4]||'-' ],
        [ t("时间"), (v)=>v[5] ]
    ];
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("金豆明细")}
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={columns} 
                data={ Userjdmx||[] }
                pageChange={ page => getD({page}) }
            />
        </div>
    </>
}