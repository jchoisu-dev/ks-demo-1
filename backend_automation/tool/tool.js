// 两个数之间的随机数
const twoNumberRandom = async(min, max) =>
{
    return min + Math.floor(Math.random() * (max - min + 1));
}
// 随机顺序
const randSort = async(arr) => 
{
    for(var i = 0,len = arr.length;i < len; i++ )
    {
        var rand = parseInt(Math.random()*len);
        var temp = arr[rand];
        arr[rand] = arr[i];
        arr[i] = temp;
    }
    return arr;
}
// 
const nTom = (n) =>
{
    n = n+'';
    if(n==0) return '0';
    return n.replace(/(\d)(?=(\d{3})+$)/g, ($1) => 
    {
        return $1 + ",";
    });
}
// 
const getFirstFiveLetters = (word) => 
{
    return (word.substring(0, 2) + '*****').padEnd(5, ' '); // Or use word.slice(0, 5);
}
// 
const getRandomAmount = (min, max) => 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// 
module.exports = 
{
    twoNumberRandom,
    randSort,
    nTom,
    getFirstFiveLetters,
    getRandomAmount
};