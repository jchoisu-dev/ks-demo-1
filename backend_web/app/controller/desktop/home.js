// 
const dayjs = require('dayjs');
const { HomeTopData } = require('../../service/home');
const { getNewLottery } = require('../../service/game');
// 
const { redis_ks28_auto_get, get_2, async_get_telegram } = require('../../plugin/redis');
const { TITLE, CONTENT, USERS, USERTELEGRAM, USERDATA, USERSUM, USERLOG, sequelize, Sequelize } = require('../../sequelize/db28');
// numberToMoney
const { numberToMoney } = require('../../service/tool');
const { enSign, deSign, xPass, cPass, UUID } = require('../../plugin/cryptos');
const { TCL, TCC } = require('../../plugin/transaction');
// const { deriveHDWallet, generateUsdtQR } = require('../../service/bot');
// 
const welcome = async(d) =>
{
    const { id, telegram_id } = d;
    // 
    // console.log(d)
    // const { dou } = await USERDATA.findOne({attributes:['dou'],where:{user_id:id}})
    // return {
    //     Auth:{
    //         dou
    //     }
    // }
    const isReg = await USERTELEGRAM.findOne({attributes:['user_id', 'address_business'],where:{telegram_id}})
    if(isReg){
        const u = await USERS.findOne({attributes:['uuid', 'name', 'level', 'role', 'sound', 'cs'], where:{id:isReg.user_id}})
        const d = await USERDATA.findOne({attributes:['dou', 'bank', 'exp'], where:{user_id:isReg.user_id}})
        return {
            Auth: {
                id: isReg.user_id,
                user: telegram_id,
                telegram_id,
                nick: u.name,
                level: u.level, 
                role: u.role,
                dou: d.dou,
                bank: d.bank,
                exp: d.exp,
                sound: u.sound,
                cs: u.cs,
                // address_business: isReg.address_business,
                // __tk: await enSign(isReg.user_id + '|' + u.uuid + '|' + ip + '|' + dayjs().valueOf()),
            },
            registerLoading:false
        }
    }
}
// 
const index = async(d) => 
{
    const { first_name, username, status, ip } = d;
    // console.log(d)
    // const isReg = true; //await USERTELEGRAM.findOne({attributes:['user_id', 'address_business'],where:{telegram_id}})
    // if(isReg){
    //     const u = await USERS.findOne({attributes:['uuid', 'name', 'level', 'role', 'sound', 'cs'], where:{id:isReg.user_id}})
    //     const d = await USERDATA.findOne({attributes:['dou', 'bank', 'exp'], where:{user_id:isReg.user_id}})
    //     return {
    //         Auth: {
    //             id: isReg.user_id,
    //             // user: telegram_id,
    //             // telegram_id,
    //             nick: u.name,
    //             level: u.level, 
    //             role: u.role,
    //             dou: d.dou,
    //             bank: d.bank,
    //             exp: d.exp,
    //             sound: u.sound,
    //             cs: u.cs,
    //             address_business: isReg.address_business,
    //             __tk: await enSign(isReg.user_id + '|' + u.uuid + '|' + ip + '|' + dayjs().valueOf()),
    //         },
    //         registerLoading:false
    //     }
    // }
    // 
    // const _pass = await xPass(telegram_id.toString());
    // const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    // // 
    // const re = await TCL(async(transaction)=> 
    // {
    //     const _users = await USERS.create({
    //         uuid: await UUID(8),
    //         // user: telegram_id,
    //         pass: _pass,
    //         safe: _pass,
    //         cs: 2,
    //         // calling: '86',
    //         // phone: telegram_id,
    //         nick: first_name || telegram_id,
    //         name: username || telegram_id
    //     },{ transaction });
    //     // 
    //     const user_id = _users.id;
    //     // 
    //     // const result = await sequelize.query('SHOW TABLE STATUS LIKE "user_telegram"', {
    //     //     type: Sequelize.QueryTypes.SELECT
    //     // });
    //     // const { address_business } = await USERTELEGRAM.create({
    //     //     telegram_id,
    //     //     // address_business: await deriveHDWallet(result[0].Auto_increment),
    //     //     // address_business: await deriveHDWallet(result[0].Auto_increment),
    //     //     user_id,
    //     //     telegram_tag: username || telegram_id,
    //     //     bot: is_bot ? 1 : 2
    //     // },{ transaction });
    //     // 
    //     await USERDATA.create({
    //         user_id,
    //         dou: 8888888
    //     },{ transaction });
    //     // 
    //     await USERLOG.create({
    //         user_id,
    //         des: 'TMA Registration',
    //         // ip,
    //         time
    //     },{ transaction });
    //     // 
    //     await USERSUM.create({
    //         user_id,
    //         time
    //     },{ transaction });
    //     // 
    //     return {
    //         address_business,
    //         user_id
    //     }
    // });
    // // 
    // const { address_business, user_id } = re;
    // 
    // DELETE OLD ONES!
    // ADD AGENT!
    // const ev = await createEventSubTokenConfirmed({
    //     walletAddress: address_business, 
    //     callbackURL: 'https://wbk.mgmwss.com/wbk'
    // })
    // await USERTELEGRAM.update({
    //     confirmed_event: ev.data.item.referenceId ? ev.data.item.referenceId : 'ERROR'
    //     // unconfirmed_event :
    // },{ where : { address_business } })
    // 
    // if(status=='1') {
    //     // await SubDo({ 
    //     //     path:[ 'bonus', 'go' ],
    //     //     data:{ telegram_id, first_name, username, user_id, address_business, message_id }
    //     // });
    // }else{
        // const bgp = await async_get_telegram('bgp_alert')
        // const bot_bgp = new Telegraf(bgp.bot);
        // // 
        // const bgp_message = '👤 <b>USER REGISRATION </b>' + '\n\n' +
        // 'Time: ' + time +  '\n' +
        // 'Database ID: <code>' + user_id + '</code> \n' +
        // 'Telegram ID: <code>' + telegram_id  + '</code> \n' +
        // 'Name: <code>' +  (first_name || 'N/A' ) + '</code> \n' +
        // 'Tag: <code>' + (username || 'N/A') + '</code> \n' +
        // 'Assigned Wallet: <code>' + address_business + '</code>';
        // // 
        // await bot_bgp.telegram.sendMessage(bgp.group, bgp_message, { parse_mode: 'HTML' });
    // }
    // 
    // const uuid = await UUID(8);
    // await USERS.update({
    //     uuid
    // }, {
    //     where: { id: user_id }
    // });
    // 
    const games = {
        'btc': 28,
        // 'dd' : 28,
        // 'pk' : 10
    };
    // 
    let Lottery = {};
    for ( let i in games )
    {
        Lottery['Lottery'+i+''+games[i]] = await getNewLottery(i, games[i])
    }
    // console.log(Lottery)
    // 
    // 
    return {
        // Auth: {
        //     id: user_id,
        //     user: telegram_id,
        //     // telegram_id,
        //     nick: first_name || username,
        //     level:1, 
        //     role: 1,
        //     dou: 8888888,
        //     bank: 0,
        //     exp: 0,
        //     sound: 1,
        //     cs:2,
        //     // address_business: address_business,
        //     __tk: await enSign(user_id + '|' + uuid + '|' + ip + '|' + dayjs().valueOf()),
        // },
        // registerLoading: false,
        ...Lottery
    }
};
// 
const news = async(d) => 
{
    const rows = await TITLE.findAll({
        attributes: ['id','title','time'],
        order: [['id','DESC']]
    });
    let NewList = [];
    const rowslen = rows.length;
    rows.map((v,k)=>{
        NewList.push([
            rowslen-k,
            v.title,
            dayjs(v.time).format('YYYY-MM-DD HH:mm:ss'),
            v.id
        ])
    });
    return {
        NewList,
    };
}
const news_get = async(d) => 
{
    const { _id } = d;
    // 
    const _title = await TITLE.findOne({where:{id:_id}});
    const _content = await CONTENT.findOne({where:{title_id:_id}});
    if(_content)
    {
        return { NewContent: [
            _title.title,
            dayjs(_title.time).format('YYYY-MM-DD HH:mm:ss'),
            _content.content.toString().replace(/\n/g, '<br>')
         ]}
    }
    return { NewContent: '' }
}
// 时间判断
const timeCheck = async(d) => 
{
    const { start_time, end_time } = d;
    // 
    const _start = dayjs(start_time).diff(dayjs(),'second');
    if(_start>0) return '<b>未开始</b>';
    //
    const _end = dayjs(end_time).diff(dayjs(),'second');
    if(_end<=0) return '<b>已结束</b>';
    //
    return '进行中';
}
const activy_table = async(d,odd,pix)=>
{
    let _r = '';
    for(let i in d)
    {
        let _di = d[i];
        _r+='<tr><td>'+_di['ls']+(odd||'')+'</td><td>'+_di['odd']+(pix||'')+'</td></tr>';
    }
    return _r;
}
const activy = async(d) => 
{
    const { id } = d;
    // 
    const _arr = ['HdflScfl','HdflYgz','HdflTzfl','HdflKsfl','HdflXxfl'];
    let _hdfl = {};
    for(let i in _arr)
    {
        const _n = _arr[i];
        _hdfl[_n] = await get_2(_n);
    }
    //
    let Activys = [];
    // 
    Activys[0] = 
        '<h3>首充返利</h3><br/>'+
        '<p style="margin-bottom:10px">以每天第一笔充值为准，隔天领取，当天未领取则失效，规则如下：</p>'+
        '<div class="boe br5 table mb10"><table class="hover">'+
        '<tr><th>有效流水</th><th>返利比例</th></tr>'+
        await activy_table(_hdfl['HdflScfl']['data'],' 倍',' %')+
        '</table></div>'+
        '<p>最高返利：<b>'+await numberToMoney(_hdfl['HdflScfl']['max'])+'</b> 豆</p>'+
        '<p style="margin-bottom:5px">活动时间：'+_hdfl['HdflScfl']['start_time']+' 至 '+_hdfl['HdflScfl']['end_time']+'</p>'+
        '<p style="margin-bottom:25px;border-bottom:1px dashed #ddd;padding-bottom:25px">活动状态：'+await timeCheck(_hdfl['HdflScfl'])+'</p>'+
        '<h3>月工资</h3><br/>'+
        '<p style="margin-bottom:10px">合计当月有效流水，隔月领取，当月未领取则失效，规则如下：</p>'+
        '<div class="boe br5 table mb10"><table class="hover">'+
        '<tr><th>有效流水</th><th>返利金豆</th></tr>'+
        await activy_table(_hdfl['HdflYgz']['data'],'',' 豆')+
        '</table></div>'+
        '<p style="margin-bottom:5px">活动时间：'+_hdfl['HdflYgz']['start_time']+' 至 '+_hdfl['HdflYgz']['end_time']+'</p>'+
        '<p>活动状态：'+await timeCheck(_hdfl['HdflYgz'])+'</p>'
    ;
    Activys[1] = 
        '<h3>投注返利</h3><br/>'+
        '<p style="margin-bottom:10px">合计当天游戏投注金豆，隔天领取，当天未领取则失效，规则如下：</p>'+
        '<p>有效流水：<b>'+_hdfl['HdflTzfl']['ls']+'</b> 倍</p>'+
        '<p>返利比例：<b>'+_hdfl['HdflTzfl']['odd']+'</b> %</p>'+
        '<p>最高返利：<b>'+await numberToMoney(_hdfl['HdflTzfl']['max'])+'</b> 豆</p>'+
        '<p style="margin-bottom:5px">活动时间：'+_hdfl['HdflTzfl']['start_time']+' 至 '+_hdfl['HdflTzfl']['end_time']+'</p>'+
        '<p style="margin-bottom:25px;border-bottom:1px dashed #ddd;padding-bottom:25px">活动状态：'+await timeCheck(_hdfl['HdflTzfl'])+'</p>'+
        '<h3>亏损返利</h3><br/>'+
        '<p style="margin-bottom:10px">合计当天游戏投注亏损金豆，隔天领取，当天未领取则失效，规则如下：</p>'+
        '<div class="boe br5 table mb10"><table class="hover">'+
        '<tr><th>有效流水</th><th>返利比例</th></tr>'+
        await activy_table(_hdfl['HdflKsfl']['data'],' 倍',' %')+
        '</table></div>'+
        '<p>亏损金豆：<b>'+await numberToMoney(_hdfl['HdflKsfl']['dou'])+'</b> 豆起</p>'+
        '<p>最高返利：<b>'+await numberToMoney(_hdfl['HdflKsfl']['max'])+'</b> 豆</p>'+
        '<p style="margin-bottom:5px">活动时间：'+_hdfl['HdflKsfl']['start_time']+' 至 '+_hdfl['HdflKsfl']['end_time']+'</p>'+
        '<p>活动状态：'+await timeCheck(_hdfl['HdflKsfl'])+'</p>'
    ;
    Activys[2] = 
        '<h3>推广返利</h3><br/>'+
        '<p style="margin-bottom:10px">合计邀请好友的游戏投注金豆，领取后清零，规则如下：</p>'+
        '<p>下线投注：<b>'+await numberToMoney(_hdfl['HdflXxfl']['dou'])+'</b> 豆起</p>'+
        '<p>返利比例：<b>'+_hdfl['HdflXxfl']['odd']+'</b> %</p>'+
        '<p>最高返利：<b>'+await numberToMoney(_hdfl['HdflXxfl']['max'])+'</b> 豆</p>'+
        '<p style="margin-bottom:5px">活动时间：'+_hdfl['HdflXxfl']['start_time']+' 至 '+_hdfl['HdflXxfl']['end_time']+'</p>'+
        '<p>活动状态：'+await timeCheck(_hdfl['HdflXxfl'])+'</p>'
    ;
    Activys[3] = 
        `<h3>亲爱的VIP会员 </h3><br/>

        <p>在您的生日来临之际，我们愿为您送上最诚挚的祝福！为了感谢您一直以来对我们的支持，我们特别为尊贵的VIP会员推出了一系列独家促销活动，希望为您的特别日子增添更多喜悦与惊喜。</p> </br>
        
        <p>首先，我们将为您的生日提供丰厚的奖励。您不仅将获得特别的礼物，还有机会获得独家的现金奖励。我们衷心希望这些礼遇能让您的生日更加特别，并且为您带来愉快的回忆。</p> </br>
        
        <p>其次，作为VIP会员，您将享有独特的金钱奖励。我们将不定期为您提供专属的现金返还和特别奖励，让您感受到我们对您的珍视和感激之情。这些独家优惠将使您在购物时尽情享受优越的待遇。</p> </br>
        
        <p>除此之外，我们还将为VIP会员推出其他限时活动，让您有机会获得更多的现金奖励和特别礼遇。无论是购物折扣、现金返还还是参与抽奖赢取丰厚奖品，我们都将竭力为您带来更多的惊喜与欢乐！ </p> </br>
        
        <p>成为我们的VIP会员，您将拥有独特的尊贵地位，并且享受到我们特别定制的礼遇和回馈。我们将持续努力，为您提供更多超值的服务和奖励。</p> </br>
        
        <p>现在就加入我们的VIP会员行列，畅享生日礼遇和独家金钱奖励！请登录我们的官方网站或亲临店铺，与工作人员详细了解更多详情。</p> </br>
        
        <p>感谢您一直以来的支持与信赖，期待与您共度更多精彩时刻！</p> </br>
        
        <p>此致，</p> </b>
        
        <p>您的专属VIP促销团队 </p>`
    ;
    // 
    return {
        Activys
    }
}
//
const game = async(d) => 
{
    const { category, type } = d;
    // console.log('game')
    // console.log(d)
    // 
    const games = [
        'jnd28',
        'jnc28',
        'pksc',
        'dd28',
        'bj28',
        'elg28',
        'slfk28',
        'au28',
        'btc28'
    ];
    if (!game || !games.find((v) => v == category + '' + type)) {
        return {
            HomeGameLoading: false
        };
    }
    // 
    let Lottery = {};
    Lottery['Lottery' + category + '' + type] = await getNewLottery(category, type);
    return {
        ...Lottery
    }
};
//
const rank = async(d) => 
{
    let RankToday = await redis_ks28_auto_get('rank_today_view');
    let RankYestoday = await redis_ks28_auto_get('rank_yestoday');
    let RankWeek = await redis_ks28_auto_get('rank_week');
    //
    return {
        RankToday,
        RankYestoday,
        RankWeek
    }
}
//
// 随机顺序
const randSort = async(arr) => 
{
    for(var i = 0,len = arr.length;i < len; i++ )
    {
        var rand = parseInt(Math.random()*len);
        var temp = arr[rand];
        arr[rand] = arr[i];
        arr[i] = temp;
    }
    return arr;
}
const agents = async() => 
{
    const rows = await USERS.findAll({
        attributes: ['id','nick','des','qq','wx'],
        where:{role:2,cs:1}
    });
    let Agents = [];
    let kf = [];
    for(let i in rows)
    {
        let v = rows[i];
        if(v.id=='888804')
        {
            kf = [
                v.nick,
                v.des,
                v.qq,
                v.wx
            ];
        }else{
            Agents.push([
                v.nick,
                v.des,
                v.qq,
                v.wx
            ])
        }
    }
    Agents = await randSort(Agents);
    Agents = [ kf, ...Agents ];
    return { Agents }
}

module.exports = {
    welcome,
    index,
    news,
    news_get,
    activy,
    game,
    rank,
    agents
};