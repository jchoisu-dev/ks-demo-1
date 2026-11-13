//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { nTom } from '@/utils/tool';
import { Row, Col, Form, Input, Button, DatePicker } from 'antd';
import { TotalData, SumData, GameData } from '@/utils/total_data';
//
// import { CategoryTypes, GameName, ___gamename } from '@/utils/game';
// import { _game, _type, _numbers, _number, _odds } from '@/utils/gameData';
//
const Table = dynamic({ loader: () => import('@/components/Table') });
//
export default (props) => {
  //
  const { SET, SEND, TotalDatas, SumDatas, TotalLoading } = useModel('data');
  //
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  //
  useEffect(() => {
    SET({
      TotalDatas: '',
      SumDatas: '',
      TotalLoading: 1,
    });
    SEND('total/all');
  }, []);
  //
  const TableOne = (d) => {
    return (
      <div className="table boe br5">
        <table className="hover" style={{ marginBottom: -1 }}>
          <tr>
            <th colSpan="2">{d[0]}</th>
          </tr>
          {d[1].map((v) => (
            <tr>
              <td width="98">{v[0]}</td>
              <td f="r">
                {doushow(v[1])}
                {(v[2] && ' ' + v[2]) || ''}
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  };
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
  //
  return (
    <>
      <div className="bf br5">
        <div className="p20">
          <div style={{ marginBottom: 20 }}>
            <Row gutter="20">
              {(TotalDatas || TotalData).map((v, k) => (
                <Col key={k} flex="1">
                  {TableOne(v)}
                </Col>
              ))}
            </Row>
          </div>
          <div
            style={{
              borderBottom: '1px solid #eee',
              borderTop: '1px solid #eee',
              padding: '20px 0',
              marginBottom: 20,
            }}
          >
            <Row gutter="30">
              <Col span="12">
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
                      筛选日期
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col span="12">
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
                      筛选月份
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
          <div style={{ marginBottom: 20 }}>
            <Row gutter="20">
              {(SumDatas || SumData).map((v, k) => (
                <Col key={k} flex="1">
                  {TableOne(v)}
                </Col>
              ))}
            </Row>
          </div>
          <div className="">
            <Row gutter="20">
              {GameData.map((v, k) => (
                <Col key={k} flex="20%">
                  <div style={{ marginBottom: k < 5 ? 20 : 0 }}>
                    {TableOne(v)}
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};
