import { Row, Col } from 'antd';
// 
export default props => 
{
    return <div className="w">
        <div className="auth bf p24 mbt24 br10">
            <Row justify="center" align="middle" gutter={50} wrap={false}>
                <Col flex="520px">
                    <div className="p24">
                        <div style={{padding:'0 0 3px 10px'}}>
                            {props.children}
                        </div>
                    </div>
                </Col>
                <Col flex="auto">
                    <div className="tc">
                        <img src={props.img} />
                    </div>
                </Col>
            </Row>
        </div>
    </div>
}