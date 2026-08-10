import { FC } from 'react';
import styles from './index.module.css';
import { ITariff } from '../../types/api/tariffs.interface.ts';
import { useTranslation } from 'react-i18next';
import { Card } from '../card';
import { WalletHelper } from '../../pages/put-money-wallet/helper.ts';
import { useAppAction, useAppSelector } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { LuExternalLink } from 'react-icons/lu';

export const Tariff: FC<{ tariff: ITariff }> = ({ tariff }) => {
    const { t } = useTranslation();
    const { postMessage } = useAppAction();
    const balance = useAppSelector((state) => state.app.user?.balance);

    const onClick = () => {
        if (!balance) return;
        const amount = WalletHelper.getTotalBalance(balance, t('rub'));
        if (amount < tariff.price) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't44' });
    };

    return (
        <Card className={styles.div1} onClick={onClick}>
            <div className={styles.div0}>
                <div className={styles.div2}>
                    <div>{t('t41')}:</div>
                    <div>
                        {WalletHelper.formatPrice(WalletHelper.convert(tariff.price, 'rub', t('t4')))}
                        &#160;{t('t3')}
                    </div>
                </div>
                <div className={styles.div2}>
                    <div>{t('t43')}:</div>
                    <div>{tariff.trafficLimit / 1024 / 1024 / 1024} GB</div>
                </div>
                <div className={styles.div2}>
                    <div>{t('t42')}:</div>
                    <div>{tariff.expirationDays}</div>
                </div>
            </div>
            <LuExternalLink className={'icon'} />
        </Card>
    );
};
