import { useEffect } from 'react';
import { useAppAction, useAppSelector } from '../store';
import { callAction, px } from '../api/px.connect.ts';
import { WalletHelper } from '../pages/put-money-wallet/helper.ts';
import { Envs } from '../config/envs/envs.ts';
import { EventsEnum } from '../types/events/events.enum.ts';
import { CurrencyPriceType } from '../pages/put-money-wallet/types/currency-price.type.ts';
import { useNavigate } from 'react-router-dom';
import type { AppStateType, UserType } from '../store/app/types/app-state.type.ts';

export const useLoadUser = () => {
    const { setStateApp } = useAppAction();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.app.user);

    useEffect(() => {
        let handler: NodeJS.Timeout | undefined;

        const updateInfo = async (userId: string) => {
            const [currencyResponse, userResponse] = await Promise.all([
                callAction<CurrencyPriceType>(EventsEnum.GET_CURRENCY),
                callAction<UserType>(EventsEnum.GET_USER_INF, userId),
            ]);

            if (currencyResponse) WalletHelper.setCurrencyPrice(currencyResponse);
            if (userResponse) setStateApp({ user: userResponse });

            handler = setTimeout(() => updateInfo(userId), 10 * 1000);
        };

        if (user) updateInfo(user.id);

        return () => clearTimeout(handler);
    }, [user?.id]);

    useEffect(() => {
        px.on('connect', async () => {
            px.join(Envs.pxChannelId);

            const stateString = localStorage.getItem('state') || '{}';
            const state = JSON.parse(stateString) as AppStateType;
            if (!state?.lang) state.lang = navigator.language.slice(0, 2);

            setStateApp(state);

            if (!state?.user) navigate('/login');
        });

        px.connect();

        return () => {
            void px.disconnect();
        };
    }, []);
};
