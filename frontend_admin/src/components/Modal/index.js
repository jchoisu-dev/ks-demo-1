import { useModel, history } from 'umi';
import { Divider, Button } from 'antd';

export default () => {
  const { SET, M } = useModel('data');
  //
  if (!M) return <></>;
  const { b, bl, bt, bc, c, t, bcn, boo } = M;
  //
  const onOk = () => {
    if (boo && boo.u) {
      history.push('/' + boo.u);
      SET({ M: '' });
      return;
    }
    SET({ M: { ...M, bl: true } });
    b();
  };
  //
  return (
    <div className="modal">
      <div className="block">
        <div className="mm tc">
          <div className="mlogo"></div>
          <div className="mb10" style={{ marginTop: -10 }}>
            <Divider style={{ fontSize: 15, fontWeight: 300, color: '#666' }}>
              {!t ? 'Hint' : t}
            </Divider>
          </div>
          <div className="con">{c}</div>
          <Divider />
          {!bcn && (
            <Button onClick={() => (bc && bc()) || SET({ M: '' })}>
              Close
            </Button>
          )}
          {b ? (
            <Button
              style={{ marginLeft: !bcn ? 30 : 0 }}
              loading={bl}
              type="primary"
              onClick={() => onOk()}
            >
              {bt || 'Confirm'}
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
