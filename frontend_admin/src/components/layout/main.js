import { useEffect, useState } from 'react';
import { useModel, dynamic, history } from 'umi';
import { Button, Row, Col, Avatar, Menu, ConfigProvider } from 'antd';
import { get, del } from '@/utils/storage';
//
import locale from 'antd/lib/locale/en_US';
import moment from 'moment-timezone';
//
import {
  AreaChartOutlined,
  RadarChartOutlined,
  CodeSandboxOutlined,
  TeamOutlined,
  SlackOutlined,
  DropboxOutlined,
  MailOutlined,
  QqOutlined,
  SettingOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { nTom } from '../../utils/tool';
//
const { SubMenu } = Menu;

const Modal = dynamic({ loader: () => import('@/components/Modal') });
// const Openkr = dynamic({ loader: () => import('@/components/Mdata/openkr') });
// const Openbtc = dynamic({ loader: () => import('@/components/Mdata/openbtc') });
const TopUp = dynamic({ loader: () => import('@/components/Mdata/top_up') });
// const Mdopen = dynamic({ loader: () => import('@/components/Mdata/mdopen')});
//
export default (props) => {
  const { initialState, refresh } = useModel('@@initialState');
  const { Auth } = initialState || {};
  //
  const { location, children } = props;
  //
  const {
    SET,
    SEND,
    AuthDouLoading,
    LayoutOpenKey,
    MP3,
    LotteryNewAdd,
    LotteryNew,
  } = useModel('data');
  //
  const onMenuClick = (url, t) => {
    history.push('/' + url);
  };
  //
  useEffect(() => {
    if (!MP3) return;
    document.getElementById('mp3_' + MP3).play();
    SET({ MP3: '' });
  }, [MP3]);
  //
  const LiveClock = (props) => {
    const { tz, format } = props;
    const [currentTime, setCurrentTime] = useState('');
    useEffect(() => {
      updateTime();
      const intervalId = setInterval(updateTime, 1000);
      return () => clearInterval(intervalId);
    }, []);

    const updateTime = () => {
      const now = moment.tz(tz);
      const formattedTime = now.format(format);
      setCurrentTime(formattedTime);
    };
    return <p>{currentTime}</p>;
  };
  //
  const menu = [
    [
      'Game',
      <CodeSandboxOutlined />,
      {
        'game/man': 'Setting',
        'game/odd': 'Odd',
        'game/betmax': 'Quota',
        'game/mdopen': 'Recovery',
      },
    ],
    [
      'Members',
      <TeamOutlined />,
      {
        'user/list': 'List',
        'user/bet': 'Bet Flow',
        'user/dou': 'Bean Flow',
        'user/mtmx': 'Daily Flow',
        'user/kami': 'Withdrawal',
        // 'user/sms': 'SMS',
        // 'user/hmd': 'Blacklist'
      },
    ],
    [
      'Transaction',
      <DollarOutlined />,
      {
        'trx/in': 'Incoming',
        'trx/out': 'Outgoing',
        'trx/balance': 'Balance',
      },
    ],
    [
      'Promotions',
      <SlackOutlined />,
      {
        'fuli/phb': 'Leaderboard',
        // 'fuli/ygz': 'Salary',
        'fuli/hdfl': 'Rebate',
        // 'fuli/mrqd': 'Daily VIP',
        'fuli/hb': 'Red Pocket',
        'fuli/hblq': 'Withdraw RP',
        // 'fuli/jyhd': 'Experience'
      },
    ],
    [
      'Agents',
      <DropboxOutlined />,
      {
        'agent/list': 'List',
        'agent/rank': 'Leaderboard',
        'agent/hs': 'Withdrawal',
        'agent/charge': 'Charge',
        // 'agent/zy': 'Transfer',
        'agent/dou': 'Bean flow',
      },
    ],
    // [
    //     'Broadcast',
    //     <MailOutlined />,
    //     {
    //         'news/list': 'Message',
    //     }
    // ],
    // [
    //     'Cust. Service',
    //     <SlackOutlined />,
    //     {
    //         'kf/up': 'Charge',
    //         'kf/down': 'Return',
    //         'kf/jdmx': 'Bean Flow',
    //     }
    // ]
  ];
  //
  if ((Auth && Auth.role == 3) || (Auth && Auth.nick == 'Knoflook')) {
    menu.push([
      'System',
      <SettingOutlined />,
      {
        'sys/list': 'List',
        // 'sys/up': 'Charge',
        'sys/jdmx': 'Bean Flow',
        // 'sys/kftj': 'Statistic',
        'sys/log': 'Account Log',
        'sys/open_log': 'Lottery Log',
      },
    ]);
  }
  //
  const _user_dou = () => {
    if (!Auth || !Auth.dou) return;
    return (
      <>
        <b>${nTom(parseInt(Auth.dou / 1000))}</b>
      </>
    );
  };
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find(
      (key) => (LayoutOpenKey || []).indexOf(key) === -1,
    );
    SET({ LayoutOpenKey: latestOpenKey ? [latestOpenKey] : [] });
  };
  //
  // const Krbtc = () => {
  //   if ((Auth && Auth.role == 3) || (Auth && Auth.nick == 'Knoflook'))
  //     return (
  //       <div className="krbtc">
  //         <Row>
  //           <Col flex="1">
  //             <div className="it cu">
  //               <Openkr />
  //             </div>
  //           </Col>
  //           <Col flex="1">
  //             <div className="it cu">
  //               <Openbtc />
  //             </div>
  //           </Col>
  //         </Row>
  //       </div>
  //     );
  // };
  //
  const AuthLoad = () => {
    if (AuthDouLoading)
      return <div style={{ padding: '20px 0' }}>Loading...</div>;
    return (
      <div>
        <div
          style={{ padding: '16px 0 6px', cursor: 'pointer' }}
          onClick={() => {
            SET({ AuthDouLoading: 1 });
            SEND('admin/getdou');
          }}
        >
          <img
            style={{ width: '40%' }}
            src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/logos.png"
          />
        </div>
        <p>{Auth && Auth.nick}</p>
        <div style={{ padding: '3px 5px 8px' }}>{_user_dou()}</div>
        {/* <Krbtc /> */}
      </div>
    );
  };
  //
  return (
    <ConfigProvider locale={locale}>
      <div className="home p10 tc">
        <Row gutter={10}>
          <Col flex="160px">
            <div className="block br5 menu por bf">
              <AuthLoad />
              <TopUp />
              <div style={{ borderTop: '1px solid #eee' }}>
                <Menu
                  inlineIndent={10}
                  mode="inline"
                  openKeys={LayoutOpenKey}
                  onOpenChange={onOpenChange}
                >
                  <Menu.Item
                    key="total"
                    icon={<AreaChartOutlined />}
                    onClick={() => onMenuClick('home/total', '首页概览')}
                  >
                    Home
                  </Menu.Item>
                  <Menu.Item
                    key="now"
                    icon={<RadarChartOutlined />}
                    style={{ borderTop: '1px solid #eee' }}
                    onClick={() => onMenuClick('home/now', '监控中心')}
                  >
                    Monitor
                  </Menu.Item>
                  {menu.map((vv, kk) => (
                    <SubMenu title={vv[0]} icon={vv[1]} key={'sub-' + kk}>
                      {Object.keys(vv[2]).map((k) => (
                        <Menu.Item
                          key={vv + k}
                          onClick={() => onMenuClick(k, vv[2])}
                        >
                          {vv[2][k]}
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  ))}
                </Menu>
              </div>

              <div
                className="logout poa"
                onClick={async () => {
                  await del();
                  refresh();
                  history.push('/');
                }}
              >
                Logout
              </div>
            </div>
          </Col>
          <Col flex="1">{children}</Col>
        </Row>
      </div>

      {['scooby', 'lottery_bet', 'lottery_open', 'kami'].map((v, k) => (
        <audio
          key={k}
          id={'mp3_' + v}
          src={
            'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/mp3/' +
            v +
            '.mp3'
          }
          autoPlay={false}
          loop={false}
          muted={false}
        ></audio>
      ))}

      <Modal />
    </ConfigProvider>
  );
};
