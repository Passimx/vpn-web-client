import { BalanceAccount } from '../../../store/app/types/app-state.type.ts';

export type PropsType = {
    currency: keyof BalanceAccount;
    className?: string;
};
