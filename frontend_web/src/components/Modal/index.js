import { useNavigate } from "react-router-dom";
import { Button, Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { t } from 'i18n';
// 
export default () => 
{
    const { M } = useSelector((state) => state.models);
    //
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 
    if(!M) return <></>;
    const { b, bl, bt, bc, c, t: mt, bcn, boo } = M;
    // 
    const onOk = () => 
    {
        if(boo&&boo.u){
            navigate('/'+boo.u);
            dispatch.models.SET({M:''});
            return;
        }
        dispatch.models.SET({
            M:{...M,bl:true}
        });
        b()
    }
    //
    return <div className="modal">
        <div className="block">
            <div className="main tc">
                <div className="mlogo"></div>
                <div className="mb10" style={{marginTop:-10}}>
                    <Divider style={{fontSize:15,fontWeight:300,color:'#666'}}>{!mt?t("温馨提示"):t(mt)}</Divider>
                </div>
                <div className="con">
                    {typeof c==='string'?t(c):c}
                </div>
                <Divider />
                {!bcn&&<Button onClick={()=>bc&&bc()||dispatch.models.SET({M:''})}>{t("关闭")}</Button>}
                {b?<Button 
                    style={{marginLeft:(!bcn?30:0)}}
                    loading={bl} 
                    type="primary"
                    onClick={()=>onOk()}
                >
                    {bt?t(bt):t("确定")}
                </Button>:''}
            </div>
        </div>
    </div>
}