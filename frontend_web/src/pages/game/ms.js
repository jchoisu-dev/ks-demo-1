import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button } from 'antd';
import { GameLocal, GameName } from 'utils/game';
import { nTom } from 'utils/tool';
import { ___gamename } from 'utils/betData';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
//
export default () => 
{
    const DATA = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();
    // 
    const loca = GameLocal(location.pathname);
    const { category, type } = loca;
    const _name = 'GameMs'+category+''+type;
    const GameMs = DATA&&DATA[_name];
    // // 获取
    useEffect(() => 
    {
        SEND('game/ms',{ game: category+''+type, category, type });
    }, [category+''+type]);
    // 
    const show = (name, num, sum, list) =>
    {
        dispatch.models.SET({
            M:{
                t: name,
                c: <div className="jlist">
                    <div className="list">
                        <Row gutter={[10,10]} justify="center">
                            {list&&Object.keys(list).map(k=>(<Col key={k} flex="100px"><Button block>
                                <p>{___gamename(k)}</p>
                                <p>{nTom(list[k])}</p>
                            </Button></Col>))}
                        </Row>
                    </div>
                    <h4>{t("共")} <b>{num}</b> {t("注，合计")} <b>{nTom(sum)}</b> {t("豆")}</h4>
                </div>
            }
        })
    }
    // 
    const columns = [
        [ t("时间"), (v)=>v[3] ],
        [ t("模式名称"), (v)=>v[0] ],
        [ t("投注数"), (v)=>v[1] ],
        [ t("合计金豆"), (v)=>nTom(v[2]) ],
        [ t("详情"), (v)=><Button size="small" onClick={()=>show(v[0],v[1],v[2],v[4])}>{t("查看")}</Button> ],
        [ t("操作"), (v)=><Button size="small" onClick={()=>SEND('game/msdel',{ game: category+''+type, category, type, _id:v[5] })}>{t("删除")}</Button> ],
    ];
    return <div className="br5">
        <div className="table_search">
            {GameName(category, type)} {t("- 投注模式")}
        </div>
        <div className="table_search">
            <Button 
                type="primary"
                onClick={()=>navigate('/game/'+category+'/'+type+'/ms/tj')}
            >{t("添加模式")}</Button>
        </div>
        <Table 
            tableClass={'hover'}
            columns={columns} 
            data={ GameMs||[] }
            pageChange={ (page)=>SEND('game/ms',{ game: category+''+type, category, type, page }) }
        />
    </div>
}