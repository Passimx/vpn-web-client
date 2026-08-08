import { FC } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card } from '../card';
import { FaRegListAlt } from 'react-icons/fa';
import { PiDownload } from 'react-icons/pi';
import { IoLanguageOutline } from 'react-icons/io5';
import { LuExternalLink } from 'react-icons/lu';

export const Menu: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                <Card className={styles.div3} onClick={() => navigate('/my-subscriptions')}>
                    <FaRegListAlt className={'icon'} />
                    <div>{t('t1')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
                <Card className={styles.div3} onClick={() => navigate('/instruction')}>
                    <PiDownload className={'icon'} />
                    <div>{t('t2')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
                <Card className={styles.div3} onClick={() => navigate('/language')}>
                    <IoLanguageOutline className={'icon'} />
                    <div>{t('t31')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
            </div>
        </div>
    );
};
