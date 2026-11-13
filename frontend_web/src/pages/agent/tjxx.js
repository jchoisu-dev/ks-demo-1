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
    const { AgentTjxx, AgentTjxxList, AgentTjxxListSum, AgentTjxxLoading } = useSelector((state) => state.models);
    // 
    useEffect(() => SEND('agent_tjxx/now'), []);
    const tds = (v,b) => 
    {
        if(!v) return '-';
        if(b) return <b>{nTom(v)}</b>;
        return nTom(v);
    }
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("季度业绩")}
        </div>
        <div className="boe br5 ov" style={{marginBottom:10}}>
            <div style={{marginBottom:-1}}>
                <Table 
                    tableClass={'hover'}
                    columns={[
                        [ t("日期") ],
                        [ t("销售总额"), (v)=>tds(v[1],1) ],
                        [ t("销售利润"), (v)=>tds(v[2]) ],
                        [ t("回收总额"), (v)=>tds(v[3],1) ],
                        [ t("回收利润"), (v)=>tds(v[4]) ],
                        [ t("总利润"), (v)=>tds(v[5]) ]
                    ]} 
                    data={ AgentTjxx&&[[],AgentTjxx]||[] }
                />
            </div>
        </div>

        <div className="tit" n="WO DE XINXI">
            {t("月度统计")}
        </div>
        
        <div className="boe br5 ov">
            <div style={{marginBottom:-1}}>
                <Table 
                    tableClass={'hover'}
                    columns={[
                        [ t("日期"),(v)=>v[0]=='sum'?t("合计"):v[0] ],
                        [ t("销售总额"), (v)=>tds(v[1],1) ],
                        [ t("销售利润"), (v)=>tds(v[2]) ],
                        [ t("回收总额"), (v)=>tds(v[3],1) ],
                        [ t("回收利润"), (v)=>tds(v[4]) ],
                        [ t("总利润"), (v)=>tds(v[5]) ]
                    ]} 
                    data={ AgentTjxxList&&[[1,1],AgentTjxxList]||[] }
                />
            </div>
        </div>
    </>
}