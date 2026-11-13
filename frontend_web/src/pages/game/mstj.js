import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { GameLocal, GameName } from 'utils/game';
import { ___gamename } from 'utils/betData';
import { nTom, mTon } from 'utils/tool';
import { Row, Col, Input, Button, Form } from 'antd';
import { 
    _numbers,
    _input_vals,
    _odds,
    _type_num_val_odd,
    _type
} from 'utils/betTool';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const JdTool = lazy(() => import('components/Game/bet/JdTool'));
const JdTable = lazy(() => import('components/Game/bet/JdTable'));
// 
export default props => 
{
    const DATA = useSelector((state) => state.models);
    const { GameBetVal } = DATA;
    // 
    const dispatch = useDispatch();
    let location = useLocation();
    // 
    const { match } = props;
    const [ form ] = Form.useForm();
    // 
    useEffect(() => {
        dispatch.models.SET({
            GameBetVal: ''
        })
    }, []);
    // 
    const { category, type } = GameLocal(location.pathname);
    // 
    const _name = 'Lottery'+category+''+type;
    const Lottery = DATA&&DATA[_name];
    // 
    const peroids = location.peroids || Lottery&&Lottery[1][0];
    // 
    const _t_t = _type[type] || type;
    const _table = _type_num_val_odd[_t_t];
    const _tables = {..._table[0],..._table[1]};
    // 
    const _title = <>{t("添加 -")} <b>{GameName(category, type)}</b> {t("投注模式")}</>;
    //
    const goBet = (num, _sum) =>
    {
        if(num<=0)
        {
            dispatch.models.SET({M:{c:t("请至少选择一注！")}});
            return;
        }
        dispatch.models.SET({
            M:{
                t: _title,
                c: <div className="jlist">
                    <div style={{padding:'10px 0'}}>
                        <Form form={form}>
                            <Form.Item name="name" noStyle>
                                <Input placeholder={t("请输入模式名称，最多只会保存10个字符，选填")} />
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="list">
                        <Row gutter={[10,10]} justify="center">
                            {GameBetVal&&Object.keys(GameBetVal).map(k=>(<Col key={k} flex="100px"><Button block>
                                <p>{___gamename(k)}</p>
                                <p>{nTom(GameBetVal[k])}</p>
                            </Button></Col>))}
                        </Row>
                    </div>
                    <h4>{t("共")} <b>{num}</b> {t("注，合计")} <b>{nTom(_sum)}</b> {t("豆")}</h4>
                </div>,
                bt: t("确定添加"),
                b: () => {
                    const name = form.getFieldValue('name')||'';
                    SEND('game/msadd',{
                        game: category+''+type,
                        category,
                        type,
                        name,
                        vals: GameBetVal
                    })
                }
            }
        })
    }
    // 
    const SetGbv = (r) =>
    {
        dispatch.models.SET({GameBetVal:r})
    }
    // 
    return <div className="br5 bf p10">
        <div className="bf1 br5 tc p5 mb10">
            {_title}
        </div>
        <JdTool 
            peroids={peroids} 
            _type={_t_t} 
            _tables={_tables} 
            _title={_title} 
            SetGbv={SetGbv} 
            btntxt={t("保存模式")} 
            goBet={goBet}
        />
        <JdTable _type={_t_t} _table={_table} _tables={_tables} SetGbv={SetGbv} />
    </div>
}