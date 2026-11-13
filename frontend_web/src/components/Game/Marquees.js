import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { SyncOutlined } from '@ant-design/icons';
import { GameLocal } from 'utils/game';
import { SEND } from 'store';
import { t } from 'i18n';
// 
const _txt = {
    bj:[
        t("台湾 BINGOBINGO 宾果"),
        'https://www.taiwanlottery.com.tw/Lotto/BINGOBINGO/drawing.aspx',
        t("BINGO BINGO宾果宾果之开奖方式采用电脑随机开奖，并于全国电脑型彩卷投注站之电视荧幕播出当期开出奖号。开奖时间: 07:00 — 24:00 开奖频率: 每5分钟开奖一次，一天开奖204期。")
    ],
    dd:[
        t("台湾 BINGOBINGO 蛋蛋"),
        'https://www.taiwanlottery.com.tw/Lotto/BINGOBINGO/drawing.aspx',
        t("BINGO BINGO宾果宾果之开奖方式采用电脑随机开奖，并于全国电脑型彩卷投注站之电视荧幕播出当期开出奖号。开奖时间: 07:00 — 24:00 开奖频率: 每5分钟开奖一次，一天开奖204期。")
    ],
    jnd:[
        t("加拿大快乐8"),
        'https://www.playnow.com/keno/winning-numbers',
        t("BCLC快乐彩经加拿大卑斯省授权由英属哥伦比亚彩票机构发行，由卑斯省博奕管理条例统一控管，并由该机构执行营运与承销。全年不休。开奖时间: 17:00 — 18:00 开奖频率: 每3分半钟开奖一次，一天开奖228期。")
    ],
    jnc:[
        t("加拿大西部快乐8"),
        'http://www.wclc.com/winning-numbers/keno.htm?drawNum',
        t("WCLC由西加拿大亚彩票机构发行，加拿大博奕管理条例统一控管，由并由该机构执行营运与承销。快乐彩全年365天不间断。开奖时间: 19:24 — 14:24 开奖频率: 每5分钟开奖一次，一天开奖179期。")
    ],
    pk:[
        t("加拿大 PK 系列"),
        'https://www.playnow.com/keno/winning-numbers',
        t("采用加拿大KENO开奖号码源，经由SHA256后，得出车手顺序，再进行十进制转换得出数字为时速，最后进行时速排名，即为开奖号码，每3分半钟一期，每天228期")
    ],
    btc:[
        t("比特币快乐8"),
        'https://www.blockchain.com/btc/unconfirmed-transactions',
        t("采用每分钟比特币最新交易数据为准，每一枚开奖交易码都可以进行兑奖查询核对，公开公平公正。开奖时间: 00:00 — 24:00 开奖频率: 每1分钟开奖一次")
    ],
    kr:[
        t("韩国快乐8"),
        '-',
        t("采用北韩福彩中心KR8数据，该开奖号码官网已停止在网络开奖方式，请玩家参考投注站或其它网络资源。开奖时间: 00:00 — 24:00 开奖频率: 每1.5分钟开奖一次")
    ],
    au:[
        t("澳洲快乐8"),
        'https://www.keno.com.au/live-draw',
        t("ACTTAB快乐彩由澳洲首都商业区授权ACTTAB机构来执行营运与承销，澳洲ACTTAB公司成立于1964年，澳大利亚首都直辖的大型彩票公司。开奖时间: 00:00 — 24:00 开奖频率: 每2分钟40秒开奖一次，一天开奖543期。")
    ],
    elg:[
        t("俄勒冈快乐8"),
        'https://www.oregonlottery.org/jackpot/keno',
        t("俄勒冈开奖方式采用电脑随机开奖，并于官网上直播出当期开出奖号，所有开奖流程和结果保证公开、公平和公正。全天不休。开奖时间: 00:00 — 24:00 开奖频率: 每4分钟开奖一次，一天开奖360期。")
    ],
    slfk:[
        t("斯洛伐克keno快乐8"),
        'https://eklubkeno.etipos.sk/Archive.aspx',
        t("斯洛伐克keno快乐8是由斯洛伐克共和国财政部独家授权-TIPOS国家乐彩公司营销。TIPOS国家乐彩公司于1993年开始经营，快乐彩全年不休。开奖时间: 05:00 — 23:50 开奖频率: 每5分钟开奖一次，一天开奖226期。")
    ]
}

export default () => 
{
    const { SoundLoading} = useSelector((state) => state.models);
    const Auth = useSelector((state) => state.auths);
    // 
    const dispatch = useDispatch();
    let location = useLocation();
    // 
    const loca = GameLocal(location.pathname);
    // 
    let __game = loca.category;
    __game = ['q214','q28'].find(v=>v==__game)?loca.type.replace(/[0-9]|\./ig,'') : __game;
    // 
    const sykg = () => 
    {
        if(SoundLoading) return <SyncOutlined spin />;
        return <div 
            className={'sound'+(Auth&&Auth.sound==2?' off':'')} 
            onClick={
                ()=>{SEND('user/setsound');
                dispatch.models.SET({SoundLoading:1})}}
            >
        </div>
    }
    // 
    const _gw = (d) =>
    {
        if(d=='-') return '-';
        return <a target="_blank" href={d}>{t("官方查询")}</a>
    }
    // 
    return <div className="marquees bf br5">
        <div className="marquee">
            <marquee>{_txt[__game][2]}</marquee>
        </div>
        <div className="sj">{_txt[__game][0]}</div>
        <div className="gw">{_gw(_txt[__game][1])}</div>
        <div className="sy">{sykg()}</div>
    </div>
}