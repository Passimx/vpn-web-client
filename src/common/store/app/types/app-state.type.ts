import { JSX } from 'react';

export type BalanceAccount = {
    rub: number;
    cny: number;
    ton: number;
    usd: number;
};

export type KeyEntity = {
    id: string;
};

export type UserType = {
    id: string;
    balance: BalanceAccount;
    languageCode: string;
    keys: KeyEntity[];
};
export type AppStateType = Partial<{
    isIos: boolean;
    isPhone: boolean;
    foreground: JSX.Element;

    lang: string;
    user: UserType;
}>;
