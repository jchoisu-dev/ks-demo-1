import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Row, Col, Tag, DatePicker, Select, Spin, ConfigProvider } from 'antd';
import { nTom, mTon } from 'utils/tool';
import { ___gamename } from 'utils/betData';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const { TextArea } = Input;
// 
const Table = lazy(() => import('components/Table'));
// 
const { RangePicker } = DatePicker;
// 
export default () => 
{
    const { kmlist, kmsum, kmelist, checklist, checkLoading, AgentCardLoading, AgentCardList, AgentCardReload } = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auths);
    // 
    const dispatch = useDispatch();
    // 
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    // 
    const _agent_dou = Auth&&Auth.dou||0;
    // 
    const getD = (v) => 
    {
        if(v&&v['time'])
        {
            v['time_start'] = v['time'][0].format('YYYY-MM-DD HH:mm');
            v['time_end'] = v['time'][1].format('YYYY-MM-DD HH:mm');
            delete v['time'];
        }
        SEND('agent_card/list',v);
    }
    useEffect(() => getD(), []);
    // 
    const qc = {
        kmlist: '',
        kmsum: '',
        kmelist: '',
        AgentCardLoading:'',
        AgentCardReload:'',
        checklist: ''
    };
    useEffect(() => {
        dispatch.models.SET(qc)
        form.resetFields();
        SEND('agent_card/list')
    }, []);
    // 
    useEffect(() => {
        if(!AgentCardReload) return;
        SEND('agent_card/list');
        form.resetFields();
        dispatch.models.SET(qc);
    }, [AgentCardReload]);
    // 
    const onFinish = (v) => 
    {
        if(!kmlist||kmlist.length<=0)
        {
            dispatch.models.SET({
                M:{c:t("请至少录入 1 张卡密！")}
            })
            return;
        }
        dispatch.models.SET({AgentCardLoading:true});
        SEND('agent_card/go', { 
            list: kmlist
        });
    }
    //
    const onFormChange = (v) => 
    {
        const vals = v.km;
        let lists = vals.match(/([\d]{3,8})\-([0-9a-zA-z]{20})/gm);
        let _data = { kmlist:'', kmelist:'', kmsum:'' };
        if(lists && lists.length>0)
        {
            lists = [...new Set(lists)];
            let sum = 0;
            lists.map((v,k)=>{
                if(v)
                {
                    let _sv = v.split('-');
                    if(_sv && _sv[0] && _sv.length==2)
                    {
                        let _mv = parseInt(_sv[0]);
                        sum = sum+_mv;
                    }
                }
            });
            _data = { checklist: lists, kmlist: lists, kmelist:'', kmsum:sum };
        }
        //
        SEND('agent_card/check', { checklist: lists });
        dispatch.models.SET({..._data, checkLoading:1});
    };
    //
    const zk = (e) => 
    {
        if(e==10) return '-';
        return <>{e} {t("折")}</>
    }
    const columns = [
        [ t("时间") ],
        [ t("用户ID") ],
        [ t("收款人") ],
        [ t("卡密"),(v)=><>{v[3]}</> ],
        [ t("折扣"),(v)=>zk(v[4]) ],
        [ t("得到金豆"),(v)=><><b>{nTom(v[5])}</b> {t("豆")}</> ]
    ];
    //
    return <>
        <div className="tit" n="WO DE XINXI">
            {t("卡密回收")}
        </div>
        <div className="boe br5 ov">
            <Row align="middle">
                <Col span="16">
                    <div className="agent_form p24" style={{borderRight:'1px solid #e8e2d0',marginRight:-1}}>
                        <div style={{margin:'5px 0 26px'}} className="txtba">
                            <span b={t("余额")} a={t("豆")}><b>{nTom(_agent_dou)}</b></span>
                            <span b={t("收卡")}><b>{Auth&&Auth.down_rate||'-'}</b></span>
                        </div>
                        <Form
                            form={form}
                            onFinish={onFinish}
                            onValuesChange={(v)=>onFormChange(v)}
                        >
                            <Form.Item 
                                name="km"
                            >
                                <TextArea placeholder={t("粘贴卡密")} autoSize={{ minRows: 4 }} />
                            </Form.Item>
                            <Form.Item>
                                <div className="txtba">
                                    <span b={t("共")} a={t("张")}><b>{kmlist&&nTom(kmlist.length)||0}</b></span>
                                    <span b={t("合计")} a={t("元")}><b>{kmlist&&nTom(kmsum)||0}</b></span>
                                </div>
                            </Form.Item>
                            <Form.Item noStyle={true}>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    size="large"
                                    style={{width:220}}
                                    loading={AgentCardLoading}
                                >
                                    {t("确定回收")}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
                <Col span="8">
                    <div className="p24 kmlist" style={{borderLeft:'1px solid #e8e2d0'}}>
                        {checkLoading ? 
                            <div className='tc'><Spin size="large" /></div> :
                            <>
                                {kmlist&&kmlist.map((v,k)=>(
                                    <p key={k}><Tag color="#87d068" icon={<CheckCircleOutlined />}>{v}</Tag></p>
                                ))}
                                {kmelist&&kmelist.map((v,k)=>(
                                    <p key={k}><Tag color="#f50" icon={<CloseCircleOutlined />}>{v}</Tag></p>
                                ))}
                            </>
                        }
                    </div>
                </Col>
            </Row>
        </div>
        <div className="tit" n="WO DE XINXI">
            {t("回收记录")}
        </div>
        <div className="mb16">
            <Form
                form={form1}
                onFinish={(v)=>getD(v)}
            >
                <Row gutter="16" justify="center">
                    <Col flex="220px">
                        <Form.Item name="_user_id" noStyle>
                            <Input addonBefore={t("用户ID")} />
                        </Form.Item>
                    </Col>
                    <Col flex="380px">
                        <Form.Item name="time" noStyle>
                            <RangePicker
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                            />
                        </Form.Item>
                    </Col>
                    <Col flex="150px">
                        <Form.Item noStyle>
                            <Button type="primary" htmlType="submit" block loading={AgentCardLoading}>{t("搜索")}</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={columns} 
                data={ AgentCardList||[] }
                // pageChange={ page=>{SEND('agent_card/list', { page }) }}
                pageChange={ page => getD({page, ...form1.getFieldValue() })}
            />
        </div>
    </>
}