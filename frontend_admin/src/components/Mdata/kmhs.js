//
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Radio,
  Divider,
  Spin,
  Select,
  Tag,
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
//
export default (props) => {
  const { form } = props;
  const { user_id, amount, km, user_card_id, user_name } = props.data;
  //
  const {
    SET,
    SEND,
    TrxModes,
    TRX,
    M,
    er,
    LiveBalance,
    SearchWallet,
    LiveBalanceLoading,
    LiveBalanceError,
  } = useModel('data');
  const [value, setValue] = useState('');
  //
  useEffect(() => {
    SEND('user_kami/getUSDTWallet', { user_id });
    SET({
      err: null,
      TrxModes: 'Selection',
      LiveBalanceLoading: '',
      LiveBalance: '',
      search_sender: '',
    });
  }, []);
  //
  useEffect(() => {
    if (TrxModes == 'Automatic') {
      form.setFieldsValue({ sender: TRX.sender });
      SET({ LiveBalanceLoading: 1 });
    } else {
      form.setFieldsValue({
        sender: null,
        man_sender: null,
        man_priv_key: null,
        senders: null,
      });
    }
    //
    if (form.getFieldValue('sender')) {
      SEND('user_kami/getLiveUSDTBalance', {
        address_business: form.getFieldValue('sender'),
      });
    }
    SET({ LiveBalance: '', LiveBalanceError: '' });
  }, [TrxModes]);
  //
  useEffect(() => {
    if (!SearchWallet) return;
    form.setFieldsValue({ sender: SearchWallet });
    SET({ SearchWallet: '' });
  }, [SearchWallet]);
  //
  const onChange = (value) => {
    form.setFieldsValue({
      senders: value,
      sender: value,
      search_sender: null,
    });
    SET({ LiveBalanceLoading: 1, LiveBalanceError: '' });
    SEND('user_kami/getLiveUSDTBalance', { address_business: value });
  };
  //
  const onFinish = async (v) => {
    SEND('user_kami/transferUSDT', {
      ...v,
      mode: TrxModes,
      km,
      user_id,
      user_card_id,
      user_name,
    });
  };
  //
  const onFinishFailed = async (errorInfo) => {
    SET({
      M: {
        ...M,
        bl: false,
      },
      er: true,
    });
  };
  //
  return (
    <div className="kmhs">
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: 10 }}>
        <Radio.Group
          options={[
            { label: 'Automatic', value: 'Automatic' },
            { label: 'Selection', value: 'Selection' },
            { label: 'Manual', value: 'Manual' },
          ]}
          onChange={(e) => {
            SET({ TrxModes: e.target.value });
          }}
          value={TrxModes}
          optionType="button"
          buttonStyle="solid"
        />
      </div>

      <Divider />

      <div className="tc">
        Reference-ID: <b>{km} </b>
        <br />
        User ID: {user_id} <br />
        Username: {user_name}
      </div>

      <Divider />

      {TRX ? (
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            receiver: TRX && TRX.receiver,
            amount,
            unit: 'USDT',
            //
            man_sender: null,
            man_priv_key: null,
            sender: null,
            senders: null,
          }}
        >
          <div className="trx">
            {TrxModes == 'Manual' ? (
              <Form.Item
                rules={[{ required: true }]}
                name="man_sender"
                noStyle="1"
              >
                <Input status={er && 'error'} addonBefore={<b>Sender</b>} />
              </Form.Item>
            ) : (
              <>
                {TrxModes == 'Selection' ? (
                  <>
                    {/* <Row gutter={5} style={{marginBottom:16}}>
                        <Col flex={1}>
                            <Form.Item name="senders" noStyle="1">
                                <Select 
                                    placeholder="- Select Wallet Address -" 
                                    onChange={onChange} 
                                    options={TRX.senders}
                                    className='wa'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Button block onClick={()=>{
                                form.setFieldsValue({ senders: null, sender: null, search_sender:null  });
                                SET({LiveBalance:''})
                            }}>
                                Clear 
                            </Button>
                        </Col>
                    </Row> */}
                    <Row gutter={5}>
                      <Col flex={1}>
                        <Form.Item
                          className="wa"
                          name="search_sender"
                          noStyle="1"
                        >
                          <Input
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="- Search For Wallet -"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button
                          disabled={!value}
                          block
                          type="primary"
                          onClick={() => {
                            SEND('user_kami/searchUsdtWallet', {
                              address_business:
                                form.getFieldValue('search_sender'),
                            });
                            SET({ LiveBalanceLoading: 1 });
                            form.setFieldsValue({ senders: null });
                          }}
                        >
                          Search
                        </Button>
                      </Col>
                      <Divider />
                    </Row>
                  </>
                ) : (
                  <></>
                )}

                {LiveBalanceError && (
                  <>
                    <Tag
                      style={{ margin: '0 auto', width: 260 }}
                      icon={<CloseCircleOutlined />}
                      color="error"
                    >
                      Wallet information not found
                    </Tag>
                    <Divider />
                  </>
                )}

                {(LiveBalanceLoading || LiveBalance) && (
                  <Row align="middle" justify="center" gutter={10}>
                    {LiveBalanceLoading ? (
                      <Col>
                        <Spin />
                      </Col>
                    ) : (
                      LiveBalance && (
                        <>
                          <Col span={12}>
                            Realtime Balance:{' '}
                            <Tag color="#108ee9">${LiveBalance}</Tag>
                          </Col>
                          <Col span={12}>
                            {LiveBalance > form.getFieldValue('amount') ? (
                              <Tag
                                icon={<CheckCircleOutlined />}
                                color="#87d068"
                              >
                                Balance is sufficient for transfer
                              </Tag>
                            ) : (
                              form.getFieldValue('sender') && (
                                <Tag
                                  icon={<ExclamationCircleOutlined />}
                                  color="warning"
                                >
                                  Balance is insufficient for transfer
                                </Tag>
                              )
                            )}
                          </Col>
                        </>
                      )
                    )}
                    <Divider />
                  </Row>
                )}

                <Form.Item
                  name="sender"
                  noStyle="1"
                  rules={[{ required: true }]}
                >
                  <Input
                    status={er && 'error'}
                    readOnly
                    addonBefore={<b>Sender</b>}
                  />
                </Form.Item>
              </>
            )}
            {TrxModes == 'Manual' ? (
              <>
                <Form.Item
                  rules={[{ required: true }]}
                  name="man_priv_key"
                  noStyle="1"
                >
                  <Input.Password
                    status={er && 'error'}
                    addonBefore={<b>Private Key</b>}
                  />
                </Form.Item>
              </>
            ) : (
              <></>
            )}

            <Form.Item name="receiver" noStyle="1">
              <Input readOnly addonBefore={<b>Receiver</b>} />
            </Form.Item>
            <Form.Item name="amount" noStyle="1">
              <Input readOnly addonBefore={<b>Amount</b>} />
            </Form.Item>
            <Form.Item name="unit" noStyle="1">
              <Input readOnly addonBefore={<b>Token</b>} />
            </Form.Item>
          </div>
        </Form>
      ) : (
        <Spin />
      )}
    </div>
  );
};
