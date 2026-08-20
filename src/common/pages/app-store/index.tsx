import { FC } from 'react';
import styles from './index.module.css';
import { Card } from '../../components/card';
import { Trans, useTranslation } from 'react-i18next';
import { useAppAction } from '../../store';
import { LuExternalLink } from 'react-icons/lu';
import { VideoAppStore } from '../../components/video-app-store';

export const AppStore: FC = () => {
    const { t } = useTranslation();
    const { setStateApp } = useAppAction();

    const showVideo = () => {
        setStateApp({ foreground: <VideoAppStore /> });
    };

    return (
        <div className={styles.div1}>
            <div className={styles.div0}>
                <Card className={styles.div2}>
                    <Trans i18nKey="t19" t={t} />
                </Card>

                <Card className={styles.div2}>
                    • {t('t20')} <br /> <br />• {t('t21')} <br /> <br />• {t('t22')} <br /> <br />• {t('t23')} <br />{' '}
                    <br />• {t('t24')} <br /> <br />• {t('t25')} <br /> <br />• {t('t26')}
                </Card>

                <Card className={styles.div3} onClick={showVideo}>
                    <div>{t('t39')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>

                <Card className={styles.div2}>
                    {t('t27')} <br /> <br />
                    {t('t28')}: None <br />
                    Street: {t('t29')} <br />
                    City/Town: {t('t29')} <br />
                    Region: {t('t30')} <br />
                    Postcode: 101000 <br />
                    Phone: 9999999999 <br />
                </Card>
            </div>
        </div>
    );
};
