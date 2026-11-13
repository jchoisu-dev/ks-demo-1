import { lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nTom } from 'utils/tool';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
// 
export default () => 
{
    const { HomeRank } = useSelector((state) => state.models);
    // 
    const ball = (k) => 
    {
        if(k<3) return <img src={'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/rank/1'+(k+1)+'.png'} />;
        return <div className="ball">{k+1}</div>;
    }
    // 
    let _list = [];
    for(let i=0;i<5;i++)
    {
        _list.push(['-','-','-']);
    }
    // 
    return <div className="bf br5 ranks bx homerank">
        <Table 
            tableClass={'hover nb'}
            columns={[
                [ t("排名"),(v,k)=>ball(k) ],
                [ t("昵称"), (v)=><>{v[0]}</> ],
                [ t("中奖"), (v)=><b>{nTom(v[1])}</b> ]
            ]} 
            data={ [[],HomeRank||_list] }
        />
    </div>
}