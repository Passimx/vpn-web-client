import { FC } from 'react';
import styles from '../../components/menu/index.module.css';
import { Card } from '../../components/card';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { callAction } from '../../api/ws.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { useAppAction, useAppSelector } from '../../store';
import { IUserInfo } from '../../types/api/user/user-info.interface.ts';

export const Login: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setStateApp, postMessage } = useAppAction();
    const lang = useAppSelector((state) => state.app.lang);

    const createAccount = async () => {
        const response = await callAction<IUserInfo>(EventsEnum.CREATE_ACCOUNT, { languageCode: lang });
        if (!response) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't0' });

        setStateApp({ user: response.user, lang: response.user.languageCode });
        navigate('/');
    };

    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                <Card onClick={createAccount}>
                    <div className={styles.div3}>{t('t34')}</div>
                </Card>
                <Card onClick={() => navigate('/login-by-link')}>
                    <div className={styles.div3}>{t('t35')}</div>
                </Card>
                <Card onClick={() => navigate('/language')}>
                    <div className={styles.div3}>{t('t31')}</div>
                </Card>
            </div>
        </div>
    );
};
