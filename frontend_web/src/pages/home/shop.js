import { lazy } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Steps } from 'antd';
import { nTom } from 'utils/tool';
import { t } from 'i18n';
// 
const Main = lazy(() => import('components/Home/Main'));
// 
const arr = [
    100,
    500,
    1000,
    2000,
    5000,
    10000,
    20000,
    50000
];
// 
const _steps = [
    { title:t("存入银行"), description:t("将金豆进入银行") },
    { title:t("进入商城"), description:t("选择充值卡") },
    { title:t("兑换卡密"), description:t("银行金豆兑换卡密") },
    { title:t("代理回收"), description:t("复制卡密给代理回收") }
];
// 
export default () => 
{
    const navigate = useNavigate();
    // 
    return <Main
        ban="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/bg/phb.jpg"
        pos = "center 500px"
        bgc = "#f5f5f5"
    >
        <div style={{textAlign:'center',padding:'140px 0 46px'}}>
            {/* <img src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/bg/rank/szww.png" /> */}
        </div>
        <div className="block w p24 br10 bx">
            <div className="title tc">
                {t("卡密兑换")}
            </div>
            <div className="br10 bf p24 mb24">
                <Steps current={1} items ={_steps} />
            </div>
            <Row gutter={24}>
                {/* <Col span={6}>
                    <div className={"bf ov br10 cu shop mb24"} onClick={()=>navigate('/shop/100')}>
                        <div className="shopbk">
                            <img src={'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/shop/dh/100.png'} />
                            <h3>自定义金额</h3>
                            <p>{nTom(100*1000)} 起</p>
                            <Button shape="round" block>立即兑换</Button>
                        </div>
                    </div>
                </Col> */}
                {arr.map((v,k)=>(
                    <Col key={k} span={6}>
                        <div className={"bf ov br10 cu shop"+(k<3?' mb24':'')} onClick={()=>navigate('/shop/'+v)}>
                            <div className="shopbk">
                                <img src={'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/shop/dh/'+v+'.png'} />
                                <h3>{nTom(v)}{t("元 充值卡")}</h3>
                                <p>{nTom(v*1000)}</p>
                                <Button shape="round" block>{t("立即兑换")}</Button>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    </Main>
}