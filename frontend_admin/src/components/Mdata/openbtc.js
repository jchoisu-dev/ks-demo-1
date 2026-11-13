import { useState, useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { nTom } from '@/utils/tool';
import { Button, Row, Col, Divider } from 'antd';
import { _opennums } from '@/utils/krnum';
import { ___gamename } from '@/utils/game';

const BlockLoading = dynamic({
  loader: () => import('@/components/Loading/BlockLoading'),
});

const _numbers = {
  11: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  16: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  28: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27,
  ],
  36: ['bao', 'shun', 'dui', 'ban', 'za'],
};

export default (props) => {
  const { SEND, SET } = useModel('data');
  //
  const Con = () => {
    const { BtcList, BtcBets, Btcset, BtcNumber } = useModel('data');
    useEffect(() => {
      SET({ Btcset: '', BtcNumber: '' });
      SEND('mdata/getbtc');
      //
    }, []);
    //
    const _sr = (str) => {
      return str.replace(/btc/, '');
    };
    const setNumber = (BtcNumber, v) => {
      SET({
        Btcset: 1,
        BtcNumber,
      });
      // console.log(v)
      SEND('mdata/setbtc', v);
    };
    const _status = () => {
      if (Btcset == 1) return <div className="openset">Loading...</div>;
      if (Btcset == 2)
        return (
          <div className="openset">
            <b>Success!</b>
          </div>
        );
      return '';
    };
    //
    return (
      <div style={{ width: 1250 }}>
        <div>
          <BlockLoading>
            <div className="jlista">
              <Row gutter={[10, 10]} justify="center">
                {BtcBets &&
                  Object.keys(BtcBets).map((kk) => (
                    <>
                      {Object.keys(BtcBets[kk]).map((k) => (
                        <Col key={k} flex="90px">
                          <div className="item">
                            <p>{_sr(kk)}</p>
                            <p>{k}</p>
                            <p>{nTom(BtcBets[kk][k])}</p>
                          </div>
                        </Col>
                      ))}
                    </>
                  ))}
              </Row>
            </div>
          </BlockLoading>
        </div>
        <Divider style={{ marginBottom: 5 }} />
        {_numbers &&
          Object.keys(_numbers).map((kk) => (
            <div className="jlista t20" keys={kk}>
              <Row gutter={[10, 10]} justify="center">
                {_numbers[kk].map((v, k) => (
                  <Col key={k} flex="1">
                    <div
                      className={'item h' + (BtcNumber == kk + v ? ' on' : '')}
                      onClick={() => setNumber(kk + v, { type: kk, number: v })}
                    >
                      <p>{kk}</p>
                      <p>{___gamename(v)}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        {_status()}
      </div>
    );
  };
  const Btn = () => {
    const { BtcData } = useModel('data');
    const { peroids, time } = BtcData || {};
    // 时间同步
    const [times, setTimes] = useState('');
    useEffect(() => {
      if (!BtcData) return;
      setTimes(time || 1);
      //
      const timer = setInterval((c) => {
        setTimes((c) => {
          if (c == 0) {
            clearInterval(timer);
            SEND('mdata/getbtc');
            return 0;
          }
          if (c > 0) return c - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }, [BtcData]);
    //
    return (
      <Button
        onClick={() => {
          SET({ BLL: 1 });
          SEND('mdata/getbtc');
        }}
      >
        BTC <b> {peroids || '-'} </b> remaining <b> {times || 0} </b> seconds
      </Button>
    );
  };
  //
  return (
    <div
      onClick={() => {
        SET({
          BLL: 1,
          M: {
            t: <Btn />,
            c: <Con />,
          },
        });
      }}
    >
      Bitcoin
    </div>
  );
};
