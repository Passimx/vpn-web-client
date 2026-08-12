import { FC, useState } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { Card } from '../card';
import { PropsType } from './types/props.type.ts';
import { useAppAction } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { RotateLoading } from '../rotate-loading';

export const Agreement: FC<PropsType> = ({ func, text }) => {
    const { t } = useTranslation();
    const { postMessage, setStateApp } = useAppAction();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onclick = async () => {
        setIsLoading(true);
        const result = await func();
        setIsLoading(false);

        if (!result) postMessage({ event: EventsEnum.SHOW_TEXT, data: 't0' });
        else postMessage({ event: EventsEnum.SHOW_TEXT, data: 't54' });

        setStateApp({ foreground: undefined });
    };

    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                <div className={styles.div4}>{t('t57')}</div>
                <div className={styles.div5}>{text}</div>
                {isLoading ? (
                    <RotateLoading />
                ) : (
                    <div className={styles.div3}>
                        <Card className={styles.div6} onClick={onclick}>
                            {t('t55')}
                        </Card>
                        <Card className={styles.div6} onClick={() => setStateApp({ foreground: undefined })}>
                            {t('t56')}
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};
