import { Row, Col } from 'antd';
import { useNavigate } from "react-router-dom";
import { t } from 'i18n';
//  
const _games = [
    [ t("加拿大快乐8"), 'jnd'],
    [ t("加拿大PK"), 'pk'],
    [ t("加拿大西部"), 'jnc'],
    [ t("台湾宾果"), 'bj'],
    [ t("台湾蛋蛋"), 'dd'],
    [ t("澳洲快乐8"), 'au'],
    [ t("俄勒冈"), 'elg'],
    [ t("斯洛伐克"), 'slfk'],
    [ t("韩国快乐8"), 'kr'],
    [ t("比特币"), 'btc'],
    [ t("群 2.14"), 'qwf'],
    [ t("群 2.8"), 'qwf'],
];
// 
export default () => 
{
    const navigate = useNavigate();
    // 
    return <div className="games">
        <Row gutter={[10,10]}>
            {_games.map((v,k)=>(
                <Col span={6} key={k}>
                    <div 
                        className="tc bf br5 bx cu" 
                        // onClick={()=>{navigate('/game/'+v[1])}}
                        style={{padding:"15px 20px"}}
                    >
                        <Row justify="space-between" align="middle" gutter="15">
                            <Col>
                                <h2>{v[0]}</h2>
                            </Col>
                            <Col span={9}>
                                <img 
                                    src={'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/game/'+(['q214','q28'].find((n)=>n==v[1])?'qwf':v[1])+'.png'} 
                                    width="100%"
                                />
                            </Col>
                        </Row>
                    </div>
                </Col>
            ))}
        </Row>
    </div>
}