const dayjs = require('dayjs');
const { createCipheriv, createHash } = require("crypto");
const express = require('express');
// 
const _urls = { 'ak.angri.sr': 'aw.angri.sr' };
// 
const app = express();
app.disable('x-powered-by');
// 
const _bkey = 'I1HE9SHUxho5hjOH';
const _ckey = 'KlxeP2RYk85aS4Gb';
// 
const _key = Buffer.from(_bkey, 'utf8');
const _iv = Buffer.from(_ckey, 'utf8');
// 
const sk = async(k) => { 
    const src = k;
    let sign = '';
    const cipher = createCipheriv('aes-128-cbc', _key, _iv);
    sign += cipher.update(src, 'utf8', 'hex');
    sign += cipher.final('hex');
    return sign;
}
// 
const md5 = async(s) =>
{
    return createHash('md5').update(String(s)).digest('hex');
}
// -
const ipcheck = async(h) => 
{
    // console.log(h)
    // if(h['x-forwarded-for'][0]==h['cf-connecting-ip']) return h['cf-connecting-ip']
    if(h['cf-connecting-ip']) return h['cf-connecting-ip'];
    return h['x-real-ip'];
}
// 
app.get('/ad_key', async(req, res) => 
{
    const _host = req.headers['host'];
    // console.log(req.headers)
    if(!_urls[_host])
    {
        res.end('none');
        return;
    }
    const agent = req.headers['user-agent'];
    const ip = (await ipcheck(req.headers)).replace(/\./g,'');
    // console.log(ip)
    const time = dayjs().valueOf();
    const sj = [1,2,3,4,5,6,7,8,9].sort(()=>{return Math.random() > .5 ? -1 : 1}).slice(0,6).join('');
    // 
    // const code = (await md5(ip+''+agent+''+dayjs().format('YYMMDDHHmm')))+(await sk(time+'|'+sj));
    const code = (await md5(agent+''+dayjs().format('YYMMDDHHmm')))+(await sk(time+'|'+sj));
    // 
    res.end(
        _urls[_host]+'-'+
        code+'-'+
        // ip+''+time+''+sj
        time+''+sj

    );
});
// 
app.listen(9201);