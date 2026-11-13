import { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
// 
export default () => 
{
    const { Userrzjl } = useSelector((state) => state.models);
    // 
    useEffect(() => SEND('user_rzjl/list'), []);
    // 
    const columns = [
        [ t("时间") ],
        [ t("内容") ],
        [ 'IP' ]
    ];
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("日志记录")}
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={columns} 
                data={ Userrzjl||[] }
                pageChange={ page => SEND('user_rzjl/list', { page }) }
            />
        </div>
    </>
}