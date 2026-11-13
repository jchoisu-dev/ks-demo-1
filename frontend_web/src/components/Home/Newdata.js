import { lazy, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Space } from 'antd';
import { CategoryTypes, GameName } from 'utils/game'
import { nTom } from 'utils/tool';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const BlockLoading = lazy(() => import('components/Loading/BlockLoading'));
const JieGuo = lazy(() => import('components/Game/JieGuo'));
const Timeb = lazy(() => import('components/Game/Timeb'));
// 
const Rank = lazy(()=>import('./Rank'));
// 
const browsers = [
    'gg',
    'hh',
    '36'
];
// 
const payments = [
    'yhk.webp',
    'yh.png',
    'zfb.png',
    'wx.webp',
    'rmb.png'
];
// 
const lx = [
    'qq.png',
    'wx.png',
    'fj.webp'
]
// 
export default () => 
{
    const DATA = useSelector((state) => state.models);
    const { HomeGameName } = DATA&&DATA;
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 
    const getGame = (category,type) => 
    {
        dispatch.models.SET({ HomeGameName:{category, type} });
        SEND('home/game', { category,type,game:category+''+type })
    }
    const _game_name = HomeGameName || {category:'jnd',type:'28'};
    const { category, type } = _game_name;
    const Lottery = DATA&&DATA['Lottery'+(category+''+type)] || '';
    // 
    const gamed = () => 
    {
        if(!Lottery) return '';
        if(type=='sc')
        {
            Lottery[0][2] = [ Lottery[0][2][0], Lottery[0][2][1], Lottery[0][2][2] ];
            return Lottery[0];
        }
        return Lottery[0];
    };
    //
    const _game_list = [
        // [ t("加拿大"), 'jnd', 28],
        // [ 'PK', 'pk', 'sc'],
        // [ t("加拿大西部"), 'jnc', 28],
        // [ t("台湾宾果"), 'bj', 28],
        // [ t("台湾蛋蛋"), 'dd', 28],
        // [ t("澳洲"), 'au', 28],
        // [ t("俄勒冈"), 'elg', 28],
        // [ t("斯洛伐克"), 'slfk', 28],
        [ t("斯洛伐克"), 'btc', 28],
    ];
    // 
    useEffect(() => {
        SEND('home/game', { category: 'btc',type: 28 ,game: 'btc28' })
    }, []);
    // 
    return <div className="">
        <Row gutter={15}>
            <Col span={6}>
                <Rank />
            </Col>
            <Col span={12}>
                <div className="bf br5 ov bx hr">
                    <BlockLoading loading={!Lottery} m={0}>
                        <div className='tc mb16' style={{borderBottom:"1px solid #eee"}}>
                            <Row>
                                {(_game_list).map((v,k)=>(
                                    <Col flex={1} key={k}>
                                        <div 
                                            className={'glist p10 cu br5' +(k==0 ? ' bgr cf': '')}
                                            style={{borderLeft:"1px solid #eee"}}
                                            onClick={()=>navigate(`/game/${v[1]}/${v[2]}`)}
                                        >
                                            {v[0]}
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                        
                        <Row align="middle">
                            <Col flex={1}>
                                <div style={{padding:'0 0 25px'}}>
                                    <JieGuo />
                                </div>
                            </Col>
                            <Col flex={1}>
                                <div style={{borderLeft:'1px dashed #f1f1f1',paddingLeft:11,marginTop:18}}>
                                    <div style={{padding:'8px 0 20px'}}>
                                        <Timeb />
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        <div className='tc'>
                            <Row justify='space-evenly'>
                                <Col span={12}>
                                    <p>{t("金豆总数：")}<b>{Lottery&&nTom(Lottery[2][0])}</b></p> 
                                    <p>{t("投注人数：")}<b>{Lottery&&Lottery[2][1]}</b></p>
                                </Col>
                                <Col span={12}>
                                    <Row justify='center' gutter="10">
                                        {[t("立即投注"), t("群 2.14 "), t("群 2.8")].map((v,k)=>(
                                            <Col key={k}>
                                                <Button 
                                                    key={k} 
                                                    type="primary"
                                                    onClick={()=>navigate('/game')}
                                                >
                                                    {v}
                                                </Button>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Row>
                        </div>

                    </BlockLoading>
                </div>
            </Col>
            <Col span={6}>
                <div className='bf br5 bx hr tc' style={{padding:"0 10px"}}>

                    <div className='mb10 p10'>
                        <h3>{t("支付方式")}</h3>
                    </div>
                    <div className='mb10'>
                        <Row justify='space-evenly' align='middle' gutter="5">
                            {payments.map((v,k)=>(
                                <Col span={4} key={k}>
                                        <img 
                                            src={`https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/home/fq/${v}`} 
                                            width="100%"
                                        />
                                </Col>
                            ))}
                        </Row>
                    </div>
                
                    <div className='p10 mb10'>
                        <h3>{t("支持浏览器")}</h3>
                    </div>
                    <div className='mb10'>
                        <Row justify='space-evenly' align='middle' gutter="5">
                            {browsers.map((v,k)=>(
                                <Col span={4} key={k}>
                                        <img 
                                            src={`https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/home/browsers/${v}.png`} 
                                            width="100%"
                                        />
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <div className='p10'>
                        <h3>{t("联系方式")}</h3>
                    </div>
                    <div>
                        <Row justify='space-evenly' align='middle' gutter="5">
                            {lx.map((v,k)=>(
                                <Col span={4} key={k}>
                                        <img 
                                            src={`https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/home/lx/${v}`} 
                                            width="100%"
                                        />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
}

