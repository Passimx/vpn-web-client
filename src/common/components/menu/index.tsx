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
import { useAppAction, useAppSelector } from '../../store';
import { BiSupport } from 'react-icons/bi';

export const Menu: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const lang = useAppSelector((state) => state.app.lang) ?? 'en';
    const isPhone = useAppSelector((state) => state.app.isPhone);
    const { setStateApp } = useAppAction();

    const onOpenIframe = (url: string) => {
        if (isPhone)
            setStateApp({ foreground: <iframe className={`${styles.iframe} empty_input`} src={url}></iframe> });
        else window.open(url);
    };

    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                <div className={styles.div21}>{t('t83')}</div>
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
                <Card className={styles.div3} onClick={() => onOpenIframe(`/info/${lang}/user-agreement.html`)}>
                    <TiDocumentText className={'icon'} />
                    <div>{t('t76')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
                <Card className={styles.div3} onClick={() => onOpenIframe(`/info/${lang}/privacy-policy.html`)}>
                    <MdOutlinePrivacyTip className={'icon'} />
                    <div>{t('t77')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
                <Card className={styles.div3} onClick={() => navigate('/support')}>
                    <BiSupport className={'icon'} />
                    <div>{t('t78')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
            </div>
        </div>
    );
};
