import { FC } from 'react';
import { Card } from '../../components/card';
import { useTranslation } from 'react-i18next';
import { resources } from '../../hooks/translations/use-translation.ts';
import { useAppAction, useAppSelector } from '../../store';
import styles from './index.module.css';
import { FaCheck } from 'react-icons/fa';

export const Languages: FC = () => {
    const { t } = useTranslation();
    const languages = Object.keys(resources);
    const { setStateApp } = useAppAction();
    const lang = useAppSelector((state) => state.app.lang);

    const onChangeLang = async (lang: string) => {
        setStateApp({ lang });
    };

    return (
        <Card className={styles.div1}>
            {languages.map((language) => (
                <div key={language} className={styles.div2} onClick={() => onChangeLang(language)}>
                    <div className={styles.div3}>{t('t33', { lng: language })}</div>
                    <div className={styles.div4}>
                        <div className={styles.div5}>{t(language)}</div>
                        <div className={styles.div6}>{t('t32', { lng: language })}</div>
                    </div>
                    {lang === language && <FaCheck className={'icon'} />}
                </div>
            ))}
        </Card>
    );
};
