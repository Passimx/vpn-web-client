import { FC } from 'react';
import { Card } from '../../components/card';
import { useTranslation } from 'react-i18next';
import { resources } from '../../hooks/translations/use-translation.ts';
import { useAppAction, useAppSelector } from '../../store';
import styles from './index.module.css';
import { callAction } from '../../api/px.connect.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { UserType } from '../../store/app/types/app-state.type.ts';

export const Languages: FC = () => {
    const { t } = useTranslation();
    const languages = Object.keys(resources);
    const { setStateApp, postMessage } = useAppAction();
    const lang = useAppSelector((state) => state.app.lang);
    const userId = useAppSelector((state) => state.app.user?.id);

    const onChangeLang = async (lang: string) => {
        const user = await callAction<UserType>(EventsEnum.UPDATE_USER_INF, { id: userId, languageCode: lang });
        if (!user) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't0' });
        setStateApp({ user, lang: user.languageCode });
    };

    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                {languages.map((language) => (
                    <div key={language}>
                        <Card
                            onClick={() => onChangeLang(language)}
                            className={`${lang === language && styles.active}`}
                        >
                            {t('t33', { lng: language })} {t('t32', { lng: language })}
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};
