import { t } from 'i18n';
// 投注工具
const betTools = 
[
    [
        t("组合玩法"), // 标题
        ['dan','shuang','da','xiao','dashuang','dadan','xiaodan','xiaoshuang','jida','jixiao'], // 代号
    ],
    [
        t("猜数字"),
        ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27'],
    ],
    [
        t("特殊玩法"),
        ['bao','dui','shun','ban','za'],
    ],
]
const betPkTools = 
[
    [
        t("冠亚和"),
        ['dan','shuang','da','xiao','long','hu',3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
    ],
    [
        '',
        ['dan','shuang','da','xiao','long','hu',1,2,3,4,5,6,7,8,9,10],
    ],
    [
        '',
        ['dan','shuang','da','xiao','','',1,2,3,4,5,6,7,8,9,10],
    ]
];
const betDes = {}
//
export {
    betTools,
    betPkTools,
    betDes
} 