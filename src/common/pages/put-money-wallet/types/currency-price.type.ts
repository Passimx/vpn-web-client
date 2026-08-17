import { BalanceAccount } from '../../../store/app/types/app-state.type.ts';

export type CurrencyPriceType = {
    currency: Record<keyof BalanceAccount, BalanceAccount>;
    telegramStarsRate: number;
};
