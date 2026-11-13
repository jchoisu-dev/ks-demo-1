const names = {
  jnd: 'Canada',
  pk: 'PK',
  jnc: 'Canada West',
  bj: 'Taiwan Bingo',
  dd: 'Taiwan DD',
  au: 'Australia',
  elg: 'Oregon',
  slfk: 'Slovakia',
  kr: 'Korea',
  btc: 'Bitcoin',
  q214: 'Group 2.14',
  q28: 'Group 2.8',
  //
  gd: 'GD',
  sc: 'SC',
  gyh: 'GYH',
  gj: 'GJ',
  lh: 'LH',
  nb: '牛牛5倍',
  nn: '牛牛10倍',
};
const CategoryTypes = {
  jnd: [
    28,
    11,
    16,
    36,
    '28gd',
    // ,'nb','nn'
  ],
  pk: ['sc', 'gyh', 10, 22, 'gj', 'lh'],
  jnc: [28, 11, 16, 36, '28gd'],
  bj: [28, 11, 16, 36, '28gd'],
  dd: [28, 11, 16, 36, '28gd'],
  elg: [28, 11, 16, 36, '28gd'],
  slfk: [28, 11, 16, 36, '28gd'],
  au: [28, 11, 16, 36, '28gd'],
  kr: [28, 11, 16, 36, '28gd'],
  btc: [28, 11, 16, 36, '28gd'],
  // q214:[
  //   'jnd','jnc','bj','dd','au','elg','slfk','btc','kr'
  // ],
  // q28:[
  //   'jnd','jnc','bj','dd','au','elg','slfk','btc','kr'
  // ],
};
const QunType = [
  'jnd28',
  'pksc',
  'jnc28',
  'bj28',
  'dd28',
  'au28',
  'elg28',
  'slfk28',
  'btc28',
];
const GameLocal = (pathname) => {
  const loca = pathname.split('/');
  const game = {};
  game['category'] = (loca && loca[2]) || 'jnd';
  game['type'] = (loca && loca[3]) || CategoryTypes[game['category']][0];
  game['menu'] = (loca && loca[4]) || 'jg';
  //
  return game;
};
const GameName = (category, type) => {
  let categoryName = '';
  if (category) categoryName = names[category];
  if (!type) return categoryName;
  if (['q214', 'q28'].find((v) => v == category)) categoryName = '';
  let typeName = type + '';
  for (let i in names) {
    typeName = typeName.replace(new RegExp(i, 'g'), names[i]);
  }
  if (['q214'].find((v) => v == category)) typeName = typeName + '2.14';
  if (['q28'].find((v) => v == category)) typeName = typeName + '2.8';
  return categoryName + '' + typeName;
};
const GameLocalName = (pathname) => {
  const loca = GameLocal(pathname);
  return GameName(loca.category, loca.type);
};
//
const _jgTxt = {
  //
  cd: '车道',
  gyh: '冠亚和',
  gj: '冠军',
  //
  long: 'Dragon',
  hu: 'Tiger',
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
export {
  names,
  CategoryTypes,
  QunType,
  GameLocal,
  GameName,
  GameLocalName,
  ___gamename,
};
