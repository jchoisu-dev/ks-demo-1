// 
const dayjs = require('dayjs');
const { Op, USERS, USERDATA, USERLOGBANK, USERLOGDOU, USERMRQD } = require('../../sequelize/db28');
const { TCL,TCC } = require('../../service/transaction');
const { nTom } = require('../../tool/tool')

// 银行存豆
const wdyh_cun = async(d) => 
{
    let { id, num, time, tma } = d;
    num = parseInt(num);
    if(!num) {
        if(tma){
            return {M:{c:'存豆失败，参数错误！'}}
        }
        return '存豆失败，参数错误！'
    }
    let _re = await TCL(async(transaction)=>
    {
        const _user_data = await USERDATA.findOne({ 
            attributes: ['dou','bank'], 
            where:{ 
                user_id:id
            } 
        }, { transaction });
        // 
        if(parseInt(_user_data.dou)<num) return 1;
        //
        const dou = parseInt(_user_data.dou) - num;
        const bank = parseInt(_user_data.bank) + num;
        await USERDATA.update({ dou,bank }, { where:{
            [Op.and]: [
                { user_id: id }, 
                { dou: {[Op.gte]: 0} },
                { bank: {[Op.gte]: 0} },
            ],
        }, transaction });
        await USERLOGBANK.create({
            user_id: id,
            type: 1,
            num,
            dou,
            bank,
            time
        }, { transaction });
        await USERLOGDOU.create({
            user_id: id,
            type: 1,
            mode: 1,
            num,
            dou,
            time
        }, { transaction });
        return {dou,bank};
    });
    // 
    if(!_re) {
        if(tma){
            return {M:{c:'存豆失败，请稍后再试！'}}
        }
        return '存豆失败，请稍后再试！'
    }
    if(_re==1) {
        if(tma){
            return {
                M:{c:'存豆失败，金豆余额不足！'},
                UserdbankcunLoading: false
            }
        }
        return '存豆失败，金豆余额不足！'
    }
    const { dou, bank } = _re;

    if(tma){
        return {
            Auth:{ dou,bank},
            Userwdyh: { dou,bank },
            M: {c:'业务办理完成，存豆成功！'},
            UserdbankcunLoading:'',
            UserdbankReload: dayjs().valueOf()
        }
    }
    return '业务办理完成，存豆成功！' + '\n\n' +
    '🔸存入金豆：' + '<b>' + nTom(num) + '</b>' +'\n' +
    '🔸金豆余额：' + '<b>' + nTom(dou) + '</b>' + '\n' +
    '🔸银行金豆：' +  '<b>' + nTom(bank) + '</b>'  +'\n\n'
}
// 银行取豆
const wdyh_qu = async(d) => 
{
    let { id, num, time, tma } = d;
    num = parseInt(num);
    if(!num) return { M:{c:'取豆失败，参数错误！'},UserdbankquLoading:'' }
    let _re = await TCL(async(transaction)=>
    {
        const _user_data = await USERDATA.findOne({ 
            attributes: ['dou','bank'], 
            where:{ 
                user_id:id
            } 
        }, { transaction });
        // 
        if(parseInt(_user_data.bank)<num) throw new Error(1);
        //
        const dou = parseInt(_user_data.dou) + num;
        const bank = parseInt(_user_data.bank) - num;
        await USERDATA.update({ dou,bank }, { where:{
            [Op.and]: [
                { user_id: id }, 
                { dou: {[Op.gte]: 0} },
                { bank: {[Op.gte]: 0} },
            ],
        }, transaction });
        await USERLOGBANK.create({
            user_id: id,
            type: 2,
            num,
            dou,
            bank,
            time
        }, { transaction });
        await USERLOGDOU.create({
            user_id: id,
            type: 2,
            mode: 2,
            num,
            dou,
            time
        }, { transaction });
        //
        return {
            dou,
            bank
        };
    });
    if(!_re) {
        if(tma){
            return {M:{c:'取豆失败，请稍后再试！'}}
        }
        return '取豆失败，请稍后再试！'
    }
    if(_re==1) {
        if(tma){
            return {
                M:{c:'取豆失败，金豆余额不足！'},
                UserdbankquLoading:''
            }
        }
        return '取豆失败，金豆余额不足！'
    }
    const { dou,bank } = _re;
    if(tma){
        return {
            Auth:{ dou,bank},
            Userwdyh: { dou,bank },
            M: {c:'业务办理完成，取豆成功！'},
            UserdbankquLoading:'',
            UserdbankReload: dayjs().valueOf()
        }
    }
    // 
    return '业务办理完成，取豆成功' + '\n\n' +
    '🔸取入金豆：' + '<b>' + nTom(num) + '</b>' +'\n' +
    '🔸金豆余额：' + '<b>' + nTom(dou) + '</b>' + '\n' +
    '🔸银行金豆：' +  '<b>' + nTom(bank) + '</b>'  +'\n\n'
}
// 
const mrqd_go = async(d) => 
{
    let { id } = d;
    // 
    const vipdou = {
        1: 100,
        2: 200,
        3: 300,
        4: 400,
        5: 500,
        6: 999,
        7: 1080
    }
    const time = dayjs().format('YYYY-MM-DD');
    const _time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    // 
    const _mrqd = await USERMRQD.findOne({where:{user_id:id,time}});
    if(_mrqd)
    {
        return {M:{c:'今日已签到，请明日再来！'},UserMrqdLoading:''};
    }
    // 
    let _re = await TCL(async(transaction)=>
    {
        const _user = await USERS.findOne({
            attributes:['level'],
            where:{id},
        }, { transaction });
        // 
        if(!_user || !vipdou[_user.level]) throw new Error(1);
        const _vipdou = vipdou[_user.level];
        // 
        const _user_data = await USERDATA.findOne({ 
            attributes: ['dou'], 
            where:{ 
                user_id:id
            } 
        }, { transaction });
        // 
        if(!_user_data) throw new Error(2);
        //
        const dou = parseInt(_user_data.dou)+_vipdou;
        //
        await USERDATA.update({ dou }, { where:{
            [Op.and]: [
                { user_id: id }, 
                { dou: {[Op.gte]: 0} }
            ],
        }, transaction });
        await USERLOGDOU.create({
            user_id: id,
            type: 65,
            mode: 2,
            num: _vipdou,
            dou,
            time: _time
        }, { transaction });
        await USERMRQD.create({
            user_id: id,
            vip: _user.level,
            num: _vipdou,
            dou,
            time
        })
        //
        return {dou};
    });
    //
    if(!_re) return {M:{c:'签到失败，请稍后再试！'},UserMrqdLoading:''};
    if(_re==1||_re==2) return {M:{c:'签到失败，请稍后再试！'},UserMrqdLoading:''};
    return {
        Auth:{dou:_re.dou},
        M:{c:'恭喜您，签到成功！'},
        UserMrqdLoading:'',
        UserMrqdReload: dayjs().valueOf()
    };
}
// 
module.exports = {
    wdyh_cun,
    wdyh_qu,
    //
    mrqd_go
}