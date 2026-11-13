//
import { useModel } from 'umi';
import { Row, Col, Form, Input, Button, Divider, Radio } from 'antd';
//
export default (props) => {
  const { setGo, timeChange, form } = props;
  //
  const { SettingLoading } = useModel('data');
  //
  return (
    <div className="bf p16 br5">
      <h3>Australia Automatic Kill</h3>
      <Divider />
      <Form form={form} onFinish={(v) => setGo('KillAu', v)}>
        <Form.Item name="autokill">
          <Radio.Group name="autokill" buttonStyle="solid">
            <Radio.Button value="1">On</Radio.Button>
            <Radio.Button value="2">Off</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="maxbetdou">
          <Input addonBefore="Bet Tolerance" addonAfter="$" />
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
