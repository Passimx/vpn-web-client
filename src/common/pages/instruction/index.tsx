import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { Card } from '../../components/card';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RotateLoading } from '../../components/rotate-loading';
import { useAppSelector } from '../../store';
import { DownloadLinksItem, DownloadLinksType } from '../../types/api/apps.ts';
import { LuExternalLink } from 'react-icons/lu';
import { callAction } from '../../api/ws.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';

export const Instruction: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [apps, setApps] = useState<DownloadLinksItem>();
    const { isPhone, isIos } = useAppSelector((state) => state.app);

    useEffect(() => {
        const getApps = async () => {
            const response = await callAction<DownloadLinksType>(EventsEnum.GET_APPS);
            if (!response) return;
            if (isIos) setApps(response.ios);
            else if (isPhone) setApps(response.android);
            else setApps(response.windows);
        };

        getApps();
    }, []);

    return (
        <div className={styles.div1}>
            <div className={styles.div5}>
                <Card className={styles.div2}>
                    <div>1)&#160;{t('t14')}</div>
                    {apps ? (
                        Object.entries(apps).map(([name, link]) => (
                            <div key={name} onClick={() => window.open(link)}>
                                <Card className={styles.div3}>
                                    <div>{name}</div>
                                    <LuExternalLink className={'icon'} />
                                </Card>
                            </div>
                        ))
                    ) : (
                        <RotateLoading />
                    )}

                    <br />
                    <Card className={styles.div4} onClick={() => navigate('/app-store')}>
                        <div>
                            <filter style={{ color: 'red' }}>*</filter> {t('t18')}
                        </div>
                        <LuExternalLink className={'icon'} />
                    </Card>
                </Card>
                <Card className={styles.div4} onClick={() => navigate('/put-money-wallet')}>
                    <div>2)&#160;{t('t15')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
                <Card className={styles.div4} onClick={() => navigate('/tariffs')}>
                    <div>3)&#160;{t('t16')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
                <Card>4)&#160;{t('t17')}</Card>
            </div>
        </div>
    );
};
