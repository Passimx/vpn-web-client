import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { Card } from '../card';
import { ITariff, ITariffs } from '../../types/api/tariffs.interface.ts';
import { useAppAction, useAppSelector } from '../../store';
import { callAction } from '../../api/px.connect.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { RotateLoading } from '../rotate-loading';
import { Tariff } from '../tariff';
import { FaCheck } from 'react-icons/fa';
import { UserType } from '../../store/app/types/app-state.type.ts';
import { useParams } from 'react-router-dom';

export const AutoExtendKey: FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    const [tariffs, setTariffs] = useState<ITariff[]>();
    const { postMessage, setStateApp } = useAppAction();
    const user = useAppSelector((state) => state.app.user);
    const keyItem = id ? user?.keys?.find((k) => k.id === id) : undefined;
    const [isLoading, setIsLoading] = useState<string | null>();

    useEffect(() => {
        const getTariffs = async () => {
            const tariffs = await callAction<ITariffs>(EventsEnum.GET_TARIFFS, user?.id);
            if (!tariffs) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't0' });

            if (keyItem?.kind === 'cdn') setTariffs(tariffs.cdn);
            else if (keyItem?.kind === 'base') setTariffs(tariffs.base);
        };

        getTariffs();
    }, []);

    const onClick = async (tariffId: string | null) => {
        if (tariffId === keyItem?.autoExtendTariffId) return;
        setIsLoading(tariffId);
        const result = await callAction<UserType>(EventsEnum.CHANGE_EXTEND_TARIFF_ID, {
            userId: user?.id,
            tariffId,
            keyId: id,
        });
        setIsLoading(undefined);
        if (!result) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't0' });

        setStateApp({ user: result });
    };

    return (
        <Card className={styles.div1}>
            <div className={styles.div2}>{t('t70')}</div>
            <div>{t('t72')}</div>
            <div className={styles.div3}>
                {tariffs?.length ? (
                    <>
                        {tariffs.map((tariff) => (
                            <Tariff tariff={tariff} key={tariff.id} onClick={() => onClick(tariff.id)}>
                                {keyItem?.autoExtendTariffId === tariff.id && <FaCheck className={'icon'} />}
                                {isLoading === tariff.id && <RotateLoading />}
                            </Tariff>
                        ))}
                        <Card className={styles.div4} onClick={() => onClick(null)}>
                            <div>Выключить авто продление</div>
                            {keyItem?.autoExtendTariffId === null && <FaCheck className={'icon'} />}
                            {isLoading === null && <RotateLoading />}
                        </Card>
                    </>
                ) : (
                    <RotateLoading />
                )}
            </div>
        </Card>
    );
};
