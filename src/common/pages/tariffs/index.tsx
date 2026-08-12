import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { callAction } from '../../api/px.connect.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { ITariffs } from '../../types/api/tariffs.interface.ts';
import { useAppAction } from '../../store';
import { Card } from '../../components/card';
import { RotateLoading } from '../../components/rotate-loading';
import { Tariff } from '../../components/tariff';
import { useTranslation } from 'react-i18next';

export const Tariffs: FC = () => {
    const { t } = useTranslation();
    const [tariffs, setTariffs] = useState<ITariffs>();
    const { postMessage } = useAppAction();

    useEffect(() => {
        const getTariffs = async () => {
            const tariffs = await callAction<ITariffs>(EventsEnum.GET_TARIFFS);
            if (!tariffs) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't0' });
            setTariffs(tariffs);
        };

        getTariffs();
    }, []);

    return (
        <div className={styles.div1}>
            <div className={styles.div0}>
                {tariffs ? (
                    <div className={styles.div2}>
                        <Card className={styles.div3}>
                            <div>{t('t46')}</div>
                            {tariffs?.base.map((tariff) => <Tariff key={tariff.id} tariff={tariff} />)}
                        </Card>
                        <Card className={`${styles.div3} animation_1`}>
                            <div>{t('t47')}</div>
                            {tariffs?.cdn.map((tariff) => <Tariff key={tariff.id} tariff={tariff} />)}
                        </Card>
                    </div>
                ) : (
                    <RotateLoading />
                )}
            </div>
        </div>
    );
};
