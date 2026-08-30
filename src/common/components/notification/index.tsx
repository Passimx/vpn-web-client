import { FC, useEffect } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { useAppAction } from '../../store';
import { PropsType } from './props.type.ts';
import { Card } from '../card';
import { IoMdNotificationsOutline } from 'react-icons/io';

let handler: NodeJS.Timeout | undefined;
export const Notification: FC<PropsType> = ({ notification }) => {
    const { t } = useTranslation();
    const hideInterval = 10000;
    const { removeNotification } = useAppAction();

    const hide = () => {
        clearTimeout(handler);
        const element = document.getElementById(String(notification.id))!;
        element.classList.add(styles.hidden);
    };

    useEffect(() => {
        const element = document.getElementById(String(notification.id))!;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) removeNotification(notification.id);
                });
            },
            {
                root: null,
                threshold: 0,
            },
        );
        observer.observe(element);
    }, []);

    useEffect(() => {
        handler = setTimeout(hide, hideInterval);
        return () => clearTimeout(handler);
    }, [notification.id]);

    const onClick = () => {
        if (notification.onclick) notification.onclick();
        const element = document.getElementById(String(notification.id))!;
        element.classList.add(styles.hidden);
        hide();
    };

    return (
        <div id={notification.id} onClick={onClick}>
            <Card className={styles.div1}>
                <div className={styles.div2}>
                    <IoMdNotificationsOutline className={styles.div21} />
                </div>
                <div className={styles.div3}>
                    <div className={styles.div31}>{t(notification.title)}</div>
                    <div className={styles.div32}>{t(notification.description)}</div>
                </div>
            </Card>
        </div>
    );
};
