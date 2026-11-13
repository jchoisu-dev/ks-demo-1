// 金额转数字
const mTon = (n) => {
  n = n + '';
  n = n.replace(/,/gi, '');
  n = parseInt(n);
  return !n ? '' : n;
};
// 数字转金额
const nTom = (n) => {
  n = n + '';
  if (n == 0) return '0';
  return n.replace(/(\d)(?=(\d{3})+$)/g, ($1) => {
    return $1 + ',';
  });
};
//
const dTom = async (n) => {
  n = n + '';
  if (n == 0) return '0';
  return n / 1000;
};
// 百分比
const percent = (num, total) => {
  if (num == 0 || total == 0) return 0;
  return Math.round((num / total) * 10000) / 100.0;
};
//
const parseVal = (val) => {
  if (val == 0) return 0;
  while (val.charAt(0) == '0') val = val.substring(1, val.length);
  return val;
};
//
const toDecimal2NoZero = (x, d = 1) => {
  let num = { 1: 10, 2: 100, 3: 1000 };
  let f = Math.round(x * num[d]) / num[d];
  let s = f.toString();
  return s;
};
//
const formStatus = (status, i) => {
  let _t = status && status[i];
  if (!_t || !_t.s) return;
  let r = {
    // hasFeedback: true,
    validateStatus: _t.s,
  };
  if (_t.h) r['help'] = _t.h;
  return r;
};
const formFieldChange = (SET, status, i) => {
  if (status && status[i]) {
    delete status[i];
    let _s = { status };
    SET({ ..._s });
  }
};
const formValue = (v) => {
  let _v = {};
  for (let i in v) {
    if (v[i]) _v[i] = v[i];
  }
  return _v;
};
// 取尾数
const strLastOne = (str) => {
  str = str + '';
  let spstr = str.split('');
  return spstr[spstr.length - 1];
};

//
const nToz = (num) => {
  if (!/^\d*(\.\d*)?$/.test(num)) return '-';
  var AA = new Array(
    '零',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
  );
  var BB = new Array('', '十', '百', '千', '万', '亿', '点', '');
  var a = ('' + num).replace(/(^0*)/g, '').split('.'),
    k = 0,
    re = '';
  //
  for (var i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re;
        break;
      case 4:
        if (!new RegExp('0{4}\\d{' + (a[0].length - i - 1) + '}$').test(a[0]))
          re = BB[4] + re;
        break;
      case 8:
        re = BB[5] + re;
        BB[7] = BB[5];
        k = 0;
        break;
    }
    if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
      re = AA[0] + re;
    if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
    k++;
  }
  if (a.length > 1) {
    re += BB[6];
    for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
  }
  return re;
};

