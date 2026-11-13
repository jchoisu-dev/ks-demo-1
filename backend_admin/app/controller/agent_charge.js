//
const dayjs = require('dayjs'); 
const { Op, AGENTCHARGE, USERS } = require('../sequelize/db28');
const { xpage } = require('../plugin/tool');
const { SubDo } = require('../plugin/redis');
//
const list = async(d) => 
{
    const { id, _agent_id, _user_id, page, time_start, time_end, status } = d;
    //
    const { offset,limit } = await xpage(page);
    let where = {};
    if(_agent_id) where['agent_id'] = _agent_id;
    if(_user_id) where['user_id'] = _user_id;
    if(status) where['status'] = status;
    // 
    if(time_start)
    {
        where['time'] = {
            [Op.gte]: time_start,
            [Op.lte]: time_end,
        };
    }
    // 
    const count = await AGENTCHARGE.count({ where });
    const rows = await AGENTCHARGE.findAll({
        attributes: ['agent_id','agent_nick','user_id','user_nick','money','up_rate','agent_cut_dou','status','time'],
        where,
        order: [['id','DESC']],
        offset,
        limit
    });
    let list = [];
    for(let i in rows)
    {
        const _v = rows[i];
        list.push([
            dayjs(_v.time).format('YYYY-MM-DD HH:mm:ss'),
            _v.agent_id,
            _v.agent_nick,
            _v.user_id,
            _v.user_nick,
            _v.money,
            parseFloat(_v.up_rate),
            _v.agent_cut_dou,
            _v.status
        ])
    };
    return {
        AgentChargeList: [
            [page||1, count],
            list
        ],
        AgentChargeListLoading: false
    };
}
// 
const id_check = async(d) => 
{
    const { id, _user_id } = d;
    // console.log(d)
    const _cs = {
        1: 'Normal',
        2: 'Trial'
    }
    // 
    // if (!/^[0-9]{6,12}$/.test(_user_id)) return { AgentdlczUserCheckLoading: '',AgentdlczStatus: {_user_id: { s: 'error' }}, AgentdlczUserInfo:['Wrong Format!']};
    if(id==_user_id) return { AgentdlczUserCheckLoading: false,AgentdlczStatus: {_user_id: { s: 'error' }}, AgentdlczUserInfo:["Unable top up to yourself!"]};
    const _user = await USERS.findOne({attributes: ['level', 'nick', 'role', 'cs', 'status'], where:{id: _user_id}});
    if(!_user) return { AgentdlczUserCheckLoading: false,AgentdlczStatus: {_user_id: { s: 'error' }}, AgentdlczUserInfo:['No user found']};
    if(_user.role==2) return { AgentdlczUserCheckLoading: false,AgentdlczStatus: {_user_id: { s: 'error' }}, AgentdlczUserInfo:['User is an Agent']};
    if(_user.status!=1) return { AgentdlczUserCheckLoading: false,AgentdlczStatus: {_user_id: { s: 'error' }}, AgentdlczUserInfo:['User is banned']};
    // if(_user.cs==2) return { AgentdlczUserCheckLoading: '',AgentdlczStatus: {_user_id: { s: 'error' }}, AgentdlczUserInfo:['该账号无法充值'] };
    return {
        AgentdlczUserCheckLoading: false,
        AgentdlczStatus: {_user_id: { s: 'success' }},
        AgentdlczUserInfo:[_user.nick, _cs[_user.cs]]
    }
}
// 
const go = async(d) => 
{
    let { uuidkey, id, _user_id, money, tma } = d;
    // 
    // console.log(d)
    // 
    const _user = await USERS.findOne({ attributes: ['cs','role','status'], where:{id: _user_id} });
    // if(!_user || _user.cs=='2' || _user.role==2 || _user.status!=1 )
    // {
    //     return { M:{c:'该账号无法充值'} };
    // }
    //
    // if(!/^[0-9]{6,12}$/.test(_user_id)) return { M:{c:'用户ID格式错误，请更正！'}, AgentdlczLoading: '',AgentdlczStatus: {_user_id: { s: 'error' }}};
    if(!/^\d{1,7}$/.test(money)) return { M:{c:'The recharge amount format is incorrect！'}, AgentdlczLoading: '',AgentdlczStatus: {money: { s: 'error' }}};
    if(!money) return { M:{c:'Please enter the top up amount！'}, AgentdlczLoading: '',AgentdlczStatus: {money: { s: 'error' }}};
    money = parseInt(money); 
    if(money<=0) return { M:{c:'The minimum recharge amount is $1!！'}, AgentdlczLoading: '',AgentdlczStatus: {money: { s: 'error' }}};
    if(id==_user_id) return { M:{c:"Can't recharge your own account!"} ,AgentdlczLoading: '',AgentdlczStatus: {_user_id: { s: 'error' }}};
    // 
    const AGENT_BOT = await USERS.findOne({attributes:['id'], where:{ user: 'AGENT_BOT' }});
    // 
    await SubDo({
        platform: 'admin',
        path:[ 'charge', 'go' ],
        data:{ uuidkey, id: AGENT_BOT.id, _user_id, money, tma }
    });
}
// 
module.exports = {
    list,
    id_check,
    go
}