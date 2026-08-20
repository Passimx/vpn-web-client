import { FC } from 'react';
import styles from './index.module.css';
import { Card } from '../../components/card';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { callAction } from '../../api/px.connect.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { useAppAction, useAppSelector } from '../../store';
import { IoLanguageOutline } from 'react-icons/io5';
import { LuExternalLink } from 'react-icons/lu';
import { GoLink } from 'react-icons/go';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { UserType } from '../../store/app/types/app-state.type.ts';
import { TiDocumentText } from 'react-icons/ti';
import { MdOutlinePrivacyTip } from 'react-icons/md';

export const Login: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setStateApp, postMessage } = useAppAction();
    const lang = useAppSelector((state) => state.app.lang);
    const isPhone = useAppSelector((state) => state.app.isPhone);

    const createAccount = async () => {
        const response = await callAction<UserType>(EventsEnum.CREATE_ACCOUNT, { languageCode: lang });
        if (!response) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't0' });

        setStateApp({ user: response });
        navigate('/menu', { replace: true });
    };

    const onOpenIframe = (url: string) => {
        if (isPhone)
            setStateApp({ foreground: <iframe className={`${styles.iframe} empty_input`} src={url}></iframe> });
        else window.open(url);
    };

    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                <Card className={styles.div3} onClick={createAccount}>
                    <IoIosAddCircleOutline className={'icon'} />
                    <div>{t('t34')}</div>
                </Card>
                <Card className={styles.div3} onClick={() => navigate('/login-by-link')}>
                    <GoLink className={'icon'} />
                    <div>{t('t35')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
                <Card className={styles.div3} onClick={() => navigate('/language')}>
                    <IoLanguageOutline className={'icon'} />
                    <div>{t('t31')}</div>
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
            </div>
        </div>
    );
};