//
const __urlname = (e) => {
  // console.log(e);
  const _pathTxt = {
    home: 'Home',
    activy: 'Promo',
    news: 'News',
    game: 'Game',
    jg: 'Lottery Results',
    rank: 'Ranking',
    user: 'User Profile',
    agent: 'Agent Profile',
    shop: 'Shop',
    agents: 'Agents',
    auth: '用户',
    user_login: 'Login',
    wjmm: 'Forgot Password',
    phonecode: 'Phone 2FA',
    register: 'Register',
    get: '获取',
    wdyh: 'My Bank',
    qu: 'Deposit',
    cun: 'Withdraw',
    getmylastpass: 'Previous Bet',
    bet: 'Bet',
    zst: 'Map',
    tzjl: 'Bet History',
    jdmx: 'Beans Flow',
    //
    q214: 'Group 214',
    q28: 'Group 28',
    bj: 'Taiwan Bingo',
    dd: 'Taiwan DD',
    pk: 'PK',
    jnd: 'Canada',
    jnc: 'Canada West',
    btc: 'BTC',
    kr: 'Korea',
    au: 'Australia',
    elg: 'Oregon',
    slfk: 'Slovakia',
    //
    sc: 'SC',
    gyh: 'GYH',
    gj: 'GJ',
    lh: 'LH',
    nn: '牛牛10倍',
    nb: '牛牛5倍',
    //
    autobet: 'Auto Bet',
    bet_last: '投注页面',
    dou: 'Member retrieves Bean',
    prevbet: 'Previous Bet',
    homem: 'Home (Mobile)',
    yc: 'Forecast',
    '28gd': '28 GD',
    jglist: 'Lottery Result',
    msbets: 'Betting Config',
    msadd: 'Betting Add',
    ms: 'Betting Setting',
    //
    login: 'Login',
    auth_ncp: '请求登录验证码',
    logincode: '发送 登录验证码',
    registercode: '发送 注册验证码',
    forgotcode: '发送 忘记验证码',
    wdzl_dlmm_change: '更改密码',
    wdzl_aqm_change: '更改安全密码',
    //
    'user_wdyh-now': '我的银行',
    'user_hdfl-now': '活动返利',
    user_hdfl: '活动返利',
    user_phb: '排行榜奖励',
    user_jdmx: '金豆明细',
    user_wdhb: '我的红包',
    user_rzjl: '日志记录',
    user_tzjl: '投注记录',
    user_wdkm: '我的卡密',
    wdzl: '我的记录',
    wdzl_change: '修改我的资料',
    user_wdyh: '我的银行',
    user_jyhd: '经验换豆',
    user_yqhy: '邀请好友',
    now: '页面',
    mrqd_go: '每日签到 - 领取',
    mrqd_list: '每日签到 - 列表',
    //
    agent_zhsj: '账号升级',
    agent_jdmx: '代理 - 金豆明细',
    agent_edzy: '额度转移',
    agent_tjxx: '统计信息',
    agent_charge: '代理充值',
    agent_card: '回收卡密',
    agent_dltx: '代理提现',
    id_check: '查看 用户 ID',
    //
    list: '列表',
    //
    zdmsget: '获取模式',
    zdget: '获取自动投注',
    ygz: '每月工资',
    ygz_go: '月工资领取',
    gzs: '游戏规则',
    gz: '规则',
    check: '用户检查',
    code: '验证码',
    exchange: '兑换',
    news_get: '查看新闻',
    jl: '记录',
    index: '首页',
    undefined: '未知',
  };
  //
  let _e = e.toString().split('/');
  if (_e.length > 0) {
    let _ee = [];
    for (let i in _e) {
      _ee.push(_pathTxt[_e[i]] || _e[i]);
    }
    // if(_ee.length>0) return _ee.join('-');
    if (_ee.length > 0) return _ee[0] + _ee[1];
  }
  return _pathTxt[e] || e;
};

//
const _jgTxt = {
  //
  cd: '车道',
  gyh: '冠亚和',
  //
  long: '龙',
  hu: '虎',
  //
  bao: '豹',
  shun: '顺',
  dui: '对',
  ban: '半',
  za: '杂',
  //
  da: '大',
  xiao: '小',
  dan: '单',
  shuang: '双',
  dadan: '大单',
  dashuang: '大双',
  xiaodan: '小单',
  xiaoshuang: '小双',
  jida: '极大',
  jixiao: '极小',
};
//
const ___gamename = (e) => {
  let _e = e.toString().split('-');
  if (_e.length > 0) {
    let _ee = [];
    for (let i in _e) {
      _ee.push(_jgTxt[_e[i]] || _e[i]);
    }
    if (_ee.length > 0) return _ee.join('-');
  }
  return _jgTxt[e] || e;
};
//
const valsCutCheck = (vals) => {
  vals = JSON.stringify(vals);
  // console.log(vals);
  if (/\[\-/.test(vals)) return true;
  return false;
};
//
export {
  nTom,
  mTon,
  nToz,
  percent,
  parseVal,
  toDecimal2NoZero,
  formStatus,
  formFieldChange,
  formValue,
  strLastOne,
  //
  __urlname,
  ___gamename,
  //
  valsCutCheck,
  dTom,
};
