import { useEffect }  from 'react';
import { useNavigate } from "react-router-dom";
// 
import { useSelector, useDispatch } from 'react-redux';
import { t } from 'i18n';
// 
export default ({ children }) => 
{
    const Auth = useSelector((state) => state.auths);
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 
    if (!Object.keys(Auth).length == 0) return children; 
    // 
    useEffect(()=>{
        navigate('/dl');
        dispatch.models.SET({
            M:{c:t("您需要登录才可以查看该页面")}
        })
    },[]);
    //
    return <></>;
};