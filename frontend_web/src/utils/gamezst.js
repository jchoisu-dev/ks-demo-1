import { t } from 'i18n';
const _nums = {
    10: [ [1,2,3], [4,5,6,7], [8,9,10] ],
    11: [ [2,3,4], [5,6,7,8,9], [10,11,12] ],
    16: [ [3,4,5,6,7], [8,9,10,11,12,13], [14,15,16,17,18] ],
    22: [ [6,7,8,9,10,11,12], [13,14,15,16,17,18,19,20], [21,22,23,24,25,26,27] ],
    28: [ [0,1,2,3,4,5,6,7,8,9], [10,11,12,13,14,15,16,17], [18,19,20,21,22,23,24,25,26,27] ],
    'gyh': [ [3,4,5,6,7], [8,9,10,11,12,13,14], [15,16,17,18,19] ],
    'lh': [50,50],
}
// 
const _vals = {
    10: [10,10,10,10,10,10,10,10,10,10],
    11: [2.8, 5.6, 8.3, 11.1, 13.9, 16.7, 13.9, 11.1, 8.3, 5.6, 2.8],
    16: [0.5, 1.5, 3, 5, 7.5, 10.5, 12.5, 13.5, 13.5, 12.5, 10.5, 7.5, 5, 3, 1.5, 0.5],
    22: [0.8, 0.8, 1.7, 2.5, 3.3, 4.2, 5.8, 6.7, 7.5, 8.3, 8.3, 8.3, 8.3, 7.5, 6.7, 5.8, 4.2, 3.3, 2.5, 1.7, 0.8, 0.8],
    28: [0.1,0.3,0.6,1,1.5,2.1,2.8,3.6,4.5,5.5,6.3,6.9,7.3,7.5,7.5,7.3,6.9,6.3,5.5,4.5,3.6,2.8,2.1,1.5,1,0.6,0.3,0.1],
    36: [1,6,27,36,30],
    'gyh': [2.2, 2.2, 4.4, 4.4, 6.7, 6.7, 8.9, 8.9, 11.1, 8.9, 8.9, 6.7, 6.7, 4.4, 4.4, 2.2, 2.2],
    'lh': [50,50],
}
const _dsdxzb = {
    10: [50,50,50,50,50,50],
    11: [50,50,44,56,50,50],
    16: [50,50,37,63,50,50],
    22: [50,50,38,62,50,50],
    28: [50,50,56,44,50,50],
    36: [58,42,63,37,93,7],
    'gyh': [50,50,37,63,50,50],
    'lh': [50,50,50,50],
}
//
const _dx = {
    10: 5,
    11: 6,
    16: 10,
    22: 16,
    28: 13,
    'gd28': 13,
    'gyh': 10,
    'gj': 5,
}
// 
const _lmwy = [
    t("单"),
    t("双"),
    t("中"),
    t("边"),
    t("大"),
    t("小"),
    t("大"),
    t("小"),
    '/3',
    '/4',
    '/5',
]
// 
const _s36 = {
    1:t("豹"),
    2:t("顺"),
    3:t("对"),
    4:t("半"),
    5:t("杂"),
}
const _s36n = {
    'bao': t("豹"),
    'shun': t("顺"),
    'dui': t("对"),
    'ban': t("半"),
    'za': t("杂"),
}
// 
const _slh = {
    'long': 1,
    'hu': 2
}
const _slhn = {
    'long': t("龙"),
    'hu': t("虎"),
}


const strLastOne = (str) =>
{
  str = str + '';
  let spstr = str.split('');
  return parseInt(spstr[spstr.length-1]);
};

const _list_num = (list, jd, x) => {
    return(
        <>
            {list.map((vv,kk)=>(
                <>
                    {vv.map((v,k)=>(
                        <td key={k} b={kk} n={v==jd&&jd} id={v==jd&&'lx-'+x}></td>
                    ))}
                    
                </>
            ))}
        </>
    )
}

const _list_lm = (type, list,jd) => 
{
    let _dxs = _dx[type];
    return(
        <>
            <td b="a" n={jd%2==0?null:t("单")}></td>
            <td b="b" n={jd%2==0?t("双"):null}></td>
            <td b="c" n={list[1].find(v=>v==jd)?t("中"):null}></td>
            <td b="d" n={!list[1].find(v=>v==jd)?t("边"):null}></td>
            <td b="e" n={(jd>_dxs)?t("大"):null}></td>
            <td b="f" n={(jd<=_dxs)?t("小"):null}></td>
            <td b="a">{(strLastOne(jd)>=5)?t("大"):null}</td>
            <td b="b">{(strLastOne(jd)<5)?t("小"):null}</td>
            <td t="1">{jd%3}</td>
            <td t="1">{jd%4}</td>
            <td t="1">{jd%5}</td>
        </>
    )
}

