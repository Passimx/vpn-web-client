import { FC } from 'react';
import styles from './index.module.css';
import { Card } from '../card';
import { useAppSelector } from '../../store';
import { Transaction } from '../transaction';
import { TransactionDate } from '../transaction-date';

export const TransactionsHistory: FC = () => {
    const transactions = useAppSelector((state) => state.app.user?.transactions);

    return (
        <Card className={styles.div1}>
            {transactions?.map((transaction, index) => (
                <div key={transaction.id}>
                    <TransactionDate transactionCurrent={transaction} transactionBefore={transactions[index - 1]} />
                    <Transaction transaction={transaction} />
                </div>
            ))}
        </Card>
    );
};
