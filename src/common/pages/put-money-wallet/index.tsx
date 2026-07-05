import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import Input from '../../components/input';
import { AppWalletEnum } from './types/app-wallet.enum.ts';
import tonkeeper from '../../../../public/assets/images/tonkeeper.png';
import mytonwallet from '../../../../public/assets/images/mytonwallet.png';
import tonhub from '../../../../public/assets/images/tonhub.png';
import ton from '../../../../public/assets/images/ton.svg';
import sber from '../../../../public/assets/images/sber.png';
import wechat from '../../../../public/assets/images/wechat.png';

import { Card } from '../../components/card';
import { WalletHelper } from './helper.ts';
import { useAppAction, useAppSelector } from '../../store';
import { InvoicePage } from '../../components/invoice-page';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { createSberInvoice, createTonInvoice, createWechatInvoice } from '../../api/invoices.ts';
import { Image } from '../../components/image';

export const PutMoneyWallet: FC = () => {
    const id = 'id';
    const { t } = useTranslation();
    const [amount, setAmount] = useState<number>(0);
    const { postMessageToBroadCastChannel, setStateApp } = useAppAction();
    const userId = useAppSelector((state) => state.app.user?.id);

    useEffect(() => {
        const element = document.getElementById(id);
        if (!element) return;

        const onInput = (e: any) => setAmount(Number(e.target.value));
        element.addEventListener('input', onInput);

        return () => element.removeEventListener('input', onInput);
    }, []);

    const checkBalance = () => {
        if (amount && amount > 0) return true;

        postMessageToBroadCastChannel({ event: EventsEnum.SHOW_TEXT, data: t('t7') });

        const element = document.getElementById(id);
        element?.focus();

        return false;
    };

    const onTon = (app: AppWalletEnum) => {
        const result = checkBalance();
        if (!result) return;

        const payload = WalletHelper.convert(amount, t('t4'), 'ton');
        setStateApp({
            foreground: <InvoicePage request={createTonInvoice(userId, { amount: payload, currency: 'ton', app })} />,
        });
    };

    const onWechat = async () => {
        const result = checkBalance();
        if (!result) return;

        const payload = WalletHelper.convert(amount, t('t4'), 'cny');
        setStateApp({
            foreground: <InvoicePage request={createWechatInvoice(userId, { amount: payload })} />,
        });
    };

    const onSber = () => {
        const result = checkBalance();
        if (!result) return;

        const payload = WalletHelper.convert(amount, t('t4'), 'rub');
        setStateApp({ foreground: <InvoicePage request={createSberInvoice(userId, { amount: payload })} /> });
    };

    return (
        <div className={styles.div1}>
            <div>
                <div className={styles.div11}>
                    <Input id={id} placeholder={t('t5')} type={'number'} />
                    <div className={styles.div12}>{t('t3')}</div>
                </div>
            </div>
            <div className={styles.div30}>
                <Card onClick={onWechat}>
                    <div className={styles.div1}>
                        <div className={styles.div2}>
                            <Image src={wechat} className={styles.div3} />
                        </div>
                        <div className={styles.div6}>
                            <div className={styles.div7}>WeChat</div>
                            <div className={styles.div8}>
                                {WalletHelper.formatPrice(WalletHelper.convert(amount, t('t4'), 'cny'))}&#160;¥
                            </div>
                        </div>
                    </div>
                </Card>
                <Card onClick={onSber}>
                    <div className={styles.div1}>
                        <div className={styles.div2}>
                            <Image src={sber} className={styles.div3} />
                        </div>
                        <div className={styles.div6}>
                            <div className={styles.div7}>{t('t6')}</div>
                            <div className={styles.div8}>
                                {WalletHelper.formatPrice(WalletHelper.convert(amount, t('t4'), 'rub'))}&#160;₽
                            </div>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className={styles.div1_1}>
                        <div className={styles.div4}>
                            <Image src={ton} className={styles.div5} />
                        </div>
                        <div className={styles.div6}>
                            <div className={styles.div7}>TON</div>
                            <div className={styles.div8}>
                                {WalletHelper.formatPrice(WalletHelper.convert(amount, t('t4'), 'ton'))}&#160;TON
                            </div>
                        </div>
                        <div className={styles.div1_2}>
                            <Image
                                src={tonkeeper}
                                className={styles.div3}
                                onClick={() => onTon(AppWalletEnum.TON_KEEPER)}
                            />
                            <Image
                                src={mytonwallet}
                                className={styles.div3}
                                onClick={() => onTon(AppWalletEnum.MY_TON_WALLET)}
                            />
                            <Image src={tonhub} className={styles.div3} onClick={() => onTon(AppWalletEnum.TON_HUB)} />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};
