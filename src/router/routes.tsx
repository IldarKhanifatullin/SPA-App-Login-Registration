import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Main from '../pages/Main';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import Catalogue from "../pages/Catalogue";
import Goods from "../pages/Goods";
import Item from '../pages/Item';
import Basket from "../pages/Basket";
import Order from "../pages/Order";
import NotAuthorized from "../pages/NotAuthorized";
import NotFound from "../pages/NotFound";

export const PATHS = {
    ROOT: '/',
    MAIN: '/main',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    SEARCH: '/search',
    CATALOGUE: '/catalogue',
    GOODS: '/goods',
    GOODS_ITEM: '/goods/:id',
    BASKET: '/basket',
    ORDER: '/order',
    NOT_AUTHORIZED: '/NotAuthorized',
    NOT_FOUND: '*'
} as const;

export const privateRoutes: RouteObject[] = [
    {
        path: PATHS.ROOT,
        element: <Navigate to={PATHS.MAIN} replace />
    },
    {
        path: PATHS.MAIN,
        element: <Main />
    },
    {
        path: PATHS.LOGIN,
        element: <Navigate to={PATHS.MAIN} replace />
    },
    {
        path: PATHS.REGISTRATION,
        element: <Navigate to={PATHS.MAIN} replace />
    },
    {
        path: PATHS.PROFILE,
        element: <Profile />
    },
    {
        path: PATHS.SEARCH,
        element: <Search />
    },
    {
        path: PATHS.CATALOGUE,
        element: <Catalogue />
    },
    {
        path: PATHS.GOODS,
        element: <Goods />
    },
    {
        path: PATHS.GOODS_ITEM,
        element: <Item />
    },
    {
        path: PATHS.BASKET,
        element: <Basket />
    },
    {
        path: PATHS.ORDER,
        element: <Order />
    },
    {
        path: PATHS.NOT_AUTHORIZED,
        element: <Navigate to={PATHS.MAIN} replace />
    },
    {
        path: PATHS.NOT_FOUND,
        element: <NotFound />
    }
];

export const publicRoutes: RouteObject[] = [
    {
        path: PATHS.ROOT,
        element: <Navigate to={PATHS.LOGIN} replace />
    },
    {
        path: PATHS.MAIN,
        element: <Navigate to={PATHS.LOGIN} replace />
    },
    {
        path: PATHS.LOGIN,
        element: <Login />
    },
    {
        path: PATHS.REGISTRATION,
        element: <Registration />
    },
    {
        path: PATHS.PROFILE,
        element: <Navigate to={PATHS.NOT_AUTHORIZED} replace />
    },
    {
        path: PATHS.SEARCH,
        element: <Navigate to={PATHS.NOT_AUTHORIZED} replace />
    },
    {
        path: PATHS.CATALOGUE,
        element: <Navigate to={PATHS.NOT_AUTHORIZED} replace />
    },
    {
        path: PATHS.GOODS,
        element: <Navigate to={PATHS.NOT_AUTHORIZED} replace />
    },
    {
        path: PATHS.GOODS_ITEM,
        element: <Navigate to={PATHS.NOT_AUTHORIZED} replace />
    },
    {
        path: PATHS.BASKET,
        element: <Navigate to={PATHS.NOT_AUTHORIZED} replace />
    },
    {
        path: PATHS.ORDER,
        element: <Navigate to={PATHS.NOT_AUTHORIZED} replace />
    },
    {
        path: PATHS.NOT_AUTHORIZED,
        element: <NotAuthorized />
    },
    {
        path: PATHS.NOT_FOUND,
        element: <NotFound />
    }
];