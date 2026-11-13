export default [
  {
    path: '/',
    title: 'Deez nuts',
    component: './login',
  },
  {
    path: '/login',
    title: 'Deez nuts',
    component: './login',
  },
  {
    path: '/',
    component: '@/components/layout/main',
    wrappers: ['@/wrappers/admin'],
    routes: [
      {
        path: '/home',
        component: './home/total',
      },
      // {
      //     path: '/news/list',
      //     component: './news/list',
      // },
      {
        path: '/home/total',
        component: './home/total',
      },
      {
        path: '/home/now',
        component: './home/now',
      },
      {
        path: '/game/odd',
        component: './game/odd',
      },
      {
        path: '/game/betmax',
        component: './game/betmax',
      },
      {
        path: '/game/mdopen',
        component: './game/mdopen',
      },
      {
        path: '/game/man',
        component: './game/man',
      },
      {
        path: '/user/list',
        component: './user/list',
      },
      {
        path: '/user/bet',
        component: './user/bet',
      },
      {
        path: '/user/dou',
        component: './user/dou',
      },
      {
        path: '/user/mtmx',
        component: './user/mtmx',
      },
      {
        path: '/user/kami',
        component: './user/kami',
      },
      // {
      //     path: '/user/sms',
      //     component: './user/sms',
      // },
      // {
      //     path: '/user/hmd',
      //     component: './user/hmd',
      // },
      {
        path: '/trx/in',
        component: './trx/in',
      },
      {
        path: '/trx/out',
        component: './trx/out',
      },
      {
        path: '/trx/balance',
        component: './trx/balance',
      },
      {
        path: '/fuli/phb',
        component: './fuli/phb',
      },
      // {
      //     path: '/fuli/ygz',
      //     component: './fuli/ygz',
      // },
      {
        path: '/fuli/hdfl',
        component: './fuli/hdfl',
      },
      // {
      //     path: '/fuli/mrqd',
      //     component: './fuli/mrqd',
      // },
      {
        path: '/fuli/hb',
        component: './fuli/hb',
      },
      {
        path: '/fuli/hblq',
        component: './fuli/hblq',
      },
      // {
      //     path: '/fuli/jyhd',
      //     component: './fuli/jyhd',
      // },
      {
        path: '/agent/rank',
        component: './agent/rank',
      },
      {
        path: '/agent/list',
        component: './agent/list',
      },
      {
        path: '/agent/hs',
        component: './agent/hs',
      },
      {
        path: '/agent/charge',
        component: './agent/charge',
      },
      // {
      //     path: '/agent/zy',
      //     component: './agent/zy',
      // },
      {
        path: '/agent/dou',
        component: './agent/dou',
      },
      {
        path: '/agent/tgfl',
        component: './agent/tgfl',
      },
      // {
      //     path: '/kf/up',
      //     component: './kf/up',
      // },
      // {
      //     path: '/kf/down',
      //     component: './kf/down',
      // },
      {
        path: '/kf/jdmx',
        component: './kf/jdmx',
      },
      {
        path: '/sys/list',
        component: './sys/list',
      },
      {
        path: '/sys/up',
        component: './sys/up',
      },
      {
        path: '/sys/jdmx',
        component: './sys/jdmx',
      },
      {
        path: '/sys/kftj',
        component: './sys/kftj',
      },
      {
        path: '/sys/log',
        component: './sys/log',
      },
      {
        path: '/sys/open_log',
        component: './sys/open_log',
      },
      {
        component: './login',
      },
    ],
  },
];
