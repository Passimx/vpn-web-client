import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { PropsType } from './types/props.type.ts';
import { QrCode } from '../qr-code';
import { useAppAction, useAppSelector } from '../../store';
import { Link } from '../link';
import { shortText } from '../../hooks/short-text.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';

export const InvoicePage: FC<PropsType> = ({ request }) => {
    const userId = useAppSelector((state) => state.app.user?.id);
    const [url, setUrl] = useState<string>();
    const shortUserId = shortText(userId);
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
            <QrCode url={url} text={shortUserId} />
            {url && (
                <div className={styles.div1}>
                    <Link href={url}>{url}</Link>
                </div>
            )}
        </div>
    );
};
