import { FC } from 'react';
import styles from './index.module.css';
import { PropsType } from './types/props.type.ts';
import { useAppSelector } from '../../store';

export const TransactionDate: FC<PropsType> = ({ transactionBefore, transactionCurrent }) => {
    const lang = useAppSelector((state) => state.app.lang);

    const currentCreatedAt = new Date(transactionCurrent.createdAt).toLocaleDateString(lang, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });

    const beforeCreatedAt =
        transactionBefore &&
        new Date(transactionBefore.createdAt).toLocaleDateString(lang, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });

    if (!beforeCreatedAt || currentCreatedAt !== beforeCreatedAt) {
        const now = new Date();
        const correctData = new Date(transactionCurrent.createdAt);

        const diffAtDays = (now.getTime() - correctData.getTime()) / (1000 * 60 * 60 * 24);

        const isToday =
            currentCreatedAt ===
            now.toLocaleDateString(lang, {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
            });

        let text = '';

        if (isToday) {
            const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
            const daysToFormat = isToday ? 0 : -1;
            text = rtf.format(daysToFormat, 'day');
            text = text.charAt(0).toUpperCase() + text.slice(1);
        } else if (diffAtDays < 7) {
            text = correctData.toLocaleDateString(lang, { weekday: 'long' });
            text = text.charAt(0).toUpperCase() + text.slice(1);
        } else text = currentCreatedAt;

        return <div className={styles.div1}>{text}</div>;
    }

    return <div></div>;
};
