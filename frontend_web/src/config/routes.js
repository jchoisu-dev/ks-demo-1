import { lazy } from 'react';
import { useRoutes } from "react-router-dom";
// 
import AuthorizationRoute from "components/Authorization";
// 
const Main = lazy(() => import('components/Layout/mains'));
const Home = lazy(() => import('pages/home'));
const News = lazy(() => import('pages/home/news'));
const Promo = lazy(() => import('pages/home/promo'));
const Rank = lazy(() => import('pages/home/rank'));
const Shop = lazy(() => import('pages/home/shop'));
const ShopBuy = lazy(() => import('pages/home/shopbuy'));
const Vip = lazy(() => import('pages/home/vip'));
const About = lazy(() => import('pages/home/about'));
const Agents = lazy(() => import('pages/home/agents'));
const Dlhz = lazy(() => import('pages/home/dlhz'));
// 
const User = lazy(() => import('components/Layout/users'));
const UserHome = lazy(() => import('pages/user/home'));
const UserWdzl = lazy(() => import('pages/user/wdzl'));
const UserWdkm = lazy(() => import('pages/user/wdkm'));
const UserJdmx = lazy(() => import('pages/user/jdmx'));
const UserTjzl = lazy(() => import('pages/user/tzjl'));
const UserWdyh = lazy(() => import('pages/user/wdyh'));
const UserHdfl = lazy(() => import('pages/user/hdfl'));
const UserPhbjl = lazy(() => import('pages/user/phbjl'));
const UserWdhb = lazy(() => import('pages/user/wdhb'));
const UserJyhd = lazy(() => import('pages/user/jyhd'));
const UserYgz = lazy(() => import('pages/user/ygz'));
const UserMrqd = lazy(() => import('pages/user/mrqd'));
const UserYqhy = lazy(() => import('pages/user/yqhy'));
const UserMmxg = lazy(() => import('pages/user/mmxg'));
const UserRzjl = lazy(() => import('pages/user/rzjl'));
// 
const Dlcz = lazy(() => import('pages/agent/dlcz'));
const Hskm = lazy(() => import('pages/agent/hskm'));
const Edzy = lazy(() => import('pages/agent/edzy'));
const Zhsj = lazy(() => import('pages/agent/zhsj'));
const Tjxx = lazy(() => import('pages/agent/tjxx'));
const Jdmx = lazy(() => import('pages/agent/jdmx'));
const Dltx = lazy(() => import('pages/agent/dltx'));
// 
const Game = lazy(() => import('components/Game/Main'));
const Jg = lazy(() => import('pages/game/jg'));
const Jl = lazy(() => import('pages/game/jl'));
const Gz = lazy(() => import('pages/game/gz'));
const Ms = lazy(() => import('pages/game/ms'));
const Mstj = lazy(() => import('pages/game/mstj'));
const Zd = lazy(() => import('pages/game/zd'));
const Zs = lazy(() => import('pages/game/zst'));
const Yc = lazy(() => import('pages/game/yc'));
const Bet = lazy(() => import('pages/game/bet'));
const Pksc = lazy(() => import('pages/game/betpksc'));
// 
const Q28 = lazy(() => import('pages/game/q28'));
const Q214 = lazy(() => import('pages/game/q214'));
//
const Login = lazy(() => import('pages/auth/dl'));
const Register = lazy(() => import('pages/auth/zc'));
const Wjmm = lazy(() => import('pages/auth/wjmm'));
// 
const ErrorPage = lazy(() => import('pages/error'));
// 
export default () =>
{
  const routes = useRoutes([{
      path: "/",
      element: <Main />,
      children:[
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/index",
          element: <Home />
        },
        {
          path: "/news",
          element: <News />
        },
        {
          path: "/promo",
          element: <Promo />
        },
        {
          path: "/rank",
          element: <Rank />
        },
        {
          path: '/shop',
          element: <AuthorizationRoute>
            <Shop />
          </AuthorizationRoute>,
        },
        {
          path: '/shop/:money',
          element: <AuthorizationRoute>
            <ShopBuy />
          </AuthorizationRoute>,
        },
        {
          path: '/vip',
          element: <Vip />,
        },
        {
          path: '/agents',
          element: <Agents />,
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/dlhz',
          element: <Dlhz />,
        },
        {
          path: '/dl',
          element: <Login />,
        },
        {
          path: '/zc',
          element: <Register />,
        },
        {
          path: '/zc/:parent',
          element: <Register />,
        },
        {
          path: '/wjmm',
          element: <Wjmm />,
        },
        {
          path: "/user",
          element: <AuthorizationRoute>
            <User /> 
          </AuthorizationRoute>,
          children:[
            {
              path: '/user',
              element: <UserHome />,
            },
            {
              path: '/user/home',
              element: <UserHome />,
            },
            {
              path: '/user/wdzl',
              element: <UserWdzl />,
            },
            {
              path: '/user/wdkm',
              element: <UserWdkm />,
            },
            {
              path: '/user/jdmx',
              element: <UserJdmx />,
            },
            {
              path: '/user/tzjl',
              element: <UserTjzl />,
            },
            {
              path: '/user/wdyh',
              element: <UserWdyh />,
            },
            {
              path: '/user/hdfl',
              element: <UserHdfl />,
            },
            {
              path: '/user/phbjl',
              element: <UserPhbjl />,
            },
            {
              path: '/user/wdhb',
              element: <UserWdhb />,
            },
            {
              path: '/user/jyhd',
              element: <UserJyhd />,
            },
            {
              path: '/user/ygz',
              element: <UserYgz />,
            },
            {
              path: '/user/mrqd',
              element: <UserMrqd />,
            },
            {
              path: '/user/yqhy',
              element: <UserYqhy />,
            },
            {
              path: '/user/mmxg',
              element: <UserMmxg />,
            },
            {
              path: '/user/rzjl',
              element: <UserRzjl />,
            },
          ]
        },
        {
          path: "/agent",
          element: <AuthorizationRoute>
            <User /> 
          </AuthorizationRoute>,
          children:[
            {
              path: '/agent/dlcz',
              element: <Dlcz />,
            },
            {
              path: '/agent/hskm',
              element: <Hskm />,
            },
            {
              path: '/agent/edzy',
              element: <Edzy />,
            },
            {
              path: '/agent/zhsj',
              element: <Zhsj />,
            },
            {
              path: '/agent/tjxx',
              element: <Tjxx />,
            },
            {
              path: '/agent/jdmx',
              element: <Jdmx />,
            },
            {
              path: '/agent/dltx',
              element: <Dltx />,
            }
          ]
        },
        {
          path: "/game",
          element: <AuthorizationRoute>
            <Game />
          </AuthorizationRoute>,
          children:[
            {
              path: "/game",
              element: <Jg /> 
            },
            {
              path: "/game/q214",
              element: <Q214 /> 
            },
            {
              path: "/game/q214/:game",
              element: <Q214 /> 
            },
            {
              path: "/game/q28",
              element: <Q28 /> 
            },
            {
              path: "/game/q28/:game",
              element: <Q28 /> 
            },
            {
              path: "/game/:category",
              element: <Jg /> 
            },
            {
              path: "/game/:category/:game",
              element: <Jg /> 
            },
            {
              path: "/game/:category/:game/jg",
              element: <Jg /> 
            },
            {
              path: "/game/pk/sc/bet/:peroids",
              element: <Pksc /> 
            },
            {
              path: "/game/:category/:game/bet/:peroids",
              element: <Bet /> 
            },
            // 
            {
              path: "/game/:category/:game/jl",
              element: <Jl /> 
            },
            {
              path: "/game/:category/:game/gz",
              element: <Gz /> 
            },
            {
              path: "/game/:category/:game/ms",
              element: <Ms /> 
            },
            {
              path: "/game/:category/:game/ms/tj",
              element: <Mstj /> 
            },
            {
              path: "/game/:category/:game/zd",
              element: <Zd /> 
            },
            {
              path: "/game/:category/:game/zs",
              element: <Zs /> 
            },
            {
              path: "/game/:category/:game/yc",
              element: <Yc /> 
            }
          ]
        }
      ]
    },
    // {
    //   path: "*",
    //   element: <ErrorPage />
    // },
  ]);
  return routes
}