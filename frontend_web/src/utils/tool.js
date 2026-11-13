// 金额转数字
const mTon = (n) =>
{
  n = n+'';
  n = n.replace(/,/gi, '');
  n = parseInt(n)
  return !n ? '' : n;
}
// 数字转金额
const nTom = (n) =>
{
    n = n+'';
    if(n==0) return '0';
    return n.replace(/(\d)(?=(\d{3})+$)/g, ($1) => 
    {
        return $1 + ",";
    });
}
// 百分比
const percent = (num, total) =>
{
    if (num == 0 || total == 0) return 0;
    return (Math.round(num / total * 10000) / 100.00);
}
//
const parseVal = (val) =>
{
  if(val==0) return 0;
  while (val.charAt(0) == '0')
    val = val.substring(1, val.length);
  return val;
}
//
const toDecimal2NoZero = (x,d=1) =>
{
  let num = { 1:10, 2:100, 3:1000 };
  let f = Math.round(x * num[d]) / num[d];
  let s = f.toString();
  return s;
}
//
const formStatus = (status, i) => 
{
    let _t = status&&status[i];
    if(!_t || !_t.s) return;
    const r = {
      hasFeedback: true,
      validateStatus: _t.s
    };
    if(_t.h) r['help'] = _t.h;
    return r;
}
//
const formFieldChange = (SET, status, i) => 
{
    if(status&&status[i])
    {
        delete status[i];
        let _s = { status };
        SET({ ..._s });
    }
}
// 取尾数
const strLastOne = (str) =>
{
  str = str + '';
  let spstr = str.split('');
  return spstr[spstr.length - 1];
};
// 
const math_abs = (e) => 
{
    const _e = Math.abs(parseInt(e));
    if(_e) return _e;
    return '';
};
// 
export {
    nTom,
    mTon,
    percent,
    parseVal,
    toDecimal2NoZero,
    formStatus,
    formFieldChange,
    strLastOne,
    math_abs
}