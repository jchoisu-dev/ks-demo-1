import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Input, Button, Checkbox } from 'antd';
import { useLocation } from "react-router-dom";
import { GameLocal } from 'utils/game';
import { nTom, mTon, math_abs } from 'utils/tool';
import { _input_vals } from 'utils/betTool';
import { _tool, _tool_bs, _sh, _odds, _type_num_val_odd } from 'utils/betTool';
import { ___gamename } from 'utils/betData';
import { t } from 'i18n';
// 
export default props => 
{
    let { _table, _tables, _type, odd } = props;
    // 
    let location = useLocation();
    const dispatch = useDispatch();
    // 
    const { type } = GameLocal(location.pathname);
    // 
    const SetGbv = (r) =>
    {
        dispatch.models.SET({ GameBetVal:r });
    }
    // 
    const { GameBetVal, GameBetValed } = useSelector((state) => state.models);
    // 
    let _gv = GameBetVal || {};
    // 选择
    const selectNum = (k) => 
    {
        if(_gv[k])
        {
            delete _gv[k];
        }else{
            _gv[k] = _tables[k][1];
        }
        SetGbv(_gv);
    }
    // 倍数
    const oddNum = (k,odd) => 
    {
        if(!_gv[k] || _gv[k]=='0')
        {
            _gv[k] = _tables[k][1];
        }
        _gv[k] = parseInt(mTon(_gv[k])*odd)+'';
        SetGbv(_gv);
    };
    // 输入框
    const inputChange = (val, key) => 
    {
        _gv[key] = math_abs(mTon(val));
        SetGbv(_gv);
    }
    const edshow = (e) => 
    {
        if(!GameBetValed||!GameBetValed[e]) return '-';
        return <b>{nTom(GameBetValed[e])}</b>
    }
    // 
    const oddshow = (vv,k) => 
    {
        if(type=='28gd'&&odd)
        {
            return odd[k];
        }
        return vv[k][0].toFixed(2);
    }
    // 
    return <div className="game_table" style={{paddingTop:11}}>
        <Row gutter={10}>
            {_table.map((vv,kk)=>(
                <Col key={kk} span={12}>
                    <div className="boe br5">
                        <div className="table" style={{marginBottom:-1}}>
                            <table className="hover">
                                <thead>
                                    <tr>
                                        <th>{t("号码")}</th>
                                        <th>{t("赔率")}</th>
                                        <th>{t("已投注")}</th>
                                        <th width="45"></th>
                                        <th width="150">{t("投注")}</th>
                                        <th width="148">{t("倍数")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(vv).map(k=>(
                                        <tr key={k}>
                                            <td onClick={()=>selectNum(k)}>
                                                <span className="ball cu">{___gamename(k)}</span>
                                            </td>
                                            <td>
                                                <small>{oddshow(vv,k)}</small>
                                            </td>
                                            <td>
                                                {edshow(k)}
                                            </td>
                                            <td onClick={()=>selectNum(k)}>
                                                <Checkbox checked={GameBetVal&&(GameBetVal[k]||GameBetVal[k]==0)} />
                                            </td>
                                            <td>
                                                <Input 
                                                    value={GameBetVal&&GameBetVal[k]&&nTom(GameBetVal[k])} 
                                                    onChange={e=>inputChange(e.target.value,k)}
                                                />
                                            </td>
                                            <td>
                                                <Button onClick={()=>oddNum(k,0.5)} size="small">{t(".5倍")}</Button>
                                                <Button onClick={()=>oddNum(k,2)} size="small" style={{margin:'0 5px'}}>{t("2倍")}</Button>
                                                <Button onClick={()=>oddNum(k,10)} size="small">{t("10倍")}</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    </div>
}