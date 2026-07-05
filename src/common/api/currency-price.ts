import { Api } from './index.ts';
import { BalanceAccount } from '../store/app/types/app-state.type.ts';

export const getCurrencyPrice = async () => {
    return Api<Record<keyof BalanceAccount, BalanceAccount>>('/currency-price');
};
