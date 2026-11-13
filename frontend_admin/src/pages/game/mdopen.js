//
import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button, Tag, Divider, Select } from 'antd';
import { ___gamename } from '@/utils/game';
import { _game, _type, _numbers, _number, _odds } from '@/utils/gameData';
import { getGameType } from '@/utils/gameTool';
//
const { Option } = Select;
const Table = dynamic({ loader: () => import('@/components/Table') });
//
export default (props) => {
  //
  const DATA = useModel('data');
  const { SET, SEND, GameNoLotteryLoading, GameNoLotteryList, MdopenReload } =
    DATA;
  const [form] = Form.useForm();
  //
  useEffect(() => {
    SET({
      GameNoLotteryLoading: false,
      GameNoLotteryList: '',
      MdopenNumber: '',
      MdopenTip: '',
      MdopenSelect: '',
      MdopenReload: '',
      isOn: '',
      MdopenGetData: '',
      MdopenGetLoading: false,
    });
  }, []);
  //
  useEffect(() => {
    if (!MdopenReload) return;
    SET({
      MdopenNumber: '',
      MdopenTip: '',
      MdopenSelect: '',
      MdopenPost: '',
      MdopenReload: '',
      isOn: '',
      MdopenGetData: '',
      MdopenGetLoading: false,
    });
    form.resetFields();
  }, [MdopenReload]);
  //
  const _menu_type = {
    jnd: '加拿大与PK',
    jnc: '加拿大西部',
    ddbj: '台湾与蛋蛋',
    elg: '俄勒冈',
    slfk: '斯洛伐克',
    au: '澳洲',
    kr: '韩国',
    btc: '比特币',
  };
  //
  const gets = async (number) => {
    if (!number || number.length != 20) return {};
    return await getGameType('jnd', { number });
  };
  const changeNumber = async (v) => {
    let _number = v['number'];
    let number = [];
    if (_number) {
      _number = _number.replace(/\s+/g, '').replace(new RegExp(',', 'gm'), '');
      for (var i = 0, len = _number.length; i < len; i += 2) {
        number.push(_number.slice(i, i + 2));
      }
      form.setFieldsValue({
        ...v,
        number: number.join(','),
      });
      //
      SET({
        MdopenNumber: {
          number,
          lottery: await gets(number),
        },
        MdopenTip: '',
      });
    }
  };
  //
  const OpenStatus = () => {
    const { MdopenNumber, MdopenSelect } = useModel('data');
    const { number, lottery } = MdopenNumber;
    //
    if (!number || number.length != 20 || !lottery) return <></>;
    return (
      <>
        <Divider />
        <div className="jlista">
          <Row gutter={10}>
            {lottery &&
              Object.keys(lottery).map((k) => (
                <Col flex={1}>
                  <div
                    className={'item h' + (MdopenSelect == k ? ' on' : '')}
                    onClick={() => postdata({ type: k, num: lottery[k] })}
                  >
                    <p>{k}</p>
                    <p>{___gamename(lottery[k])}</p>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </>
    );
  };
  //
  const OpenTip = () => {
    const { MdopenNumber, MdopenTip } = useModel('data');
    const { number } = MdopenNumber;
    if (!number)
      return (
        <>
          <Divider />
          <b>请输入开奖号码</b>
        </>
      );
    if (number && number.length != 20) {
      return (
        <>
          <Divider />
          <b>开奖号码错误</b>
        </>
      );
    }
    if (MdopenTip)
      return (
        <>
          <Divider />
          <b>{MdopenTip}</b>
        </>
      );
    return <></>;
  };
  //
  const OpenForm = () => {
    const { MdopenPost, isOn, MdopenGetData, MdopenGetLoading } =
      useModel('data');
    //
    const getlottery = () => {
      const { category, peroids } = form.getFieldsValue();
      if (!category || !peroids) return;
      //
      SET({ MdopenGetLoading: 1 });
      SEND('mdata/caomei_get', { category, peroids });
    };
    //
    useEffect(() => {
      if (!MdopenGetData) return;
      const { time, number } = MdopenGetData;
      const numbers = number.join(',');
      form.setFieldsValue({
        _time: time,
        number: numbers,
      });
      changeNumber({ number: numbers });
      SET({ MdopenGetData: '' });
    }, [MdopenGetData]);
    //
    return (
      <div className="formmask xform" style={{ width: 600 }}>
        <Form
          form={form}
          onValuesChange={(v) => changeNumber(v)}
          initialValues={{ category: '' }}
        >
          <div className="gameitems mb10">
            <Row justify="center" gutter={10}>
              {Object.keys(_menu_type).map((k) => (
                <Col span={3}>
                  <div
                    key={k}
                    className={'gameitem br5 ' + (k == isOn ? 'on' : '')}
                    onClick={() => {
                      form.setFieldsValue({ category: k });
                      SET({ isOn: k });
                    }}
                  >
                    <img
                      src={
                        'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/game/' +
                        (k == 'ddbj' ? 'bj' : k) +
                        '.png'
                      }
                      width={'60px'}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <Form.Item name="category">
            <Input disabled addonBefore="游戏" />
          </Form.Item>
          <Form.Item name="peroids">
            <Input
              addonBefore="期数"
              addonAfter={
                <Button loading={MdopenGetLoading} onClick={() => getlottery()}>
                  获取
                </Button>
              }
            />
          </Form.Item>
          <Form.Item name="_time">
            <Input addonBefore="时间" />
          </Form.Item>
          <Form.Item name="number" noStyle>
            <Input addonBefore="号码" />
          </Form.Item>
        </Form>
        <OpenStatus />
        <OpenTip />
        {MdopenPost ? <div className="mask"></div> : ''}
      </div>
    );
  };
  //
  const postdata = (v) => {
    const _d = form.getFieldsValue();
    if (
      !_d.category ||
      !_d.peroids ||
      !_d._time ||
      !_d.number ||
      _d.number.split(',').length != 20
    ) {
      SET({
        MdopenSelect: v.type,
        MdopenTip: '请输入完整',
      });
      return;
    }
    SEND('mdata/set_game_no_lottery', { ..._d, ...v });
    SET({
      MdopenPost: 1,
      MdopenSelect: v.type,
      MdopenTip: '开始提交数据',
    });
  };
  //
  const openWin = () => {
    SET({
      M: {
        t: '手工补奖',
        c: <OpenForm />,
        bc: () => {
          SET({
            MdopenNumber: '',
            MdopenTip: '',
            MdopenSelect: '',
            MdopenPost: '',
            isOn: '',
            MdopenGetData: '',
            MdopenGetLoading: false,
          });
          form.resetFields();
        },
      },
    });
  };
  //
  return (
    <div className="tc bf br5 p16">
      <div style={{ padding: '5px 0 15px' }}>
        <Row justify="space-between">
          <Col>
            <Button
              type="primary"
              loading={GameNoLotteryLoading}
              onClick={() => {
                SET({ GameNoLotteryLoading: 1 });
                SEND('mdata/get_game_no_lottery_list');
              }}
            >
              Detect Lost Lottery
            </Button>
          </Col>
          <Col>
            <Button onClick={() => openWin()}>Manual Recovery</Button>
          </Col>
        </Row>
      </div>
      <div className="boe br5 ov">
        <Table
          tableClass={'hover'}
          columns={[
            ['游戏'],
            ['期数'],
            [
              '操作',
              (v) => (
                <Button
                  onClick={() => {
                    form.setFieldsValue({
                      category: v[0],
                      peroids: v[1],
                    });
                    openWin();
                  }}
                >
                  补奖
                </Button>
              ),
            ],
          ]}
          data={GameNoLotteryList || []}
        />
      </div>
    </div>
  );
};
