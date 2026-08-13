import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppAction, useAppSelector } from '../../store';
import styles from './index.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Agreement } from '../../components/agreement';
import { ITariff, ITariffs } from '../../types/api/tariffs.interface.ts';
import { callAction } from '../../api/px.connect.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { UserType } from '../../store/app/types/app-state.type.ts';
import { WalletHelper } from '../put-money-wallet/helper.ts';
import { Card } from '../../components/card';
import { Tariff } from '../../components/tariff';
import { RotateLoading } from '../../components/rotate-loading';

export const ExtendKey: FC = () => {
    const { keyId } = useParams();
    const { t } = useTranslation();
    const { setStateApp } = useAppAction();
    const navigate = useNavigate();
    const [tariffs, setTariffs] = useState<ITariff[]>();
    const user = useAppSelector((state) => state.app.user);
    const key = keyId ? user?.keys?.find((k) => k.id === keyId) : undefined;

    const extend = (tariff: ITariff) => {
        if (!user?.balance) return;
        const amount = WalletHelper.getTotalBalance(user?.balance, t('rub'));
        if (amount < tariff.price) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't44' });

        const price = WalletHelper.formatPrice(WalletHelper.convert(tariff.price, 'rub', t('t4')));

        setStateApp({
            foreground: (
                <Agreement
                    text={`${t('t58')} ${price} ${t('t3')} ${t('t60')}`}
                    func={() =>
                        callAction<UserType>(EventsEnum.EXTEND_KEY, {
                            keyId,
                            tariffId: tariff.id,
                            userId: user?.id,
                        }).then((result) => {
                            if (result) {
                                setStateApp({ user: result });
                                navigate(`/my-subscriptions/${keyId}`);
                            }
                            return result;
                        })
                    }
                />
            ),
        });
    };

    useEffect(() => {
        const getTariffs = async () => {
            const tariffs = await callAction<ITariffs>(EventsEnum.GET_TARIFFS);
            if (!tariffs) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't0' });

            if (key?.kind === 'cdn') setTariffs(tariffs.cdn);
            else if (key?.kind === 'base') setTariffs(tariffs.base);
        };

        getTariffs();
    }, []);

    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                {tariffs?.length ? (
                    <Card className={`${styles.div3} ${key?.kind === 'cdn' && 'animation_1'}`}>
                        <div>{t(key?.kind === 'cdn' ? 't47' : 't46')}</div>
                        {tariffs?.map((tariff) => (
                            <div onClick={() => extend(tariff)}>
                                <Tariff key={tariff.id} tariff={tariff} />
                            </div>
                        ))}
                    </Card>
                ) : (
                    <RotateLoading />
                )}
            </div>
        </div>
    );
};
