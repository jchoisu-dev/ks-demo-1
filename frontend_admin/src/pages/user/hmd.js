import { useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { Row, Col, Form, Input, Button } from 'antd';
// 
const Table = dynamic({ loader: () => import('@/components/Table')});
// 
export default () => {
    // 
    const { SET, SEND, UserPhoneBlack, UserPhoneBlackLoading, BlackContent } = useModel('data');
    const [ form ] = Form.useForm();
    const [ form_edit ] = Form.useForm();
    // 
    const getD = (v) => 
    {
        SET({
            UserPhoneBlack: [],
            UserPhoneBlackLoading: true,
            BlackContent: ''
        });
        SEND('user_black/list', v);
    }
    useEffect(()=> {
        getD()
    }, [])
    // 
    const Addform = () => {
        return <div style={{width:600}}>
            <Form form={form_edit}>
                <Form.Item name="phone">
                    <Input 
                        addonBefore="手机号" 
                        placeholder='86xxxxxxxxxxx'
                    />
                </Form.Item>
            </Form>
        </div>
    }
    // 
    useEffect(() => {
        if(!BlackContent) return;
        SET({
            M:{
                t: '编辑新闻内容',
                c: <Addform />,
                bc: () => {
                    SET({
                        M:'',
                        BlackContent:''
                    });
                    form_edit.resetFields();
                },
                b: ()=> {
                    SEND('user_black/edit', {
                        _id: BlackContent.id,
                        ...form_edit.getFieldsValue()
                    });
                }
            }
        });
        form_edit.setFieldsValue({...BlackContent});
    }, [BlackContent]);
    // 
    return <div className="pblock tc bf br5 hv p16">
        <div className="mb16">
            <Form form={form} onFinish={(v)=>getD(v)}>
                <Row gutter="16">
                    <Col flex="220px">
                        <Form.Item name="phone" noStyle>
                            <Input addonBefore="手机" />
                        </Form.Item>
                    </Col>
                    <Col flex="220px">
                        <Form.Item name="_admin_nick" noStyle>
                            <Input addonBefore="昵称" />
                        </Form.Item>
                    </Col>
                    <Col flex="150px">
                        <Form.Item noStyle>
                            <Button 
                                status="primary" 
                                htmlType="submit"
                                block 
                                loading={UserPhoneBlackLoading}
                            >
                                搜索
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col flex='1'>
                        <div style={{float:'right'}}>
                            <Button style={{width:270}} onClick={()=>{
                                SET({
                                    M:{
                                        t: '添加手机号',
                                        c: <Addform />,
                                        bc: () => form_edit.resetFields(),
                                        b: ()=> SEND('user_black/add', form_edit.getFieldsValue())
                                    }
                                });
                                form_edit.resetFields();
                            }}>添加</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
        <div className="boe br5 ov">
            <Table 
                tableClass={'hover'}
                columns={[
                    [ 'ID' ],
                    [ '时间' ],
                    [ '手机' ],
                    [ '操作', v=> <Button size="small" type='primary' onClick={()=>SEND('user_black/get', {_id:v[0]})}>编辑</Button> ],
                    [ '操作人', v=>v[3] ],
                    [ '删除', v=> <Button size="small" onClick={()=>SEND('user_black/del',{_id:v[0]})}>删除</Button> ]
                ]} 
                data={ UserPhoneBlack||[] }
                pageChange={ page => getD({page, ...form.getFieldValue() })}
            />
        </div>
    </div>
}