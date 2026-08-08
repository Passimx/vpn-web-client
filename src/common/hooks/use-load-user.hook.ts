import { useEffect } from 'react';
import { useAppAction, useAppSelector } from '../store';
import { callAction, px } from '../api/ws.ts';
import { WalletHelper } from '../pages/put-money-wallet/helper.ts';
import { Envs } from '../config/envs/envs.ts';
import { EventsEnum } from '../types/events/events.enum.ts';
import { CurrencyPriceType } from '../pages/put-money-wallet/types/currency-price.type.ts';
import { useNavigate } from 'react-router-dom';
import type { UserType } from '../store/app/types/app-state.type.ts';

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
            if (userResponse) setStateApp({ user: userResponse, lang: userResponse.languageCode });

            handler = setTimeout(() => updateInfo(userId), 10 * 1000);
        };

        if (user) updateInfo(user.id);

        return () => clearTimeout(handler);
    }, [user?.id]);

    useEffect(() => {
        px.on('connect', async () => {
            px.join(Envs.pxChannelId);

            const stateString = localStorage.getItem('user');

            if (!stateString?.length) {
                setStateApp({ lang: navigator.language.slice(0, 2) });
                navigate('/login');
                return;
            }

            const user = JSON.parse(stateString) as UserType;
            if (user.id) setStateApp({ user, lang: user.languageCode });
        });

        px.connect();

        return () => {
            void px.disconnect();
        };
    }, []);
};
