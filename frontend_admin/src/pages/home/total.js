//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { nTom } from '@/utils/tool';
import { Row, Col, Form, Input, Button, DatePicker } from 'antd';
import { TotalData, SumData, GameData } from '@/utils/total_data';
import { SearchOutlined } from '@ant-design/icons';
//
// import { CategoryTypes, GameName, ___gamename } from '@/utils/game';
// import { _game, _type, _numbers, _number, _odds } from '@/utils/gameData';
//
const Table = dynamic({ loader: () => import('@/components/Table') });
//
export default (props) => {
  //
  const {
    SET,
    SEND,
    TotalSum,
    TotalBet,
    TotalLoading,
    USDTBalance,
    USDTLoading,
  } = useModel('data');
  //
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  //
  const getD = (e) => {
    SET({
      TotalDatas: '',
      SumDatas: '',
      TotalLoading: true,
    });
    SEND('total/' + (e || 'daya'));
  };
  useEffect(() => {
    getD();
  }, []);
  // 单列形式
  // const TableOne = (d) =>
  // {
  //     return <div className="table boe br5">
  //         <table className="hover" style={{marginBottom:-1}}>
  //             <tr>
  //                 <th colSpan="2">{d[0]}</th>
  //             </tr>
  //             {d[1].map(v=>(
  //                 <tr>
  //                     <td width="98">{v[0]}</td>
  //                     <td f="r">{doushow(v[1])}{v[2]&&' '+v[2]||''}</td>
  //                 </tr>
  //             ))}
  //         </table>
  //     </div>
  // }
  //
  const doushow = (d) => {
    if (!d || d == '-') return '-';
    if (d < 0) return <>{nTom(d)}</>;
    return (
      <>
        <b>{nTom(d)}</b>
      </>
    );
  };
  const dwShow = (v) => {
    if (!v) return '';
    return ' ' + v;
  };
  //
  const tas = (v) => {
    if (!v) return '-';
    return (
      <>
        <small>{v[0] || '-'}</small> {doushow(v[1])}
        {dwShow(v[2])}
      </>
    );
  };
  //
  return (
    <>
      <div className="block bf br5">
        <div className="p20">
          <div
            style={{
              borderBottom: '1px solid #eee',
              paddingBottom: '20px',
              marginBottom: 20,
            }}
          >
            <Row gutter="30">
              <Col flex="60px">
                <Button
                  htmlType="submit"
                  loading={TotalLoading || USDTLoading}
                  onClick={() => {
                    SEND('home/getus', {});
                    SET({ USDTLoading: true });
                  }}
                >
                  USDT Balance： <b>{USDTBalance ? USDTBalance : '?'}</b>
                </Button>
              </Col>
              <Col flex="1">
                <Button
                  onClick={() => getD('daya')}
                  loading={TotalLoading}
                  block
                >
                  Today
                </Button>
              </Col>
              <Col flex="1">
                <Button
                  onClick={() => getD('dayb')}
                  loading={TotalLoading}
                  block
                >
                  Yesterday
                </Button>
              </Col>
              <Col flex="1">
                <Button
                  onClick={() => getD('montha')}
                  loading={TotalLoading}
                  block
                >
                  Month
                </Button>
              </Col>
              <Col flex="1">
                <Form
                  form={form3}
                  onFinish={(v) => {
                    if (!v || !v.day) {
                      SET({
                        M: { c: 'Please select a date to inquire first!' },
                      });
                      return;
                    }
                    form2.resetFields();
                    SEND('total/day', { day: v['day'].format('YYYY-MM-DD') });
                    SET({ TotalLoading: 1 });
                  }}
                >
                  <Form.Item name="day" noStyle={true}>
                    <DatePicker style={{ marginRight: 10 }} />
                  </Form.Item>
                  <Form.Item noStyle={true}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={TotalLoading}
                    >
                      Search
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col flex="1">
                <Form
                  form={form2}
                  onFinish={(v) => {
                    if (!v || !v.month) {
                      SET({
                        M: { c: 'Please select the month to inquiry first!' },
                      });
                      return;
                    }
                    form3.resetFields();
                    SEND('total/month', {
                      month: v['month'].format('YYYY-MM'),
                    });
                    SET({ TotalLoading: 1 });
                  }}
                >
                  <Form.Item name="month" noStyle={true}>
                    <DatePicker picker="month" style={{ marginRight: 10 }} />
                  </Form.Item>
                  <Form.Item noStyle={true}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={TotalLoading}
                    >
                      Search
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
          <div className="boe br5 totala" style={{ marginBottom: 20 }}>
            <div style={{ marginBottom: -1 }}>
              <Table
                tableClass={'hover'}
                columns={[
                  ['General', (v) => tas(v[0])],
                  ['Member', (v) => tas(v[1])],
                  ['Exchange', (v) => tas(v[2])],
                  ['Agent', (v) => tas(v[3])],
                  ['Bonus', (v) => tas(v[4])],
                  ['Rebate', (v) => tas(v[5])],
                ]}
                data={[[], TotalSum || SumData]}
              />
            </div>
          </div>
          <div className="boe br5 totala" style={{ marginBottom: 20 }}>
            <div style={{ marginBottom: -1 }}>
              <Table
                tableClass={'hover'}
                columns={[
                  ['Canada', (v) => tas(v[0])],
                  ['PK', (v) => tas(v[1])],
                  ['Canada West', (v) => tas(v[2])],
                  ['Taiwan Bingo', (v) => tas(v[3])],
                  ['Taiwan DD', (v) => tas(v[4])],
                  ['Oregon', (v) => tas(v[5])],
                  ['Slovakia', (v) => tas(v[6])],
                  ['Australia', (v) => tas(v[7])],
                  ['Korea', (v) => tas(v[8])],
                  ['Bitcoin', (v) => tas(v[9])],
                ]}
                data={[[], TotalBet || GameData]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
