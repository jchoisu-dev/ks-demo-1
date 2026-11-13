import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Row,Col } from 'antd';
import { GameLocal, GameName } from 'utils/game';
import { t } from 'i18n';
// 
export default () => 
{
    const DATA = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    let location = useLocation();
    // 
    const { category, type } = GameLocal(location.pathname);
    // 
    const _list_name = 'LotteryList'+category+''+type;
    const Lottery = DATA&&DATA['Lottery'+category+''+type];
    // 
    const _list_name_add = 'Lottery'+category+''+type+'_add';
    const LotteryAdd = DATA&&DATA[_list_name_add];
    // 
    const _list_name_bet_win = 'LotteryWin'+category+''+type;
    const LotteryBetWin = DATA&&DATA[_list_name_bet_win];
    // 
    const GameJg = DATA&&DATA[_list_name];
    // 
    let _run = DATA&&DATA['lottery_open_'+category];
    let _is_fun = _run==1;
    if(Lottery&&parseInt(Lottery[0][0])+1!=Lottery[1][0])
    {
        _is_fun = 1;
    }
    // 更新开奖
    useEffect(() => 
    {
        if(!GameJg || GameJg[0]!=1 || !Lottery) return;
        let _i = GameJg[1].findIndex(v=>v[0]==Lottery[0][0]);
        if(_i!==-1)
        {
            GameJg[1][_i][2] = Lottery[0][1];
            GameJg[1][_i][3] = Lottery[0][2];
            GameJg[1][_i][4] = Lottery[0][3];
            GameJg[1][_i][5] = 4;
            //
            if(Lottery[2])
            {
                GameJg[1][_i][6][0] = Lottery[2][0];
                GameJg[1][_i][6][1] = Lottery[2][1];
                GameJg[1][_i][6][2] = Lottery[2][2];
            }
            // 
            let _d = {};
            _d[_list_name] = GameJg;
            // 
            dispatch.models.SET(_d);
        };
    }, [Lottery]);
    // 中奖
    useEffect(() => 
    {
        if(!GameJg || GameJg[0]!=1 || !LotteryBetWin) return;
        let _i = GameJg[1].findIndex(v=>v[0]==LotteryBetWin[0]);
        if(_i!==-1)
        {
            GameJg[1][_i][6][4] = LotteryBetWin[1];
            let _d = {};
            _d[_list_name] = GameJg;
            _d[_list_name_bet_win] = '';
            dispatch.models.SET(_d); 
        };
    }, [LotteryBetWin]);
    // 加入
    useEffect(() => 
    {
        if(!GameJg || GameJg[0]!=1 || !LotteryAdd) return;
        let _d = {};
        _d[_list_name] = GameJg;
        if(LotteryAdd&&LotteryAdd[0]&&(GameJg[1][0][0]!=LotteryAdd[0]))
        {
            _d[_list_name][1].unshift([ 
                LotteryAdd[0], 
                LotteryAdd[1], 
                '', 
                '', 
                '', 
                LotteryAdd[2],
                [0,0,0,0]
            ]);
            _d[_list_name][1].pop();
        }
        _d[_list_name_add] = '';
        // 
        dispatch.models.SET({ ..._d });
    }, [LotteryAdd]);
    // 
    const bms = (k) => 
    {
        if(k==0||k==7) return {};
        if(k==1) return {marginLeft:10};
        if(k==2) return {margin:'0 10px 0 5px'};
        return {marginRight:5}
    }
    // 
    const jsshow = () => 
    {
        if(['pk','sc'].find(v=>v==type))
        {
            return <>
                {Lottery[0][2].map((v,k)=>(
                    <Col key={k}>
                        <div>
                            {Lottery&&<img src={'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/lottery/'+v+'.png'} style={bms(k)} />}
                        </div>
                    </Col>
                ))}
            </>
        }
        return <Col flex="35px">
            {Lottery&&<img src={'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/lottery/'+Lottery[0][2]+'.png'} />}
        </Col>
    }
    // 
    return <div className={"jieguo"+(_is_fun==1?' open':' ')}>
        <p style={{marginBottom:7}}>
            {GameName(category,type)} {t("第")} <b>{Lottery&&Lottery[0][0]}</b> {t("期开奖结果")}
        </p>
        <Row justify="center" align="middle">

            {Lottery&&Lottery[0][1]&&Lottery[0][1].map((v,k)=>(
                <Col flex="35px" key={k}>
                    <div className={"us jgnum jgn-"+k}>
                        <img src={'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/lottery/'+v+'.png'} />
                    </div>
                </Col>
            ))}

            {Lottery&&Lottery[0][1]&&<Col flex="26px">
                <div className="us jgfh">=</div>
            </Col>}

            {jsshow()}

        </Row>
    </div>
}