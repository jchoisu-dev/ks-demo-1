import { Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
// 
const usdt = [
    // 1,
    // 2,
    // 3,
    4,
    5,
    6,
    7,
    8,
    9,
    // 10,
    // 11,
    // 12,
    // 13,
    // 14
];
const link = 'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/gb/'
// 
export default () => 
{   
    const { Popout } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    // 
    // localStorage.removeItem('sd28_pop');
    // 
    // let sd28_pop = localStorage.getItem('sd28_pop');
    // // console.log(sd28_pop);
    // // 
    // if(sd28_pop) return <></>;
    if(Popout==1) return <></>;
    //
    const _mod = {
        // background:"transparent",
        userSelect: "none",
        background:"rgba(0,0,0,0.7)",
    };
    // 
    const dis = () =>
    {
        dispatch.models.SET({Popout:1});
    };
    // 
    return <>
        <div 
            className={"modal " + (Popout ? "popin" : "popout")} 
            onClick={()=>dis()}
            style={_mod}
        >
            <div className="tc block">
                <div className="pr">
                    <div className={"popClose"} onClick={()=>dis()}></div>
                    <div className='w bf p16 br5'>
                        <Row gutter={[16,16]}>
                            {usdt.map((v,k)=>(
                                <Col key={k} span={12}>
                                    <img className='br5' src={`${link}${v}.png`} width="100%" height="200px" />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    </>
}