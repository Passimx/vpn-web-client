import { BalanceAccount } from '../../../store/app/types/app-state.type.ts';

export type CurrencyPriceType = Record<keyof BalanceAccount, BalanceAccount>;
