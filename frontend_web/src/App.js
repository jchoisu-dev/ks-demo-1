import { useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// 
import 'App.scss';
//
import Routes from 'config/routes';
import PageLoading from 'components/Loading';
import Modal from 'components/Modal';
// 
import { asfetch } from 'utils/asfetch';
//  
export default () =>
{
  const { Auth, AuthDel, A } = useSelector((state) => state.models);
  // 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 
  useEffect(async()=>{
    let {url, sign, key} = await asfetch();
    // 
    let wss = new WebSocket('wss://'+url+'/w'+sign);
    wss.binaryType = 'arraybuffer';
    wss.ikey = key;
    dispatch.models.SET({
      wss: wss
    })
  },[])
  // 
  useEffect(() => {
    if(!Auth) return;
    dispatch.auths.AUT({ ...Auth });
  }, [Auth]);
  //
  useEffect(() => {
      if(!AuthDel) return;
      dispatch.auths.DEL();
      window.location.assign(`/`);
  }, [AuthDel]);
  // 
  useEffect(() => {
      if(!A||!A.u) return;
      navigate('/'+A.u);
      dispatch.models.SET({A:''})
  }, [A]);
  // 
  return <>
    <Suspense fallback={<PageLoading />}>
      <Routes />
    </Suspense>
    <Modal />
  </>
}