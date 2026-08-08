import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import type { FC } from 'react';
import { App } from '../components/app';
import { MainPage } from '../pages/main';
import { MySubscriptions } from '../pages/my-subscriptions';
import { PutMoneyWallet } from '../pages/put-money-wallet';
import { Wallet } from '../pages/wallet';
import { Instruction } from '../pages/instruction';
import { Tariffs } from '../pages/tariffs';
import { AppStore } from '../pages/app-store';
import { Languages } from '../pages/languages';
import { Login } from '../pages/login';
import { LoginByLink } from '../pages/login-by-link';

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
                element: <MainPage />,
            },
            {
                path: 'my-subscriptions',
                element: <MySubscriptions />,
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
        ],
    },
]);

const AppRouter: FC = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
