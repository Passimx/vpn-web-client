import { FC } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppAction, useAppSelector } from '../../store';
import { Card } from '../card';
import { CiLogout } from 'react-icons/ci';
import { Agreement } from '../agreement';
import { IoCopyOutline, IoLanguageOutline, IoWalletOutline } from 'react-icons/io5';
import { WalletHelper } from '../../pages/put-money-wallet/helper.ts';
import { shortText } from '../../hooks/short-text.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { PiIdentificationBadge } from 'react-icons/pi';
import { Languages } from '../../pages/languages';

export const MyProfile: FC = () => {
    const { t } = useTranslation();
    const { setStateApp } = useAppAction();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.app.user);
    const totalBalance = user && WalletHelper.getTotalBalance(user.balance, t('t4'));

    const logout = () => {
        const func = () => {
            setStateApp({ user: undefined });
            navigate('/login');
            return true;
        };

        setStateApp({ foreground: <Agreement text={t('t61')} func={func} /> });
    };

    const onLanguages = () => {
        setStateApp({ foreground: <Languages /> });
    };

    const onWallet = () => {
        navigate('/wallet');
        setStateApp({ foreground: undefined });
    };

    const copyId = () => {
        if (!user?.id) return;
        window.navigator.clipboard.writeText(user.id);
        postMessage({ event: EventsEnum.SHOW_TEXT, data: 't10' });
    };

    return (
        <div className={styles.div1}>
            <Card className={styles.div4} onClick={copyId}>
                <PiIdentificationBadge className={'icon'} />
                <div>ID&#160;{shortText(user?.id)}</div>
                <IoCopyOutline className={'icon'} />
            </Card>

            <Card className={styles.div2}>
                <Card className={styles.div3} onClick={onWallet}>
                    <IoWalletOutline className={'icon'} />
                    <div>{t('t75')}</div>
                    <Card>
                        {WalletHelper.formatPrice(totalBalance)}&#160;{t('t3')}
                    </Card>
                </Card>
                <Card className={styles.div3} onClick={onLanguages}>
                    <IoLanguageOutline className={'icon'} />
                    <div>{t('t31')}</div>
                    <Card>{t('t32')}</Card>
                </Card>
                <Card className={styles.div3} onClick={logout}>
                    <CiLogout className={'icon'} />
                    <div>{t('t61')}</div>
                </Card>
            </Card>
        </div>
    );
};
