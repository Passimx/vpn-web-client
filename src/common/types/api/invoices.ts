import { AppWalletEnum } from './app-wallet.enum.ts';
import { BalanceAccount } from '../../store/app/types/app-state.type.ts';

export type CreateInvoiceType = {
    amount: number;
};

export type CreateTonInvoiceType = {
    amount: number;
    currency: keyof BalanceAccount;
    app: AppWalletEnum;
};
