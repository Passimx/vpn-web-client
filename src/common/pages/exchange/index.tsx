import { FC } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';

export const Exchange: FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.div1}>
            <div className={styles.div5}>
                <div>{t('t63')}</div>
            </div>
        </div>
    );
};
