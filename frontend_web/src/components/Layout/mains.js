import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Outlet } from "react-router-dom";
import { Row, Col } from 'antd';
// 
const UserTop = lazy(() => import('./usertop'));
// 
import { 
    HomeOutlined,
    FireOutlined, 
    TeamOutlined, 
    TrophyOutlined, 
    IdcardOutlined, 
    NotificationOutlined, 
    GiftOutlined, 
    CrownOutlined,
    ShoppingCartOutlined 
} from '@ant-design/icons';
import { t } from 'i18n';
// 
export default () => 
{
    const _menu = { 
        'db': 'logo',
        'index': [t("首页"), <HomeOutlined /> ],
        // 'news': [t("最新公告"), <NotificationOutlined />],
        'promo': [t("优惠活动"), <GiftOutlined /> ],
        'game': [t("彩票大厅") , <FireOutlined />],
        'user': [t("会员中心"), <IdcardOutlined /> ],
        // 'agents': [t("代理合作") , <TeamOutlined /> ],
        'shop': [t("兑换中心"), <ShoppingCartOutlined />],
        'rank': [t("大神排行"), <TrophyOutlined />],
        'vip': [t("VIP贵宾会"), <CrownOutlined /> ]
    };
    // 
    const footer = [
        [t("快速存取款"), t("盛世彩票位用户提供众多的存取款方式并保障存取过程顺利及时并保障使用资金安全")],
        [t("安心&省心"), t("盛世彩票使用中国银联特级加密系统，确保账号和资金的使用安全。")],
        [t("手续费全免"), t("盛世彩票与中国银联全面无缝对接，确保账号和资金的使用安全。")],
        [t("通讯安全"), t("数据传送均通给128位SSL加密安全端口,所有数据内部出入严格限制和严密监控。")],
        [t("网站运维"), t("SSD专业服务器集群，多种技术优化保障运营稳定。")],
        [t("游戏平台"), t("最多种种类游戏平台,最高赔率, 更人性化功能，更符合时代眼光的设计领跑行业先锋。")],
    ];
    // 
    const finfo = {
        about: t("关於我们"), 
        news: t("常见问题"), 
        game: t("彩票投注"), 
        dlhz: t("代理合作")
    }
    // 
    const { MP3, tabOn } = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auths);
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 
    const menuChange = (key) => 
    {
        if(key=='user') dispatch.models.SET({ 
            UserMenuOn:{
                url:'home',
                des:[t("首页"),t("会员概览")]
            }
            
        })
        dispatch.models.SET({
            tabOn: key 
        })
        navigate('/'+key);
    }
    // 
    useEffect(() => {
        if(!MP3 || !Auth || Auth.sound==2) return;
        document.getElementById('mp3_'+MP3).play();
        dispatch.models.SET({MP3:''})
    },[MP3]);
    // 
    // useEffect(() => 
    // {
    //     if(!M || !M.boo || M.boo.u!=='user') return;
    //     localStorage.removeItem('sd28_pop');
    // }, [M&&M.boo&&M.boo.u]);
    // 
    return <>
        <div className="header">
            <div className='ut bx'>
                <div className='w'>
                    <UserTop />
                </div>
            </div>
            <div className="nav w tc fwb">
                <Row justify='space-evenly' align='middle' gutter={10}>
                    {Object.keys(_menu).map(k=>(
                        <Col key={k} flex={k=='db' ? '150px': 1}>
                            {k=='db'? 
                                <div 
                                    className='cu'
                                    onClick={()=>menuChange('index')}>
                                        <img src={"https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/logos.png"} width="50px" height="100%" />
                                </div>
                            :
                                <div 
                                    className='t'
                                    on={tabOn==k? 1:''} 
                                    onClick={()=>menuChange(k)}
                                >   
                                    <p className='mb5' style={{fontSize:22}}>{_menu[k][1]}</p>
                                    <p>{_menu[k][0]}</p>
                                </div>}
                        </Col>
                    ))}
                </Row>
            </div>
        </div>

        <div className="content">
            <Outlet />
        </div>

        <div className="footer tc cf">
            <div className='mb16'>
                <img src={'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/home/footer/f.png'} width="100%" />
            </div>
            <div className='w'>
                <Row gutter="30" align='middle'>
                    <Col span={18}>
                        <Row gutter={[30,40]}>
                            {footer.map((v,k)=>(
                                <Col span={8} key={k}>
                                    <div>
                                        <img style={k<4 ? {marginBottom:10}:{marginBottom:20}} src={`https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/home/footer/${k+1}.png`} />
                                        <h2 className='mb10'>{v[0]}</h2>
                                        <p>{v[1]}</p>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col span={6}>
                       <img src='https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/home/footer/mn.png' width="100%" />
                    </Col>
                </Row>

                <div className="copyright">
                    <div className='mb10'>
                        <Row gutter="20" justify='center'>
                            {Object.keys(finfo).map(k=>(
                                <Col key={k}>
                                    <p
                                        className={'cu'}
                                        onClick={()=>navigate('/'+k)}
                                    > 
                                        {finfo[k]}
                                    </p>
                                </Col>
                            ))}
                        </Row>
                    </div>
                    
                    <p>{t("本网站仅供成年人在合法辖区内使用，并且严禁向未满18岁的人提供赌博服务。参与赌博可能导致严重的财务损失，甚至成为问题赌博。我们建议您理性娱乐，切勿过度参与赌博活动。如果您或您身边的人有可能存在赌博问题，请及时寻求专业帮助。")}</p>
                </div>
            </div>
            
        </div>

        {['buysuccess','lottery_open', 'click', 'coin', 'bets', 'but'].map((v,k)=>(
            <audio key={k} id={"mp3_"+v} src={'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/mp3/'+v+'.mp3'} autoPlay={false} loop={false} muted={false}></audio>
        ))}

    </>
}
  