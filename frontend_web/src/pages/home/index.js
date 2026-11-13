import { lazy, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Tooltip } from 'antd';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Slider = lazy(() => import('components/Home/Slider'));
const TopData = lazy(() => import('components/Home/TopData'));
const Marquees = lazy(() => import('components/Home/Marquees'));
const Newdata = lazy(() => import('components/Home/Newdata'));
const Gamelist = lazy(() => import('components/Home/Gamelist'));
const Acti = lazy(() => import('components/Home/Active'));
const Band = lazy(() => import('components/Home/Band'));
const Popup = lazy(() => import('components/Popup'));
// 
export default () => 
{
    // useEffect(() => {
    //     SEND('home/index',{game:'btc28'});
    // }, []);
    // 
    return <>
        <Slider />
        <Marquees />
        <div className="home">
            <div className="w">
                <TopData />
                {/* <Newdata /> */}
                <h1 t="Hot Game Recommendations">{t("火爆游戏推荐")}</h1>
                <Gamelist />
                <h1 t="Special Promotions">{t("优惠活动")}</h1>
                <Acti />
                <h1 t="Quality Service Experience">品质服务 极致体验</h1>
                <Band />
                </div>
                <div className={'fixedright'} style={{display:(document.body.clientWidth<1360)?'none':''}}>
                <div className={'formula'}></div>
                <ul className={'addforum cu'}>
                    <Tooltip placement="left">
                        <li onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <img src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/icon/btop.png" />
                        </li>
                    </Tooltip>
                    <Tooltip placement="left" title={<>{t("在线客服QQ")}<br />286666991<br /><br />{t("QQ群")}<br />521171231</>}><li></li></Tooltip>
                    <Tooltip placement="left" title={ t("联系客服") }><li></li></Tooltip>
                    <Tooltip placement="left" title={t(" 联系客服 ")}><li></li></Tooltip>
                    <Tooltip placement="left" title={t(" 联系客服 ")}><li><Link to="/agents"></Link></li></Tooltip>
                </ul>
            </div>
        </div>
        {/* <Popup /> */}
    </>
}