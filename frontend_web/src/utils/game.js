import { t, lang } from 'i18n';
const names = {
  jnd: t("加拿大"),
  pk: 'PK',
  jnc: t("加拿大西部"),
  bj: t("台湾宾果"),
  dd: t("台湾蛋蛋"),
  au: t("澳洲"),
  elg: t("俄勒冈"),
  slfk: t("斯洛伐克"),
  kr: t("韩国"),
  btc: t("比特币"),
  q214: t("群2.14"),
  q28: t("群2.8"),
  //
  gd: t("固定"),
  sc: t("赛车"),
  gyh: t("冠亚和"),
  gj: t("冠军"),
  lh: t("龙虎"),
  nb: t("牛牛5倍"),
  nn: t("牛牛10倍")
}
const CategoryTypes = {
  // jnd:[28,11,16,36,'28gd'],
  // pk:['sc','gyh',10,22,'gj','lh'],
  jnc:[28,11,16,36,'28gd'],
  bj:[28,11,16,36,'28gd'],
  dd:[28,11,16,36,'28gd'],
  elg:[28,11,16,36,'28gd'],
  slfk:[28,11,16,36,'28gd'],
  au:[28,11,16,36,'28gd'],
  kr:[28,11,16,36,'28gd'],
  btc:[28,11,16,36,'28gd'],
  // q214:[
  //   'jnd','jnc','bj','dd','au','elg','slfk','btc','kr'
  // ],
  // q28:[
  //   'jnd','jnc','bj','dd','au','elg','slfk','btc','kr'
  // ],
};
const QunType = [ 'jnd28','pksc','jnc28','bj28','dd28','au28','elg28','slfk28','btc28' ];
const GameLocal = (pathname) => 
{
  const loca = pathname.split('/');
  const game = {};
  game['category'] = loca&&loca[2] || 'btc';
  game['type'] = loca&&loca[3] || CategoryTypes[game['category']][0];
  game['menu'] = loca&&loca[4] || 'jg';
  // 
  return game;
}
const GameName = (category, type) => 
{
  let categoryName = '';
  if(category) categoryName = names[category];
  if(!type) return categoryName;
  if(['q214','q28'].find(v=>v==category)) categoryName = '';
  // single pass so translated (Latin) names are never re-matched by other codes
  const sp = lang==='en' ? ' ' : '';
  const codes = Object.keys(names).sort((a,b)=>b.length-a.length);
  let typeName = (type+'').replace(new RegExp(codes.join('|'),'g'), m=>sp+names[m]+sp);
  if(['q214'].find(v=>v==category)) typeName = typeName+sp+'2.14';
  if(['q28'].find(v=>v==category)) typeName = typeName+sp+'2.8';
  return (categoryName+sp+typeName).replace(/\s+/g,' ').trim();
}
const GameLocalName = (pathname) => 
{
  const loca = GameLocal(pathname);
  return GameName(loca.category, loca.type);
}
// 
export {
  CategoryTypes,
  QunType,
  GameLocal,
  GameName,
  GameLocalName
}