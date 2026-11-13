import { useState, useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { nTom } from '@/utils/tool';
import { Button, Row, Col, Input, Divider } from 'antd';
import { _opennums } from '@/utils/krnum';
import { getGameType } from '@/utils/gameTool';
import { ___gamename } from '@/utils/game';

const BlockLoading = dynamic({
  loader: () => import('@/components/Loading/BlockLoading'),
});

let _nums = [
  '0',
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
];
const _types = [28, 11, 16, 36];
const randomsort = (a, b) => {
  return Math.random() > 0.5 ? -1 : 1;
};

export default (props) => {
  const { SEND, SET } = useModel('data');
  //
  // const setNum = (kk,number) =>
  // {
  //     SET({KrNum:kk,KrTxt:'设置中...'});
  //     SEND('getmodal/krkill_set', { number });
  // }
  const asy = async () => {
    let KrList = [];
    for (let _i in _nums) {
      let i = _nums[_i];
      const number = _opennums[i].sort(randomsort)[0];
      KrList.push({
        ...(await getGameType('kr', {
          number,
        })),
        number,
      });
    }
    SET({ KrList });
  };
  //
  const Con = () => {
    const { KrList, KrBets, Krset, krNumber } = useModel('data');
    useEffect(() => {
      SET({ Krset: '', krNumber: '' });
      SEND('mdata/getkr');
      asy();
      //
    }, []);
    //
    const _sr = (str) => {
      return str.replace(/kr/, '');
    };
    const setNumber = (krNumber, number) => {
      SET({
        Krset: 1,
        krNumber,
      });
      SEND('mdata/setkr', { number });
    };
    const _status = () => {
      if (Krset == 1) return <div className="openset">Loading...</div>;
      if (Krset == 2)
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
                {KrBets &&
                  Object.keys(KrBets).map((kk) => (
                    <>
                      {Object.keys(KrBets[kk]).map((k) => (
                        <Col key={k} flex="90px">
                          <div className="item">
                            <p>{_sr(kk)}</p>
                            <p>{k}</p>
                            <p>{nTom(KrBets[kk][k])}</p>
                          </div>
                        </Col>
                      ))}
                    </>
                  ))}
              </Row>
            </div>
          </BlockLoading>
        </div>
        <Divider />
        <div className="jlist openr">
          <div className="list">
            <Row gutter={[10, 10]} justify="center">
              {KrList &&
                KrList.map((vv, kk) => (
                  <Col key={kk} flex="90px">
                    <Button
                      block
                      onClick={() => setNumber(kk, vv['number'])}
                      type={krNumber + '' == kk + '' && 'primary'}
                    >
                      {_types.map((v, k) => (
                        <p key={k} n={v}>
                          {___gamename(vv[v])}
                        </p>
                      ))}
                    </Button>
                  </Col>
                ))}
            </Row>
          </div>
        </div>
        {_status()}
      </div>
    );
  };
  const Btn = () => {
    const { KrData } = useModel('data');
    const { peroids, time } = KrData || {};
    // 时间同步
    const [times, setTimes] = useState('');
    useEffect(() => {
      if (!KrData) return;
      setTimes(time || 1);
      //
      const timer = setInterval((c) => {
        setTimes((c) => {
          if (c == 0) {
            clearInterval(timer);
            SEND('mdata/getkr');
            return 0;
          }
          if (c > 0) return c - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }, [KrData]);
    //
    return (
      <Button
        onClick={() => {
          asy();
          SET({ BLL: 1 });
          SEND('mdata/getkr');
        }}
      >
        Korea <b> {peroids || '-'} </b> remaining <b> {times || 0} </b> seconds
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
      Korea
    </div>
  );
};
