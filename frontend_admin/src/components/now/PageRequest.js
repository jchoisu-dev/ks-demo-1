//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
//
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
//
export default (props) => {
  const { SET, SEND, PageRequest, PageRequests } = useModel('data');
  //
  useEffect(() => {
    if (!PageRequest) return;
    if (PageRequests) {
      SET({
        PageRequests: [PageRequest, ...PageRequests].slice(0, 50),
        PageRequest: '',
      });
      return;
    }
    SET({
      PageRequests: [PageRequest],
      PageRequest: '',
    });
  }, [PageRequest]);
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
    <div className="nowopens">
      <div className="nowlist tl">
        {PageRequests &&
          PageRequests.map((v, k) => (
            <div key={k} className="item" n={k + 1}>
              <em>{v[4]}</em>
              <br />
              <b>${v[2]}</b> <br />
              <CopyToClipboard
                text={v[0]}
                onCopy={() =>
                  SET({
                    M: {
                      t: 'Wallet Address Copied to clipboard',
                      c: (
                        <>
                          <b>{v[0]}</b>
                        </>
                      ),
                    },
                  })
                }
              >
                <small className="cu hov">{shortenString(v[0], 24)}</small>
              </CopyToClipboard>{' '}
              <br />
              <CopyToClipboard
                text={v[1]}
                onCopy={() =>
                  SET({
                    M: {
                      t: 'Wallet Address Copied to clipboard',
                      c: (
                        <>
                          <b>{v[1]}</b>
                        </>
                      ),
                    },
                  })
                }
              >
                <small className="cu hov">{shortenString(v[1], 24)}</small>
              </CopyToClipboard>{' '}
              <br />
              <em
                className="cu hov"
                onClick={() =>
                  window
                    .open(
                      'https://tronscan.org/#/transaction/' + v[3],
                      '_blank',
                    )
                    .focus()
                }
              >
                {shortenString(v[3], 23)}
              </em>
            </div>
          ))}
      </div>
    </div>
  );
};
