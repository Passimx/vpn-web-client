import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import type { FC } from 'react';
import { App } from '../components/app';
import { MainPage } from '../pages/main';
import { MyKeys } from '../pages/my-keys';
import { PutMoneyWallet } from '../pages/put-money-wallet';
import { Wallet } from '../pages/wallet';
import { Instruction } from '../pages/instruction';
import { Tariffs } from '../pages/tariffs';
import { AppStore } from '../pages/app-store';

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
                path: 'my-keys',
                element: <MyKeys />,
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
                path: 'tariffs',
                element: <Tariffs />,
            },
            {
                path: 'app-store',
                element: <AppStore />,
            },
        ],
    },
]);

const AppRouter: FC = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
