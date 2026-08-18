import { FC } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { Card } from '../card';
import { WalletHelper } from '../../pages/put-money-wallet/helper.ts';
import { useAppSelector } from '../../store';
import { PropsType } from './types/props.type.ts';

export const Tariff: FC<PropsType> = ({ tariff, onClick, children }) => {
    const { t } = useTranslation();
    const user = useAppSelector((state) => state.app.user);

    const totalBalance = WalletHelper.getTotalBalance(user!.balance, t('rub'));
    const isMoneyNotEnough = !totalBalance || totalBalance < tariff.price;

    return (
        <Card className={`${styles.div1} ${isMoneyNotEnough && styles.isMoneyNotEnough}`} onClick={onClick}>
            <div className={styles.div0}>
                <div className={styles.div2}>
                    <div>{t('t41')}:</div>
                    <div className={styles.div3}>
                        {WalletHelper.formatPrice(WalletHelper.convert(tariff.price, 'rub', t('t4')))}
                        &#160;{t('t3')}
                    </div>
                </div>
                <div className={styles.div2}>
                    <div>{t('t43')}:</div>
                    <div className={styles.div3}>{tariff.trafficLimit / 1024 / 1024 / 1024} GB</div>
                </div>
                <div className={styles.div2}>
                    <div>{t('t42')}:</div>
                    <div className={styles.div3}>{tariff.expirationDays}</div>
                </div>
            </div>
            {children}
        </Card>
    );
};
