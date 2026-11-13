import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Button, Pagination } from 'antd';
import { GameLocal } from 'utils/game';
import { SEND } from 'store';
// 
import BlockLoading from 'components/Loading/BlockLoading';
// 
export default props => 
{
    const DATA = useSelector((state) => state.models);
    // 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();
    // 
    const { re, val } = props;
    const loca = GameLocal(location.pathname);
    const { category, type } = loca;
    // 
    const GameZdms = DATA&&DATA['GameZdms'+category+''+type];
    //
    useEffect(() => 
    {
        SEND('game/zdmsget',{ 
            game: category+''+type, 
            category, 
            type,
            val
        });
    }, []);
    // 
    return <div className="jlist">
        <BlockLoading loading={!GameZdms} m={'20px 0'}>
            <div className="list">
                <Row gutter={[10,10]} justify="center">
                    {GameZdms&&GameZdms[1].map((v,k)=>(<Col key={k} span="6">
                        <Button 
                            block
                            onClick={()=>re(v)}
                        >
                            <p style={{padding:'8px 0'}}>{v[1]}</p>
                        </Button>
                    </Col>))}
                </Row>
            </div>
            <div className="pagination tc" style={{padding:'12px 0 8px'}}>
                <Pagination 
                    current={GameZdms&&GameZdms[0][0]||1} 
                    total={GameZdms&&GameZdms[0][1]||1} 
                    pageSize={20} 
                    onChange={(page)=>SEND('game/zdmsget',{ game:category+''+type,category,type,page,val })}
                    showQuickJumper={false}
                    showSizeChanger={false}
                />
            </div>
        </BlockLoading>
    </div>
}