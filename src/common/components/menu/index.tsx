import { FC } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card } from '../card';

export const Menu: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                <Card onClick={() => navigate('/my-keys')}>
                    <div className={styles.div3}>{t('t1')}</div>
                </Card>
                <Card onClick={() => navigate('/instruction')}>
                    <div className={styles.div3}>{t('t2')}</div>
                </Card>
            </div>
        </div>
    );
};
