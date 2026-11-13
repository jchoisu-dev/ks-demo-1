import { get } from '@/utils/storage';
//
// 信息
export async function getInitialState() 
{
    // let SN = await asfetch();
    // let SN = '';
    let Auth = await get() || {};
    // console.log(Auth);
    return { Auth };
}

// 标题
// export async function onRouteChange({ matchedRoutes })
// {
//     if (matchedRoutes.length) 
//     {
//         document.title = matchedRoutes[matchedRoutes.length - 1].route.title+' - 盛大国际' || '';
//     }
// }