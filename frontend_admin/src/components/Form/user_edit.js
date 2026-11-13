//
import { useEffect } from 'react';
import { useModel } from 'umi';
import { Row, Col, Form, Input, Radio, Select } from 'antd';
import { nTom, mTon, formStatus, formFieldChange } from '@/utils/tool';
//
export default (props) => {
  const { form, onFinish, status } = props;
  const DATA = useModel('data');
  const { SET, M } = DATA;
  //
  let _status = DATA && DATA[status];
  //
  const onFormChange = (v) => {
    let _k = Object.keys(v)[0];
    formFieldChange(SET, _status, _k);
    //
    if (v['dou']) v['dou'] = nTom(mTon(v['dou']));
    if (v['up_max']) v['up_max'] = nTom(mTon(v['up_max']));
    form.setFieldsValue({ ...v });
  };
  //
  useEffect(() => {
    if (!_status) return;
    SET({ M: { ...M, bl: '' } });
  }, [_status]);
  //
  return (
    <div className="xform" style={{ marginBottom: -22 }}>
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={(v) => onFormChange(v)}
      >
        <div>
          <Row gutter={30}>
            <Col span="8">
              <Form.Item name="parent" {...formStatus(_status, 'parent')}>
                <Input addonBefore="Parent ID" />
              </Form.Item>
              <Form.Item name="user" {...formStatus(_status, 'user')}>
                <Input addonBefore="Account" readOnly disabled />
              </Form.Item>
              {/* <Form.Item 
                            name="pass" 
                            {...formStatus(_status,'pass')}
                        >
                            <Input 
                                addonBefore="Password" 
                            />
                        </Form.Item> */}
              <Form.Item name="safe" {...formStatus(_status, 'safe')}>
                <Input addonBefore="Password" />
              </Form.Item>
              {/* <Form.Item 
                            name="calling" 
                            {...formStatus(_status,'calling')}
                        >
                            <Input 
                                addonBefore="Country Code" 
                            />
                        </Form.Item>
                        <Form.Item 
                            name="phone" 
                            {...formStatus(_status,'phone')}
                        >
                            <Input 
                                addonBefore="Phone" 
                            />
                        </Form.Item> */}
            </Col>
            <Col span="8">
              <Form.Item name="nick" {...formStatus(_status, 'nick')}>
                <Input addonBefore="Name" />
              </Form.Item>
              {/* <Form.Item 
                            name="des" 
                            {...formStatus(_status,'des')}
                        >
                            <Input 
                                addonBefore="Signature" 
                            />
                        </Form.Item> */}
              <Form.Item
                name="telegram_tag"
                // {...formStatus(_status,'qq')}
              >
                <Input readOnly disabled addonBefore="Telegram" />
              </Form.Item>
              <Form.Item name="qq" {...formStatus(_status, 'qq')}>
                <Input addonBefore="QQ" />
              </Form.Item>
              <Form.Item name="wx" {...formStatus(_status, 'wx')}>
                <Input addonBefore="Wechat" />
              </Form.Item>
              {/* <Form.Item 
                            name="name" 
                            {...formStatus(_status,'name')}
                        >
                            <Input 
                                addonBefore="Sign" 
                                readOnly
                            />
                        </Form.Item> */}
            </Col>
            <Col span="8">
              <Form.Item name="level">
                <Select name="level" style={{ width: '100%' }}>
                  <Option value="">Select VIP</Option>
                  {[1, 2, 3, 4, 5, 6, 7].map((v, k) => (
                    <Option value={v} key={k}>
                      VIP - {v}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {/* <Form.Item name="sound">
                            <Radio.Group name="sound" buttonStyle="solid">
                                <Radio.Button value="1">Sound On</Radio.Button>
                                <Radio.Button value="2">Sound Off</Radio.Button>
                            </Radio.Group>
                        </Form.Item> */}
              {/* <Form.Item name="km">
                            <Radio.Group name="km" buttonStyle="solid">
                                <Radio.Button value="1">Check Exchange</Radio.Button>
                                <Radio.Button value="2">Free Pass</Radio.Button>
                            </Radio.Group>
                        </Form.Item> */}
              <Form.Item name="cs">
                <Radio.Group name="cs" buttonStyle="solid">
                  <Radio.Button value="1">Normal</Radio.Button>
                  <Radio.Button value="2">Test</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="status">
                <Radio.Group name="status" buttonStyle="solid">
                  <Radio.Button value="1">Normal</Radio.Button>
                  <Radio.Button value="2">Banned</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="betmax" {...formStatus(_status, 'betmax')}>
                <Input
                  addonBefore="Highest Bet"
                  placeholder="Unlimited"
                  addonAfter="$"
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
