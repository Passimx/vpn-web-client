import { FC } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card } from '../card';
import { PiDownload } from 'react-icons/pi';
import { IoListOutline } from 'react-icons/io5';
import { LuExternalLink } from 'react-icons/lu';
import { TiDocumentText } from 'react-icons/ti';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { useAppSelector } from '../../store';

export const Menu: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const lang = useAppSelector((state) => state.app.lang) ?? 'en';

    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                <Card className={styles.div3} onClick={() => navigate('/my-subscriptions')}>
                    <IoListOutline className={'icon'} />
                    <div>{t('t1')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
                <Card className={styles.div3} onClick={() => navigate('/instruction')}>
                    <PiDownload className={'icon'} />
                    <div>{t('t2')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
                <Card className={styles.div3} onClick={() => window.open(`/info/${lang}/user-agreement.html`)}>
                    <TiDocumentText className={'icon'} />
                    <div>{t('t76')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
                <Card className={styles.div3} onClick={() => window.open(`/info/${lang}/privacy-policy.html`)}>
                    <MdOutlinePrivacyTip className={'icon'} />
                    <div>{t('t77')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
            </div>
        </div>
    );
};
