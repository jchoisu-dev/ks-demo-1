//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { nTom, mTon, __urlname, ___gamename } from '@/utils/tool';
import { Row, Col, Tag } from 'antd';
//
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
const MLOTTERY = dynamic({
  loader: () => import('@/components/Mdata/lottery'),
});
//
export default (props) => {
  const { SET, SEND, PageView, OpenLottery, OpenLotterys } = useModel('data');
  //
  useEffect(() => {
    if (!OpenLottery) return;
    if (OpenLotterys) {
      SET({
        OpenLotterys: [OpenLottery, ...OpenLotterys].slice(0, 50),
        OpenLottery: '',
        MP3: 'lottery_open',
      });
      return;
    }
    SET({
      OpenLotterys: [OpenLottery],
      OpenLottery: '',
    });
  }, [OpenLottery]);
  //
  const tabx = (k) => {
    if (k % 2 == 0) return <Tag color="#87d068">A</Tag>;
    return <Tag color="#108ee9">M</Tag>;
  };
  //
  const win = (v) => {
    const _w = v[8] - v[7];
    if (_w < 0) return nTom(_w);
    return <b>{nTom(_w)}</b>;
  };
  //
  // console.log(OpenLotterys&&OpenLotterys)
  //
  return (
    <div className="nowlist tl">
      {OpenLotterys &&
        OpenLotterys.map((v, k) => (
          <div key={k} className="item" n={k + 1}>
            <div style={{ padding: '2px 0 5px' }}>
              {tabx(v[0])} <em>{v[1]}</em>
            </div>
            <MUSER t={v[2]} /> - {v[3]}
            <br />
            {__urlname(v[4])} <MLOTTERY u={v[2]} n={v[3]} g={v[4]} p={v[5]} />
            <br />
            {v[6]}：{nTom(v[7])} 豆 <b>(${(v[7] / 1000).toFixed(2)})</b> <br />
            W：{nTom(v[8])} 豆 <b>(${(v[8] / 1000).toFixed(2)})</b>
            <br />
            P：{win(v)} 豆 <b>(${((v[8] - v[7]) / 1000).toFixed(2)})</b> <br />
            <div className="nums">
              <Row gutter={[5, 5]}>
                {v[9] &&
                  Object.keys(v[9]).map((kk) => (
                    <Col key={kk}>
                      <span className="num" n={nTom(v[9][kk][1])}>
                        <b>{___gamename(kk)}</b>
                        <br />
                        <div className="openxxx">{v[9][kk][0]}</div>
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
