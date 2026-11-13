//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col } from 'antd';
// import { nTom, dTom } from '@/utils/tool';
//
const GameBet = dynamic({ loader: () => import('@/components/now/GameBet') });
const OpenLottery = dynamic({
  loader: () => import('@/components/now/OpenLottery'),
});
const AgentCharge = dynamic({
  loader: () => import('@/components/now/AgentCharge'),
});
const KamiDuihuan = dynamic({
  loader: () => import('@/components/now/KamiDuihuan'),
});
const KamiHuishou = dynamic({
  loader: () => import('@/components/now/KamiHuishou'),
});
const PageView = dynamic({ loader: () => import('@/components/now/PageView') });
const PageRequest = dynamic({
  loader: () => import('@/components/now/PageRequest'),
});
// const LotteryNew = dynamic({
//   loader: () => import('@/components/now/LotteryNew'),
// });
// const LotteryKill = dynamic({
//   loader: () => import('@/components/now/LotteryKill'),
// });
//
export default (props) => {
  const { SET, SEND, HomeNowSum, HomeSum } = useModel('data');
  //
  useEffect(() => {
    SEND('home/now');
  }, []);
  //
  useEffect(() => {
    if (!HomeSum) return;
    //
    const {
      user_bets,
      user_wins,
      agent_charges,
      user_exchanges,
      agent_exchanges,
    } = HomeSum;
    //
    SET({
      HomeNowSum: {
        ...HomeNowSum,
        user_bets: HomeNowSum.user_bets + (parseInt(user_bets) || 0),
        user_wins: HomeNowSum.user_wins + (parseInt(user_wins) || 0),
        agent_charges:
          HomeNowSum.agent_charges + (parseInt(agent_charges) || 0),
        user_exchanges:
          HomeNowSum.user_exchanges + (parseInt(user_exchanges) || 0),
        agent_exchanges:
          HomeNowSum.agent_exchanges + (parseInt(agent_exchanges) || 0),
      },
      HomeSum: '',
    });
    //
  }, [HomeSum]);
  //
  const arr = [
    ['今日投注', <GameBet />, '16%', 'Bet', '$', 'user_bets'], // 1
    ['今日盈亏', <OpenLottery />, '15%', 'Bet Result', '', 'user_wins'], // 2
    ['今日充值', <AgentCharge />, '14%', 'Deposit', '$', 'agent_charges'], // 3
    ['卡密兑换', <KamiDuihuan />, '15%', 'Control', '$', 'user_exchanges'], // 4
    ['卡密回收', <KamiHuishou />, '14%', 'Withdrawal', '$', 'agent_exchanges'], // 5
    ['访问列表', <PageView />, '13%', 'Incoming', '', ''], // 6 PageView
    ['在线列表', <PageRequest />, '13%', 'Outgoing', '', ''], // 7 PageRequest
  ];
  //
  const douShow = (v, k) => {
    if (v && v[5])
      return (
        <>
          <b>
            {v[4]}{' '}
            {k == 0 || k == 1
              ? HomeNowSum && (HomeNowSum[v[5]] / 1000).toFixed(2)
              : HomeNowSum && HomeNowSum[v[5]]}
          </b>
        </>
      );
    return '-';
  };
  const title = (k, v) => {
    // if(k<5)
    // {
    return (
      <div className={'title i' + (k + 1 < 6 ? k + 1 : k - 2)}>
        <Row justify="space-between" align="middle">
          <Col>{v[3]}</Col>
          <Col>{douShow(v, k)}</Col>
        </Row>
      </div>
    );
    // }
    // return v[4];
  };
  //
  return (
    <div className="home tblock tc">
      {/* <Row gutter={10}>
        <Col flex={1}>
          <LotteryNew />
        </Col>
        <Col flex={1}>
          <LotteryKill />
        </Col>
      </Row> */}

      <Row gutter={10}>
        {arr.map((v, k) => (
          <Col key={k} flex={v[2]}>
            <div className={'block br5 bf ov' + (k > 4 ? ' tn' : '')}>
              {title(k, v)}
              <div className="scroll">{v[1]}</div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
