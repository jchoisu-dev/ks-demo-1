import { Row, Col, Button } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { t } from 'i18n';
// 
const _link = [
    [
        'gz.jpeg',
        t("首充返利"),
        t("以每天第一笔充值为准，隔天领取...")
    ],
    [
        'tz.jpeg',
        t("投注返利 & 亏损返利"),
        t("合计当天游戏投注金豆，隔天领取...")
    ],
    [
        'gl.jpeg',
        t("推广返利"),
        t("合计当天游戏投注金豆，隔天领取...")
    ],
    [
        'sr.webp',
        t("生日礼金"),
        t("一领即发 一路发...")
    ]
];
// 
export default () => 
{
    const navigate = useNavigate();
    // 
    return <div className='mb16'>
        <Row gutter={16} align="middle">
            {_link.map((v,k)=>(
                <Col span={6} key={k}>
                    <div className='bf br5 ov'>
                        <img 
                            src={`https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/home/promo/${v[0]}`} 
                            width="100%"
                            height="192px"
                        />
                        <div className='p16'>
                            <h2 className='mb10'>{v[1]}</h2>
                            <p>{v[2]}</p>
                        </div>
                        <div className='p16'>
                            <Row justify='space-between' align="middle">
                                <Col>
                                    <font color="#666" >{t("长期活动")}</font>
                                </Col>
                                <Col>
                                    <Button type="primary" onClick={()=>navigate('/promo')}>
                                        {t("更多")}
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    </div>
}