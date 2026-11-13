import { lazy, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { SEND } from 'store';
// 
const _imgs = [
    1,
    2,
    3,
    4
];
//
export default () => 
{
    const { ActivyKey, Activys } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    //
    useEffect(() => {
        dispatch.models.SET({ActivyKey:0});
        SEND('home/activy');
    }, []);
    // 
    return <div className='promotions mb16'>
        <div className='mb16'>
            <img 
                src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/bg/banner_activity.jpeg" 
                width="100%"
                height="100%"
            />
        </div>

        <div className="w1000 br10 bx promo" style={{padding:"40px 20px 20px"}}>
            <Row gutter={[0,45]}>
                {_imgs.map((v,k)=>(
                    <Col span={24} key={k}>
                        <div className="activy br10 bf">
                            <img 
                                src={`https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/bg/promo/${v}.svg`}
                                onClick={()=>{
                                    dispatch.models.SET({ActivyKey:k})
                                }} 
                            />
                            {/* <div className={"bk p24 "+(ActivyKey==k?'':' no')}> */}
                            <div className={"bk p24 "}>
                                <div className="conx tl" dangerouslySetInnerHTML={{__html:Activys&&Activys[k]||''}} />
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>

    </div>
}