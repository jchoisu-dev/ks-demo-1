const dayjs = require('dayjs');
const { Op, USERDATA, USERLOGDOU, USERHDFL, USERTELEGRAM } = require('../../sequelize/db28');
const { get_2, async_get_telegram } = require('../../tool/redis');
const { nTom } = require('../../tool/tool');
const { TCL,TCC } = require('../../service/transaction');
const { Telegraf } = require('telegraf');
// 
const me = async(d) =>
{
    const { telegram_id, money } = d;
    // 
    const { telegram_tag, address_business } = await USERTELEGRAM.findOne({ attributes: ['telegram_tag', 'address_business', 'user_id' ], where: { telegram_id } });
    // 
    return '<b>👤 金狼福财钱包</b> \n' + // <========= name
        '🔸<b>用户编号</b>：<code>' + telegram_id + '</code> \n' +
        '🔸<b>用户名称</b>：@' + telegram_tag + '\n' +
        '🔸<b>钱包地址</b>：点击可复制 \n' +
        '<code>'+ address_business +'</code> \n' +
        '🔸<b>金豆余额：</b>' + nTom(money*1000) + '\n' +
        '🔸<b>银行金豆：</b>' + nTom(0) + '\n' +
        // '🔸<b>经验：</b>' + userData.exp + '\n' +
        '🔸<b>有效流水：</b>' + nTom(0) + '\n' 
}
// 
const go = async(d) =>
{
    const { bonus } = await get_2('HdZc'); 
    // 
    const time = dayjs().format('YYYY-MM-DD');
    const bgp = await async_get_telegram('bgp_alert')
    const bot_bgp = new Telegraf(bgp.bot);
    const { telegram_id, user_id, first_name, username, address_business } = d;
    // 
    const re = await TCL(async(transaction)=>
    {
        await USERDATA.update({ 
            dou: (bonus*1000)
        }, { 
            where:{
                user_id
        }, transaction });
        // 
        // 类型 1存豆 2取豆 3投注 4中奖 5代理充值 51代理充值撤回 6开业返利 10Registration one-time Bonus
        // 模式 1扣除 2增加
        await USERLOGDOU.create({
            user_id,
            type: 10,
            mode: 2,
            num: bonus*1000,
            dou: bonus*1000,
            des: 'Registration one-time Bonus',
            time
        }, { transaction });
        // 
        // 模式 1活动返利 2月工资
        // 类型 1首充返利 2投注返利 3亏损返利 4推广返利 6开业返利 10Registration one-time Bonus
        await USERHDFL.create({
            user_id,
            mode: 1,
            type: 10,
            num: bonus*1000,
            dou: bonus*1000,
            time
        }, { transaction });
        // 
        return 1
    })
    // 
    if(!re) return;
    // 
    const walletKey = await async_get_telegram('myWalletBot');
    const wallet = new Telegraf(walletKey.wallet);
    const message = '🧧🧧 老板欢迎加入我们的团队！作为我们的新会员，发红包 $' + bonus + ' 希望您在我们这里度过愉快的时光！🧧🧧'
    // 
    const text = await me({telegram_id, money:bonus});
    await wallet.telegram.sendMessage(telegram_id, text, { parse_mode: 'HTML' })
    await wallet.telegram.sendMessage(telegram_id, message, { parse_mode: 'HTML' });
    // 
    const bgp_message = '👤 <b>USER REGISRATION </b>' + '\n\n' +
    'Time: ' + dayjs().format('YYYY-MM-DD HH:mm:ss') +  '\n' +
    'Database ID: <code>' + user_id + '</code> \n' +
    'Telegram ID: <code>' + telegram_id  + '</code> \n' +
    'Name: <code>' +  (first_name || 'N/A' ) + '</code> \n' +
    'Tag: <code>' + (username || 'N/A') + '</code> \n' +
    'Assigned Wallet: <code>' + address_business + '</code> \n\n' +
    'Registration One Time Bonus Received: $' + bonus;
    // 
    await bot_bgp.telegram.sendMessage(bgp.group, bgp_message, { parse_mode: 'HTML' });
}
// 
module.exports={
    go
}