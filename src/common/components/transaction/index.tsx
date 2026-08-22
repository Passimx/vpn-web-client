import { FC } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { Card } from '../card';
import { WalletHelper } from '../../pages/put-money-wallet/helper.ts';
import { PropsType } from './types/props.type.ts';
import { CurrencyIcon } from '../currency-icon';
import { TbClockRecord } from 'react-icons/tb';
import { MdOutlinePayment, MdOutlinePublishedWithChanges } from 'react-icons/md';
import { BsArrowDownCircle, BsReply } from 'react-icons/bs';
import { shortText } from '../../hooks/short-text.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { useAppAction, useAppSelector } from '../../store';

export const Transaction: FC<PropsType> = ({ transaction }) => {
    const { t } = useTranslation();
    const { postMessage } = useAppAction();
    const lang = useAppSelector((state) => state.app.lang);

    const onClick = () => {
        window.navigator.clipboard.writeText(transaction.id);
        postMessage({ event: EventsEnum.SHOW_TEXT, data: `ID ${t('t10')}` });
    };

    return (
        <Card className={`${styles.div1} ${!transaction.completed && styles.div1wait}`} onClick={onClick}>
            <div className={styles.div2}>
                {!transaction.completed && <TbClockRecord className={styles.div21} />}
                {transaction.completed && transaction.kind === 'Exchange' && (
                    <MdOutlinePublishedWithChanges className={styles.div21} />
                )}
                {transaction.completed && transaction.kind === 'Payment' && (
                    <MdOutlinePayment className={styles.div21} />
                )}
                {transaction.completed && transaction.kind === 'Transfer' && (
                    <BsReply className={`${styles.div21} ${transaction.type === 'Credit' && styles.div22}`} />
                )}
                {transaction.completed && transaction.kind === 'Deposit' && (
                    <BsArrowDownCircle className={styles.div21} />
                )}
            </div>
            <div className={styles.div3}>
                <div className={styles.div31}>
                    <div className={styles.div311}>
                        <div className={styles.div3111}>
                            {transaction.kind === 'Deposit' && t('t71')}
                            {transaction.kind === 'Payment' && t('t85')}
                            {transaction.kind === 'Transfer' && t('t86')}
                            {transaction.kind === 'Exchange' && t('t63')}
                        </div>
                        <div className={styles.div3112}>
                            <div className={styles.div31121}>ID&#160;{shortText(transaction.id, 4)}</div>
                            {(transaction.meta?.comment && (
                                <div className={styles.div31122}>{transaction.meta?.comment}</div>
                            )) ||
                                (transaction.meta?.place && (
                                    <div className={styles.div31122}>{transaction.meta?.place}</div>
                                )) ||
                                (transaction.meta?.vpnKeyId && (
                                    <div className={styles.div31122}>{transaction.meta?.vpnKeyId}</div>
                                ))}
                        </div>
                    </div>
                    <div className={styles.div312}>
                        <div className={styles.div3121}>
                            <div
                                className={`${styles.div31211} ${transaction.type === 'Credit' && transaction.completed && styles.Debit}`}
                            >
                                {transaction.type === 'Credit' ? '+' : '-'}&#160;
                                {WalletHelper.formatPrice(Number(transaction.amount))}
                            </div>
                            <CurrencyIcon currency={transaction.currency} className={styles.div31212} />
                        </div>
                        <div className={styles.div3122}>
                            {new Date(transaction.createdAt).toLocaleTimeString(lang, {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};
