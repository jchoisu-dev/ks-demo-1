//
import { useModel } from 'umi';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Divider,
  DatePicker,
  Radio,
} from 'antd';
//
export default (props) => {
  const { setGo, timeChange, form } = props;
  //
  const { SettingLoading } = useModel('data');
  //
  return (
    <div className="bf p16 br5">
      <h3>Promotional Agent Charge Bonus</h3>
      <Divider />
      <Form
        form={form}
        onFinish={(v) => setGo('HdflDl', timeChange(v))}
        onFieldsChange={(v) => {
          // console.log(v)
          // form.setFieldsValue({
          // })
        }}
      >
        <Form.Item name="mode">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="Specified">Specified</Radio.Button>
            <Radio.Button value="Percentage">Percentage</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {/* <Form.Item name="repeat">
                <Radio.Group buttonStyle="solid">
                    <Radio.Button value="One">One Time</Radio.Button>
                    <Radio.Button value="Ongoing">Ongoing</Radio.Button>
                </Radio.Group>
            </Form.Item> */}

        <div className="mb10">
          <Row gutter="10">
            <Col span="11">Effective</Col>
            <Col span="4">%</Col>
            <Col span="9">Fixed</Col>
          </Row>
        </div>
        <Form.List name="data">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div key={key} className="mb10">
                  <Row gutter="10">
                    <Col span="11">
                      <Form.Item {...restField} name={[name, 'ls']} noStyle>
                        <Input addonAfter="$" />
                      </Form.Item>
                    </Col>
                    <Col span="4">
                      <Form.Item
                        {...restField}
                        name={[name, 'percentage']}
                        noStyle
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span="9">
                      <Form.Item {...restField} name={[name, 'odd']} noStyle>
                        <Input
                          addonAfter={<div onClick={() => remove(name)}>$</div>}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              ))}
              <div
                style={{
                  borderBottom: '1px solid #eee',
                  padding: '5px 0 15px',
                  marginBottom: 25,
                }}
              >
                <Button onClick={() => add()}>Add</Button>
              </div>
            </>
          )}
        </Form.List>
        <Form.Item name="name" label="Event">
          <Input />
        </Form.Item>
        <Form.Item name="start_time" label="Start">
          <DatePicker onChange={() => {}} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="end_time" label="End">
          <DatePicker onChange={() => {}} style={{ width: '100%' }} />
        </Form.Item>
        <Divider />
        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={SettingLoading}
          >
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
