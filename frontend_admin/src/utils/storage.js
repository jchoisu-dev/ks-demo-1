// 
const n = 'sd28_admin';
// 
const set = async(d) =>
{
   return localStorage.setItem(n, JSON.stringify(d));
}
// 
const del = async() =>
{
    return localStorage.removeItem(n);
}
// 
const get = async() =>
{
    const _d = localStorage.getItem(n);
    if(!_d || _d===undefined || _d===null) return '';
    return JSON.parse(_d);
}
// 
export {
    set,
    del,
    get
}