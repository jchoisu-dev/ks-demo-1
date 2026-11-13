import { Button, Row, Col, Segmented } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { nTom } from 'utils/tool';
import { SEND } from 'store';
import { RedoOutlined } from '@ant-design/icons';
import { t, lang, setLang } from 'i18n';
// 
export default () => 
{
    const { UserGetDouLoading } = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auths);
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 
    const UserReDou = () => {
        if(UserGetDouLoading) return <small style={{marginLeft:8}}>{t("获取中...")}</small>
        return <RedoOutlined onClick={()=>{
            SEND('user/dou');
            dispatch.models.SET({UserGetDouLoading:1})
        }} />
    }
    // 
    const goLogout = async() => 
    {
        dispatch.auths.DEL();
        dispatch.models.SET({
            LoginUser:'',
            LoginToken:'',
            LoginPhone:'',
            PhoneCode: '',
            PhoneCodeSendTime: 0,
            PhoneCodeToken: '',
            Logout: '',
            Auth: ''
        })
        window.location.assign(`/`)
    }
    const UserMode = (e) => 
    {
        switch(e)
        {
            case 1: return <Row align='middle' gutter={15}>
                <Col>
                    <span n="s">{t("昵称：")}</span>{Auth&&Auth.nick}
                </Col>
                <Col>
                    <span n="s">ID：</span>{Auth&&Auth.id}
                </Col>
                <Col>
                    <span n="s">{t("经验：")}</span>{Auth&&Auth.exp&&nTom(Auth.exp)||0}
                </Col>
                <Col>
                    <span n="s">{t("金豆：")}</span>{Auth&&nTom(Auth.dou)||0}
                </Col>
                <Col>
                    <UserReDou />
                </Col>
                <Col>
                    <Button 
                        size="small" 
                        onClick={()=>goLogout()}
                        type='primary'
                    >
                        {t("退出")}
                    </Button>  
                </Col>
            </Row>
            case 2: return <Row gutter={15} align='middle'>
                <Col>
                    <span n="s">{t("昵称：")}</span>{Auth&&Auth.nick}
                </Col>
                <Col>
                    <span n="s">{t("代理ID：")}</span>{Auth&&Auth.id}
                </Col>
                <Col>
                    <span n="s">{t("代理金豆：")}</span>{Auth&&nTom(Auth.dou)||0} 
                </Col>
                <Col>
                    <UserReDou />
                </Col>
                <Col>
                    <Button 
                        size="small" 
                        onClick={()=>goLogout()}
                        type='primary'
                    >
                        {t("退出")}
                    </Button>
                </Col>        
            </Row>
            default: return <Row gutter={10} justify='end'>
                <Col>
                    <Link to="/zc">
                        <Button size="small">{t("注册")}</Button>
                    </Link>
                </Col>
                <Col>
                    <Link to="/dl">
                        <Button size="small" type="primary">{t("登录")}</Button>
                    </Link>
                </Col>
            </Row>
        }
    }
    // 
    return<Row justify='space-between' align='middle'>
        <Col>
            <Row gutter={10} align='middle'>
                {/* <Col>
                    <Button 
                        size="small"
                        onClick={()=>navigate('../m')}
                    >
                        {t("手机版")}
                    </Button>
                </Col> */}
                <Col>
                    <Segmented
                        size="small"
                        value={lang}
                        onChange={(v)=>setLang(v)}
                        options={[{ label: '中文', value: 'zh' }, { label: 'EN', value: 'en' }]}
                    />
                </Col>
            </Row>
        </Col>
        <Col>
            { UserMode(Auth&&Auth.role) }
        </Col>
    </Row>
}