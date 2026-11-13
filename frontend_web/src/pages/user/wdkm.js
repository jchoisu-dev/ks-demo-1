import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { ___gamename } from 'utils/betData';
import { nTom } from 'utils/tool';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
// 
export default () => 
{
    const { Userwdkm, UserwdkmReload } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    const getD = (v) => {
        SEND('user_wdkm/list', v)
    }
    // 
    useEffect(() => getD(), []);
    useEffect(() => {
        if(!UserwdkmReload) return;
        dispatch.models.SET({UserwdkmReload:false});
        getD();
    }, [UserwdkmReload]);
    // 
    const _status = {
        1: t("待审核"),
        2: <b>{t("已审核")}</b>,
        3: <del>{t("已回收")}</del>,
        4: <del>{t("已冻结")}</del>
    }
    const kms = (v) => 
    {
        if(v[3]==2) return <Button size="small" style={{width:260}}>{v[0]}</Button>;
        return <Button size="small" disabled style={{width:260}}>{v[0]}</Button>;
    }
    // 
    const columns = [
        [ <>{t("卡密 -")} <small>{t("点击复制")}</small></>, (v)=><CopyToClipboard text={v[0]} onCopy={()=>dispatch.models.SET({M:{t:t("卡密已复制到粘贴板"),c:<b>{v[0]}</b>}})}>{kms(v)}</CopyToClipboard> ],
        [t("面额 / 元"),(v)=><><b>{nTom(v[1])}</b> {t("元")}</>],
        [t("手续费 / 豆"),(v)=><small>{v[2]&&nTom(v[2])+t(" 豆")||'-'}</small>],
        [ t("状态"), (v)=>_status[v[3]]||'-' ],
        [ t("时间"), (v)=>v[4] ]
    ];
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("我的卡密")}
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={columns} 
                data={ Userwdkm||[] }
                pageChange={ page => getD({page}) }
            />
        </div>
    </>
}