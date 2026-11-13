import { useState, useEffect } from 'react';
import { useModel, dynamic } from 'umi';
import { nTom } from '@/utils/tool';
import { Button, Row, Col, Input, Divider, Form } from 'antd';
import { _opennums } from '@/utils/krnum';
import { getGameType } from '@/utils/gameTool';
import { ___gamename, CategoryTypes, GameName } from '@/utils/game';
import { object } from 'webidl-conversions';

const BlockLoading = dynamic({ loader: () => import('@/components/Loading/BlockLoading')});
const categorys = {
    jnd: '加拿大 - pk',
    jnc: '加拿大西部',
    ddbj: '台湾冰果 - 台湾蛋蛋',
    elg: '俄勒冈',
    slfk: '斯洛伐克',
    au: '澳洲',
    kr: '韩国',
    btc: '比特币'
}

export default props =>
{
    const { SEND, SET  } = useModel('data');
    // 
    const Inputlottery = () => 
    {
        const [form] = Form.useForm();
        // 
        const onFieldsChange = (v) => 
        {
            // console.log(v);
        }
        // 
        return <div className="aigaw">
            <Form form={form} onFieldsChange={onFieldsChange}>
                <Form.Item name="lottery">
                    <Input placeholder="复制开奖号码到这里，使用空格隔开" allowClear />
                </Form.Item>
            </Form>
        </div>
    }
    // 
    const Con = () => 
    {
        let { MdopenCategory } = useModel('data');
        // 
        MdopenCategory = MdopenCategory || 'jnd';
        // 
        return <>
            <div className="sgbj">
                <Row gutter="15">
                    {CategoryTypes&&Object.keys(categorys).map(key=>(
                        <Col key={key}>
                            <Button 
                                type={key==MdopenCategory?'primary':''}
                                onClick={()=>{SET({MdopenCategory:key})}}
                            >
                                {categorys[key]}
                            </Button>
                        </Col>
                    ))}
                </Row>
            </div>
            <Divider />
                <Inputlottery />
            <Divider />
            <Button 
                type='primary'
                size="large"
            >
                确定补奖
            </Button>
        </>
    }
    // 
    return <div
        onClick={()=>
        {
            SET({
                BLL: 1,
                M:{
                    t: '手工补奖',
                    c: <Con />
                }
            })
        }}
    >
        补奖
    </div>
}