import { FC } from 'react';
import styles from './index.module.css';
import { Card } from '../card';
import { useAppSelector } from '../../store';
import { Transaction } from '../transaction';

export const TransactionsHistory: FC = () => {
    const transactions = useAppSelector((state) => state.app.user?.transactions);

    return (
        <Card className={styles.div1}>
            {transactions?.map((transaction) => <Transaction key={transaction.id} transaction={transaction} />)}
        </Card>
    );
};
