import { FC, useEffect } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppAction, useAppSelector } from '../../store';
import { RotateLoading } from '../../components/rotate-loading';
import { Card } from '../../components/card';
import moment from 'moment';
import { LuExternalLink } from 'react-icons/lu';
import { WalletHelper } from '../put-money-wallet/helper.ts';
import { IoCopyOutline } from 'react-icons/io5';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { MdDeleteOutline, MdOutlineAutorenew } from 'react-icons/md';
import { callAction } from '../../api/px.connect.ts';
import { UserType } from '../../store/app/types/app-state.type.ts';
import { AutoExtendKey } from '../../components/auto-extend-key';

export const MySubscription: FC = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { postMessage, setStateApp } = useAppAction();
    const user = useAppSelector((state) => state.app.user);
    const key = id ? user?.keys?.find((k) => k.id === id) : undefined;

    useEffect(() => {
        if (!key) navigate('/my-subscriptions');
    }, [key]);

    const copy = (text: string) => {
        window.navigator.clipboard.writeText(text);
        postMessage({ event: EventsEnum.SHOW_TEXT, data: 't10' });
    };

    const remove = async () => {
        const result = await callAction<UserType>(EventsEnum.REMOVE_KEY, id);
        if (!result) return postMessage({ event: EventsEnum.SHOW_TEXT, data: 't0' });

        setStateApp({ user: result });
        navigate('/my-subscriptions', { replace: true });
    };

    const autoExtendKey = () => {
        if (!key) return;
        setStateApp({ foreground: <AutoExtendKey /> });
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
                        <div className={styles.div4}>
                            <div>{t('t70')}:</div>
                            <div>{key.autoExtendTariffId ? t('t73') : t('t74')}</div>
                        </div>
                        {key.status === 'active' && (
                            <div className={styles.div4}>
                                <div>{t('t50')}:</div>
                                <div>{moment(key.expiresAt).format('DD.MM.YYYY')}</div>
                            </div>
                        )}
                        <div className={styles.div4}>
                            <div>{t('t51')}:</div>
                            <div>{moment(key.createdAt).format('DD.MM.YYYY')}</div>
                        </div>
                        <Card
                            className={styles.div5}
                            onClick={() => copy(`https://passimx.com/8721280199/keys-info/${key.id}`)}
                        >
                            <div>{t('t9')}</div>
                            <IoCopyOutline className={'icon'} />
                        </Card>
                        <Card className={styles.div5} onClick={autoExtendKey}>
                            <div>{t('t70')}</div>
                            <MdOutlineAutorenew className={'icon'} />
                        </Card>
                        <Card className={styles.div5} onClick={() => navigate(`/extend-key/${key.id}`)}>
                            <div>{t('t52')}</div>
                            <LuExternalLink className={'icon'} />
                        </Card>
                        {key.status === 'expired' && (
                            <Card className={styles.div5} onClick={remove}>
                                <div>{t('t53')}</div>
                                <MdDeleteOutline className={`icon ${styles.div6}`} />
                            </Card>
                        )}
                        <Card className={styles.div5} onClick={() => navigate('/instruction')}>
                            <div>{t('t2')}</div>
                            <LuExternalLink className={'icon'} />
                        </Card>
                    </Card>
                ) : (
                    <RotateLoading />
                )}
            </div>
        </div>
    );
};
