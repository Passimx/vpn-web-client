import { BalanceAccount } from '../../../store/app/types/app-state.type.ts';

export type PropsType = {
    currency: keyof BalanceAccount;
    onChange: (currency: keyof BalanceAccount) => void;
};
