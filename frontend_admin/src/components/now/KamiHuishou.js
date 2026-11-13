//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Button } from 'antd';
import { nTom, mTon, __urlname } from '@/utils/tool';
//
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
//
export default (props) => {
  const { SET, SEND, KamiHuoshou, KamiHuoshous, KamiHuoshouReload } =
    useModel('data');
  //
  useEffect(() => {
    if (!KamiHuoshou) return;
    if (KamiHuoshous) {
      SET({
        KamiHuoshous: [KamiHuoshou, ...KamiHuoshous].slice(0, 50),
        KamiHuoshou: '',
        // MP3:'ios7'
      });
      return;
    }
    SET({
      KamiHuoshous: [KamiHuoshou],
      KamiHuoshou: '',
    });
  }, [KamiHuoshou]);
  //
  useEffect(() => {
    if (!KamiHuoshouReload) return;
    SEND('home/KamiHuoshous');
    SET({ KamiHuoshouReload: '' });
  }, [KamiHuoshouReload]);
  //
  return (
    <div className="nowlist tl">
      {KamiHuoshous &&
        KamiHuoshous.map((v, k) => (
          <div key={k} className="item" n={k + 1}>
            <em>{v[0]}</em>
            <br />
            <b>{v[1]}</b>
            <br />
            <small style={{ fontSize: 10 }}>{v[2]}</small>
            <br />
            <MUSER t={v[3]} /> - {v[4]}
            <br />
            {nTom(v[5])} $
          </div>
        ))}
    </div>
  );
};
