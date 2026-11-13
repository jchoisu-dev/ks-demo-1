import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { SEND } from 'store';
// 
const Main = lazy(() => import('components/Home/Main'));
const Table = lazy(() => import('components/Table'));
import BlockLoading from'components/Loading/BlockLoading';
import { t } from 'i18n';
//
const ContentShow = () => 
{
    const { NewContent } = useSelector((state) => state.models);
    // 
    return <BlockLoading loading={!NewContent}>
        <div className="conx tl" dangerouslySetInnerHTML={{__html:NewContent[2]||''}} />
    </BlockLoading>
}
// 
export default () => 
{
    const { NewList } = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auths);
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 
    useEffect(() => {
        dispatch.models.SET({
            NewContent:''
        })
        SEND('home/news');
    }, []);
    // 
    let _list = [];
    for(let i=10;i>0;i--) {
        _list.push([i,'-','-']);
    }
    // 
    const showContent = (v) => 
    {
        if(Object.keys(Auth).length == 0){
            navigate('/dl')
            dispatch.models.SET({
                M:{c:t("您需要登录才可以查看该页面")}
            })
            return;
        }
        // 
        dispatch.models.SET({
            NewContent:''
        })
        SEND('home/news_get',{_id:v[3]});
        dispatch.models.SET({
            M:{
                t: t("新闻内容"),
                c: <div className="newscon">
                    <h3>{v[1]}</h3>
                    <h6>{v[2]}</h6>
                    <ContentShow />
                </div>,
                bc: () => dispatch.models.SET({
                    NewContent:'',
                    M:''
                })
            }
        })
    }
    // 
    return <div style={{paddingBottom:16}}>
        <div>
            <img 
                src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/bg/xw.jpeg" 
                width="100%"
                height="100%"
            />
        </div>
        <div className="w br10">
            <div className="w1000 br10 bx" style={{marginTop:16}}>
                <div className="br5">
                    <Table 
                        tableClass={'hover nb'}
                        columns={[
                            [ t("序号") ],
                            [ t("标题"),v=><div className='cu' onClick={()=>showContent(v)}>{v[1]}</div> ],
                            [ t("时间") ]
                        ]} 
                        data={ [[], NewList||_list] }
                    />
                </div>
            </div>
        </div>
    </div>
}