import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Avatar, Card, Skeleton } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SEND } from 'store';
// 
const { Meta } = Card;
// 
const Main = lazy(() => import('components/Home/Main'));
//
export default () => 
{
    const { Agents, AgentsLoading } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    useEffect(() => SEND('home/agents'), []);
    // 
    let _list = [];
    for(let i=6;i>0;i--) {
        _list.push(['-','-','-','-']);
    }
    // 
    // const _copy = (bg,txt,tit) => {
    //     return <CopyToClipboard text={txt} onCopy={()=>dispatch.models.SET({M:{t:tit+'已复制到粘贴板',c:<b>{txt}</b>}})}>
    //         <p bg={bg}> {txt} </p>
    //     </CopyToClipboard>
    // }
    // 
    return <Main
        ban="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/agents/ag.jpeg"
        pos = "center 500px"
        bgc = "#f5f5f5"
    >
        <div className='pr tc'>
            <img src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/agents/co.png" />
        </div>
        <div className='w agents'>
            <Row gutter={[10,10]}>
                {(Agents&&Agents.slice(0,6)||_list).map((v,k)=>(
                    <Col key={k} span={8}>
                        <Card
                            style={{
                                width: "100%"
                            }}
                            actions={[
                                <img src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/icon/qq.png" width="23px" />,
                                <img src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/svg/wechat.svg" width="28px" />,
                                <img src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/home/lx/fj.webp" width="25px" />
                            ]}
                        >
                            <Skeleton loading={AgentsLoading} avatar active>
                                <Meta
                                    avatar={<Avatar src={`https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/agents/${k+1}.jpeg`} />}
                                    title={v[0]}
                                    description={v[1]}
                                />
                            </Skeleton>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    </Main>
}