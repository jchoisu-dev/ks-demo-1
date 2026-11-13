import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
// 
export default () =>
{
    const navigate = useNavigate();
    // 
    return <div className='error'>
        <div>
            <h1>404</h1>
            <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" />
            <div>
                <h3>Look like you're lost</h3>
                <p>the page you are looking for is not available!</p>
                <Button onClick={()=>{navigate('/')}}>
                    Go to Home
                </Button>
            </div>
        </div>
    </div>
}