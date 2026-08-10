import { FC } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppAction, useAppSelector } from '../../store';
import { RotateLoading } from '../../components/rotate-loading';
import { Card } from '../../components/card';
import moment from 'moment/min/moment-with-locales';
import { LuExternalLink } from 'react-icons/lu';
import { WalletHelper } from '../put-money-wallet/helper.ts';
import { IoCopyOutline } from 'react-icons/io5';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { MdDeleteOutline } from 'react-icons/md';

export const MySubscription: FC = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const keys = useAppSelector((state) => state.app.user?.keys);
    const key = id ? keys?.find((k) => k.id === id) : undefined;
    const { postMessage } = useAppAction();

    const copy = (text: string) => {
        window.navigator.clipboard.writeText(text);
        postMessage({ event: EventsEnum.SHOW_TEXT, data: 't10' });
    };

    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                {key ? (
                    <Card className={styles.div3}>
                        <div className={styles.div4}>
                            <div>ID:</div>
                            <div>{key.id}</div>
                        </div>
                        <div className={styles.div4}>
                            <div>{t('t48')}:</div>
                            <div>
                                {WalletHelper.formatPrice(key.countTrafficUsed / 1024 / 1024 / 1024)}
                                {' / '}
                                {WalletHelper.formatPrice(key.countTrafficLimit / 1024 / 1024 / 1024)} GB
                            </div>
                        </div>
                        <div className={styles.div4}>
                            <div>{t('t49')}:</div>
                            <div>{t(key.status)}</div>
                        </div>
                        {key.status === 'active' && (
                            <div className={styles.div4}>
                                <div>{t('t50')}:</div>
                                <div>{moment(key.expiresAt).format('L')}</div>
                            </div>
                        )}
                        <div className={styles.div4}>
                            <div>{t('t51')}:</div>
                            <div>{moment(key.createdAt).format('L')}</div>
                        </div>
                        <Card
                            className={styles.div5}
                            onClick={() => copy(`https://passimx.com/8721280199/keys-info/${key.id}`)}
                        >
                            <div>{t('t9')}</div>
                            <IoCopyOutline className={'icon'} />
                        </Card>
                        <Card className={styles.div5}>
                            <div>{t('t52')}</div>
                            <LuExternalLink className={'icon'} />
                        </Card>
                        <Card className={styles.div5}>
                            <div>{t('t53')}</div>
                            <MdDeleteOutline className={`icon ${styles.div6}`} />
                        </Card>
                    </Card>
                ) : (
                    <RotateLoading />
                )}
            </div>
        </div>
    );
};
