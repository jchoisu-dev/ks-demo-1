import { useModel } from 'umi';
import { Row, Col } from 'antd';
import { ___gamename } from '@/utils/tool';
import { SyncOutlined } from '@ant-design/icons';
//
import dayjs from 'dayjs';
//
export default () => {
  const DATA = useModel('data');
  const {
    SET,
    SEND,
    LotteryNew,
    Settings,
    auKillLoading,
    btcKillLoading,
    krKillLoading,
  } = DATA;
  const { KillAu, KillKr, KillBtc } = Settings || {};
  //
  const games = {
    au: ['Australia', 'auKillLoading', auKillLoading, KillAu],
    kr: ['Korea', 'btcKillLoading', btcKillLoading, KillKr],
    btc: ['Bitcoin', 'krKillLoading', krKillLoading, KillBtc],
  };
  //
  const types = ['11', '16', '28', '36'];
  //
  const setGo = (category) => {
    SEND('home/killset', { category });
    let typex = {};
    typex[games[category][1]] = 1;
    SET(typex);
  };
  //
  const LotteryShow = (t, c) => {
    if (!LotteryNew || !LotteryNew[c])
      return (
        <>
          <p>{t}</p>
          <p> - </p>
          <p> - </p>
          <p> - </p>
        </>
      );
    const _this = LotteryNew[c];
    //
    return (
      <div
        onClick={() => {
          setGo(c);
        }}
        style={{ padding: '5px 10px 10px' }}
      >
        <p style={{ paddingBottom: 3 }}>
          {t} - <b>{_this[0]}</b>
        </p>
        <div className="sites">
          {_this[1].replace(dayjs().format('YYYY') + '-', '')}
        </div>
        <div className="lotteryps">
          {types.map((v, k) => (
            <div
              key={k}
              className={
                'lotteryp' + (_this[2] && _this[2][v] ? ' ' : ' c-blue')
              }
            >
              <small>{v}</small>
              <br />
              {_this[2] && _this[2][v] ? ___gamename(_this[2][v] + '') : '-'}
            </div>
          ))}
        </div>
      </div>
    );
  };
  // console.log(games)
  //
  return (
    <div className="mb10">
      <Row gutter={10}>
        {Object.keys(games).map((k) => (
          <Col flex={1} key={k}>
            <div
              className={
                'kills por cu br5 ov bf' +
                (games[k][3] && games[k][3]['autokill'] == 1 ? ' open' : '')
              }
            >
              {games[k][2] && (
                <div className="killsloading">
                  <SyncOutlined spin />
                </div>
              )}
              {LotteryShow(games[k][0], k)}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
