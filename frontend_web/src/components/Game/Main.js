import { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Row, Col } from 'antd';
import { CategoryTypes, GameLocal, GameName } from 'utils/game';
import { nTom } from 'utils/tool';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const BlockLoading = lazy(() => import('components/Loading/BlockLoading'));
const Marquees = lazy(() => import('./Marquees'));
const JieGuo = lazy(() => import('./JieGuo'));
const Timeb = lazy(() => import('./Timeb'));
// 
const __me = [t("最低投注"), t("最高投注"), t("最高中奖"), t("今日投注"), t("今日战绩")];
// 
export default () => 
{
    const DATA = useSelector((state) => state.models);
    const { GamePageData } = DATA;
    // 
    const navigate = useNavigate();
    let location = useLocation();
    // 
    const { category, type, menu } = GameLocal(location.pathname);
    // 
    const _user_bet_data = DATA&&DATA['UserDayBetData'+category+''+type];
    // 
    const __menu = {
        jg: t("往期结果"),
        jl: t("投注记录"),
        gz: t("游戏规则"),
        ms: t("投注模式"),
        zd: t("自动投注"),
        zs: t("走势图"),
        yc: t("最佳预测")
    }
    // 
    const _page = [
        GamePageData&&nTom(GamePageData[0])||'-',
        GamePageData&&nTom(GamePageData[1])||'-',
        GamePageData&&nTom(GamePageData[2])||'-',
        _user_bet_data&&nTom(_user_bet_data[0])||'-',
    ];
    // 
    const getGameData = () =>
    {
        let _name = category+''+type;
        return DATA&&DATA['Lottery'+_name] || '';
    }
    const _game = getGameData();
    // 
    const getData = () => 
    {
        let game = category+''+type;
        SEND('game/jg', { game, category, type });
    }
    //   
    useEffect(() => 
    {
        getData(()=>{});
    }, [category+''+type]);
    // 
    const goToUrl = (category, type, menu) => 
    {
        let _url = '/game';
        if(category) _url+='/'+category;
        if(type) _url+='/'+type;
        if(menu) _url+='/'+menu;
        navigate(_url);
    }
    // 
    return <div className="game">
        <div className="w">
            <div className="br5 bf">
                <div style={{padding:'10px 10px 0'}}>
                    <Row gutter={10} justify="space-between">
                        {Object.keys(CategoryTypes).map(key=>(
                            <Col flex="1" key={key}>
                                <div 
                                    className={"category tc br5 cu"+(category==key?' on':'')}
                                    onClick={()=>goToUrl(key,'','')}
                                >
                                    <img src={'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/game/'+(['q214','q28'].find((v)=>v==key)?'qwf':key)+'.png'} />
                                    <p>{GameName(key,'')}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
                <div className="p10">
                    <Row gutter={10}>
                        {CategoryTypes[category].map((v,k)=>(
                            <Col flex="auto" key={k}>
                                <div 
                                    className={"type tc br5 cu"+(type==v?' on':'')}
                                    onClick={()=>goToUrl(category, v, '')}
                                >
                                    {GameName(category,v)}
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <div className="mb10">
                <Marquees />
            </div>
            <div className="br5 mb10 bf">
                <BlockLoading loading={!_game}>
                    <div className="p10">
                        <Row gutter={10} align="middle">
                            <Col span={3}>
                                <div className="br5 p10 tc bf1">
                                    <img src={'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/game/'+(['q214','q28'].find((v)=>v==category)?'qwf':category)+'.png'} width="80" style={{marginBottom:8}} />
                                    <p>{GameName(category, type)}</p>
                                </div>
                            </Col>
                            <Col span={14}>
                                <div className="br5 bf1 p10">
                                    <JieGuo />
                                    
                                    <div className="numbers">
                                        {_game&&_game[0]&&_game[0][3]&&_game[0][3].map((v,k)=>(
                                            <span key={k}>
                                                {v}
                                            </span>
                                        ))}
                                    </div>

                                </div>
                            </Col>
                            <Col span={7}>
                                <div className="br5 bf1 p10">
                                    <Timeb />
                                </div>
                            </Col>
                        </Row>
                    </div> 
                </BlockLoading>
            </div>
            <div className="br5 bf mb10">
                <Row>
                    {__me.map((v,k)=>(
                        <Col flex='auto' key={k}>
                            <div className={'me tc'+(k==4?' nb':'')}>
                                <p>{v}</p>
                                {k==4
                                ?<Row gutter={16}>
                                    <Col flex="auto">
                                        <span className="mei">{t("已投")} {_user_bet_data&&nTom(_user_bet_data[1])||'0'} /<em>{_user_bet_data&&nTom(_user_bet_data[2])||'0'}</em>{t("期")}</span>
                                    </Col>
                                    <Col flex="auto">
                                        <span className="mei">{t("盈亏")}<em>{_user_bet_data&&nTom(_user_bet_data[3])||'0'}</em>{t("豆")}</span>
                                    </Col>
                                    <Col flex="auto">
                                        <span className="mei">{t("胜率")}<em>{_user_bet_data&&_user_bet_data[4]||'0'}</em>%</span>
                                    </Col>
                                </Row>
                                :_page[k]}
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
            {!['q214','q28'].find(v=>v==category)&&<div className="mb10">
                <Row gutter={10} justify="space-between">
                    {Object.keys(__menu).map(key=>(
                        <>
                        {!(type=='sc'&&['ms','zd'].find(v=>v==key))&&<Col flex="1" key={key}>
                            <div 
                                className={"type tc br5 bf cu"+(menu==key?' on':'')}
                                onClick={()=>goToUrl(category, type, key)}
                            >
                                {__menu[key]}
                            </div>
                        </Col>}
                        </>
                    ))}
                </Row>
            </div>}
            <Outlet />
        </div>
    </div>
}