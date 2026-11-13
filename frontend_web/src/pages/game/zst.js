import { lazy, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { GameLocal, GameName } from 'utils/game';
import { Checkbox } from 'antd';
import { _jgTxt } from 'utils/betData';
import { _listShowAdd } from 'utils/gamejg';
import { SEND } from 'store'
import { t } from 'i18n';
// 
const BlockLoading = lazy(() => import('components/Loading/BlockLoading'));
const Number = lazy(() => import('components/Game/zst/number'));
const G36 = lazy(() => import('components/Game/zst/g36'));
const Glh = lazy(() => import('components/Game/zst/glh'));
const Gsc = lazy(() => import('components/Game/zst/gsc'));
// 
export default props => 
{
    const DATA = useSelector((state) => state.models);
    const { gameZstNum } = DATA;
    // 
    const dispatch = useDispatch();
    let location = useLocation();
    // 
    const num = gameZstNum || 100;
    // 
    const loca = GameLocal(location.pathname);
    const category = loca.category;
    const type = loca.type;
    const gameZst = DATA&&DATA['gameZst'+category+''+type];
    const gameLottery = DATA&&DATA['Lottery'+category+''+type];
    // 
    const _num_checkbox = [100,200,300,400,500];
    // 
    const getContent = (_num) => 
    {
        SEND('game/zst', {
            game: category+''+type,
            category,
            type,
            num: parseInt(_num)/100
        });
    }
    useEffect(() => { 
        getContent(100); 
        dispatch.models.SET({
            gameZstNum: 100
        })
    }, []);
    // 
    useEffect(() => 
    { 
        if(gameLottery&&gameZst&&gameZst[0][0]<gameLottery[0][0])
        {
            let _d = [
                gameLottery[0][0],
                '-',
                gameLottery[0][2],
            ];
            if(type=='sc')
            {
                _d = [
                    gameLottery[0][0],
                    '-',
                    gameLottery[0][3],
                    gameLottery[0][2]
                ];
            }
            gameZst.unshift(_d);
            gameZst.pop();
            dispatch.models.SET({
                gameZst: [...gameZst]
            })
        }
     }, [gameLottery]);
    // 
    const onChangeNum = (v) => {
        getContent(v);
        dispatch.models.SET({
            gameZstNum: parseInt(v)
        })
    }
    // 
    const _show = (type) => 
    {
        switch(type)
        {
            case '36': return <G36 gameZstNum={num} gameZst={gameZst} loca={loca} />;
            case 'lh': return <Glh gameZstNum={num} gameZst={gameZst} loca={loca} />;
            case 'sc': return <Gsc gameZstNum={num} gameZst={gameZst} loca={loca} />;
            default: return <Number gameZstNum={num} gameZst={gameZst} loca={loca} />
        }
    }
    // 
    const style = {minHeight:100,background:'#fffefb',borderLeft:'1px solid #eae0ca',borderRight:'1px solid #eae0ca'};
    // 
    return <div className="br5">
        <div className="table_search bgab nob">
            {GameName(category, type)} {t("- 走势图")} 
            <ul style={{paddingTop:10}}>
                <li className="checkbox">
                    {_num_checkbox.map((v)=>(
                        <Checkbox checked={num==v} name={v} onChange={()=>onChangeNum(v)}>{v}{t("强")}</Checkbox>
                    ))}
                </li>
            </ul>
        </div>
        <div style={!gameZst?style:{}}>
            <BlockLoading loading={!gameZst} m={'40px 0 0'}>
                <div className={"table zst"} id="table-zst">
                    { _show(type) }
                </div>
            </BlockLoading>
        </div>
        <div className="table-dsc bf tc">
            {t("固定系列与群系列为固定赔率，其余为浮动赔率")}
        </div>
    </div>
}