import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { FC, lazy } from 'react';
import { App } from '../components/app';
import { Menu } from '../components/menu';
import Lazy from '../pages/lazy';
import { Wallet } from '../pages/wallet';
import { PutMoneyWallet } from '../pages/put-money-wallet';

const MySubscriptions = lazy(() => import('../pages/my-subscriptions').then((m) => ({ default: m.MySubscriptions })));
const MySubscription = lazy(() => import('../pages/my-subscription').then((m) => ({ default: m.MySubscription })));
const Tariffs = lazy(() => import('../pages/tariffs').then((m) => ({ default: m.Tariffs })));
const Instruction = lazy(() => import('../pages/instruction').then((m) => ({ default: m.Instruction })));
const AppStore = lazy(() => import('../pages/app-store').then((m) => ({ default: m.AppStore })));
const Languages = lazy(() => import('../pages/languages').then((m) => ({ default: m.Languages })));
const Login = lazy(() => import('../pages/login').then((m) => ({ default: m.Login })));
const LoginByLink = lazy(() => import('../pages/login-by-link').then((m) => ({ default: m.LoginByLink })));
const ExtendKey = lazy(() => import('../pages/extend-key').then((m) => ({ default: m.ExtendKey })));
const Exchange = lazy(() => import('../pages/exchange').then((m) => ({ default: m.Exchange })));

const router = createBrowserRouter([
    {
        element: (
            <App>
                <Outlet />
            </App>
        ),
        children: [
            {
                path: '*',
                element: <Menu />,
            },
            {
                path: 'my-subscriptions',
                element: (
                    <Lazy>
                        <MySubscriptions />
                    </Lazy>
                ),
            },
            {
                path: 'my-subscriptions/:id',
                element: (
                    <Lazy>
                        <MySubscription />
                    </Lazy>
                ),
            },
            {
                path: 'tariffs',
                element: (
                    <Lazy>
                        <Tariffs />
                    </Lazy>
                ),
            },
            {
                path: 'put-money-wallet',
                element: <PutMoneyWallet />,
            },
            {
                path: 'wallet',
                element: <Wallet />,
            },
            {
                path: 'instruction',
                element: (
                    <Lazy>
                        <Instruction />
                    </Lazy>
                ),
            },
            {
                path: 'app-store',
                element: (
                    <Lazy>
                        <AppStore />,
                    </Lazy>
                ),
            },
            {
                path: 'language',
                element: (
                    <Lazy>
                        <Languages />
                    </Lazy>
                ),
            },
            {
                path: 'login',
                element: (
                    <Lazy>
                        <Login />
                    </Lazy>
                ),
            },
            {
                path: 'login-by-link',
                element: (
                    <Lazy>
                        <LoginByLink />
                    </Lazy>
                ),
            },
            {
                path: 'extend-key/:keyId',
                element: (
                    <Lazy>
                        <ExtendKey />
                    </Lazy>
                ),
            },
            {
                path: 'exchange',
                element: (
                    <Lazy>
                        <Exchange />
                    </Lazy>
                ),
            },
        ],
    },
]);

const AppRouter: FC = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
