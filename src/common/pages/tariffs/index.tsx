import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { callAction } from '../../api/px.connect.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { ITariff, ITariffs } from '../../types/api/tariffs.interface.ts';
import { useAppAction, useAppSelector } from '../../store';
import { Card } from '../../components/card';
import { RotateLoading } from '../../components/rotate-loading';
import { Tariff } from '../../components/tariff';
import { useTranslation } from 'react-i18next';
import { Link } from '../../components/link';
import { WalletHelper } from '../put-money-wallet/helper.ts';
import { UserType } from '../../store/app/types/app-state.type.ts';
import { Agreement } from '../../components/agreement';
import { useNavigate } from 'react-router-dom';
import { LuExternalLink } from 'react-icons/lu';

export const Tariffs: FC = () => {
    const { t } = useTranslation();
    const [tariffs, setTariffs] = useState<ITariffs>();
    const navigate = useNavigate();
    const { postMessage, setStateApp } = useAppAction();
    const user = useAppSelector((state) => state.app.user);
    const totalBalance = WalletHelper.getTotalBalance(user!.balance, t('rub'));

    useEffect(() => {
        const getTariffs = async () => {
            const tariffs = await callAction<ITariffs>(EventsEnum.GET_TARIFFS, user?.id);
            if (!tariffs) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't0' });
            setTariffs(tariffs);
        };

        getTariffs();
    }, []);

    const onClick = (tariff: ITariff) => {
        if (!user?.balance) return;
        const isMoneyNotEnough = !totalBalance || totalBalance < tariff.price;
        if (isMoneyNotEnough) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't44' });

        const price = WalletHelper.formatPrice(WalletHelper.convert(tariff.price, 'rub', t('t4')));

        const func = async () => {
            const result = await callAction<UserType>(EventsEnum.CREATE_KEY, {
                userId: user.id,
                tariffId: tariff.id,
                seqno: user.balance.seqno,
            });
            if (result) {
                setStateApp({ user: result });
                navigate('/my-subscriptions');
            }
            return result;
        };

        setStateApp({ foreground: <Agreement text={`${t('t58')} ${price} ${t('t3')} ${t('t59')}`} func={func} /> });
    };

    return (
        <div className={styles.div1}>
            <div className={styles.div0}>
                {tariffs ? (
                    <div className={styles.div2}>
                        <Card onClick={() => window.open('https://t.me/passimx_vpn_bot')}>
                            {t('t69')}&#160;<Link>Telegram</Link>
                        </Card>
                        <Card className={styles.div3}>
                            <div>{t('t46')}</div>
                            {tariffs?.base.map((tariff) => (
                                <Tariff key={tariff.id} tariff={tariff} onClick={() => onClick(tariff)}>
                                    <LuExternalLink className={'icon'} />
                                </Tariff>
                            ))}
                        </Card>
                        <Card className={`${styles.div3} animation_1`}>
                            <div>{t('t47')}</div>
                            {tariffs?.cdn.map((tariff) => (
                                <Tariff key={tariff.id} tariff={tariff} onClick={() => onClick(tariff)}>
                                    <LuExternalLink className={'icon'} />
                                </Tariff>
                            ))}
                        </Card>
                    </div>
                ) : (
                    <RotateLoading />
                )}
            </div>
        </div>
    );
};
