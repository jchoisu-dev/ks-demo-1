//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Cascader,
  DatePicker,
  Select,
  notification,
} from 'antd';
import { nTom, __urlname } from '@/utils/tool';
import { CopyToClipboard } from 'react-copy-to-clipboard';
//
const { Option } = Select;
const { RangePicker } = DatePicker;
//
const Table = dynamic({ loader: () => import('@/components/Table') });
const MUSER = dynamic({ loader: () => import('@/components/Mdata/user') });
//
export default (props) => {
  const {
    SET,
    SEND,
    TrxBalanceList,
    TrxBalanceListLoading,
    PrivateKeyPermission,
    PrivateKeyPermissionLoading,
  } = useModel('data');
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const { Auth } = initialState || {};
  //
  const getD = (v) => {
    SET({
      TrxBalanceList: [],
      TrxBalanceListLoading: true,
    });
    if (v && v['time']) {
      v['time_start'] = v['time'][0].format('YYYY-MM-DD HH:mm');
      v['time_end'] = v['time'][1].format('YYYY-MM-DD HH:mm');
      delete v['time'];
    }
    SEND('trx/balance', {
      ...v,
    });
  };
  useEffect(() => {
    getD();
    SET({ PrivateKeyPermission: '' });
  }, []);
  //
  useEffect(() => {
    if (!PrivateKeyPermission) return;
    const { privateKey, wallet, rejection } = PrivateKeyPermission;
    //
    if (Auth.id == PrivateKeyPermission.user_id && rejection) {
      notification.open({
        message: <b>Access Not Granted</b>,
        description: <>Your access to {wallet} has been denied</>,
        onClose: () => {
          SET({ PrivateKeyPermission: '' });
        },
        duration: 10,
      });
      return;
    }
    if (Auth.id == PrivateKeyPermission.user_id) {
      notification.open({
        message: <b>Access Authorized</b>,
        description: (
          <>
            You have access to {wallet} <br /> Key: <b>{privateKey}</b>
          </>
        ),
        btn: (
          <Button
            type="primary"
            onClick={() => notification.close('open-' + privateKey)}
          >
            <CopyToClipboard text={privateKey}>
              <p>Click to copy Private Key</p>
            </CopyToClipboard>
          </Button>
        ),
        key: `open-${privateKey}`,
        onClose: () => {
          SET({ PrivateKeyPermission: '' });
        },
        duration: 10,
      });
    }
  }, [PrivateKeyPermission]);
  //
  return (
    <div className="pblock tc bf br5 hv p16">
      <div className="mb16">
        <Form form={form} onFinish={(v) => getD(v)} initialValues={{}}>
          <Row gutter="16">
            <Col flex="200px">
              <Form.Item name="user_id" noStyle>
                <Input addonBefore="ID" />
              </Form.Item>
            </Col>
            <Col flex="300px">
              <Form.Item name="telegram_id" noStyle>
                <Input addonBefore="Telegram ID" />
              </Form.Item>
            </Col>
            <Col flex="400px">
              <Form.Item name="address_business" noStyle>
                <Input addonBefore="Wallet" />
              </Form.Item>
            </Col>
            <Col flex="380px">
              <Form.Item name="time" noStyle>
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                />
              </Form.Item>
            </Col>
            <Col flex="130px">
              <Form.Item noStyle>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={TrxBalanceListLoading}
                >
                  Search
                </Button>
              </Form.Item>
            </Col>
            <Col flex="80px">
              <Form.Item noStyle>
                <Button block onClick={() => form.resetFields()}>
                  Clear
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
            // [ '#' ],
            ['ID', (v) => <MUSER t={v[0]} />],
            ['Telegram ID', (v) => <>{v[1]}</>],
            ['Telegram Tag', (v) => <>{v[2]}</>],
            ['Balance', (v) => '$' + v[5]],
            ['Agent', (v) => '$' + v[6]],
            [
              'Wallet',
              (v) => (
                <b
                  className="cu"
                  onClick={() =>
                    window
                      .open('https://tronscan.org/#/address/' + v[4], '_blank')
                      .focus()
                  }
                >
                  {v[4]}
                </b>
              ),
            ],
            ['Private Key', (v) => <>{v[7]}</>],
            [
              'Authorisation',
              (v) => (
                <Button
                  loading={PrivateKeyPermissionLoading}
                  onClick={() => {
                    SEND('trx/getkey', {
                      telegram_id: v[1],
                      wallet: v[4],
                      user_id: v[0],
                    });
                    SET({ PrivateKeyPermissionLoading: true });
                  }}
                  type="primary"
                  size="small"
                >
                  Request
                </Button>
              ),
            ],
          ]}
          data={TrxBalanceList || []}
          pageChange={(page) => getD({ page, ...form.getFieldValue() })}
        />
      </div>
    </div>
  );
};
