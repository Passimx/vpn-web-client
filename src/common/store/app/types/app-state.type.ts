import { JSX } from 'react';

export type BalanceAccount = {
    rub: number;
    cny: number;
    ton: number;
    usd: number;
};

export type KeyType = {
    id: string;
    status: 'active' | 'expired';
    autoRenewEnabled: boolean;
    countTrafficLimit: number;
    countTrafficUsed: number;
    createdAt: Date;
    expiresAt: Date;
};

export type UserType = {
    id: string;
    balance: BalanceAccount;
    keys: KeyType[];
};
export type AppStateType = Partial<{
    isIos: boolean;
    isPhone: boolean;
    foreground: JSX.Element;

    lang: string;
    user: UserType;
}>;
