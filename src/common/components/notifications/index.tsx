import { FC } from 'react';
import styles from './index.module.css';
import { useAppSelector } from '../../store';
import { Notification } from '../notification';
import { useTranslation } from 'react-i18next';
import { MdCancel } from 'react-icons/md';
import nstyles from '../notification/index.module.css';

export const Notifications: FC = () => {
    const { t } = useTranslation();
    const notifications = useAppSelector((state) => state.app.notifications);

    const onHideAll = async () => {
        for (const notification of [...(notifications ?? [])].reverse()) {
            const element = document.getElementById(String(notification.id))!;
            element.classList.add(nstyles.hidden);
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    };

    return (
        <div className={styles.div1}>
            {!!notifications?.length && (
                <div className={styles.div2} onClick={onHideAll}>
                    <div className={styles.div21}>{t('t106')}</div>
                    <MdCancel className={styles.div22} />
                </div>
            )}
            {notifications?.map((notification) => <Notification key={notification.id} notification={notification} />)}
        </div>
    );
};
