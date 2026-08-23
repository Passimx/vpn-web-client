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

type DepositMeta = {
    paymentId?: string;
    place: 'ton' | 'yookassa' | 'wechat' | 'telegram';
};

type PaymentMeta = {
    tariffId: string;
    vpnKeyId: string;
};

export type TransferMeta = {
    queryId: string;
    comment?: string;
};

type BaseTransaction = {
    id: string;
    amount: number;
    currency: keyof BalanceAccount;
    type: 'Credit' | 'Debit';
    completed: boolean;
    createdAt: Date;
};

export type TransactionType = BaseTransaction &
    (
        | { kind: 'Deposit'; meta: DepositMeta }
        | { kind: 'Payment'; meta: PaymentMeta }
        | { kind: 'Transfer'; meta: TransferMeta }
        | { kind: 'Exchange'; meta: any }
    );

export type UserType = {
    id: string;
    balance: BalanceAccount & { seqno: number };
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
