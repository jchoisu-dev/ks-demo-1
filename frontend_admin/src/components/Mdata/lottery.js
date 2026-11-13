//
import { useModel, dynamic } from 'umi';
import { nTom } from '../../utils/tool';
import { Row, Col, Button } from 'antd';
import { __urlname, ___gamename, valsCutCheck } from '@/utils/tool';
//
const BlockLoading = dynamic({
  loader: () => import('@/components/Loading/BlockLoading'),
});
//
const Lotterycontent = (props) => {
  const { MdataLottery } = useModel('data');
  //
  const wk = (a, b) => {
    if (!b) return '0';
    if (b > a) return <b>+${((b - a) / 1000).toFixed(2)}</b>;
    return ((b - a) / 1000).toFixed(2);
  };
  //
  const _win_lose = (a, b) => {
    if (a > b) return '-' + nTom(a - b);
    if (a < b) return '+' + nTom(b - a);
    return 0;
  };
  // console.log(MdataLottery&&MdataLottery)
  //
  return (
    <div style={{ width: 700 }}>
      <BlockLoading m={'30px 0 20px'}>
        <div className="jlist">
          <div className="list">
            <Row gutter={[10, 10]} justify="center">
              {MdataLottery &&
                Object.keys(MdataLottery.vals).map((k) => (
                  <Col key={k} flex="100px">
                    <Button type={MdataLottery.vals[k][1] && 'primary'} block>
                      <p>{___gamename(k)}</p>
                      <p>{nTom(MdataLottery.vals[k][0])}</p>
                      <p>{MdataLottery.vals[k][1] || '-'}</p>
                      <p>
                        {_win_lose(
                          MdataLottery.vals[k][0],
                          MdataLottery.vals[k][2],
                        )}
                      </p>
                      <p>
                        {(MdataLottery.vals[k][2] &&
                          nTom(MdataLottery.vals[k][2])) ||
                          '-'}
                      </p>
                      {MdataLottery.vals[k][3] && (
                        <p>
                          {'牛 ' +
                            (MdataLottery.vals[k][3][0] +
                              ' - ' +
                              MdataLottery.vals[k][3][1]) +
                            ' 庄' || '-'}
                        </p>
                      )}
                    </Button>
                  </Col>
                ))}
            </Row>
          </div>
          <h4 style={{ padding: '10px 0' }}>
            <b>{(MdataLottery && MdataLottery.num) || '-'}：</b>
            Total{' '}
            <b>
              ${(MdataLottery && (MdataLottery.dou / 1000).toFixed(2)) || '0'}
            </b>
            ， Profit{' '}
            {(MdataLottery && wk(MdataLottery.dou, MdataLottery.win_dou)) ||
              '0'}
          </h4>
          <p>
            {valsCutCheck(MdataLottery && MdataLottery.vals) ? (
              <b>
                --------------------------------Abnormal
                betting--------------------------------
              </b>
            ) : (
              'Normal'
            )}
          </p>
        </div>
      </BlockLoading>
    </div>
  );
};
//
export default (props) => {
  //
  const { u, n, g, p } = props;
  const { SET, SEND } = useModel('data');
  //
  const _get = () => {
    SET({
      BLM: '',
      BLL: 1,
    });
    SEND('mdata/lottery', {
      _user_id: u,
      peroids: p,
      game: g,
    });
  };
  //
  return (
    <b
      style={{ cursor: 'pointer' }}
      onClick={() => {
        _get();
        SET({
          M: {
            t: (
              <Button
                onClick={() => {
                  _get();
                }}
              >
                <b>{u} </b> - {n} - <b> {__urlname(g)} </b> <b>{p}</b>
              </Button>
            ),
            c: <Lotterycontent u={u} n={n} />,
          },
        });
      }}
    >
      {p}
    </b>
  );
};
