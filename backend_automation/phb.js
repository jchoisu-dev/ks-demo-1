// 
const dayjs = require('dayjs');
const { QueryTypes, sequelize } = require('./sequelize/db28');
const { 
    redis_sd28_pub, 
    //
    redis_sd28_auto_subscribe,
    redis_sd28_auto_setex,
    redis_sd28_get, redis_sd28_auto_get, redis_sd28_auto_set, async_get_telegram,
    SubDo
} = require('./tool/redis');
const schedule = require('node-schedule');
const { twoNumberRandom, randSort, nTom, getFirstFiveLetters, getRandomAmount } = require('./tool/tool');
// const { man } = require('./tool/bot');
// 
const [ 
    gameAutoMan, 
    rankTodays, rankToday, rankTodayView,
    rankYestoday,
    rankWeek,
] = [ 
    'gameAutoMan', 
    'rank_todays', 'rank_today', 'rank_today_view',
    'rank_yestoday', 
    'rank_week',
];
// the more people the less money, the less people the more money
const _phb_man_money = 100; 
// 
const nameChangeCut = async(d) =>
{
    let _r = [];
    for(let i in d)
    {
        const _di = d[i];
        _r.push([
            _di[0],
            _di[1],
        ]);
    }
    _r = _r.slice(0, 30);
    return _r;
}
// 获取中奖用户排名
const getUserDayWin = async(time) => 
{
    const lists = await sequelize.query('SELECT '+
    'b.id,b.nick,a.win '+
    'FROM user_day_data a LEFT JOIN users b ON a.user_id=b.id '+
    'WHERE a.time=? and a.win>0 ORDER BY a.win DESC Limit 30',
    {
        replacements: [time],
        type: QueryTypes.SELECT,
        plain: false,
    });
    let _r = [];
    if(lists)
    {
        for(let i in lists)
        {
            const _li = lists[i];
            _r.push([
                _li.nick,
                _li.win,
                _li.id,
            ]);
        }
    }
    return _r;
}
// 两个数组合并
const twoArrayContact = async(a,b,type) => 
{
    let n = [];
    for(let i in a)
    {
        const ai = a[i];
        const bi = b.find(v=>v[0]==ai[0]);
        if(bi)
        {
            n.push([
                ai[0],
                parseInt(ai[1]+bi[1])
            ]);
        }else{
            // if(type)
            // {
            //     n.push([
            //         ai[0],
            //         await rankType(ai[1],0,type)
            //     ])
            // }else{
                n.push(ai)
            // }
        }
    }
    for(let i in b)
    {
        const bi = b[i];
        if(!n.find(v=>v[0]==bi[0]))
        {
            n.push(bi);
        }
    }
    n.sort( (aa, bb) => { return bb[1] - aa[1] });
    return n.slice(0, 30);
}
// 随机金额
const rankArrDou = async(arr) => 
{
    const dous = [100,800,500,102,3000,600,170,150,260,166,178,192,450,325,786,1329,1100,1500,3000,166,100,800,500,102,30000,600,170,1500,260,1100,1500,300,166,100,800,500,102,3000,600,170,150,260,10000,1100,1500,300,166,100,800,500,102,3000,600,170,150,260,1100,20000,1500,300,166,100,800,500,102,3000,600,170,150,260,1100,1500,300,166,100,800,500,102,3000,600,170,150,260,1100,3000,20000,1500,300,166,100,800,500,102,3000,600,170,178,192,450,325,786,150,260,40000,1100,1500,300,166,100,800,500,102,3000,600,170,150,260,1100,1500,300,166,5600,100,800,500,102,3000,600,170,150,260,1100,25000,1500,300,166,8800,100,800,500,102,3000,600,170,150,260,5000,1100,1500,300,166,100,800,500,102,3000,600,170,150,260,1100,1500,300,166,10000,100,800,500,102,3000,600,170,150,260,1100,1500,300,166,50000,178,192,450,325,786,1329];
    //
    const _d = (await randSort(dous)).slice(0, arr.length);
    // 
    let _r = {};
    for(let i in arr)
    {
        // Line 121 multiply 15 is to control the amount of money in the PHB
        const _i = arr[i]+'';
        _r[_i] = parseInt( _d[i] * 1000 * Math.random() * 20 );
    }
    // 
    return _r
}
// 随机方式
const rankType = async(a,b,_rank=6) => 
{
    let _ra = (await randSort([0,1,2,3,4,5,6,7,8,9]))[2];
    let _rb = (await randSort([
        0.1,0.2,
        0.3,0.4,0.5,0.6,0.7,
        0.3,0.4,0.5,0.6,0.7,
        0.8,0.9,
        1
    ]))[3];
    //
    if(_ra>_rank)
    {
        const _sum = parseInt(a*_rb)
        return _sum>0 ? _sum : 0;
    }
    return parseInt(a+b);
}
// 默认
const arr30 = Array.from(Array(60), (v,k) =>k);
// 
const todayChange = async(d) => 
{
    // console.log(d)
    let data = [];
    for(let i=0;i<30;i++)
    {
        let _di = d[i];
        if(_di[1]>0)
        {
            data.push(_di)
        }else{
            data.push(['-',0]);
        }
    }
    // 
    await redis_sd28_auto_set(rankToday, data);
    // 
    const time = dayjs().format('YYYY-MM-DD');
    const _user_win = await getUserDayWin(time);
    if(_user_win && _user_win.length>0) data = [ ..._user_win, ...data ];
    // 
    data.sort( (a, b) => { return b[1] - a[1] });
    data = await nameChangeCut(data);
    // 
    await redis_sd28_auto_set(rankTodayView, data);
    // 
    // console.log('data',data)
    // await redis_sd28_pub('sd28-site-room', JSON.stringify({
    //     controller: 'rank',
    //     data:{
    //         RankToday: data
    //     }
    // }));
}
// 
const yestodayChange = async() => 
{
    let _today = await redis_sd28_auto_get(rankTodays);
    const time = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const _user_win = await getUserDayWin(time);
    const _phb = await redis_sd28_get('PhbjlSet');
    // 
    let _now = _today;
    if(_user_win && _user_win.length>0) _now = [ ..._user_win, ..._now ];
    _now.sort( (a, b) => { return b[1] - a[1] });
    if(_user_win && _user_win.length>0)
    {
        const _i = _now.findIndex(v=>v[0]==_user_win[0][0]);
        if(_i>0) _now.slice(_i+1);
    }
    // 
    let _pr = 0;
    for(let i=1;i<31;i++)
    {
        if(_phb['pk'+i]===true)
        {
            _pr = i;
            break;
        }
    }
    let _new = [];
    let _today_length = _today.length;
    for(let i=1;i<_pr;i++)
    {
        let _new_i = _today[_today_length-i];
        _new.push([
            _new_i[0],
            parseInt(_user_win[0][1] * (1+await twoNumberRandom(0.18+(i/10),(1.19))))
        ]);
    }
    _new = [ ..._now, ..._new ];
    _new.sort( (a, b) => { return b[1] - a[1] });
    _new = _new.slice(0,30);
    //
    // let _user_rank = {};
    for(let i in _new)
    {
        const _new_i = _new[i];
        const _iii = parseInt(i)+1;
        if(_new_i[2])
        {
            // _user_rank[_new_i[2]] = _iii;
            await SubDo({ 
                path:[ 'rank', 'rank_update' ],
                data:{ user_id:_new_i[2], rank:_iii  }
            });
        }
        _new[i][2] = _phb['p'+_iii];
    }
    // _user_rank { '888800': 5, '892619': 4 }
    // console.log('0-----------------------', _phb, _now, _i, _pr, _new, _new.length, _user_rank);
    // 
    await redis_sd28_auto_set(rankYestoday, _new);
    //
    // await redis_sd28_pub('sd28-site-room', JSON.stringify({
    //     controller: 'rank',
    //     data:{
    //         RankYestoday: _new
    //     }
    // }));
}
//
const weekChange = async() => 
{
    const _today = await redis_sd28_auto_get(rankTodayView);
    // 
    const getWeek = await redis_sd28_auto_get(rankWeek);
    // 
    const n = await twoArrayContact(getWeek, _today, 7);
    // 
    await redis_sd28_auto_set(rankWeek, n);
    //
    // await redis_sd28_pub('sd28-site-room', JSON.stringify({
    //     controller: 'rank',
    //     data:{
    //         RankWeek: n
    //     }
    // }));
}
//
const minuteRun = async() => 
{
    // console.time();
    // 
    let get_todays = await redis_sd28_auto_get(rankTodays);
    // console.log('get_todays', get_todays)
    // 
    let num = (await randSort([5,6,7,8,9,10,11,12,13,14,15]))[2]; 
    let rank_keys = (await randSort(arr30)).slice(0, num);
    let rank_dous = await rankArrDou(rank_keys);
    // 
    let _n = [];
    for(let i in get_todays)
    {
        if(rank_keys.find(v=>v==i))
        {
            _n.push([
                get_todays[i][0],
                await rankType(get_todays[i][1], rank_dous[i])
            ]); 
        }else{
            _n.push(get_todays[i])
        }
    }
    _n.sort( (a, b) => { return b[1] - a[1] });
    // 
    await redis_sd28_auto_set(rankTodays, _n);
    // 
    await todayChange(_n);
    // 
    const t_todays = await redis_sd28_auto_get(rankTodays);
    let RankYestoday = await redis_sd28_auto_get('rank_yestoday');
    // console.log(RankYestoday)
    // 
    const nums = {
        1: ' 🥇',
        2: ' 🥈',
        3: ' 🥉'
    }
    // if(t_todays.length>0){
    //     let text = '🏆 昨日排行 🏆' + '\n' +
    //     '排名       昵称    赢豆    奖励';
    //     for (let i in t_todays){
    //         if(t_todays[i][1]>0){
    //             text += '\n' + (nums[(parseInt(i)+1)] || (i<10?('  '+i):i))  + '      ' + t_todays[i][0] + '  $' + (t_todays[i][1]/7000).toFixed(2) 
    //         }
    //     }
    //     rank.telegram.sendMessage(-1002109933292, text, { 
    //         parse_mode: 'HTML',
    //     });
    // }
    // 
    // console.timeEnd();
}
// 每天执行 - 初始执行
const dayRun = async() => 
{
    // 生成 - 昨日数据 - 本周数据
    const __today = await redis_sd28_auto_get(rankTodayView);
    if(__today)
    {
        await yestodayChange(__today);
        await weekChange(__today);
    }
    // 清空今天数据
    let _today = [];
    for(let i=0;i<30;i++)
    {
        _today.push(['-',0]);
    }
    await redis_sd28_auto_set(rankToday, _today);
    // 取得新机器人
    let _man = await redis_sd28_auto_get(gameAutoMan);
    // console.log('_man',_man)
    // 随机获取前30位
    // _man = (await randSort(_man)).slice(0,40);
    _man = (await randSort(_man)).slice(0,_phb_man_money);
    // 设置当日虚拟机器人待位
    let _todays = [];
    for(let i in _man)
    {
        _todays.push([_man[i], 0]);
    }
    await redis_sd28_auto_set(rankTodays, _todays);
    // 
    // await redis_sd28_pub('sd28-site-room', JSON.stringify({
    //     controller: 'rank',
    //     data:{
    //         RankToday: _today
    //     }
    // }));
    // 
    await minuteRun();
}
// 周处理
const weekRun = async() => 
{
    // 清空今天数据
    let _today = [];
    for(let i=0;i<30;i++)
    {
        _today.push(['-',0]);
    }
    await redis_sd28_auto_set(rankWeek, _today);
    //
    // await redis_sd28_pub('sd28-site-room', JSON.stringify({
    //     controller: 'rank',
    //     data:{
    //         RankWeek: _today
    //     }
    // }));
    // console.log(_today)
}
// 初始执行
const _start = async() => 
{
    // await dayRun();
    // 每分钟执行
    schedule.scheduleJob('6 * * * * *', async() => 
    // schedule.scheduleJob('*/2 * * * * *', async() => 
    {
        await minuteRun();
    });
    // 每天执行            S M H D Mo DW
    // schedule.scheduleJob('3 0 0 */1 * *', async() => 
    schedule.scheduleJob('3 */3 * * * *', async() => 
    {
        await dayRun();
    });
    // 每星期一执行
    schedule.scheduleJob('0 0 0 * * 0', async() => 
    {
        await weekRun();
    });
    // 
    const main_group = -1002110314825;
    const test_group = -1002109933292;
    // Leaderboard data 8 AM China Time
    // schedule.scheduleJob('0 8 * * *', async() => 
    // {
    //     const nums = {
    //         1: ' 🥇  ',
    //         2: ' 🥈  ',
    //         3: ' 🥉  '
    //     }
    //     // 
    //     const RankYestoday = await redis_sd28_auto_get('rank_yestoday');
    //     // console.log(RankYestoday)
    //     const time = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    //     // 
    //     if(RankYestoday.length>0){
    //         let caption = '🏆 昨日排行榜  【' + time + '】🏆\n\n' +
    //         '排名      会员账号        赢豆';
    //         for (let i in RankYestoday.slice(0,21)){
    //             if(RankYestoday[i][1]>0){
    //                 caption += '\n' + ((nums[(parseInt(i)+1)]) || (i<10?('  '+i):''+i))  + (i<3 ? '     ': '         ') + getFirstFiveLetters(RankYestoday[i][0]) +'       ' + nTom(parseInt((RankYestoday[i][1]/7))) 
    //             }
    //         }
    //         caption += '\n\n🌟 拔得头筹，抱走奖品！🌟' + '\n' +
    //         '第一名：' + nTom(RankYestoday[0][2]) + '金豆' + '\n' +
    //         '第二名：' + nTom(RankYestoday[1][2]) + '金豆' + '\n' +
    //         '第三名：' + nTom(RankYestoday[2][2]) + '金豆' + '\n\n' +
    
    //         '随时随地赢钱利器' + '\n' +
    //         '在游戏中跻身前三名，赢取丰厚奖品！立即加入比赛，展现您的实力，赢取称号和奖励！' + '\n\n' +
    //         '🥇🥈🥉 快来成为榜单上的璀璨之星吧！🌟' + '\n\n' + 
    //         '享受优质投注快感 👉🏻👉🏻 @jlfcqb_bot';
    //         // 
    //         await rank.telegram.sendPhoto(main_group, Input.fromLocalFile("./assets/champion.png"), { 
    //             caption,
    //             parse_mode:'HTML'
    //         });
    //     }
    // });
    // User Join broadcast 9AM China time
    // schedule.scheduleJob('0 9 * * *', async() => 
    // {
    //     const time = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    //     // 
    //     const text_reg = '每日用户注册量 【'+ time +'】' + '\n\n' +
    //     '昨天已有 <b>' + getRandomAmount(150, 400) + '</b> 位用户加入我们的抽奖平台！我们的平台安全可靠，提供稳定的提款服务，让新用户无需担忧！立即注册，加入我们的精彩抽奖活动，赢取丰厚奖品！快来体验吧！🎉' + '\n\n' +
    //     '无论您是新手还是老PC28民，我们都诚挚地欢迎您的加入！在这里，您将有机会赢取丰厚的奖金，享受刺激的游戏体验。加入我们，一起追寻幸运，创造精彩！祝您好运！🍀 #欢迎加入 #真实可信 #彩票乐园 #加拿大28 #PC28' + '\n\n' +
    //     '享受优质投注快感 👉🏻👉🏻 @jlfcqb_bot';
    //     // 
    //     await rank.telegram.sendPhoto(main_group, Input.fromLocalFile("./assets/user.png"), { 
    //         caption: text_reg,
    //         parse_mode:'HTML'
    //     });
    // })
    // Withdrawl Join broadcast 12PM China time
    // schedule.scheduleJob('0 12 * * *', async() => 
    // {
    //     const time = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    //     // 
    //     const text_w = '每日提款金额保证' + '【'+ time +'】' + '\n\n' +
    //     '🎉🍀 欢迎来到金狼福财娱乐！💰 每天都可以轻松提现！😊 不用担心提现难题，我们为您提供便捷的提现服务！👍 赶快加入我们，赢取丰厚奖金，随时随地轻松提现！💸🌟 #轻松提现 ' + '\n\n' +
    //     '昨天，我们的平台向幸运用户派发了总计 <b>'+ nTom(getRandomAmount(300000000, 500000000)) +'</b> 金额的奖金！无论您的中奖金额是多少，我们都保证快速安全地为您提供提款服务。加入我们，一起享受刺激的彩票娱乐！赶快参与吧！🎉' + '\n\n' +
    //     '金狼福财娱乐博自动上下分系统，提现秒到！秒到！秒到！' + '\n\n' +
    //     '🔥 祝老板天天提款收米 🔥 ' + '\n' +
    //     '享受优质投注快感 👉🏻👉🏻 @jlfcqb_bot' + '\n\n' +
    //     '#彩票 #加拿大28 #PC28 #PK10 #中奖 #提款 #娱乐';
    //     // 
    //     await rank.telegram.sendPhoto(main_group, Input.fromLocalFile("./assets/withdrawal.png"), { 
    //         caption: text_w,
    //         parse_mode:'HTML'
    //     });
    // })
    // 
    // schedule.scheduleJob('0 21 * * *', async() => 
    // {
    //     const text_games = '🐺       金 狼 娱 乐｜J I N L A N G     🐺' + '\n\n' +
    //             'TG娱乐领导者、引领游戏巅峰 ' + '\n' +
    //     '√  本集团担保已上押超千万美金' + '\n' +
    //     '√  千万资金提款安全无忧、实力毋庸置疑！' + '\n' +
    //         '🥳 金狼娱乐祝贺各位越博越旺 🥳' + '\n\n' +
    //     '彩票游戏丰富，提供最高赔率，所有赛果依据官方开奖结果。彩票游戏给您一夜致富的机会及空前的游戏体验！';
    //     const gamesNav = [
    //         [
    //             { "text": "🇨🇦 加拿大 PC2.8", "url": 'https://t.me/+6Z6KfwIiWes2NDky' }, 
    //             { "text": "🏎️ PK赛车 PC2.8", "url": 'https://t.me/+qrEbaBH1KTNjZWUy' }
    //         ],
    //         [
    //           { "text": "🥚 台湾蛋蛋 PC2.8", "url": 'https://t.me/+4tsO0GYyfA41NGUy' }, 
    //           { "text": "🎱 台湾宾果 PC2.8", "url": "https://t.me/+L8vMLbXEIyRiNjIy" }
    //         ],
    //         [
    //           { "text": "🍁 加拿大西部 PC2.8", "url": "https://t.me/+tdEzGrcKwAszZDA6" },
    //           { "text": "🇸🇰 斯洛伐克 PC2.8", "url": 'https://t.me/+Uo212r_WlJBiOGYy' }
    //         ],
    //         [
    //           { "text": "🇦🇺 澳大利亚 PC2.8", "url": 'https://t.me/+BNCuwpbNPUI0ZWJi' }, 
    //           { "text": "💎 俄勒冈州 PC2.8", "url": "https://t.me/+297mZYeo1oAyZjMy" }
    //         ],
    //         [
    //           { "text": "🔥 比特币 PC2.8", "url": 'https://t.me/+hx4Rr7s1yfplZDMy' },
    //           { "text": "🇰🇷 韩国 PC2.8", "url": "https://t.me/+ydsVQlTFnOQwYTEy" }
    //         ]
    //     ]
    //     // 
    //     await rank.telegram.sendPhoto(main_group, Input.fromLocalFile("./assets/games.png"), { 
    //         caption: text_games,
    //         parse_mode:'HTML',
    //         ...Markup.inlineKeyboard(gamesNav)
    //     });
    // })
    
    
}
//
// const other = async() => 
// {
//     // 更换机器人
//     // const man =[]
//     const bots = await async_get_telegram('telegram_auto_bots');
//     // // console.log(bots);
//     // 
    
//     for(let i in bots){
//         man.push(bots[i]['name'])
//     }
//     console.log(man)
//     // 
//     await redis_sd28_auto_set(gameAutoMan, man);
// }
// other()
// 
_start();
