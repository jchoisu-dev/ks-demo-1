import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { nTom } from 'utils/tool';
import { Button, Divider } from 'antd';
import { GameLocal } from 'utils/game';
import { t } from 'i18n';
// 
export default () => 
{
    let location = useLocation();
    const { type, category } = GameLocal(location.pathname);
    // 
    const _auth = useSelector((state) => state.auths);
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 
    const qwfType = (e) => 
    {
        if(e=='pk') return 'sc';
        return 28;
    }
    // 
    const _name_gz = () => 
    {
        if(category=='q214')
        {
            return [t("群2.14"), <><b>13</b>、<b>14</b></>]
        }
        return [t("群2.8"), <><b>13</b>、<b>14</b>、<b>{t("豹")}</b>、<b>{t("顺")}</b>、<b>{t("对")}</b></>]
    }
    const [ _name,_gz ] = _name_gz();
    // 
    return <div className="p16">
        <div className="br5 tc mb10 p16" style={{border:'1px solid #ddd'}}>
            <img src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/icon/user.png" width="60" />
            <p>{_auth&&_auth.nick}</p>
        </div>
        <Button block className="mb10">
            {_auth&&nTom(_auth.dou)||0} {t("豆")}
        </Button>
        <Button block className="mb10" onClick={()=>navigate("/agents")}>{t("洗码")}</Button>
        <Button block onClick={()=>navigate("/shop")}>{t("兑换")}</Button>
        <Divider />
        <Button
            block
            className="mb10"
            onClick={()=>dispatch.models.SET({
                M:{
                    t: _name+t("规则"),
                    c: <div className="tl">
                        <p><b>{t("一、限投：")}</b></p>
                        <p>{t("除Pk系列外，其它系列限投数：")}</p>
                        <p>{t("1、组合玩法，限")} <b>3</b> {t("个")}</p>
                        <p>{t("2、猜数字，限")} <b>10</b> {t("个")}</p>
                        <p style={{marginBottom:10}}>{t("3、特殊玩法，限")} <b>3</b> {t("个")}</p>
                        <p><b>{t("二、赔率：")}</b></p>
                        <p>{_name} {t("开奖号码为")} {_gz} {t("则以下号码：")}</p>
                        <p>{t("大、小、单、双")}</p>
                        <p>{t("大双、小双、大单、小单、极大、极小")}</p>
                        <p>{t("豹、对、顺、半、杂")}</p>
                        <p style={{marginBottom:10}}>{t("若投注中奖时，则赔率为")} <b>1</b> {t("倍，仅返回本金")}</p>
                        <p><b>{t("三、流水：")}</b></p>
                        <p>{t("大、小、单、双，等于投注了")} <b>14</b> {t("个号码")}</p>
                        <p>{t("大双、小双、大单、小单，等于与投注了")} <b>7</b> {t("个号码")}</p>
                        <p>{t("极大、极小，等于投注了")} <b>6</b> {t("个号码")}</p>
                    </div>
                }
            })}
        >
            {t("游戏规则")}
        </Button>
        <Button block className="mb10" onClick={()=>navigate("/game/"+type+'/'+qwfType(type)+'/zs')}>
            {t("走势图")}
        </Button>
        <Button block onClick={()=>navigate("/game/"+type+'/'+qwfType(type)+'/yc')}>
            {t("最佳预测")}
        </Button>
    </div>
}