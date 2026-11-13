import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from 'antd';
import { GameLocal } from 'utils/game';
import { nTom } from 'utils/tool';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
const List = lazy(() => import('components/Game/List'));
// 
export default () => 
{
    const DATA = useSelector((state) => state.models);
    const { GameGetReload } = DATA;
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();
    // 
    const loca = GameLocal(location.pathname);
    const { category, type } = loca;
    // 
    const _list_name = 'LotteryList'+category+''+type;
    const Lottery = DATA&&DATA['Lottery'+category+''+type];
    const GameJg = DATA&&DATA[_list_name];
    const _stop = DATA&&DATA['lottery_stop_'+category];
    const _open = DATA&&DATA['lottery_open_'+category];
    // 
    const _list_name_bet_update = 'Lottery'+category+''+type+'_bet_update';
    const LotteryBetUpdate = DATA&&DATA[_list_name_bet_update];
    // 投注
    useEffect(() => 
    {
        if(!GameJg || GameJg[0]!=1 || !LotteryBetUpdate) return;
        let _i = GameJg[1].findIndex(v=>v[0]==LotteryBetUpdate[0]);
        if(_i!==-1)
        {
            GameJg[1][_i][6] = [
                LotteryBetUpdate[1][0]||GameJg[1][_i][6][0],
                LotteryBetUpdate[1][1]||GameJg[1][_i][6][1],
                LotteryBetUpdate[1][2]||GameJg[1][_i][6][2],
                LotteryBetUpdate[1][3]||GameJg[1][_i][6][3],
            ];
            //
            let _d = {};
            _d[_list_name] = GameJg;
            _d[_list_name_bet_update] = '';
            dispatch.models.SET(_d);
        };
    }, [LotteryBetUpdate]);
    // GameGetReload
    useEffect(() => 
    {
        if(!GameGetReload) return;
        let game = category+''+type;
        SEND('game/jg', { game, category, type });
        dispatch.models.SET({GameGetReload:''});
    }, [GameGetReload]);
    // 前往投注
    const goBet = (periods) =>
    {
        navigate('/game/'+category+'/'+type+'/bet/'+periods);
    };
    // 
    const betButton = (v,k) => 
    {
        const _peroids = Lottery&&Lottery[1][0];
        const _s = v[5];
        // 1尚未开奖 2投注中 3开奖中 4已结束
        if((_peroids==v[0]&&_open==1)||_s==3||(k>3&&!v[2])) return <Button size="small" type="primary" disabled={true}>{t("等待开奖")}</Button>
        if(_peroids==v[0]&&_stop==1) return <Button loading={false} disabled={true} size="small">{t("暂停投注")}</Button>
        if(_s==2) return <Button size="small" type="primary" onClick={()=>goBet(v[0])}>{t("立即投注")}</Button>
        if(_s==1) return <Button loading={false} disabled={true} size="small">{t("尚未开盘")}</Button>
        return <Button loading={false} disabled={true} size="small">{t("已结束")}</Button>
    }
    const betdou = (a) => 
    {
        if(!a) return '-';
        return nTom(a);
    }
    const betnum = (a,b) => 
    {
        if(a==0&&b==0) return '-';
        if(a&&b==0) return a;
        return <>{a} / <b>{b}</b></>
    }
    const betwin = (a,b) => 
    {
        if(!a&&!b) return '-';
        if(a&&!b) return nTom(a)+' / 0';
        if(parseInt(a)>=parseInt(b)) return <>{nTom(a)} / {nTom(b)}</>;
        return <>{nTom(a)} / <b>{nTom(b)}</b></>;
    } 
    //
    const columns = [
        [ t("期号") ],
        [ t("开奖时间") ],
        [ t("开奖结果"), (v) => v[5]==4 ? <List data={v} />: '-' ],
        [ t("金豆总数"), (v) => betdou(v[6][0]) ],
        [ t("投注人数"), (v) => betnum(v[6][1], v[6][2]) ],
        [ t("投注/中奖"), (v,k) => betwin(v[6][3], v[6][4])],
        [ t("投注"), (v,k) => betButton(v,k) ],
    ];
    // 
    return <div className="br5">
        <Table 
            tableClass={'hover'}
            columns={columns} 
            data={ GameJg&&[[GameJg[0]||1,500],GameJg[1]]||[] }
            pageChange={ page => SEND('game/jglist', {
                game: category+''+type,
                category,
                type,
                page: page
            })}
        />
    </div>
}