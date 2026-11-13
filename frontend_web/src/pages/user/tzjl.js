import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Form, Input, Cascader } from 'antd';
import { CategoryTypes, GameName } from 'utils/game';
import { nTom } from 'utils/tool';
import { ___gamename } from 'utils/betData';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const Table = lazy(() => import('components/Table'));
// 
export default () => 
{
    const { Usertzjl, UserTzjlLoading  } = useSelector((state) => state.models);
    const [ form ] = Form.useForm();
    // 
    const dispatch = useDispatch();
    // 
    const getD = (v) => 
    {
        dispatch.models.SET({
            UserTzjlLoading:1
        })
        SEND('user_tzjl/list', v);
    }
    // 
    useEffect(() => getD(), []);
    // 
    const wk = (a,b,s) => 
    {
        if(s<=1) return '-';
        if(b>a) return <b>+ {nTom(b-a)}</b>;
        return nTom(b-a)
    }
    const status = {
        1: t("投注中"),
        2: <b>{t("中奖")}</b>,
        3: t("未中")
    }
    const mode = {
        1: t("手动"),
        2: <b>{t("自动")}</b>,
    }
    const ls = {
        1:t("是"),
        2:<b>{t("否")}</b>
    }
    // 
    const _gamelist = [];
    for(let i in CategoryTypes)
    {
        const _cti = CategoryTypes[i];
        let children = [];
        for(let j in _cti)
        {
            children.push({
                value: _cti[j],
                label: GameName(i,_cti[j])
            })
        }
        _gamelist.push({
            value: i,
            label: GameName(i,''),
            children
        })
    }
    // 
    const _win_lose = (a,b) => 
    {
        if(a>b) return '-'+nTom(a-b);
        if(a<b) return '+'+nTom(b-a);
        return 0;
    }
    // 
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("投注记录")}
        </div>
        <div className="tc" style={{padding:'2px 0 20px'}}>
            <Form
                form={form}
                onFinish={(v)=>getD(v)}
            >
                <Row gutter="16">
                    <Col flex="auto"></Col>
                    <Col flex="220px">
                        <Form.Item name="game" noStyle>
                            <Cascader options={_gamelist} placeholder={t("游戏类型")} style={{ width:'100%' }} />
                        </Form.Item>
                    </Col>
                    <Col flex="200px">
                        <Form.Item name="peroids" noStyle>
                            <Input addonBefore={t("期数")} />
                        </Form.Item>
                    </Col>
                    <Col flex="150px">
                        <Form.Item noStyle>
                            <Button type="primary" htmlType="submit" block loading={UserTzjlLoading}>{t("搜索")}</Button>
                        </Form.Item>
                    </Col>
                    <Col flex="auto"></Col>
                </Row>
            </Form>
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={[
                    [ t("投注时间") ],
                    [ t("游戏"), (v)=>GameName(v[1], v[2]) ],
                    [ t("期号"), (v)=>v[3] ],
                    [ t("模式"), (v)=>mode[v[4]] ],
                    [ t("投注额"), (v)=>nTom(v[5]) ],
                    [ t("中奖"), (v)=>v[6]&&nTom(v[6])||'-' ],
                    [ t("盈亏"), (v)=>wk(v[5],v[6],v[7]) ],
                    [ t("流水"), (v)=>ls[v[9]] ],
                    [ t("详情"), (v)=><Button size="small" onClick={()=>{
                        dispatch.models.SET({
                            M:{
                                t: <>{GameName(v[1], v[2])} {t("第")} <b>{v[3]}</b> {t("期 - 投注详情")}</>,
                                c: <div className="jlist">
                                    <div className="list">
                                        <Row gutter={[10,10]} justify="center">
                                            {Object.keys(v[8]).map(key=>(
                                                <Col key={key} flex="100px">
                                                    <Button type={v[8][key][1]!=='-'&&"primary"} block>
                                                        <p>{___gamename(key)}</p>
                                                        <p>{nTom(v[8][key][0])}</p>
                                                        <p>{v[8][key][1]}</p>
                                                        <p>{nTom(v[8][key][2])}</p>
                                                        <p>{_win_lose(v[8][key][0],v[8][key][2])}</p >
                                                        {v[8][key][3]&&<p>{ t("牛 ") + (v[8][key][3][0]+' - '+v[8][key][3][1]) + t(" 庄") ||'-' }</p >}
                                                    </Button>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                    <h4 style={{paddingTop:10}}>
                                        {t("共")} <b>{Object.keys(v[8]).length}</b> {t("注，投注")} <b>{nTom(v[5])}</b> {t("豆，盈亏")} {wk(v[5],v[6],v[7])} {t("豆")}
                                    </h4>
                                </div>
                            }
                        })
                    }}>{t("查看")}</Button> ]
                ]} 
                data={ Usertzjl||[] }
                pageChange={ page => getD({page}) }
            />
        </div>
    </>
}