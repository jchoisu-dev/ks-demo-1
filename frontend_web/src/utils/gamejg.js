import { t } from 'i18n';
const _listShowAdd = (t, c, n, g, ons) => 
{
    return <span className={"gjgs "+c+' t-'+t}>
        {n?
        <span className="adds">
            {n.map((v,k)=>(
                <>
                    {k<11?
                        <em key={k} c={ons&&ons.indexOf(v)!==-1?'on':''} n={v||0}></em>
                    :''}
                </>
            ))}
        </span>
        :''}
        <span className="jgs">
            {g&&g.map((v,k)=>(
                <span k={k} className="jg" n={v||0}></span>
            ))}
        </span>
    </span>
}
// 检验
const JianYan = props => 
{
    return <div class="jglistshow">
        {props.children}
        <div class="jy" onClick={()=>props.data()}>{t("检验")}</div>
    </div>
}
const gameListShow = (url, arr, SET) => 
{
    if(!url&&!url[0]&&arr.length==0) return <></>;
    if(!arr[4]&&arr[2].length==0) return <>-</>;
    if(arr[4]=='.'||arr[4]=='...'||arr[2].length==0) return <>{arr[4]}</>;
    if(url[0]=='xy')
    {
        switch(url[1])
        {
            case '28': return _listShowAdd(url[1], 'num', arr[3], [arr[4]])
            case '10': return _listShowAdd(url[1], 'fang', arr[2], [arr[4]], [arr[2][0]])
            case '11': return _listShowAdd(url[1], 'num', arr[3], [arr[4]])
            case '16': return _listShowAdd(url[1], 'num', arr[3], [arr[4]])
            case '22': return _listShowAdd(url[1], 'fang', arr[2], [arr[4]], [arr[2][0],arr[2][1],arr[2][2]])
            case '36': return _listShowAdd(url[1], 'num', arr[3], [arr[4]])
        }
    }
    // BJ 系列
    let _is_jd = ['xy','bj','dd','jnd','jnc','btc','kr','au','elg','slfk'];
    if(_is_jd.find((v)=>v==url[0]))
    {
        if(!arr[2] || arr[4]=='-' || arr[4]=='...') return;
        return <JianYan data={()=>SET({GameJieguoJianyan:arr})}>{_listShowAdd(url[1], 'num', arr[3], [arr[4]])}</JianYan>
    }
    // PK 系列
    if(url[0]=='pk')
    {
        switch(url[1])
        {
            case 'sc': return <JianYan data={()=>SET({GamePkJianyan:arr,GamePkType:'sc'})}>{_listShowAdd(url[1], 'fang', arr[2], [arr[4], ...arr[5]], [arr[2][0],arr[2][1]])}</JianYan>
            case '10': return <JianYan data={()=>SET({GamePkJianyan:arr,GamePkType:'10'})}>{_listShowAdd(url[1], 'fang', arr[2], [arr[4]], [arr[4]])}</JianYan>
            case '22': return <JianYan data={()=>SET({GamePkJianyan:arr,GamePkType:'22'})}>{_listShowAdd(url[1], 'fang', arr[2], [arr[4]], [arr[2][0],arr[2][1],arr[2][2]])}</JianYan>
            case 'gyh': return <JianYan data={()=>SET({GamePkJianyan:arr,GamePkType:'gyh'})}>{_listShowAdd(url[1], 'fang', arr[2], [arr[4]], [arr[2][0],arr[2][1]])}</JianYan>
            case 'gj': return <JianYan data={()=>SET({GamePkJianyan:arr,GamePkType:'gj'})}>{_listShowAdd(url[1], 'fang', arr[2], [arr[4]], [arr[4]])}</JianYan>
            case 'lh': return <JianYan data={()=>SET({GamePkJianyan:arr,GamePkType:'lh'})}>{_listShowAdd(url[1], 'fang', arr[2], [arr[4]], [arr[2][0],arr[2][9]])}</JianYan>
        }
    }
}

const _jgShowAdd = (open, n, g) => 
{
    return <span className={"topjg"+(!!open?' lotteryopen':'')}>
        {n?
        <span className="adds">
            {n.map((v,k)=>(
                <><em key={k} n={v||0}></em><span></span></>
            ))}
        </span>
        :''}
        <span className="jgs">
            {g&&g.map((v,k)=>(
                <em key={k} n={v||0}></em>
            ))}
        </span>
    </span>
}

const gameJgShow = (url, arr, open) => 
{
    if(!arr) return <></>;
    // 
    let _is_jd = ['xy','bj','dd','jnd','jnc','btc','kr','au','elg','slfk'];
    if(_is_jd.find((v)=>v==url[0])) return _jgShowAdd(open, arr[3], [arr[4]]);
    // PK 系列
    if(url[0]=='pk')
    {
        switch(url[1])
        {
            case 'sc': return _jgShowAdd(open, [arr[2][0],arr[2][1]], [arr[4]]);
            case '10': return _jgShowAdd(open, '', [arr[4]]);
            case '22': return _jgShowAdd(open, [arr[2][0],arr[2][1],arr[2][2]], [arr[4]]);
            case 'gyh': return _jgShowAdd(open, [arr[2][0],arr[2][1]], [arr[4]]);
            case 'gj': return _jgShowAdd(open, '', [arr[4]]);
            case 'lh': return _jgShowAdd(open, '', [arr[4]]);
        }
    }
    // 群玩 系列
    if(url[0]=='qwf')
    {
        switch(url[1])
        {
            case 'xy': return _jgShowAdd(open, arr[3], [arr[4]]);
            case 'bj': return _jgShowAdd(open, arr[3], [arr[4]]);
            case 'dd': return _jgShowAdd(open, arr[3], [arr[4]]);
            case 'jnd': return _jgShowAdd(open, arr[3], [arr[4]]);
            case 'pk': return _jgShowAdd(open, [arr[2][0],arr[2][1]], [arr[4], ...arr[5]]);
            case 'jnc': return _jgShowAdd(open, arr[3], [arr[4]]);
            case 'au': return _jgShowAdd(open, arr[3], [arr[4]]);
            case 'kr': return _jgShowAdd(open, arr[3], [arr[4]]);
            case 'btc': return _jgShowAdd(open, arr[3], [arr[4]]);
            case 'elg': return _jgShowAdd(open, arr[3], [arr[4]]);
            case 'slfk': return _jgShowAdd(open, arr[3], [arr[4]]);
        }
    }
}

export {
    gameListShow,
    gameJgShow,
    _listShowAdd,
    _jgShowAdd
}