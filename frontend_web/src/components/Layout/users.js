import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { useNavigate, Outlet } from "react-router-dom";
import { t } from 'i18n';
// 
export default () => 
{
    const { UserMenuOn } = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auths);
    // 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 
    const agent_menu = 
    {
        dlcz: t("代理充值"),
        hskm: t("回收卡密"),
        edzy: t("额度转移"),
        zhsj: t("账号升级"),
        tjxx: t("统计信息"),
        jdmx: t("金豆明细"),
        dltx: t("代理提现"),
    }
    const user_menu = 
    {
        '基本功能': {
            wdzl: t("我的资料"),
            wdkm: t("我的卡密"),
            jdmx: t("金豆明细"),
            tzjl: t("投注记录"),
            wdyh: t("我的银行")
        },
        '福利管理': {
            hdfl: t("活动返利"),
            phbjl: t("排行榜奖励"),
            wdhb: t("我的红包"),
            jyhd: t("经验换豆"),
            ygz: t("每月工资"),
            mrqd: t("每日签到"),
        },
        '下线管理': {
            yqhy: t("邀请好友"),
        },
        '安全管理': {
            mmxg: t("密码修改"),
            rzjl: t("日志记录"),
        },
    };
    // 
    const goto = (a,b,url,z) => 
    {
        dispatch.models.SET({ UserMenuOn:{url,des:[a,b]} });
        navigate('/'+z+'/'+url);
    }
    // 
    return <div className="users">
        <div className="w">
            <Row justify="center" align="top" gutter={20} wrap={false}>
                <Col flex="190px">
                    <div className="menu">
                        <dl>
                            <dt>{t("概览")}</dt>
                            <dd onClick={()=>goto(t("概览"),t("首页"),'home','user')}>
                                {t("首页")}
                            </dd>
                        </dl>
                        {Auth&&Auth.role==2&&<dl>
                            <dt>{t("代理中心")}</dt>
                            {Object.keys(agent_menu).map(k=>(
                                <dd key={k} onClick={()=>goto(t("代理中心"),agent_menu[k],k,'agent')}>
                                    {agent_menu[k]}
                                </dd>
                            ))}
                        </dl>}
                        {Object.keys(user_menu).map(kk=>(
                            <dl key={kk}>
                                <dt>{t(kk)}</dt>
                                {Object.keys(user_menu[kk]).map(k=>(
                                    <dd key={k} onClick={()=>goto(t(kk),user_menu[kk][k],k,'user')}>
                                        {user_menu[kk][k]}
                                    </dd>
                                ))}
                            </dl>
                        ))}
                    </div>
                </Col>
                <Col flex="auto">
                    <div className="con bf br5 ov">
                        <div className="top">
                            <Row justify="space-between" align="middle">
                                <Col>
                                    <span style={{fontSize:18}}>{UserMenuOn&&UserMenuOn.des&&UserMenuOn.des[1]||t("会员概览")}</span>
                                </Col>
                                <Col>{t("会员中心 /")} {UserMenuOn&&UserMenuOn.des&&UserMenuOn.des.join(' / ')||t("首页")}</Col>
                            </Row>
                        </div>
                        <div style={{padding:'0 40px 40px',minHeight:665}}>
                            <Outlet />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
}