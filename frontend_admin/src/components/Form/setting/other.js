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
    <div className="bf p16 br5 mb10" style={{ height: 307 }}>
      <h3>Exchange Time</h3>
      <Divider />
      <Form form={form} onFinish={(v) => setGo('settingother', v)}>
        <Form.Item name="shop_need_time">
          <Input addonBefore="After Charge" addonAfter="min" />
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
