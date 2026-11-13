import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { Row, Col } from 'antd';
import { GameLocal, GameName } from 'utils/game';
//
import Janyan from 'components/Game/Janyan';
import { t } from 'i18n';
// 
export default props => 
{
    const { JyShow } = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    let location = useLocation();
    const { category, type } = GameLocal(location.pathname);
    // 
    let { data, nocheck } = props;
    // console.log(data)
    // 
    const numShow = () => 
    {
        if(!data || data[3]<0 ||data[2]=='-') return '';
        if(category=='pk')
        {
            let _is_on = data&&data[2];
            if(type=='10'||type=='gj') _is_on = [ data[3] ];
            return <Col>
                {data&&data[4]&&data[4].map((v,k)=>(
                    <em key={k} className={"fang"+(!!_is_on.find(vv=>vv==v)?' on':'')} n={v}></em>
                ))}
            </Col>
        }
        if(data[2]=='') return '';
        return <>
            {data[2].map((v,k)=>(
                <Col flex="21px" key={k}>
                    <div className={"jgnumb jgnb-"+k}>
                        <em className="num" n={v}></em>
                    </div>
                </Col>
            ))}
            {data[2]&&<Col flex="26px">
                <div className="jgfh l">=</div>
            </Col>}
        </>
    }
    const jsShow = () => 
    {
        if(data[3]=='-' || data[3]<0) return <></>;
        let jg = type=='sc' ? data[2] : [ data[3] ];
        let s = type=='sc' ? ' s' : '';
        // 
        return <div className={"jgs"+s}>
            {jg&&data[3]&&jg.map((v,k)=>(<img key={k} src={'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/game/m/'+v+'.png'} />))}
        </div>
        
    }
    // 
    const jianYan = () =>
    {
        return <div className="jy cu" onClick={()=>dispatch.models.SET({
            M:{
                t: GameName(category, type)+t("，第 ")+data[0]+t(" 期"),
                c: <Janyan data={data} />
            }
        })}>
            {t("检验")}
        </div>
    }
    // 
    return <div className="gamelist">
        <Row justify="center" align='middle'>
            <Col flex="auto">
                <Row justify="center">
                        {numShow()}
                    <Col>
                        {jsShow()}
                    </Col>
                </Row>
            </Col>
            {/* <Col flex="50px">
                {!nocheck&&jianYan()}
            </Col> */}
        </Row>
    </div>
}