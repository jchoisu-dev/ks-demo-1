//
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Row, Col, Button, Input } from 'antd';
import { ___gamename } from '@/utils/tool';
import { getGameType } from '@/utils/gameTool';
//
import dayjs from 'dayjs';
//
export default (props) => {
  const { SET, SEND, LotteryNew, LotteryNewAdd, LotteryNewCaomei } =
    useModel('data');
  //
  const _in_status = {
    jnd: [1, 1],
    ddbj: [1, 1],
    jnc: [1, 1],
    elg: [1, 1],
    slfk: [1, 1],
  };
  //
  useEffect(() => {
    if (!LotteryNewAdd || !LotteryNewAdd.number || !LotteryNew) return;
    async function prepare() {
      // console.log(LotteryNewAdd);
      const { category, peroids, time, number } = LotteryNewAdd;
      if (!LotteryNew[category]) return;
      const _new = {};
      _new[category] = [peroids, time, ''];
      if (number) {
        _new[category][2] = await getGameType(category, { number });
      }
      SET({
        LotteryNew: {
          ...LotteryNew,
          ..._new,
        },
        LotteryNewAdd: '',
      });
    }
    prepare();
  }, [LotteryNewAdd]);
  //
  const statusCheck = () => {
    if (!LotteryNew) return _in_status;
    //
    let _new_status = {};
    for (let i in _in_status) {
      const _sd_time = (LotteryNew && LotteryNew[i] && LotteryNew[i][1]) || '';
      const _cm_time =
        (LotteryNewCaomei && LotteryNewCaomei[i] && LotteryNewCaomei[i][1]) ||
        '';
      if (!_sd_time || !_cm_time) {
        _new_status[i] = [4, 4];
      } else {
        const _x_sd_time = dayjs().diff(dayjs(_sd_time), 'second');
        const _x_cm_time = dayjs().diff(dayjs(_cm_time), 'second');
        _new_status[i] = [_x_sd_time + '', _x_cm_time + ''];
      }
    }
    return _new_status;
  };
  const _ka_time = {
    jnd: [210, 420],
    ddbj: [300, 600],
    jnc: [300, 600],
    slfk: [300, 600],
    elg: [240, 480],
  };
  const _status_txt = (s, v, c) => {
    const _ckt = _ka_time[c];
    if (v < _ckt[0]) return <div className="site bo">Normal</div>;
    if (v == _ckt[0] || (v > _ckt[0] && v < _ckt[1]))
      return <div className="site by">{s}待开</div>;
    if (v > _ckt[1]) return <div className="site br">Warning</div>;
    return <div className="site ss">-</div>;
  };
  //
  const _gamename = {
    jnd: 'Canada',
    ddbj: 'Taiwan',
    elg: 'Oregon',
    jnc: 'Canada West',
    slfk: 'Slovakia',
    au: 'Australia',
    btc: 'Bitcoin',
    kr: 'Korea',
    sd: 'Leopard',
    cm: 'Strawberry',
  };
  const games = [
    // 'jnd', 
    'ddbj', 'jnc', 'elg', 'slfk'
  ]
  const types = ['11', '16', '28', '36'];
  //
  let _status = statusCheck();
  //
  const lotteryType = (category, time) => {
    if (_status[category]) {
      return (
        <Row gutter={5}>
          <Col flex={1}>{_status_txt('', _status[category][0], category)}</Col>
        </Row>
      );
    }
    return (
      <div className="site ss">
        {time.replace(dayjs().format('YYYY') + '-', '')}
      </div>
    );
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
      <>
        <p style={{ marginBottom: 3 }}>
          {t} - <b>{_this[0]}</b>
        </p>
        <div className="sites">{lotteryType(c, _this[1])}</div>
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
              {_this[2] && _this[2][v] ? ___gamename(_this[2][v]) : '-'}
            </div>
          ))}
        </div>
      </>
    );
  };
  //
  return (
    <div className="mb10 br5 bf" style={{ padding: '0 5px' }}>
      <Row>
        {games.map((v, k) => (
          <Col flex={1} key={k}>
            <div style={{ padding: '5px 5px 10px' }}>
              {LotteryShow(_gamename[v], v)}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
