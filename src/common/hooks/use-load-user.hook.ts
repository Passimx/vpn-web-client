import { useEffect } from 'react';
import { ClientSdk } from '../@passsimx/client-sdk';
import { useAppAction } from '../store';
import { PayloadInterface } from '../@passsimx/client-sdk/interfaces/payload.interface.ts';
import { getCurrencyPrice } from '../api/currency-price.ts';
import { WalletHelper } from '../pages/put-money-wallet/helper.ts';
import { getUser } from '../api/users.ts';

export const useLoadUser = () => {
    const { setStateApp } = useAppAction();

    const getData = async (payload: PayloadInterface) => {
        const [resultCurrency, resultUser] = await Promise.all([getCurrencyPrice(), getUser(payload.user.id)]);

        if (resultCurrency.success) WalletHelper.setCurrencyPrice(resultCurrency.data);
        if (resultUser.success) {
            setStateApp({ user: resultUser.data });
        }

        setStateApp({ lang: payload.lang, connectionId: payload.connectionId });
        return null;
    };

    useEffect(() => {
        const init = () => {
            ClientSdk.init((payload) => {
                getData(payload);
            });
        };

        init();
        return () => ClientSdk.deInit();
    }, []);
};
