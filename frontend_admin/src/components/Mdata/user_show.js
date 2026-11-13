//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { nTom } from '../../utils/tool';
import { Row, Col, Form, Input, Button } from 'antd';
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const BlockLoading = dynamic({
  loader: () => import('@/components/Loading/BlockLoading'),
});
//
export default (props) => {
  const { MdataUser } = useModel('data');
  //
  const wk = (v, _v) => {
    if (v > 0)
      return (
        <>
          <b>+${_v}</b>
        </>
      );
    return <>{_v}</>;
  };
  const dw = {
    0: '',
    1: '$',
    2: '',
    3: '$',
    4: '$',
    5: '$',
    6: '$',
    7: '豆',
  };
  const trl = (v, k) => {
    if (!v) return '-';
    const _v = k >= 4 ? (v / 1000).toFixed(2) : v;
    if (k == 7) return wk(v, _v);
    return dw[k] + '' + _v;
  };
  const tra = (v, k) => {
    if (k == 0) return <b>{v}</b>;
    if ([5, 6].find((v) => v == k)) return <small>{v}</small>;
    return v;
  };
  const trb = (v, k) => {
    if (k == 0)
      return (
        <>
          <b>${(v / 1000).toFixed(2)}</b>{' '}
        </>
      );
    if (k == 1)
      return (
        <>
          <b>${(v / 1000).toFixed(2)}</b>{' '}
        </>
      );
    if (k == 2) return v;
    if (k == 3) {
      if (v == 2) return <b>Off</b>;
      return 'On';
    }
    if (k == 4) {
      if (v == 2) return <b>Yes</b>;
      return 'No';
    }
    if (k == 5) {
      if (v == 2) return <b>Free</b>;
      return 'Require';
    }
    if (k == 6) {
      if (v == 2) return <b>Frozen</b>;
      return 'Normal';
    }
    return <small>{v}</small>;
  };
  //
  const listShow = (v) => {
    if (v[1] == '-') return '-';
    const _m = nTom(v[1]);
    if (v[3] == 3) return <del>{_m} $</del>;
    return <b>{_m} $</b>;
  };
  //
  return (
    <div style={{ width: 1500 }}>
      <BlockLoading m={'30px 0 20px'}>
        <Row gutter={20}>
          <Col span="4">
            <div className="boe br5 ov">
              <div style={{ marginBottom: '-1px' }}>
                <Table
                  tableClass={'hover'}
                  columns={[['-'], ['Basic', (v, k) => tra(v[1], k)]]}
                  data={[[], (MdataUser && MdataUser[0]) || []]}
                />
              </div>
            </div>
          </Col>
          <Col span="4">
            <div className="boe br5 ov">
              <div style={{ marginBottom: '-1px' }}>
                <Table
                  tableClass={'hover'}
                  columns={[['-'], ['Other', (v, k) => trb(v[1], k)]]}
                  data={[[], (MdataUser && MdataUser[1]) || []]}
                />
              </div>
            </div>
          </Col>
          <Col span="11">
            <div className="boe br5 ov">
              <div style={{ marginBottom: '-1px' }}>
                <Table
                  tableClass={'hover'}
                  columns={[
                    ['Statistic'],
                    ['History', (v, k) => trl(v[1], k)],
                    ['Today', (v, k) => trl(v[2], k)],
                    ['Yesterday', (v, k) => trl(v[3], k)],
                  ]}
                  data={[[], (MdataUser && MdataUser[2]) || []]}
                />
              </div>
            </div>
          </Col>
          <Col span="5">
            <div className="boe br5 ov">
              <div style={{ marginBottom: '-1px' }}>
                <Table
                  tableClass={'hover'}
                  columns={[
                    ['Date', (v) => <small>{v[0]}</small>],
                    ['Charge Money', (v) => listShow(v)],
                    ['Agent', (v) => <small>{v[2]}</small>],
                  ]}
                  data={[[], (MdataUser && MdataUser[3]) || []]}
                />
              </div>
            </div>
          </Col>
        </Row>
      </BlockLoading>
    </div>
  );
};
