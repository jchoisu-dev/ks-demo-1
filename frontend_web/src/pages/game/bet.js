import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from "react-router-dom";
import { GameLocal, GameName } from 'utils/game';
import { ___gamename } from 'utils/betData';
import { nTom, mTon } from 'utils/tool';
import { Row, Col, Button } from 'antd';
import { _numbers, _input_vals, _odds, _type_num_val_odd } from 'utils/betTool';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const JdTool = lazy(() => import('components/Game/bet/JdTool'));
const JdTable = lazy(() => import('components/Game/bet/JdTable'));
// 
export default () => 
{
    const DATA = useSelector((state) => state.models);
    const { GameBetVal } = DATA;
    // 
    const dispatch = useDispatch();
    let location = useLocation();
    // 
    const { category, type } = GameLocal(location.pathname);
    const { peroids } = useParams();
    // 
    const _name = 'Lottery'+category+''+type;
    // const Lottery = DATA&&DATA[_name];
    const LotteryOdd = DATA&&DATA['gameodd'+category+''+type];
    // 
    let _t_t = type=='28gd' ? 28 : type;
    _t_t = type=='gj' ? 10 : _t_t;
    const _table = _type_num_val_odd[_t_t];
    const _tables = {..._table[0],..._table[1]};
    // 
    const _title = <>{GameName(category, type)} {t("第")} <b>{peroids}</b> {t("期")}</>;
    // 
    useEffect(() => {
        dispatch.models.SET({
            GameBetVal: '',
            GameBetValed: '',
            ToolSuoha: ''
        });
        SEND('game/bet_last',{
            game: category+''+type,
            category,
            type,
            peroids,
        })
    }, []);
    // 
    const goBet = (num, _sum) =>
    {
        if(num<=0)
        {
            dispatch.models.SET({M:{c:t("请至少选择一注！")}});
            return;
        }
        dispatch.models.SET({
            M:{
                t: _title,
                c: <div className="jlist">
                    <div className="list">
                        <Row gutter={[10,10]} justify="center">
                            {GameBetVal&&Object.keys(GameBetVal).map(k=>(<Col key={k} flex="100px"><Button block>
                                <p>{___gamename(k)}</p>
                                <p>{nTom(GameBetVal[k])}</p>
                            </Button></Col>))}
                        </Row>
                    </div>
                    <h4>{t("共")} <b>{num}</b> {t("注，合计")} <b>{nTom(_sum)}</b> {t("豆")}</h4>
                </div>,
                bt: t("确定投注"),
                b: () => {
                    SEND('game/bet',{
                        game: category+''+type,
                        category,
                        type,
                        peroids,
                        vals: GameBetVal
                    })
                    // console.log(GameBetVal)
                    // console.log({
                    //     game: category+''+type,
                    //     category,
                    //     type,
                    //     peroids,
                    //     vals: GameBetVal
                    // })
                }
            }
        })
    }
    //   
    return <div className="br5 bf p10">
        <div className="bf1 br5 tc p5 mb10">
            {_title}
        </div>
        <JdTool 
            _type={_t_t} 
            _tables={_tables} 
            btntxt={t("确定投注")}
            goBet={goBet}
        />
        <JdTable 
            type={type}
            _type={_t_t} 
            _table={_table} 
            _tables={_tables} 
            odd={LotteryOdd}
        />
    </div>
}