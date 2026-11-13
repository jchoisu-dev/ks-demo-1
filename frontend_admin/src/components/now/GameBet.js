//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Tag } from 'antd';
import { nTom, __urlname, ___gamename, valsCutCheck } from '@/utils/tool';
//
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
const MLOTTERY = dynamic({
  loader: () => import('@/components/Mdata/lottery'),
});
//
export default (props) => {
  const { SET, SEND, GameBet, GameBets } = useModel('data');
  //
  useEffect(() => {
    if (!GameBet) return;
    if (GameBets) {
      SET({
        GameBets: [GameBet, ...GameBets].slice(0, 50),
        GameBet: '',
        MP3: 'lottery_bet',
      });
      return;
    }
    SET({
      GameBets: [GameBet],
      GameBet: '',
    });
  }, [GameBet]);
  const tabx = (k) => {
    if (k == 2) return <Tag color="#87d068">A</Tag>;
    return <Tag color="#108ee9">M</Tag>;
  };
  const _check_css = (e) => {
    if (valsCutCheck(e)) {
      return ' cut_error';
    }
    return '';
  };
  //
  return (
    <div className="nowlist tl">
      {GameBets &&
        GameBets.map((v, k) => (
          <div key={k} className={'item' + _check_css()} n={k + 1}>
            <div style={{ padding: '2px 0 5px' }}>
              {tabx(v[1])} <em>{v[0]}</em>
            </div>
            <MUSER t={v[2]} /> - {v[3]}
            <br />
            {__urlname(v[4])} <MLOTTERY u={v[2]} n={v[3]} g={v[4]} p={v[5]} />{' '}
            <br />
            {Object.keys(v[6]).length}：{nTom(v[7])} 豆 <br />
            <b>${v[7] / 1000}</b> <br />
            <div className="nums">
              <Row gutter={[5, 5]}>
                {Object.keys(v[6]).map((kk) => (
                  <Col key={kk}>
                    <span className="num" n={nTom(v[6][kk])}>
                      <b>{___gamename(kk)}</b>
                    </span>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        ))}
    </div>
  );
};
