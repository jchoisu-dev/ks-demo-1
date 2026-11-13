//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Button } from 'antd';
import { nTom, mTon, __urlname } from '@/utils/tool';
import { CopyToClipboard } from 'react-copy-to-clipboard';
//
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
//
export default (props) => {
  const { SET, SEND, PageView, PageViews } = useModel('data');
  //
  useEffect(() => {
    if (!PageView) return;
    if (PageViews) {
      SET({
        PageViews: [PageView, ...PageViews].slice(0, 50),
        PageView: '',
      });
      return;
    }
    SET({
      PageViews: [PageView],
      PageView: '',
    });
  }, [PageView]);
  //
  const shortenString = (str, n) => {
    if (!str) return '-';
    if (str.length > 10) {
      return str.substring(0, n) + '...';
    } else {
      return str;
    }
  };
  //
  return (
    <div className="nowlist tl">
      {PageViews &&
        PageViews.map((v, k) => (
          <div key={k} className="item" n={k + 1}>
            <em>{v[5]}</em>
            <br />
            <MUSER t={v[0]} /> - <em>{v[1]}</em> <br />
            <b>${v[3]}</b> <br />
            <CopyToClipboard
              text={v[2]}
              onCopy={() =>
                SET({
                  M: {
                    t: 'Wallet Address Copied to clipboard',
                    c: (
                      <>
                        <b>{v[2]}</b>
                      </>
                    ),
                  },
                })
              }
            >
              <small className="cu hov">{shortenString(v[2], 24)}</small>
            </CopyToClipboard>{' '}
            <br />
            <em
              className="cu hov"
              onClick={() =>
                window
                  .open('https://tronscan.org/#/transaction/' + v[4], '_blank')
                  .focus()
              }
            >
              {shortenString(v[4], 23)}
            </em>
          </div>
        ))}
    </div>
  );
};
