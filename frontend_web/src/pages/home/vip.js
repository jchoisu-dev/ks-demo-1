import { useState } from 'react';
import { Carousel as Car, Row, Col, Button } from 'antd';
import Carousel from 'react-spring-3d-carousel';
import { v4 as uuidv4 } from "uuid";
import { config } from "react-spring";
import { t } from 'i18n';
// 
export default () =>
{
    const items = [
        1,
        2,
        3
    ];
    const hots = [
        1,2
    ]
    //   
    const Carroussel = () =>
    {
        const cards = [
            {
              key: uuidv4(),
              content: <img src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/vip/mn/1.jpg" />
            },
            {
              key: uuidv4(),
              content: <img src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/vip/mn/2.jpg" />
            },
            {
              key: uuidv4(),
              content: <img src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/vip/mn/3.jpg" />
            },
            {
              key: uuidv4(),
              content: <img src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/vip/mn/4.jpg" />
            },
            {
              key: uuidv4(),
              content: <img src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/vip/mn/5.jpg" />
            }
        ];
        // 
        const table = cards.map((v, k) => {
          return { ...v, onClick: () => setGoToSlide(k) };
        });
        // 
        const [goToSlide, setGoToSlide] = useState(null);
        // 
        return <div
            style={{ width: "50%", height:500, margin:"0 auto" }}
          >
            <Carousel
              slides={table}
              goToSlide={goToSlide}
              offsetRadius={2}
              showNavigation={false}
              animationConfig={config.gentle}
            />
        </div>
    }
    // 
    return <>
        <div>
            <Car autoplay>
                {items.map((v,k)=>(
                    <div key={k}>
                        <img src={`https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/vip/${v}.jpg`} width="100%" height={400} />
                    </div>
                ))}
            </Car>
        </div>
        <div 
            style={{ 
                background:"url(https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/vip/bj.jpg)", 
                backgroundRepeat:"no-repeat", 
                backgroundPosition:'center center',
                width:"100%"
            }}>
                <div style={{padding:"150px 0 20px"}}>
                    <Carroussel />
                </div>
        </div>
        <div 
            className='tc mns pr'
            style={{ 
                background:"url(https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/vip/bj2.jpg)", 
                backgroundRepeat:"no-repeat", 
                backgroundPosition:'center center',
                width:"100%",
                backgroundSize:"auto",
                height:878,
                padding:"65px 0"
            }}>
                <div className='mn'>
                    <h3>{t("与性感尤物负距离接触，比赢钱更刺激；十八般武艺，为您解锁各种姿势；无论您在何时何地，都可以为您贴心服务。")}</h3>
                    <Row justify='center' gutter="40" align='middle'>
                        {hots.map((v,k)=>(
                            <Col key={k}>
                                <div className='pr'>
                                    <img src={`https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/vip/mn${v}.jpg`} />
                                    <div 
                                        className='pa' 
                                        style={{
                                            bottom: "20px",
                                            width: "100%",
                                        }}
                                    >
                                        <Row justify='end' align='middle'>
                                            <Col>
                                                <Button>{t("联系客服")}</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
                <div className='pa gz'>
                    {t("1. 申请兑换成功后，VIP经理将在12小时内与您联系；")} <br/>
                    {t("2. 每种特权有效期内仅限兑换一次，积分一旦兑换成功，均无法更换与撤销。")}<br/>
                    {t("3. 本活动最终解释权归大豹公司所有。")}
                </div>
        </div>
        
    </>
}