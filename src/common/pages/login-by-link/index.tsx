import styles from './index.module.css';
import { FC, useState } from 'react';
import { Card } from '../../components/card';
import { useTranslation } from 'react-i18next';
import { useAppAction } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { MdUploadFile } from 'react-icons/md';
import { callAction } from '../../api/px.connect.ts';
import { useNavigate } from 'react-router-dom';
import { IUserInfo } from '../../types/api/user/user-info.interface.ts';
import { RotateLoading } from '../../components/rotate-loading';

export const LoginByLink: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { postMessage, setStateApp } = useAppAction();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const pasteFromBuffer = async () => {
        const link = await navigator.clipboard.readText();
        const isValid = URL.canParse(link);
        if (!link.length || !isValid) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't37' });

        setIsLoading(true);
        const response = await callAction<IUserInfo>(EventsEnum.LOGIN_BY_URL, link);
        setIsLoading(false);
        if (!response) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't37' });

        setStateApp({ user: response.user });
        navigate('/');
    };

    return (
        <div className={styles.div1}>
            {isLoading ? (
                <RotateLoading />
            ) : (
                <div className={styles.div2}>
                    <Card>
                        <div>{t('t38')}</div>
                    </Card>
                    <Card className={styles.div3} onClick={pasteFromBuffer}>
                        <MdUploadFile className={styles.div4} />
                        <div className={styles.div3}>{t('t36')}</div>
                    </Card>
                </div>
            )}
        </div>
    );
};
