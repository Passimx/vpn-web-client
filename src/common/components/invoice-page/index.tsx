import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { PropsType } from './types/props.type.ts';
import { QrCode } from '../qr-code';
import { useAppSelector } from '../../store';
import { Link } from '../link';
import { shortText } from '../../hooks/short-text.ts';

export const InvoicePage: FC<PropsType> = ({ request }) => {
    const userId = useAppSelector((state) => state.app.user?.id);
    const [url, setUrl] = useState<string>();
    const shortUserId = shortText(userId);

    useEffect(() => {
        const getResponse = async () => {
            const result = await request;
            if (!result?.length) return;

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
