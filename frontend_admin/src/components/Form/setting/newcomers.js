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
  const { SettingLoading, Ftb } = useModel('data');
  //

  return (
    <div className="bf p16 br5">
      <h3>First Top Up one-time Bonus</h3>
      <Divider />
      <Form form={form} onFinish={(v) => setGo('HdFirstCharge', v)}>
        <Form.Item name="status">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="1">On</Radio.Button>
            <Radio.Button value="2">Off</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="quantity" label="Quantity">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="bonus" label="Bonus">
          <Input addonAfter="$" />
        </Form.Item>
        <Divider />
        {/* <Form.Item name="start_user_id" label="Start ID">
                <Input type="number" />
            </Form.Item> */}
        {/* <Form.Item label="Next ID">
                <Input value={Ftb&&Ftb} disabled />
            </Form.Item> */}

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
