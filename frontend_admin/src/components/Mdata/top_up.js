import { useState, useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { formStatus, nTom, mTon } from '@/utils/tool';
import { Button, Form, Row, Col, Divider, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { _opennums } from '@/utils/krnum';
import { ___gamename } from '@/utils/game';

const BlockLoading = dynamic({
  loader: () => import('@/components/Loading/BlockLoading'),
});

export default (props) => {
  const {
    SEND,
    SET,
    AgentdlczStatus,
    AgentChargeList,
    AgentChargeReload,
    AgentChargeLoadingx,
    AgentChargeLoading,
  } = useModel('data');
  //
  const [form] = Form.useForm();
  const moneys = [100, 500, 1000, 5000, 10000, 50000];
  const moneyCheck = (m) => {
    // if(m>_agent_dou) m = _agent_dou;
    form.setFieldsValue({ money: nTom(m) });
  };
  const checkUserid = () => {
    let _user_id = form.getFieldValue('_user_id');
    if (!_user_id) return;
    SET({
      AgentdlczUserCheckLoading: true,
    });
    SEND('agent_charge/id_check', { _user_id });
  };
  const setm = (m) => {
    let money = '';
    if (m) {
      money = mTon(form.getFieldValue('money'));
      money = money + parseInt(m);
    }
    moneyCheck(money);
  };
  //
  const onFinish = (v) => {
    // console.log(v)
    if (!v || !v._user_id || !v.money) {
      SET({ M: { c: 'Incomplete Parameters！' } });
      return;
    }
    //
    SET({ AgentChargeLoadingx: 1 });
    // SEND('agent_charge/id_check', { _user_id: v._user_id });
    SEND('agent_charge/go', {
      _user_id: v._user_id,
      money: mTon(v.money),
      tma: true,
    });
  };
  const onFormChange = (v) => {
    if (v && v.money) moneyCheck(mTon(v.money));
    if (v && v._user_id) {
      if (AgentdlczStatus && AgentdlczStatus._user_id) {
        SET({
          AgentdlczStatus: { ...AgentdlczStatus, _user_id: '' },
          AgentdlczUserInfo: '',
        });
      }
      let _ui = parseInt(v._user_id);
      if (!_ui || _ui <= 0) _ui = '';
      form.setFieldsValue({ _user_id: _ui });
    }
  };
  //
  // useEffect(()=>{
  //     form.resetFields();
  //     SET({
  //         AgentChargeLoadingx:false
  //     })
  // },[])
  //
  const Con = () => {
    const {
      AgentdlczUserInfo,
      AgentdlczUserCheckLoading,
      AgentdlczStatus,
      AgentChargeLoadingx,
    } = useModel('data');
    //
    useEffect(() => {
      form.resetFields();
      SET({
        AgentChargeLoadingx: false,
      });
    }, []);
    //
    return (
      <div>
        <Form
          form={form}
          onFinish={onFinish}
          onValuesChange={(v) => onFormChange(v)}
        >
          <Form.Item>
            <Form.Item
              style={{
                width: 220,
                display: 'inline-block',
                margin: '0 10px 0 0',
              }}
              name="_user_id"
              // rules={[{required:true, message:'User ID cannot be empty'}]}
              {...formStatus(AgentdlczStatus, '_user_id')}
            >
              <Input addonBefore={<UserOutlined />} />
            </Form.Item>
            <Button
              loading={AgentdlczUserCheckLoading}
              onClick={() => checkUserid()}
            >
              Check User
            </Button>
            {AgentdlczUserInfo &&
              AgentdlczUserInfo.map((v, k) => (
                <span className="auinfo" key={k}>
                  {v}
                </span>
              ))}
          </Form.Item>
          <Form.Item>
            <Form.Item
              name="money"
              rules={[{ message: 'Empty value not allowed', required: true }]}
              style={{
                width: 220,
                display: 'inline-block',
                margin: '0 10px 0 0',
              }}
              {...formStatus(AgentdlczStatus, 'money')}
            >
              <Input
                addonBefore={'$'}
                style={{ width: 220, marginRight: 10 }}
              />
            </Form.Item>
            {moneys.map((v, k) => (
              <Button
                key={k}
                style={{ marginRight: 10 }}
                onClick={() => setm(v)}
              >
                {nTom(v)}
              </Button>
            ))}
            <Button onClick={() => setm('')}>Clear</Button>
          </Form.Item>
          <Form.Item noStyle={true}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={AgentChargeLoadingx}
              style={{ width: 220 }}
            >
              Confirm Top Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };
  //
  return (
    <div
      className="p5 cu"
      onClick={() => {
        SET({
          BLL: 1,
          M: {
            t: 'Manual Top Up',
            c: <Con />,
          },
        });
      }}
    >
      Top Up
    </div>
  );
};
