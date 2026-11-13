import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Divider } from 'antd';
import { nTom } from 'utils/tool';
import { CategoryTypes, GameName } from 'utils/game';
import { SEND } from 'store';
import { useNavigate  } from "react-router-dom";
import { t } from 'i18n';
// 
export default () => 
{
    const { Userhome } = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auth);
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();    
    // 
    const _role = Auth&&Auth.role || 1;
    // 
    const _info = [
        [ t("我的　ID"),t("我的昵称"),t("我的等级") ],
        [ t("账号类型"),t("上次登录"),t("上次　IP") ]
    ];
    const _data = {
        1: [
            [t("我的金豆"), { '/agents':t("充值"), '/shop': t("兑换") } ],
            [t("我的银行"), { '/user/wdyh':t("存豆"), '/user/wdyh': t("取豆") } ],
            [t("今日推广"), { '/user/yqhy':t("详情") } ],
            [t("今日投注"), { '/user/tzjl':t("详情") } ],
            [t("有效流水"), { '/user/tzjl':t("详情") } ],
            [t("今日盈亏"), { '/user/jdmx':t("详情") } ],
        ],
        2: [
            [t("代理金豆"), { 'agent/jdmx':t("详情") } ],
            [t("上分折扣"), { 'agent/jdmx':t("详情") } ],
            [t("下分折扣"), { 'agent/jdmx':t("详情") } ],
            [t("最高上分"), { 'agent/jdmx':t("详情") } ],
            [t("推广人数"), { 'user/yqhy':t("详情") } ],
            [t("佣金返利"), { 'user/tgfl':t("领取") } ],
        ]
    };
    const _user_type = {1:t("会员"),2:t("代理")};
    const _info_change = (kk,k,n) => 
    {
        if(kk==1&&k==0) return <b>{_user_type[n]||'-'}</b>;
        if(kk==0&&k==2) return <b>Lv. {n}</b>;
        return n;
    }
    // 
    useEffect(() => SEND('user/home'), []);
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("我的信息")}
        </div>
        <div className="info boe br5 tl" style={{padding:'15px 0'}}>
            <Row align="middle">
                <Col flex="200px">
                    <div className="tc">
                        <img src="https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/logos.png" height="80" />
                    </div>
                </Col>
                {_info.map((vv,kk)=>(
                    <Col flex="auto" key={kk}>
                        <div className={'info-'+kk}>
                            {vv.map((v,k)=>(
                                <p key={k}>
                                    <span className="fwl">{v}:</span>
                                    {_info_change(kk,k,Userhome&&Userhome[0]&&Userhome[0][kk][k])}
                                </p>
                            ))}
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
        <div className="tit" n="WO DE SHUJU">
            {t("我的数据")}
        </div>
        <Row align="middle" gutter={[25,25]}>
            {_data[_role].map((v,k)=>(
                <Col span="8" key={k}>
                    <div className="boe p10 br5 tc" style={{padding:'18px 10px 10px'}}>
                        <h4 className="fwl">{v[0]}</h4>
                        <h3 style={{padding:'0 0 4px',fontSize:18}}>
                            {Userhome&&Userhome[1]&&nTom(Userhome[1][k])}
                        </h3>
                        <Divider dashed style={{margin:'10px 0'}} />
                        <Row align="middle" justify="center" gutter={[25,25]}>
                            {Object.keys(v[1]).map(k=>(
                                <Col span="8" key={k}>
                                    <b onClick={()=>navigate(k)}>{v[1][k]}</b>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
            ))}
        </Row>
    </>
}