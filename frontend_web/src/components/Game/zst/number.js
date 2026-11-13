import { _nums, _dx, _lmwy, _list_num, _list_lm, _kt, _vals, _dsdxzb } from 'utils/gamezst';
import { toDecimal2NoZero, parseVal } from 'utils/tool';
import { t } from 'i18n';

export default (props) => 
{
    let { loca, gameZst, gameZstNum } = props;
    let type = loca.type;
    //  
    type = (type=='28gd' || type=='nn' || type=='nb') ? 28 : type;
    type = type=='gj' ? 10 : type;
    // 
    if(!gameZst||![10,11,16,22,28,'gyh','lh'].find(v=>v==type)) return <></>;
    // 
    let __vals = _vals[type];
    let _list = _nums[type];
    if(!_list) return <>2</>;
    let _head = [ ..._list[0], ..._list[1], ..._list[2], t("单"), t("双"), t("中"), t("边"), t("大"), t("小")];
    // 
    let _xs = gameZstNum/100;
    let _ds = [];
    _ds = _dsdxzb[type];
    let _bz = [ ...__vals, ..._ds ];
    const ysK = (a,b) => 
    {
        a = parseFloat(a);
        b = parseFloat(b);
        if(a>b) return 'h';
        if(a<b) return 'l';
        return 'd';
    }
    // 
    const soTagSum = () => 
    {
        _head.map((v,k)=>
        {
            let _sum = document.querySelectorAll("td[n='"+v+"']").length;
            let _ns = document.querySelector("td[ns='"+v+"']");
            let _bl = document.querySelector("td[bl='"+v+"']");
            if(_ns&&_bl)
            {
                _sum = parseInt(_sum);
                let __bz = toDecimal2NoZero(_bz[k]*_xs);
                let _ysk = ysK(_sum,__bz)||'d';
                let _bls = _sum ? toDecimal2NoZero(_sum/__bz) : '0';
                _ns.innerHTML = _sum;
                _bl.innerHTML = parseVal(_bls);
                if(_ysk) _ns.setAttribute('ys',_ysk);
                if(_ysk) _bl.setAttribute('ys',_ysk);
            }
        })
    }
    // 
    setTimeout(() => { _kt(type,gameZst); }, 50);
    setTimeout(()=>{soTagSum()},100);
    // 
    return(
        <>
            <table className="ab">
                <tbody>
                    <tr>
                        <td colSpan="2">{t("标准次数")}</td>
                        {_bz.map((v)=>(
                            <td>{parseVal(toDecimal2NoZero(v*_xs))}</td>
                        ))}
                        <td colSpan="2" rowSpan="3">{t("尾数")}</td>
                        <td colSpan="3" rowSpan="3">{t("余数")}</td>
                    </tr>
                    <tr>
                        <td colSpan="2">{t("实际次数")}</td>
                        {_head.map((v,k)=>(
                            <td ns={v}>-</td>
                        ))}
                    </tr>
                    <tr>
                        <td colSpan="2">{t("比例")}</td>
                        {_head.map((v,k)=>(
                            <td bl={v}>-</td>
                        ))}
                    </tr>
                    <tr>
                        <td>{t("期号")}</td>
                        <td>{t("时间")}</td>
                        {_head.map((v)=>(
                            <td>{v}</td>
                        ))}
                        <td>{t("大")}</td>
                        <td>{t("小")}</td>
                        <td>/3</td>
                        <td>/4</td>
                        <td>/5</td>
                    </tr>
                    {gameZst.map((vv,kk)=>(
                        <tr key={kk}>
                            <td>{vv[0]}</td>
                            <td>{vv[1]}</td>
                            {_list_num(_list, vv[2], (kk+1))}
                            {_list_lm(type, _list, vv[2])}
                        </tr>
                    ))}
                </tbody>
            </table>
            <canvas id="zstcanvas" width="0" height="0"></canvas>
        </>
    )
}