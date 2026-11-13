//
import { useModel } from 'umi';
import { Row, Col, Form, Input, Button, Divider, DatePicker } from 'antd';
//
export default (props) => {
  const { setGo, timeChange, form } = props;
  //
  const { SettingLoading } = useModel('data');
  //
  return (
    <div className="bf p16 br5 h-full">
      <h3>Monthly Salary</h3>
      <Divider />
      <Form form={form} onFinish={(v) => setGo('HdflYgz', timeChange(v))}>
        <div className="mb10">
          <Row gutter="10">
            <Col span="14">Effective</Col>
            <Col span="10">Receive</Col>
          </Row>
        </div>
        <Form.List name="data">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <div key={key} className="mb10">
                  <Row gutter="10">
                    <Col span="14">
                      <Form.Item {...restField} name={[name, 'ls']} noStyle>
                        <Input addonAfter="豆" />
                      </Form.Item>
                    </Col>
                    <Col span="10">
                      <Form.Item {...restField} name={[name, 'odd']} noStyle>
                        <Input
                          addonAfter={
                            <div onClick={() => remove(name)}>豆</div>
                          }
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
