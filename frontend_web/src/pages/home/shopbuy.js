import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Form, Input, Button, Steps, Divider } from 'antd';
import { nTom ,mTon } from 'utils/tool';
import { SEND } from 'store';
// 
const Main = lazy(() => import('components/Home/Main'));
const Table = lazy(() => import('components/Table'));
import PhoneCode from 'components/Tool/PhoneCode';
import { t } from 'i18n';
// 
const arr = [
    100,
    500,
    1000,
    2000,
    5000,
    10000,
    20000,
    50000
];
const _gz = [
    [ t("幸运28、蛋蛋28、台湾28、加拿大28"), 21 ],
    [ t("幸运22、PK22"), 15 ],
    [ t("幸运16、蛋蛋16、台湾16、PK冠亚和、加拿大16"), 11 ],
    [ t("幸运11、蛋蛋11、台湾11、加拿大11"), 8 ],
    [ t("幸运10、PK10、PK冠军"), 7 ],
    [ t("幸运36、蛋蛋36、台湾36、加拿大36"), 3 ],
    [ t("PK赛车、PK龙虎"), 0 ]
];
// 
const _steps = [
    { title:t("存入银行"), description:t("将金豆进入银行") },
    { title:t("进入商城"), description:t("选择充值卡") },
    { title:t("兑换卡密"), description:t("银行金豆兑换卡密") },
    { title:t("代理回收"), description:t("复制卡密给代理回收") }
]
// 
export default () => 
{
    const { ShopLoading, ShopTip, ShopBuy } = useSelector((state) => state.models);
    const [ form ] = Form.useForm();
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let params = useParams();
    // 
    if(!arr.find(v=>v==params.money)) navigate('/shop');
    let money = parseInt(params.money);
    // 
    const onValuesChange = ({money}) => showMoney(money);
    const add = () => showMoney(mTon(form.getFieldsValue('money').money)+money);
    const cut = () => showMoney(mTon(form.getFieldsValue('money').money)-money);
    // 
    const showMoney = (_m) => 
    {
        _m = mTon(_m);
        form.setFieldsValue({
            money: nTom(mTon(_m))
        })
    }
    // 
    useEffect(() => {
        dispatch.models.SET({
            ShopLoading:'',
            ShopBuy:'',
            ShopTip: '',
            Shop: '',
            PhoneCodeLoading:'',
            PhoneCodeStatus:''
        })
    }, []);
    useEffect(() => {
        if(!ShopTip) return;
        // 
        let M = {
            t: t("兑换卡密"),
            c: <div className="kmp tl">
                <p>{t("兑换卡密：")}<span><b>{nTom(ShopTip.money)}</b> {t("元")}</span></p>
                <p>{t("兑换流水：")}<span>{nTom(ShopTip.ls)} {t("豆")}</span></p>
                <p>{t("当前充值：")}<span>{nTom(ShopTip.charge_dou)} {t("豆")}</span></p>
                <p>{t("充前余额：")}<span>{nTom(ShopTip.last)} {t("豆")}</span></p>
                <p>{t("兑换状态：")}<span>{ShopTip.tip}</span></p>
                <p>{t("需手续费：")}<span><b>{nTom(ShopTip.rate)}</b> %</span></p>
                <p>{t("卡密金豆：")}<span><b>{nTom(ShopTip.dou)}</b> {t("豆")}</span></p>
                <p>{t("兑换费率：")}<span><b>{nTom(ShopTip.douodd)}</b> {t("豆")}</span></p>
                <p>{t("金豆合计：")}<span><b>{nTom(ShopTip.dousum)}</b> {t("豆")}</span></p>
                <p>{t("银行金豆：")}<span>{nTom(ShopTip.bank)} {t("豆")}</span></p>
            </div>,
            bc: () => dispatch.models.SET({ShopTip:'',M:''}),
        };
        if(parseInt(ShopTip.bank)>parseInt(ShopTip.dousum))
        {
            M = { 
                ...M, 
                bt:t("确定兑换"),
                b: () => {
                    SEND('shop/code',{code:ShopTip.code});
                }
            }
        }
        // 
        dispatch.models.SET({ M });
    }, [ShopTip]);
    // 
    useEffect(() => {
        if(!ShopBuy) return;
        dispatch.models.SET({
            M:{
                t: t("兑换卡密 - 安全验证"),
                c: <PhoneCode phone={ShopBuy.phone} phoneCodeReturn={ShopReturn}  />,
                bc: () => dispatch.models.SET({ShopBuy:'',M:''})
            }
        })
    }, [ShopBuy]);
    // 
    const ShopReturn = (values) => 
    {
        dispatch.models.SET({ PhoneCodeLoading:true });
        SEND('shop/exchange',{
            pode: ShopBuy.code,
            ...values
        })
    };
    // 
    const onFinish = (values) => 
    {
        dispatch.models.SET({ ShopLoading:true,ShopTip:'',ShopBuy:'',PhoneCodeLoading:'',PhoneCodeStatus:'' });
        SEND('shop/check', {
            money: mTon(values.money)
        })
    };
    // 
    let vipcol = [];
    for(let i=1;i<8;i++) vipcol.push(['vip'+i]);
    const betcol = [
        [ t("游戏名称") ],
        [ t("单局投注数") ]
    ];
    const _ds = {color:'#eee',fontSize:'14px',fontWeight:400,marginTop:28,borderColor:'#666',padding:'0 2px'};
    // 
    return <Main>
        <div className="block w p24 br10 bx">
            <div className="title tc">
                {t("卡密兑换")}
            </div>
            <div className="br5 bf p24 mb24">
                <Steps current={2} items={_steps} />
            </div>
            <Divider style={_ds}>{t("自定义卡密金额")}</Divider>
            <div className="boe br5 ov" style={{margin:'22px 0 26px'}}>
                <div style={{marginBottom:-1}}>
                    <Table 
                        columns={[[t("无流水")],[t("流水小于1倍")],[t("流水小于2倍")],[t("流水小于3倍")],[t("流水大于3倍"),(v)=><b>{v[4]}</b>],[t("单日兑换5次以上")]]} 
                        data={[1,[['5%','3%','2%','1%',t("免手续费"),'1%']]]}
                    />
                </div>
            </div>
            <Row gutter={24}>
                <Col span="8">
                    <div className="br5 bf tc" style={{padding:'53px 23px'}}>
                        <img src={'https://pub-422b9064da464b71b9364a92bf3ec848.r2.dev/v1/shop/dh/'+money+'.png'} width="100%" />
                    </div>
                </Col>
                <Col span="16">
                    <div className="br5 bf tc aigaw mb24" style={{padding:'20px 0'}}>
                        <div style={{paddingTop:35,width:420,margin:'0 auto'}}>
                            <Form
                                form={form}
                                initialValues={{
                                    money: nTom(money)
                                }}
                                onValuesChange={onValuesChange}
                                onFinish={onFinish}
                            >
                                <Form.Item 
                                    name="money" 
                                >
                                    <Input 
                                        addonBefore={<Button onClick={()=>add()}><span style={{fontSize:20,marginTop:-4}}>+</span></Button>}
                                        addonAfter={<Button onClick={()=>cut()}><span style={{fontSize:20,marginTop:-4}}>-</span></Button>}
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button 
                                        type="primary" 
                                        htmlType="submit"
                                        size="large"
                                        loading={ShopLoading}
                                        block
                                    >
                                        {t("兑 换 (元)")}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <div className="bf br5" style={{padding:'15px 20px'}}>
                        <div style={{fontWeight:'blod',fontSize:16,marginBottom:10}}>{t("兑换说明：")}</div>
                        {t("1、兑换费率 = 兑换流水")} {">"} {t("( ( 当前充值 + 充前金额 )  * 倍数 )")}<br />
                        {t("2、充值后，兑换流水重置为 0")}<br />
                        {t("3、充值前，若存在金豆余额以及银行金豆，会保留为充前金额")}
                    </div>
                </Col>
            </Row>
            <Divider style={_ds}>{t("有效流水规则")}</Divider>
            <div className="boe br5 ov" style={{marginTop:24}}>
                <div style={{marginBottom:-1}}>
                    <Table 
                        columns={betcol} 
                        data={[[1,1],[
                            [t("蛋蛋28、台湾28、加拿大28"), t("小于或等于 21 个号码")],
                            ['PK22', t("小于或等于 15 个号码")],
                            [t("蛋蛋16、台湾16、PK冠亚和、加拿大16"), t("小于或等于 11 个号码")],
                            [t("蛋蛋11、台湾11、加拿大11"), t("小于或等于 8 个号码")],
                            [t("K10、PK冠军"), t("小于或等于 7 个号码")],
                            [t("蛋蛋36、台湾36、加拿大36"), t("小于或等于 3 个号码")],
                            [t("PK赛车、PK龙虎"), t("任意投注，均算流水")],
                        ]]}
                    />
                </div>
            </div>
        </div>
    </Main>
}