import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { GameLocal, GameName } from 'utils/game';
import { Row, Col, Divider } from 'antd';
import { t } from 'i18n';
// 
const User = lazy(() => import('components/Game/qun/user') );
const Tool = lazy(() => import('components/Game/qun/tool') );
const Show = lazy(() => import('components/Game/qun/show') );
// 
export default () => 
{
    const DATA = useSelector((state) => state.models);
    // 
    let location = useLocation();
    // 
    const loca = GameLocal(location.pathname);
    const { category, type } = loca;
    // 
    const Lottery = DATA&&DATA['Lottery'+category+''+type];
    const peroids = Lottery&&Lottery[1][0]||'-';
    // 
    return <div className="w">
        <div className="bf br5">
            <Row gutter={0}>
                <Col span={4}>
                    <div>
                        <User loca={loca} />
                    </div>
                </Col>
                <Col span={10}>
                    <div style={{borderLeft:'1px solid #eee',padding:'16px'}}>
                        <h4 className="tc" style={{marginBottom:0}}>{GameName(category,type)}{t("，第")} <b>{peroids}</b> {t("期投注")}</h4>
                        <Divider style={{margin:'15px 0'}} />
                        <Tool loca={loca} __peroids={peroids} />
                    </div>
                </Col>
                <Col span={10}>
                    <div style={{borderLeft:'1px solid #eee'}}>
                        <Show loca={loca} __peroids={peroids} />
                    </div>
                </Col>
            </Row>
        </div>
    </div>
}