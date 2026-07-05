import { JSX } from 'react';

export type BalanceAccount = {
    rub: number;
    cny: number;
    ton: number;
    usd: number;
};

export type UserType = {
    id: string;
    balance: BalanceAccount;
};
export type AppStateType = Partial<{
    isIos: boolean;
    isPhone: boolean;
    foreground: JSX.Element;

    lang: string;
    connectionId: string;
    user: UserType;
}>;
