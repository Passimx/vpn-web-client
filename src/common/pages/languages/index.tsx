import { FC } from 'react';
import { Card } from '../../components/card';
import { useTranslation } from 'react-i18next';
import { resources } from '../../hooks/translations/use-translation.ts';
import { useAppAction, useAppSelector } from '../../store';
import styles from './index.module.css';

export const Languages: FC = () => {
    const { t } = useTranslation();
    const languages = Object.keys(resources);
    const { setStateApp } = useAppAction();
    const lang = useAppSelector((state) => state.app.lang);

    const onChangeLang = async (lang: string) => {
        setStateApp({ lang });
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
