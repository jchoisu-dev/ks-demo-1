import { useSelector } from 'react-redux';
import Marquee from "react-fast-marquee";
import { SoundOutlined } from '@ant-design/icons';
import { t } from 'i18n';
// 
export default () => 
{
    const { } = useSelector((state) => state.models);
    // 
    const ma = t("欢迎来到中国宾果彩票！我们为您提供全天候的彩票服务。无论您身在何处，您都可以随时参与我们的游戏。不论是白天还是夜晚，我们始终为您敞开大门，欢迎您的到来！中国宾果彩票是您享受刺激和乐趣的最佳选择。我们提供多种多样的游戏选项，让您有机会赢得丰厚的奖金。无论您是新手还是老手，我们都会为您量身定制游戏体验，确保您的娱乐时间充满乐趣和激情。");
    // 
    return <div className='tips bf mb16 bx'>
        <div className='tip w'>
            <SoundOutlined />
            <Marquee>
                {ma}
            </Marquee>
        </div>
    </div>
}