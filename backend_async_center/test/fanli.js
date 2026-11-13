// const { go } = require('../controller/agent/charge');
const dayjs = require('dayjs');
const { nTom, oddCheck } = require('../tool/tool');
const { admin_to_user, redis_2_pub, async_get_telegram, get_2 } = require('../tool/redis');
const { TCL, TCC } = require('../service/transaction');
const { USERHDFL, USERDATA} = require('../sequelize/db28');
// 
const test = async() =>
{
    const time = dayjs().format('YYYY-MM-DD');
    // const a = await go({ 
        const d = {
            id:1, 
            _user_id:17, 
            money:500, 
            // time, 
            address_business:'12345', 
            unit:'2222', 
            block:'1111',
            transaction_id:'3333',
            telegram_id: 7123161439
        };
        const {
            id, 
            _user_id, 
            money, 
            // time, 
            address_business, 
            unit, 
            block,
            transaction_id,
            telegram_id
        } = d;
    // });
    // console.log(a)
    let promo ='';
    // 
    const { start_time, end_time, name, data, mode } = await get_2('HdflDl');
    const _start = dayjs(start_time).diff(dayjs(),'second');
    const _end = dayjs(end_time).diff(dayjs(),'second');
    const { odd, percentage } = await oddCheck(data, money);
    // 
    if(_start<0 && _end>=0) 
    {
        if(odd >0&&percentage>0)
        {
            const acb = await TCL(async(transaction)=>
            {
                const { dou } = await USERDATA.findOne({attributes:['dou'], where:{user_id:_user_id}});
                // 
                const fixed = dou + (odd*1000);
                const percent = dou + parseFloat((percentage/100)*money)*1000;
                const bonus = mode=='Specified' ? odd : parseFloat((percentage/100)*money);
                const total = mode=='Specified' ? fixed : percent;
                // 
                // await USERDATA.update({ 
                //     // dou: _user_new_dou + (odd*1000)
                //     dou: total
                // }, { where:{
                //     [Op.and]: [
                //         { user_id: _user_id }, 
                //         { dou: {[Op.gte]: 0} },
                //     ],
                // }, transaction });
                // // 
                // // 类型 1存豆 2取豆 3投注 4中奖 5代理充值 51代理充值撤回 6开业返利
                // // 模式 1扣除 2增加
                // await USERLOGDOU.create({
                //     user_id: _user_id,
                //     type: 6,
                //     mode: 2,
                //     num: bonus*1000,
                //     // dou: _user_new_dou + (odd*1000),
                //     dou: total,
                //     des: name,
                //     time
                // }, { transaction });
                // // 
                // // 模式 1活动返利 2月工资
                // // 类型 1首充返利 2投注返利 3亏损返利 4推广返利 6开业返利
                // await USERHDFL.create({
                //     user_id: _user_id,
                //     mode: 1,
                //     type: 6,
                //     num: bonus*1000,
                //     dou: total,
                //     // dou: _user_new_dou + (odd*1000),
                //     time
                // }, { transaction });
                // 
                console.log({
                    dou,
                    fixed,
                    percent,
                    bonus,
                    total
                })
                // 
                return bonus
            })
            if(acb){
                // await bot_bgp.telegram.sendMessage(bgp.group, 'Promotional Agent Charge Bonus: $' + acb, { parse_mode: 'HTML' });
                console.log('Promotional Agent Charge Bonus: $' + acb)
                if(mode=='Specified'){
                    promo += "\n充值返利：+$" + odd 
                }else{
                    promo += "\n充值返利：+" + percentage + '% ($' + (money*(percentage/100)) + ')'
                }
                console.log(promo)
            }
            
        }
    }
    // ===================================================== First Top Up one-time Bonus ======================================================================
    // 
    const HdFirstCharge = await get_2('HdFirstCharge'); 
    if(HdFirstCharge.status==1&&HdFirstCharge.bonus>0&&HdFirstCharge.quantity>0)
    {
        const { quantity } = HdFirstCharge;
        const count = await USERHDFL.count({ where:{type:11}});
        const isUserFirst = await USERHDFL.count({ where:{type:11, user_id:_user_id}});
        // 
        if(count <= quantity && isUserFirst==0)
        {
            // 1存豆 2取豆 3投注 4中奖 5代理充值 51代理充值撤回 6开业返利 10Registration one-time Bonus 11 First Top Up one-time Bonus
            const ftb = await TCL(async(transaction)=>
            {
                const { dou } = await USERDATA.findOne({attributes:['dou'], where:{user_id:_user_id}});
                const bonus = parseFloat(HdFirstCharge.bonus);
                const total = bonus*1000 + dou;
                // 
                // await USERDATA.update({ 
                //     // dou: _user_new_dou + (odd*1000)
                //     dou: total
                // }, { where:{
                //     [Op.and]: [
                //         { user_id: _user_id }, 
                //         { dou: {[Op.gte]: 0} },
                //     ],
                // }, transaction });
                // // 
                // // 类型 1存豆 2取豆 3投注 4中奖 5代理充值 51代理充值撤回 6开业返利
                // // 模式 1扣除 2增加
                // await USERLOGDOU.create({
                //     user_id: _user_id,
                //     type: 11,
                //     mode: 2,
                //     num: bonus*1000,
                //     // dou: _user_new_dou + (odd*1000),
                //     dou: total,
                //     des: name,
                //     time
                // }, { transaction });
                // // 
                // // 模式 1活动返利 2月工资
                // // 类型 1首充返利 2投注返利 3亏损返利 4推广返利 6开业返利
                // await USERHDFL.create({
                //     user_id: _user_id,
                //     mode: 1,
                //     type: 11,
                //     num: bonus*1000,
                //     dou: total,
                //     // dou: _user_new_dou + (odd*1000),
                //     time
                // }, { transaction });
                // 
                console.log({
                    dou,
                    bonus:bonus*1000,
                    total
                })
                return bonus
            })
            // 
            if(ftb){
                // await bot_bgp.telegram.sendMessage(bgp.group, 'First Top Up one-time Bonus: $' + ftb, { parse_mode: 'HTML' });
                console.log('First Top Up one-time Bonus: $' + ftb)
                // console.log({
                //     dou,
                //     bonus,
                //     total: bonus*1000 + dou
                // })
                promo += "\n奖金：+$" + HdFirstCharge.bonus
                console.log(promo)
            }
        }       
    }
    // ==================================================== ADMIN ===============================================================
    //
    // redis_2_pub.publish('sd28-admin-data', JSON.stringify({
    //     AgentCharge:[
    //         dayjs().format('MM-DD HH:mm:ss'),
    //         id,
    //         _agent.nick,
    //         money,
    //         _user_id,
    //         _user.nick,
    //         1
    //     ]
    // }));
    // // 
    // redis_2_pub.publish('sd28-admin-data', JSON.stringify({
    //     PageView:[
    //         _user_id,
    //         _user.nick || '-',
    //         address_business,
    //         money,
    //         transaction_id,
    //         dayjs().format('MM-DD HH:mm:ss')
    //     ]
    // }));
    // redis_2_pub.publish('sd28-admin-data', JSON.stringify({
    //     HomeSum:{agent_charges:money}
    // }));
    // 
    // ============================================================================================================================================
    // 
    console.log('end', promo)
}

test();