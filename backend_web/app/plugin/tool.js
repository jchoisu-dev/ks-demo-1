//
const dayjs = require("dayjs");
// 手机号码
const phoneHide = async(p) => {
    return p.substring(0, 2) + "*****" + p.substr(p.length - 2);
};
// 随机数
const getRandom = async(min, max, _p = 2) => {
    return parseInt(Math.random() * (max - min) + min);
};
// 分页
const page = (page, limit = 20) => {
    page = page || 1;
    page = parseInt(page);
    let _page = page - 1;
    _page = _page > 0 ? _page : 0;
    const offset = _page * limit;
    return {
        limit,
        offset
    }
};
// 游戏时间
const getTimeDown = async(d) => {
    if (!d) return 0;
    d = dayjs(d).diff(dayjs(), 'second');
    d = d < 0 ? 0 : d;
    return d;
};
// 跳转
const GotoUrl = async(u) => {
    let _r = {};
    _r['A'] = {
        u,
        t: dayjs().valueOf()
    }
    return _r;
};
// 分页
const xpage = async(page, limit=20) =>
{
    page = page || 1;
    page = parseInt(page);
    let _page = page-1;
    _page = _page>0 ? _page : 0;
    const offset = _page * limit;
    return {
        limit,
        offset
    }
}
// 返回年月日
const yearmonthday = async() =>
{
    return {
        year: dayjs().format('YYYY'),
        month: dayjs().format('MM'),
        day: dayjs().format('DD')
    }
}
// 
const __urlname = (e) => 
{
    // console.log(e);
    const _pathTxt = 
    {
        'home': 'Home',
        'activy': 'Promo',
        'news': 'News',
        'game': 'Game',
        'jg': 'Lottery Results',
        'rank': 'Ranking',
        'user': 'User Profile',
        'agent': 'Agent Profile',
        'shop': 'Shop',
        'agents': 'Agents',
        'auth': '用户',
        'user_login': 'Login',
        'wjmm': 'Forgot Password',
        'phonecode': 'Phone 2FA',
        'register': 'Register',
        'get': '获取',
        'wdyh': 'My Bank',
        'qu': 'Deposit',
        'cun': 'Withdraw',
        'getmylastpass': 'Previous Bet',
        'bet': 'Bet',
        'zst': 'Map',
        'tzjl': 'Bet History',
        'jdmx': 'Beans Flow',
        'welcome': 'Welcome',
        // 
        'q214': 'Group 214',
        'q28': 'Group 28',
        'bj': 'Taiwan Bingo',
        'dd': 'Taiwan DD',
        'pk': 'PK',
        'jnd': 'Canada',
        'jnc': 'Canada West',
        'btc': 'BTC',
        'kr': 'Korea',
        'au': 'Australia',
        'elg': 'Oregon',
        'slfk': 'Slovakia',
        // 
        'sc': 'SC',
        'gyh': 'GYH',
        'gj': 'GJ',
        'lh': 'LH',
        'nn': '牛牛10倍',
        'nb': '牛牛5倍',
        // 
        'autobet' : 'Auto Bet',
        'bet_last':'投注页面',
        'dou' : 'Member retrieves Bean',
        'prevbet': 'Previous Bet',
        'homem':'My Profile',
        'my_qr_code': 'Top Up QR Code',
        'get_settings_usdt': 'TRC-20 Settings',
        'yc' : 'Forecast',
        '28gd' : '28 GD',
        'jglist' : 'Lottery Result',
        'msbets' : 'Betting Config',
        'msadd' : 'Betting Add',
        'ms' : 'Betting Setting',
        // 
        'login' : 'Login',
        'auth_ncp' : '请求登录验证码',
        'logincode' : '发送 登录验证码',
        'registercode' : '发送 注册验证码',
        'forgotcode' : '发送 忘记验证码',
        'wdzl_dlmm_change' : '更改密码',
        'wdzl_aqm_change' : '更改安全密码', 
        // 
        'user_wdyh-now' : '我的银行',
        'user_hdfl-now' :'活动返利',
        'user_hdfl': 'User Profile Promotions' ,
        'user_phb' : 'User Profile Ranking',
        'user_jdmx' : '金豆明细',
        'user_wdhb' : 'Red Pocket',
        'user_rzjl' : '日志记录' ,
        'user_tzjl' : 'Bet History',
        'user_wdkm' : 'My Withdrawal',
        'wdzl' : '我的记录',
        'wdzl_change': '修改我的资料',
        'user_wdyh' : '我的银行',
        'user_jyhd' : '经验换豆',
        'user_yqhy' : '邀请好友',
        'now': 'List',
        'mrqd_go' : '每日签到 - 领取',
        'mrqd_list' :'Daily Bonus',
        // 
        'agent_zhsj' : '账号升级',
        'agent_jdmx' : '代理 - 金豆明细',
        'agent_edzy':'额度转移',
        'agent_tjxx' : '统计信息',
        'agent_charge' : '代理充值',
        'agent_card' : '回收卡密',
        'agent_dltx':'代理提现',
        'id_check' : '查看 用户 ID',
        // 
        'list' : 'List',
        // 
        'zdmsget' : '获取模式',
        'zdget' : '获取自动投注',
        'ygz' : 'Monthly Bonus',
        'ygz_go' : 'Redeem Monthly Bonus',
        'gzs' : 'Game Rules',
        'gz' : '规则',
        'check' : 'Withdrawal Check',
        'code' : '验证码' ,
        'exchange' : '兑换',
        'news_get' : '查看新闻',
        'jl' : 'History',
        'index' : 'Home Page' , 
        'undefined' : 'Unknown',
    }
    // 
    let _e = e.toString().split('/');
    if(_e.length>0)
    {
        let _ee = [];
        for(let i in _e)
        {
            _ee.push(_pathTxt[_e[i]]||_e[i]);
        }
        // if(_ee.length>0) return _ee.join('-');
        if(_ee.length>0) return _ee[0] + ' - ' +_ee[1];
        // if(_ee.length>0) return _ee[1];
    }
    return _pathTxt[e]||e;
}
// 
module.exports = {
    phoneHide,
    getRandom,
    page,
    getTimeDown,
    GotoUrl,
    xpage,
    yearmonthday,
    __urlname
};