//
const _list_36 = (list, jd, x) => {
    return(
        <>
            {list.map((vv,kk)=>(
                <>
                    {vv.map((v,k)=>(
                        <td key={k} b={kk} n={jd==v&&_s36n[jd]} id={jd==v&&'lx-'+x}></td>
                    ))}
                </>
            ))}
        </>
    )
}
const _list_lm_36 = (jd) => 
{
    return(
        <>
            <td b="a" n={['bao','dui','za'].find(v=>v==jd)?t("单"):null}></td>
            <td b="b" n={['shun','ban'].find(v=>v==jd)?t("双"):null}></td>
            <td b="c" n={['dui','ban'].find(v=>v==jd)?t("中"):null}></td>
            <td b="d" n={['bao','shun','za'].find(v=>v==jd)?t("边"):null}></td>
            <td b="e" n={['dui','ban','za'].find(v=>v==jd)?t("大"):null}></td>
            <td b="f" n={['bao','shun'].find(v=>v==jd)?t("小"):null}></td>
            {/* <td b="a" n={['bao','shun','za'].find(v=>v==jd)?'小':''}></td>
            <td b="b" n={['bao','shun','za'].find(v=>v==jd)?'小':''}></td> */}
            {/* <td t="1">{_jd%3}</td>
            <td t="1">{_jd%4}</td>
            <td t="1">{_jd%5}</td> */}
        </>
    )
}

//
const _list_lh = (jd, x) => {
    return(
        <>
            {['long','hu'].map((v,k)=>(
                <td key={k} b={k==0?1:0} n={v==jd&&_slhn[jd]} id={v==jd&&'lx-'+x}></td>
            ))}
        </>
    )
}
const _list_lm_lh = (jd) => 
{
    let _jd = _slh[jd];
    return(
        <>
            <td b="a" n={_jd%2==0?null:t("单")}></td>
            <td b="b" n={_jd%2==0?t("双"):null}></td>
            <td b="e" n={(_jd>1)?t("大"):null}></td>
            <td b="f" n={(_jd<=1)?t("小"):null}></td>
            <td t="1">{_jd%3}</td>
            <td t="1">{_jd%4}</td>
            <td t="1">{_jd%5}</td>
        </>
    )
}
// 
const canvasWH = (w,h)=>
{
    let canvas = document.getElementById("zstcanvas");
    if(canvas)
    {
        canvas.width = w;
        canvas.height = h;
    }
}
// 
const _ttt = {
    10: -9,
    11: -8,
    16: -5,
    36: -26,
    'gyh': -4,
    'gj': -9,
    'lh': -36,
    22: -1,
}
// 
const _kt = async(type,gameZst) => 
{
    if(!gameZst) return;
    let _num = gameZst.length;
    let canvas = document.getElementById("zstcanvas");
    if(canvas)
    {
        await canvasWH(0,0);
        const _zst = document.getElementById("table-zst");
        if(!_zst) return;
        await canvasWH(_zst.clientWidth, _zst.clientHeight);
        // 
        const ctx = canvas.getContext("2d");
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // 
        let _lx_id = document.getElementById("lx-"+1);
        if(!_lx_id) return;
        // 
        let _lx_w = _lx_id.offsetWidth/2;
        // 
        ctx.moveTo(_lx_id.offsetLeft+_lx_w,_lx_id.offsetTop+_lx_w+(_ttt[type]||0));
        for(let i=2;i<_num+1;i++)
        {
            let _lx_id = document.getElementById("lx-"+i);
            if(!_lx_id) return;
            let _lx_w = _lx_id.offsetWidth/2;
            ctx.lineTo(_lx_id.offsetLeft+_lx_w,_lx_id.offsetTop+_lx_w+(_ttt[type]||0));
        }
        ctx.lineWidth=1;
        ctx.stroke();
    }
}
// 
export {
    _nums,
    _dx,
    _lmwy,
    _list_num,
    _list_lm,
    // 
    _list_36,
    _list_lm_36,
    // 
    _list_lh, 
    _list_lm_lh,
    // 
    _kt,
    _vals,
    _dsdxzb,
    _s36n,
    _s36,
    _slhn,
    _slh
}