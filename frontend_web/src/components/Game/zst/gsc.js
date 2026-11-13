import React from 'react';
import { _jgTxt } from 'utils/betData';
import { t } from 'i18n';
// 
const List = React.lazy(() => import('components/Game/List'));
// 
export default props => 
{
    let { gameZst } = props;
    // 
    gameZst = gameZst || [];
    // 
    if(!gameZst||gameZst.length<=0||!gameZst[2]) return <></>;
    // 
    const _scn = {
        'da': t("大"),
        'xiao': t("小"),
        'dan': t("单"),
        'shuang': t("双"),
        'long': t("龙"),
        'hu': t("虎"),
    }
    const _ts = (v,k) => 
    {
        if(k==0)return <td><img src={"https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/game/m/"+v+".png"} /></td>
        return <td b="a"><div className="ball" dd={v}></div></td>
    }
    // 
    return <>
        <table className="ab">
            <tbody>
                <tr>
                    <td rowSpan="2">{t("期号")}</td>
                    <td rowSpan="2">{t("时间")}</td>
                    <td rowSpan="2">{t("开奖结果")}</td>
                    <td rowSpan="2" colSpan="3">{t("冠军和")}</td>
                    <td colSpan="5">{t("龙虎")}</td>
                    
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                </tr>
                {gameZst&&gameZst.map((vv,kk)=>(
                    <>
                        <tr key={kk}>
                            <td>{vv[0]}</td>
                            <td>{vv[1]}</td>
                            <td width="360">
                                <List data={['','',[vv[2][0],vv[2][1]],[],vv[2]]} loca={{category:'pk',type:'sc'}} nocheck={1} />
                            </td>
                            {vv[3].map((v,k)=>_ts(v,k))}
                        </tr>
                    </>
                ))}
            </tbody>
        </table>
    </>
}