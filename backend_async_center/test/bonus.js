const dayjs = require('dayjs');
const { nTom, oddCheck } = require('../tool/tool');
const { admin_to_user, redis_2_pub, async_get_telegram, get_2 } = require('../tool/redis');
const { TCL,TCC } = require('../service/transaction');
// 
const { sequelize, Sequelize, USERHDFL, USERDATA, Op } = require('../sequelize/db28');
const { Telegraf } = require('telegraf');
// 
const test = async() =>
{
    const walletKey = await async_get_telegram('myWalletBot');
    const wallet = new Telegraf(walletKey.wallet);
    // 
    const money = 400;
    // 
    // const { start_time, end_time, name, data, mode } = await get_2('HdflDl');
    // const _start = dayjs(start_time).diff(dayjs(),'second');
    // const _end = dayjs(end_time).diff(dayjs(),'second');
    // const { odd, percentage } = await oddCheck(data, money);
    // // 
    // const fixed = 500 + (odd*1000);
    // const percent = 500 + parseFloat((percentage/100)*money)*1000;
    // const bonus = mode=='Fixed' ? odd : parseFloat((percentage/100)*money);
    // const total = mode=='Fixed' ? fixed : percent;
    // // 
    // // console.log({
    // //     start_time, end_time, name, data, mode,
    // //     money, odd, percentage,
    // //     bonus,
    // //     total
    // // })
    // const bgp = await async_get_telegram('bgp_alert')
    // console.log(bgp)
    // const bot = new Telegraf(bgp.bot);
    // bot.telegram.sendMessage(bgp.group, 'hello', { parse_mode: 'HTML' });
    // 
    // const { start_time, end_time, name, data, mode } = await get_2('HdflDl');
    // const a = await get_2('HdZc'); 
    // const a = await get_2('HdFirstCharge'); 
    // { status: '1', quantity: '100', bonus: '18', start_user_id: '' }
    // console.log(parseInt(a.quantity) + parseInt(a.start_user_id))
    // 
    // const result = await sequelize.query('SHOW TABLE STATUS LIKE "users"', {
    //     type: Sequelize.QueryTypes.SELECT
    // });
    // const valid = result[0].Auto_increment <= (parseInt(a.quantity) + parseInt(a.start_user_id))
    // const once = await USERHDFL.findOne({attributes: ['type'], where:{user_id: 14, type:11}});
    // console.log(!once)
    // console.log({
    //     quantity: a.quantity,
    //     start: a.start_user_id,
    //     sum: parseInt(a.quantity) + parseInt(a.start_user_id),
    //     next:  result[0].Auto_increment,
    //     bool: 106 <= (parseInt(a.quantity) + parseInt(a.start_user_id))
    // })

    // await TCL(async(transaction)=>
    // {
    //     const { dou } = await USERDATA.findOne({attributes:['dou'],where:{user_id:12}});
    //     console.log('c before', dou);
    //     // 
    //     await USERDATA.update({ 
    //         dou: 5,
    //         exp: 0,
    //     }, { where:{
    //         [Op.and]: [
    //             { user_id: 12 }, 
    //             { dou: {[Op.gte]: 0} },
    //         ],
    //     }, transaction });
    //     wallet.telegram.sendMessage(7143392958, 'C', { parse_mode: 'HTML' });
    // })
    // // 
    // await TCL(async(transaction)=>
    // {
    //     const u_pre = await USERDATA.findOne({attributes:['dou'],where:{user_id:12}});
    //     console.log('d before', u_pre.dou);
    //     // 
    //     await USERDATA.update({ 
    //         dou: 8,
    //         exp: 0,
    //     }, { where:{
    //         [Op.and]: [
    //             { user_id: 12 }, 
    //             { dou: {[Op.gte]: 0} },
    //         ],
    //     }, transaction });
    //     // return 
    //     const u_last = await USERDATA.findOne({attributes:['dou'],where:{user_id:12}});
    //     console.log('d end', u_last.dou);
    //     wallet.telegram.sendMessage(7143392958, 'D', { parse_mode: 'HTML' });
    // })
    const { dou } = await USERDATA.findOne({attributes:['dou'], where:{user_id:12}});
    const fixed = dou + (28*1000);
    console.log(fixed)
}

test()
