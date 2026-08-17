import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { PropsType } from './types/props.type.ts';
import { QrCode } from '../qr-code';
import { useAppAction } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { Card } from '../card';
import { shortText } from '../../hooks/short-text.ts';
import { useTranslation } from 'react-i18next';

export const InvoicePage: FC<PropsType> = ({ request }) => {
    const { t } = useTranslation();
    const [url, setUrl] = useState<string>();
    const { setStateApp, postMessage } = useAppAction();

    useEffect(() => {
        const getResponse = async () => {
            const result = await request;
            if (!result) {
                setStateApp({ foreground: undefined });
                postMessage({ event: EventsEnum.SHOW_TEXT, data: 't0' });
                return;
            }

            setUrl(result);
        };

        getResponse();
    }, []);

    return (
        <div className={styles.background}>
            <QrCode url={url} text={shortText(url)} />
            {url && (
                <div className={styles.div1}>
                    <Card onClick={() => window.open(url)}>{t('t68')}</Card>
                </div>
            )}
        </div>
    );
};
