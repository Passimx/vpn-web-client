import styles from './index.module.css';
import { FC, useState } from 'react';
import { Card } from '../../components/card';
import { useTranslation } from 'react-i18next';
import { useAppAction } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { callAction } from '../../api/px.connect.ts';
import { useNavigate } from 'react-router-dom';
import { RotateLoading } from '../../components/rotate-loading';
import { UserType } from '../../store/app/types/app-state.type.ts';
import { FaRegPaste } from 'react-icons/fa6';

export const LoginByLink: FC = () => {
    const { t } = useTranslation();
    const idInput = 'idInput';
    const navigate = useNavigate();
    const { postMessage, setStateApp } = useAppAction();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const pasteFromBuffer = async () => {
        const link = await navigator.clipboard.readText();
        const element = document.getElementById(idInput) as HTMLInputElement;
        element.value = link;
    };

    const onLogin = async () => {
        const element = document.getElementById(idInput) as HTMLInputElement;
        const link = element.value;

        const isValid = URL.canParse(link);
        if (!link.length || !isValid) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't37' });

        setIsLoading(true);
        const response = await callAction<UserType>(EventsEnum.LOGIN_BY_URL, link);
        setIsLoading(false);
        if (!response) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't37' });

        setStateApp({ user: response });
        navigate('/menu', { replace: true });
    };

    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                <Card>
                    <div>{t('t38')}</div>
                </Card>
                <div className={styles.div5}>
                    <Card className={styles.div6}>
                        <input
                            id={idInput}
                            className={`empty_input ${styles.div7}`}
                            placeholder={'Ссылка на подписку'}
                        />
                    </Card>
                    <FaRegPaste className={styles.div8} onClick={pasteFromBuffer} />
                </div>
                <div className={styles.div9}>
                    {isLoading ? (
                        <RotateLoading />
                    ) : (
                        <Card className={styles.div10} onClick={onLogin}>
                            <div>{t('t96')}</div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};
