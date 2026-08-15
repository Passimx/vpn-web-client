import { FC } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card } from '../card';
import { PiDownload } from 'react-icons/pi';
import { IoLanguageOutline, IoListOutline } from 'react-icons/io5';
import { LuExternalLink } from 'react-icons/lu';
import { CiLogout } from 'react-icons/ci';
import { useAppAction } from '../../store';
import { Agreement } from '../agreement';

export const Menu: FC = () => {
    const { t } = useTranslation();
    const { setStateApp } = useAppAction();
    const navigate = useNavigate();

    const func = () => {
        setStateApp({ user: undefined });
        navigate('/login');
        return true;
    };

    const logout = () => {
        setStateApp({ foreground: <Agreement text={t('t61')} func={func} /> });
    };

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
                <Card className={styles.div3} onClick={() => navigate('/language')}>
                    <IoLanguageOutline className={'icon'} />
                    <div>{t('t31')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
                <Card className={styles.div3} onClick={logout}>
                    <CiLogout className={'icon'} />
                    <div>{t('t61')}</div>
                </Card>
            </div>
        </div>
    );
};
