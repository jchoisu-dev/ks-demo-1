import { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { nTom } from 'utils/tool';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Main = lazy(() => import('components/Home/Main'));
const Table = lazy(() => import('components/Table'));
//
export default () => 
{
    const { RankToday, RankYestoday, RankWeek } = useSelector((state) => state.models);
    // 
    useEffect(() => {
        SEND('home/rank');
    }, []);
    // 
    const ball = (k) => 
    {
        if(k<3) return <img src={'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/rank/1'+(k+1)+'.png'} />;
        return <div className="ball">{k+1}</div>;
    }
    // 
    const columns = [
        [ t("排名"), (v,k)=>ball(k) ],
        [ t("昵称"), (v)=>v[0] ],
        [ t("赢豆"), (v)=>sd(v[1]) ],
    ];
    const columns2 = [
        [ t("排名"), (v,k)=>ball(k) ],
        [ t("昵称"), (v)=>v[0] ],
        [ t("赢豆"), (v)=>sd(v[1]) ],
        [ t("奖励"), (v)=>sd(v[2],1) ],
    ];
    // 
    const Rank = [
        RankToday, 
        RankYestoday, 
        RankWeek 
    ];
    // 
    const arr = [
        [t("今日排行"),'today','auto'],
        [t("昨日排行"),'yestoday','480px'],
        [t("一周排行"),'week','auto'],
    ];
    let _list = [[],[],[]];
    for(let i=0;i<3;i++)
    {
        for(let j=0;j<30;j++)
        {
            let _d = [
                '-',
                '-'
            ];
            if(i==1) _d.push('-');
            _list[i].push(_d);
        }
    }
    const sd = (a,b) => 
    {
        if(!a || a<=0) return '-';
        if(b) return <b>{nTom(a)}</b>;
        return nTom(a);
    }
    // 
    return <Main
        // bg="https://images.unsplash.com/photo-1628159756453-bb976a81411b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
        pos = "center 500px"
        bgc = "#f5f5f5"
        ban="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/bg/phb.jpg"
        
    >
        <div style={{textAlign:'center',padding:'140px 0 46px'}}>
            {/* <img src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/bg/rank/szww.png" /> */}
        </div>
        
        <div className="w">
            <Row gutter={24}>
                {arr.map((v,k)=>(
                    <Col key={k} flex={v[2]}>
                        <div className="block br10 bx ranks">
                            <div className="title tc">{v[0]}</div>
                            <Table 
                                tableClass={'hover'}
                                columns={k==1?columns2:columns} 
                                data={ Rank&&Rank[k]&&[[],Rank[k]] || [[],_list[k]] }
                            />
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    </Main>
}