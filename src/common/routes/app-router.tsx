import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import type { FC } from 'react';
import { App } from '../components/app';
import { MySubscriptions } from '../pages/my-subscriptions';
import { PutMoneyWallet } from '../pages/put-money-wallet';
import { Wallet } from '../pages/wallet';
import { Instruction } from '../pages/instruction';
import { Tariffs } from '../pages/tariffs';
import { AppStore } from '../pages/app-store';
import { Languages } from '../pages/languages';
import { Login } from '../pages/login';
import { LoginByLink } from '../pages/login-by-link';
import { MySubscription } from '../pages/my-subscription';
import { Menu } from '../components/menu';
import { ExtendKey } from '../pages/extend-key';
import { Exchange } from '../pages/exchange';

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
                element: <MySubscriptions />,
            },
            {
                path: 'my-subscriptions/:id',
                element: <MySubscription />,
            },
            {
                path: 'tariffs',
                element: <Tariffs />,
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
                element: <Instruction />,
            },
            {
                path: 'app-store',
                element: <AppStore />,
            },
            {
                path: 'language',
                element: <Languages />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'login-by-link',
                element: <LoginByLink />,
            },
            {
                path: 'extend-key/:keyId',
                element: <ExtendKey />,
            },
            {
                path: 'exchange',
                element: <Exchange />,
            },
        ],
    },
]);

const AppRouter: FC = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
