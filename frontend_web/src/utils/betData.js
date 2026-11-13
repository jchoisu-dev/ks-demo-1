import { t } from 'i18n';
const _jgTxt = {
    //
    cd: t("车道"),
    gyh: t("冠亚和"),
    gj: t("冠军"),
    // 
    long: t("龙"),
    hu: t("虎"),
    // 
    bao: t("豹"),
    shun: t("顺"),
    dui: t("对"),
    ban: t("半"),
    za: t("杂"),
    // 
    da: t("大"),
    xiao: t("小"),
    dan: t("单"),
    shuang: t("双"),
    dadan: t("大单"),
    dashuang: t("大双"),
    xiaodan: t("小单"),
    xiaoshuang: t("小双"),
    jida: t("极大"),
    jixiao: t("极小"),
}
// 
const ___gamename = (e) => 
{
    let _e = e.toString().split('-');
    if(_e.length>0)
    {
        let _ee = [];
        for(let i in _e)
        {
            _ee.push(_jgTxt[_e[i]]||_e[i]);
        }
        if(_ee.length>0) return _ee.join('-');
    }
    return _jgTxt[e]||e;
}
// 
const ___category = 
{
    'qwf': t("群玩法"),
    // 'xy': '幸运',
    'bj': t("台湾"),
    'dd': t("台湾蛋蛋"),
    'pk': 'PK',
    'jnd': t("加拿大"),
    'jnc': t("加拿大西部"),
    'btc': t("比特币"),
    'kr': t("韩国"),
    'au': t("澳洲"),
    'elg': t("俄勒冈"),
    'slfk': t("斯洛伐克")
}
const ___type = 
{
    // 'xy': '幸运',
    'bj': t("台湾宾果"),
    'dd': t("台湾蛋蛋"),
    'pk': 'PK',
    'jnd': t("加拿大"),
    'lh': t("龙虎"),
    'sc': t("赛车"),
    'gyh': t("冠亚和"),
    'jnc': t("加拿大西部"),
    'btc': t("比特币"),
    'kr': t("韩国"),
    'au': t("澳洲"),
    'elg': t("俄勒冈"),
    'slfk': t("斯洛伐克")
}

export{
    _jgTxt,
    ___category,
    ___type,
    ___gamename
}