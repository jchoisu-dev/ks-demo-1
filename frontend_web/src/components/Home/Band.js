import { Row, Col } from 'antd';
// 
const _link = [
    1,
    2,
    3,
    4
];
// 
export default () => 
{
    return <div className='mb16'>
        <Row gutter={16} align="middle">
            {_link.map((v,k)=>(
                <Col span={6} key={k}>
                    <img src={`https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/home/brand/${v}.png`} />
                </Col>
            ))}
        </Row>
    </div>
}