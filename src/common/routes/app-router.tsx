import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import type { FC } from 'react';
import { App } from '../components/app';
import { MainPage } from '../pages/main';
import { MyKeys } from '../pages/my-keys';
import { PutMoneyWallet } from '../pages/put-money-wallet';
import { Wallet } from '../pages/wallet';

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
        ],
    },
]);

const AppRouter: FC = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
