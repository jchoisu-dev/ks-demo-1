import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Row, Col, Button } from 'antd';
import { GameLocal } from 'utils/game';
import { ___gamename } from 'utils/betData';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const BlockLoading = lazy(() => import('components/Loading/BlockLoading'));
const Table = lazy(() => import('components/Table'));
const List = lazy(() => import('components/Game/List'));
//
export default () => 
{
    const DATA = useSelector((state) => state.models);
    // 
    let location = useLocation();
    // 
    const loca = GameLocal(location.pathname);
    const { category, type } = loca;
    // 
    const _name = 'GameYc'+category+''+type;
    const GameYc = DATA&&DATA[_name];
    const Lottery = DATA&&DATA['Lottery'+category+''+type];
    // 更新
    useEffect(() => 
    {
        if(!Lottery) return;
        SEND('game/yc',{
            game: category+''+type,
            category,
            type
        });
    }, [Lottery]);
    // 
    const _txt = {
        'da': t("大"),
        'xiao': t("小"),
        'dan': t("单"),
        'shuang': t("双"),
        'long': t("龙"),
        'hu': t("虎"),
        'bao': t("豹"),
        'shun': t("顺"),
        'dui': t("对"),
        'ban': t("半"),
        'za': t("杂"),
    }
    const _isOn = (e, f) => 
    {
        if(!e) return 'bgr';
        return e.find(v=>v==f) ? 'bgr': 'bg6';
    }
    const winTxt = (e) =>
    {
        if(e=='1') return <b>{t("猜中")}</b>;
        if(e=='2') return t("输了");
        return '-';
    }
    const _yc = (d, e) => 
    {

        return <Row justify="center" align="middle" gutter={10}>
            {d.map((v,k)=>(
                <Col>
                    <span className={'br5 cf tc '+_isOn(e, v)} style={{padding:'4px 6px'}}>{_txt[d[k]]}</span>
                </Col>
            ))}
        </Row>
    }
    // 
    const columns = [
        [ t("期号") ],
        [ t("开奖时间") ],
        [ t("开奖号码"), (v,k) => <List data={k==0?[v[0],v[1],'-','-']:[v[0]||[],v[1],...v[2][0]]} loca={{category:'jnd',type:'28'}} nocheck={1} /> ],
        [ t("预测"), (v) => _yc(v[2][2], v[2][1]) ],
        [ t("结果"), (v) => winTxt(v[2][3]) ],
        [ t("投注"), (v,k) => k==0 ? <Link to={"/game/"+category+'/'+type+'/bet/'+(Lottery&&Lottery[0]&&Lottery[0][0]+1)}><Button size="small" type="primary">{t("立即投注")}</Button></Link> : 
        <Button size="small" disabled>{t("已结束")}</Button> ],
    ];
    // 
    // 
    const style = {minHeight:100,background:'#fffefb',borderLeft:'1px solid #eae0ca',borderRight:'1px solid #eae0ca'};
    // 
    return <div className="br5">
        <div style={!GameYc?style:{}}>
            <BlockLoading loading={!GameYc} m={'45px 0 0'}>
                <Table 
                    tableClass={'hover'}
                    columns={columns} 
                    data={ GameYc&&[[1,1],GameYc]||[] }
                />
            </BlockLoading>
        </div>
        <div className="bf tc" style={{padding:'30px 0',color:'#666'}}>
            {t("固定系列与群系列为固定赔率，其余为浮动赔率")}
        </div>
    </div>
}