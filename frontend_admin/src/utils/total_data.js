import { Button } from 'antd';

const TotalData = [
  [
    '总体统计',
    [
      ['游戏盈亏', '-'],
      ['卡密利润', '-'],
      ['代理返利', '-'],
      ['活动返利', '-'],
      ['盈利合计', '-'],
    ],
  ],
  [
    '会员统计',
    [
      ['金豆余额', '-'],
      ['银行金豆', '-'],
      ['金豆合计', '-'],
      ['游戏投注', '-'],
      ['游戏中奖', '-'],
    ],
  ],
  [
    '卡密统计',
    [
      ['卡密兑换', '-'],
      ['兑换折扣', '-'],
      ['-', '-'],
      ['-', '-'],
      ['-', '-'],
    ],
  ],
  [
    '代理统计',
    [
      ['用户充值', '-'],
      ['卡密回收', '-'],
      ['充值折扣', '-'],
      ['回收返点', '-'],
      ['-', '-'],
    ],
  ],
  [
    '日常统计',
    [
      ['排行榜奖励', '-'],
      ['经验换豆', '-'],
      ['每日签到', '-'],
      ['每日救济', '-'],
      ['红包领取', '-'],
    ],
  ],
  [
    '活动返利',
    [
      ['首充返利', '-'],
      ['亏损返利', '-'],
      ['投注返利', '-'],
      ['下线返利', '-'],
      ['-', '-'],
    ],
  ],
];
//
const SumData = [
  [
    ['Bet', '-'],
    ['Bet in', '-'],
    ['Charge Q', '-'],
    ['Charge', '-'],
    ['Leaderboard', '-'],
    ['First Charge', '-'],
  ],
  [
    ['Exchange', '-'],
    ['Bet Win', '-'],
    ['Exchange Q', '-'],
    ['Charge Royalty', '-'],
    ['Experience', '-'],
    ['Loss', '-'],
  ],
  [
    ['Royalty', '-'],
    ['Beans', '-'],
    ['Withdrawal Q', '-'],
    ['Withdrawal', '-'],
    ['Emergency', '-'],
    ['Bet', '-'],
  ],
  [
    ['Rebate/Promo', '-'],
    ['Bank', '-'],
    ['Exchange', '-'],
    ['Withdrawal Royalty', '-'],
    ['VIP', '-'],
    ['Referral', '-'],
  ],
  [
    ['Profit', '-'],
    ['Agent', '-'],
    ['Fee', '-'],
    ['Agent Profit', '-'],
    ['Red Pocket', '-'],
    ['Monthly Salary', '-'],
  ],
  [
    // ['Tokens', await tokenSum(), '$'],
    ['-', '-'],
    ['-', '-'],
    ['-', '-'],
    ['Charge Bonus', '-'],
    ['Registration', '-'],
    // ["Total", ...await dTom(await arrSum([UserHdflScfl,UserHdflKsfl,UserHdflTzfl,UserHdflXxfl,UserHdflYgz]))]
  ],
  [
    ['Tokens', '?'],
    ['-', '-'],
    ['-', '-'],
    ['-', '-'],
    ['-', '-'],
    ['Total', '-'],
  ],
];
//
const _category = [
  '加拿大',
  'PK',
  '加拿大西部',
  '台湾宾果',
  '台湾蛋蛋',
  '俄勒冈',
  '斯洛伐克',
  '澳洲',
  '韩国',
  '比特币',
];
const _categorys = [
  'jnd',
  'pk',
  'jnc',
  'bj',
  'dd',
  'elg',
  'slfk',
  'au',
  'kr',
  'btc',
];
const _typea = [
  11,
  16,
  28,
  36,
  '28gd',
  '2.14',
  '2.8',
  // 'nn', 'nb'
  'sum',
];
const _typeb = ['赛车', '冠亚和', '10', '22', '冠军', '龙虎', '2.14', 'sum'];
const _typebx = ['sc', 'gyh', '10', '22', 'gj', 'lh', '2.14', 'sum'];
let GameData = [];
const quncheck = (c, t) => {
  if ([2.14, 2.8].find((v) => v == t))
    return 'q' + t.replace(/\./, '') + '' + c;
  return c + '' + t;
};
for (let j = 0; j < 8; j++) {
  // GameData.push([
  //     [_typea[j], '-'],
  //     [_typeb[j], '-'],
  //     [_typea[j], '-'],
  //     [_typea[j], '-'],
  //     [_typea[j], '-'],
  //     [_typea[j], '-'],
  //     [_typea[j], '-'],
  //     [_typea[j], '-'],
  //     [_typea[j], '-'],
  //     [_typea[j], '-'],
  // ]);
  GameData.push([
    [quncheck(_categorys[0], _typea[j]), '-', _typea[j]], // 0
    [quncheck(_categorys[1], _typebx[j]), '-', _typeb[j]], // 1
    [quncheck(_categorys[2], _typea[j]), '-', _typea[j]], // 2
    [quncheck(_categorys[3], _typea[j]), '-', _typea[j]], // 3
    [quncheck(_categorys[4], _typea[j]), '-', _typea[j]], // 4
    [quncheck(_categorys[5], _typea[j]), '-', _typea[j]], // 5
    [quncheck(_categorys[6], _typea[j]), '-', _typea[j]], // 6
    [quncheck(_categorys[7], _typea[j]), '-', _typea[j]], // 7
    [quncheck(_categorys[8], _typea[j]), '-', _typea[j]], // 8
    [quncheck(_categorys[9], _typea[j]), '-', _typea[j]], // 9
    // [ quncheck(_categorys[10], _typea[j]), '-', _typea[j]], // 10
    // [ quncheck(_categorys[11], _typea[j]), '-', _typea[j]], // 11
  ]);
}
// const GameData = [[["jnd11","-"],["pksc","-"],["jnc11","-"],["bj11","-"],["dd11","-"],["elg11","-"],["slfk11","-"],["au11","-"],["kr11","-"],["btc11","-"]],[["jnd16","-"],["pkgyh","-"],["jnc16","-"],["bj16","-"],["dd16","-"],["elg16","-"],["slfk16","-"],["au16","-"],["kr16","-"],["btc16","-"]],[["q28jnd","-"],["pk10","-"],["q28jnc","-"],["q28bj","-"],["q28dd","-"],["q28elg","-"],["q28slfk","-"],["q28au","-"],["q28kr","-"],["q28btc","-"]],[["jnd36","-"],["pk22","-"],["jnc36","-"],["bj36","-"],["dd36","-"],["elg36","-"],["slfk36","-"],["au36","-"],["kr36","-"],["btc36","-"]],[["jnd28gd","-"],["pkgj","-"],["jnc28gd","-"],["bj28gd","-"],["dd28gd","-"],["elg28gd","-"],["slfk28gd","-"],["au28gd","-"],["kr28gd","-"],["btc28gd","-"]],[["q214jnd","-"],["pklh","-"],["q214jnc","-"],["q214bj","-"],["q214dd","-"],["q214elg","-"],["q214slfk","-"],["q214au","-"],["q214kr","-"],["q214btc","-"]],[["q28jnd","-"],["q214pk","-"],["q28jnc","-"],["q28bj","-"],["q28dd","-"],["q28elg","-"],["q28slfk","-"],["q28au","-"],["q28kr","-"],["q28btc","-"]],[["jndsum","-"],["pksum","-"],["jncsum","-"],["bjsum","-"],["ddsum","-"],["elgsum","-"],["slfksum","-"],["ausum","-"],["krsum","-"],["btcsum","-"]]];
//
export { TotalData, SumData, GameData };
