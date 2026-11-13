import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'antd';
import { t } from 'i18n';
// 
const _top = {
    'zc': [t("免费注册"), 'FREE REGISTRATION'],
    'agents': [t("快速充值"), 'FAST RECHARGE'],
    'promo':[t("优惠大厅"), 'PROMOTIONS'],
    'game':[t("火爆游戏"), 'HOT GAMES']
};
// 
export default () => 
{
    const navigate = useNavigate();
    // 
    return <div className='mb16'>
        <Row align='middle' gutter="15">
            {Object.keys(_top).map(k=>(
                <Col span={6} key={k}>
                    <div 
                        className='cu bf br5 bx p16' 
                        onClick={()=>{navigate('/'+k)}}
                    >
                        <Row align='middle' gutter={15}>
                            <Col>
                                <img src={`https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/home/top/${k}.png`} />
                            </Col>
                            <Col>
                                <h2>{_top[k][0]}</h2>
                                <p className='c6'>{_top[k][1]}</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
            ))}
        </Row>
    </div>
}