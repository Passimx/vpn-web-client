import { TransactionType } from '../../../store/app/types/app-state.type.ts';

export type PropsType = {
    transactionBefore?: TransactionType;
    transactionCurrent: TransactionType;
};
