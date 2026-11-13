//
import { useModel, dynamic } from 'umi';
import { SyncOutlined } from '@ant-design/icons';
//
const BlockLoading = props => 
{
    const { children, m } = props;
    const { BLL, BLM } = useModel('data');
    // 
    if(BLM) return <div style={{padding:m||30}}>
        <center>
            {BLM}
        </center>
    </div>;
    // 
    if(BLL) return <div style={{padding:m||30}}>
        <center>
            <SyncOutlined spin style={{color:"#df4133",fontSize:35,opacity:.7}} />
        </center>
    </div>;
    // 
    return <>{ children }</>;
}

export default BlockLoading;