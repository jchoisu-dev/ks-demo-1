import { _list_36, _list_lm_36, _s36n, _s36, _kt, _vals, _dsdxzb } from 'utils/gamezst';
import { toDecimal2NoZero, parseVal } from 'utils/tool';
import { t } from 'i18n';
// 
export default props => 
{
    let { loca, gameZst, gameZstNum } = props;
    let type = 36;
    // 
    if(!gameZst) return <></>;
    // 
    let __vals = _vals[type];
    let _list = [['bao','shun'],['dui','ban'],['za']];
    let _head = [ ..._list[0],..._list[1],..._list[2], t("单"), t("双"), t("中"), t("边"), t("大"), t("小")];
    // 
    let _xs = gameZstNum/100;
    let _ds = _dsdxzb[type];
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
            let _sum = document.querySelectorAll("td[n='"+(_s36n[v]||v)+"']").length;
            let _ns = document.querySelector("td[ns='"+v+"']");
            let _bl = document.querySelector("td[bl='"+v+"']");
            if(_ns&&_bl)
            {
                _sum = parseInt(_sum);
                let __bz = toDecimal2NoZero(_bz[k]*_xs,3);
                let _ysk = ysK(_sum,__bz)||'d';
                let _bls = _sum ? toDecimal2NoZero(_sum/__bz,3) : '0';
                _ns.innerHTML = _sum;
                _bl.innerHTML = _bls;
                if(_ysk) _ns.setAttribute('ys',_ysk);
                if(_ysk) _bl.setAttribute('ys',_ysk);
            }
        })
    }
    // 
    setTimeout(() => { _kt(type,gameZst); }, 50);
    setTimeout(()=>{soTagSum()},100);
    // 
    return <>
        <table className="ab">
            <tbody>
                <tr>
                    <td colSpan="2">{t("标准次数")}</td>
                    {_bz.map((v)=>(
                        <td>{parseVal(toDecimal2NoZero(v*_xs))}</td>
                    ))}
                    {/* <td colSpan="2" rowSpan="3">尾数</td>
                    <td colSpan="3" rowSpan="3">余数</td> */}
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
                        <td width="80">{_s36n[v]||v}</td>
                    ))}
                    {/* <td>大</td>
                    <td>小</td>
                    <td>/3</td>
                    <td>/4</td>
                    <td>/5</td> */}
                </tr>
                {gameZst&&gameZst&&gameZst.map((vv,kk)=>(
                    <tr key={kk}>
                        <td>{vv[0]}</td>
                        <td>{vv[1]}</td>
                        {_list_36(_list, vv[2], (kk+1))}
                        {_list_lm_36(vv[2])}
                    </tr>
                ))}
            </tbody>
        </table>
        <canvas id="zstcanvas" width="0" height="0"></canvas>
    </>
}