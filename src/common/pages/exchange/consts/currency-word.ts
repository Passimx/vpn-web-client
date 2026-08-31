import { BalanceAccount } from '../../../store/app/types/app-state.type.ts';

export const currencyWord: Record<keyof BalanceAccount, string> = {
    rub: 't11',
    cny: 't13',
    usd: 'USD',
    ton: 'TON',
    ethereum: 'Ethereum',
    bitcoin: 'Bitcoin',
};
