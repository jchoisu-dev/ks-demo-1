//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Button } from 'antd';
import { nTom, mTon, __urlname, ___gamename } from '@/utils/tool';
//
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
//
export default (props) => {
  const { SET, SEND, AgentCharge, AgentCharges } = useModel('data');
  //
  useEffect(() => {
    if (!AgentCharge) return;
    if (AgentCharges) {
      SET({
        AgentCharges: [AgentCharge, ...AgentCharges].slice(0, 50),
        AgentCharge: '',
        MP3: 'scooby',
      });
      return;
    }
    SET({
      AgentCharges: [AgentCharge],
      AgentCharge: '',
    });
  }, [AgentCharge]);
  //
  const showMoney = (v) => {
    if (v[6] == 1)
      return (
        <>
          Charge <b>{nTom(v[3])} $</b>
        </>
      );
    return <del>Revoked {nTom(v[3])} $</del>;
  };
  //
  return (
    <div className="nowlist tl">
      {AgentCharges &&
        AgentCharges.map((v, k) => (
          <div key={k} className="item" n={k + 1}>
            <em>{v[0]}</em>
            <br />
            {/* <b>{v[1]}</b> - {v[2]}<br/> */}
            <b>{v[2]}</b>
            <br />
            {showMoney(v)}
            <br />
            <MUSER t={v[4]} /> - {v[5]}
            <br />
          </div>
        ))}
    </div>
  );
};
