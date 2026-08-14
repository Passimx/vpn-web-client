import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import setVisibilityCss from '../../hooks/set-visibility-css.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { EventsType } from '../../types/events/event-data.type.ts';

export const CopiedText: FC = () => {
    const [data, setData] = useState<string>('');
    const [visible, setVisible] = useState<boolean>();
    const { t } = useTranslation();

    useEffect(() => {
        let scrollTimeout: NodeJS.Timeout | undefined;

        const func = ({ data }: MessageEvent<EventsType>) => {
            if (data.event === EventsEnum.SHOW_TEXT) {
                clearTimeout(scrollTimeout);
                setVisible(true);
                setData(data.data);
                scrollTimeout = setTimeout(() => setVisible(false), 2000);
            }
        };

        window.addEventListener('message', func);
        return () => window.removeEventListener('message', func);
    }, []);

    return (
        <div className={`${styles.background} ${setVisibilityCss(styles.show, styles.hide, visible)}`}>
            <div>{t(data)}</div>
        </div>
    );
};
