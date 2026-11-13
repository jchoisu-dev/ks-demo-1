import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button } from 'antd';
import { nTom } from 'utils/tool';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
// 
export default () => 
{
    const { UserYqhyList, UserYqhyFl  } = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auth);
    // 
    const dispatch = useDispatch();
    // 
    useEffect(() => SEND('user_yqhy/now', { page:1 }), []);
    // 
    const _url = 'https://'+window.location.host+'/w/#/zc/'+(Auth&&Auth.id||'');
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("我的邀请")}
        </div>
        <div className="boe br5 ov">
            <div style={{marginBottom:-1}}>
                <Table 
                    columns={[
                        [t("推广人数")],
                        [t("有效投注"),v=>nTom(v[1])],
                    ]} 
                    data={ [1,[[
                        UserYqhyFl&&UserYqhyFl[0]||0,
                        UserYqhyFl&&UserYqhyFl[1]||0
                    ]]] }
                />
            </div>
        </div>
        <div className="tc" style={{padding:'30px 0 0'}}>
            <CopyToClipboard text={_url} onCopy={()=>dispatch.models.SET({M:{t:t("邀请网址已复制到粘贴板"),c:<b>{_url}</b>}})}>
                <Button size="large" type="primary" style={{width:250}}>
                    {t("点击此处复制邀请网址")}
                </Button>
            </CopyToClipboard>
        </div>
        <div className="tit" n="WO DE XINXI">
            {t("下线列表")}
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={[
                    [ t("姓名") ],
                    [ t("呢称") ],
                    [ t("级别"),(v)=><>VIP <b>{v[2]}</b></> ],
                    [ t("手机号"),(v)=><>+{v[3]}</> ]
                ]} 
                data={ UserYqhyList||[] }
                pageChange={ page => SEND('user_yqhy/list', { page }) }
            />
        </div>
    </>
}