import { Carousel } from 'antd';
// 
const items = [
    1,
    2,
    3,
    4
];
// 
export default () => 
{
    return <div className='wa'>
        <Carousel autoplay>
            {items.map((v,k)=>(
                <div key={k}>
                    <img src={`https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/slider/${v}.jpg`} width="100%" height={400} />
                </div>
            ))}
        </Carousel>
    </div>
    
}