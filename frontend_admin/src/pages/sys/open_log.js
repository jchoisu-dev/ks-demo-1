//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, DatePicker, Select, Tag } from 'antd';
import { ___gamename } from '@/utils/game';
//
const { Option } = Select;
const { RangePicker } = DatePicker;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
//
export default (props) => {
  //
  const { SET, SEND, OpenLogList, OpenLogListLoading } = useModel('data');
  const [form] = Form.useForm();
  //
  const getD = (v) => {
    SET({
      OpenLogList: [],
      OpenLogListLoading: 1,
    });
    if (v && v['time']) {
      v['time_start'] = v['time'][0].format('YYYY-MM-DD HH:mm');
      v['time_end'] = v['time'][1].format('YYYY-MM-DD HH:mm');
      delete v['time'];
    }
    SEND('admin/open_log_list', v);
  };
  useEffect(() => getD(), []);
  //
  const types = {
    btc: 'BTC',
    kr: 'Korea',
  };
  const _color = {
    11: 'success',
    16: 'processing',
    28: 'error',
    36: 'warning',
  };
  //
  const getTag = (v, t) => {
    v = JSON.parse(v);
    let _v = {};
    if (t == 'btc') {
      _v[v.type] = v.number;
    } else {
      _v = v;
    }
    //
    return (
      <Row justify="center">
        {Object.keys(_v).map((k) => (
          <Col key={k}>
            <div>
              <Tag color={_color[k]}>
                {k} - <b>{___gamename(_v[k])}</b>
              </Tag>
            </div>
          </Col>
        ))}
      </Row>
    );
  };
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form
          form={form}
          onFinish={(v) => getD(v)}
          initialValues={{
            type: '',
          }}
        >
          <Row gutter="16">
            <Col flex="150px">
              <Form.Item name="type" noStyle>
                <Select name="type" style={{ width: '100%' }}>
                  <Option value="">Select Game</Option>
                  {Object.keys(types).map((k) => (
                    <Option key={k} value={k}>
                      {types[k]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col flex="400px">
              <Form.Item name="time" noStyle>
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                />
              </Form.Item>
            </Col>
            <Col flex="220px">
              <Form.Item name="peroids" noStyle>
                <Input addonBefore="Period" />
              </Form.Item>
            </Col>
            <Col flex="150px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={OpenLogListLoading}
                >
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="boe br5 ov">
        <Table
          tableClass={'hover'}
          columns={[
            ['Operator ID'],
            ['Operator'],
            ['Game', (v) => types[v[2]]],
            ['Time'],
            ['Period'],
            ['Result', (v) => getTag(v[5], v[2])],
          ]}
          data={OpenLogList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
