import { FC } from 'react';
import styles from './index.module.css';
import { ITariff } from '../../types/api/tariffs.interface.ts';
import { useTranslation } from 'react-i18next';
import { Card } from '../card';
import { WalletHelper } from '../../pages/put-money-wallet/helper.ts';
import { useAppAction, useAppSelector } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { LuExternalLink } from 'react-icons/lu';
import { Agreement } from '../agreement';
import { callAction } from '../../api/px.connect.ts';
import { UserType } from '../../store/app/types/app-state.type.ts';
import { useNavigate } from 'react-router-dom';

export const Tariff: FC<{ tariff: ITariff }> = ({ tariff }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { postMessage, setStateApp } = useAppAction();
    const user = useAppSelector((state) => state.app.user);

    const onClick = () => {
        if (!user?.balance) return;
        const amount = WalletHelper.getTotalBalance(user?.balance, t('rub'));
        if (amount < tariff.price) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't44' });

        const price = WalletHelper.formatPrice(WalletHelper.convert(tariff.price, 'rub', t('t4')));

        setStateApp({
            foreground: (
                <Agreement
                    text={`${t('t58')} ${price} ${t('t3')} ${t('t59')}`}
                    func={() =>
                        callAction<UserType>(EventsEnum.CREATE_KEY, { userId: user.id, tariffId: tariff.id }).then(
                            (result) => {
                                if (result) {
                                    setStateApp({ user: result });
                                    navigate('/my-subscriptions');
                                }
                                return result;
                            },
                        )
                    }
                />
            ),
        });
    };

    return (
        <Card className={styles.div1} onClick={onClick}>
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
            <LuExternalLink className={'icon'} />
        </Card>
    );
};
