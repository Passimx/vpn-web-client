import { JSX } from 'react';

export type BalanceAccount = {
    rub: number;
    cny: number;
    ton: number;
    usd: number;
};

export type TariffKind = 'base' | 'cascade' | 'cdn';

export type KeyType = {
    id: string;
    status: 'active' | 'expired';
    kind: TariffKind;
    autoExtendTariffId: string | null;
    countTrafficLimit: number;
    countTrafficUsed: number;
    createdAt: Date;
    expiresAt: Date;
};

type TransactionMeta = {
    paymentId?: string;
    place: 'ton' | 'yookassa' | 'wechat' | 'telegram';
};

type PaymentMeta = {
    tariffId: string;
    vpnKeyId: string;
};

export type TransactionType = {
    id: string;
    amount: number;
    currency: keyof BalanceAccount;
    type: 'Credit' | 'Debit';
    kind: 'Transfer' | 'Payment' | 'Deposit' | 'Exchange';
    completed: boolean;
    meta: TransactionMeta | PaymentMeta;
    createdAt: Date;
};

export type UserType = {
    id: string;
    balance: BalanceAccount;
    keys: KeyType[];
    transactions: TransactionType[];
};
export type AppStateType = Partial<{
    isIos: boolean;
    isPhone: boolean;
    foreground: JSX.Element;

    lang: string;
    user: UserType;
}>;
