import { FC, useState } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import Input from '../../components/input';
import ton from '../../../../public/assets/images/ton.svg';
import sber from '../../../../public/assets/images/sber.png';
import wechat from '../../../../public/assets/images/wechat.png';
import telegram from '../../../../public/assets/images/telegram-icon.png';

import { Card } from '../../components/card';
import { WalletHelper } from './helper.ts';
import { useAppAction, useAppSelector } from '../../store';
import { InvoicePage } from '../../components/invoice-page';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { Image } from '../../components/image';
import { callAction } from '../../api/px.connect.ts';
import { CurrencyIcon } from '../../components/currency-icon';
import { BalanceAccount } from '../../store/app/types/app-state.type.ts';
import { currencyWord } from '../exchange/consts/currency-word.ts';
import { SelectTonApp } from '../../components/select-ton-app';
import { AppWalletEnum } from '../../types/api/app-wallet.enum.ts';
import { ChangeTonCurrency } from '../../components/change-ton-currency';

export const PutMoneyWallet: FC = () => {
    const id = 'id';
    const { t } = useTranslation();
    const { setStateApp, postMessage } = useAppAction();
    const [amount, setAmount] = useState<number>(0);
    const [tonCurrency, setTonCurrency] = useState<keyof BalanceAccount>('ton');
    const userId = useAppSelector((state) => state.app.user?.id);

    const onChangeValue = (value: string) => setAmount(Number(value));

    const checkBalance = () => {
        if (amount && amount > 0) return true;

        postMessage({ event: EventsEnum.SHOW_TEXT, data: t('t7') });

        const element = document.getElementById(id);
        element?.focus();

        return false;
    };

    const onWechat = async () => {
        const result = checkBalance();
        if (!result) return;

        const amountPrice = WalletHelper.convert(amount, t('t4'), 'cny');
        const request = callAction<string>(EventsEnum.CREATE_WECHAT_INVOICE, { userId, amount: amountPrice });

        setStateApp({
            foreground: <InvoicePage request={request} />,
        });
    };

    const onSber = () => {
        const result = checkBalance();
        if (!result) return;

        const amountPrice = WalletHelper.convert(amount, t('t4'), 'rub');
        const request = callAction<string>(EventsEnum.CREATE_SBER_INVOICE, { userId, amount: amountPrice });

        setStateApp({ foreground: <InvoicePage request={request} /> });
    };

    const onTelegramStars = () => {
        const result = checkBalance();
        if (!result) return;

        const amountPrice = WalletHelper.convert(amount, t('t4'), 'telegramStars');
        const request = callAction<string>(EventsEnum.CREATE_TELEGRAM_STARS_INVOICE, { userId, amount: amountPrice });

        setStateApp({ foreground: <InvoicePage request={request} /> });
    };

    const onTon = () => {
        const result = checkBalance();
        if (!result) return;

        const onChange = (app: AppWalletEnum) => {
            const amountPrice = WalletHelper.convert(amount, t('t4'), tonCurrency);
            const request = callAction<string>(EventsEnum.CREATE_TON_INVOICE, {
                userId,
                amount: amountPrice,
                app,
                currency: tonCurrency,
            });

            setStateApp({
                foreground: <InvoicePage request={request} />,
            });
        };

        setStateApp({ foreground: <SelectTonApp onChange={onChange} /> });
    };

    const onChangeTonCurrency = () => {
        const onChange = (currency: keyof BalanceAccount) => {
            setTonCurrency(currency);
        };

        setStateApp({
            foreground: <ChangeTonCurrency currency={tonCurrency} onChange={onChange} />,
        });
    };

    return (
        <div className={styles.div1}>
            <div className={styles.div0}>
                <div className={styles.div01}>{t('t71')}</div>
                <div>
                    <div className={styles.div11}>
                        <Input id={id} placeholder={t('t5')} type={'number'} onChangeValue={onChangeValue} />
                        <CurrencyIcon className={styles.div12} currency={t('t4') as keyof BalanceAccount} />
                    </div>
                </div>
                <div className={styles.div30}>
                    <Card onClick={onWechat}>
                        <div className={styles.div1_0}>
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
                        <div className={styles.div1_0}>
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
                    <Card onClick={onTelegramStars}>
                        <div className={styles.div1_0}>
                            <div className={styles.div2}>
                                <Image src={telegram} className={styles.div3} />
                            </div>
                            <div className={styles.div6}>
                                <div className={styles.div7}>Telegram Stars</div>
                                <div className={styles.div8}>
                                    {WalletHelper.convert(amount, t('t4'), 'telegramStars')}
                                    &#160;☆&#160;≈&#160;
                                    {WalletHelper.formatPrice(
                                        WalletHelper.convert(
                                            WalletHelper.convert(amount, t('t4'), 'telegramStars'),
                                            'telegramStars',
                                            'usd',
                                        ),
                                    )}
                                    &#160;$
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card onClick={onTon}>
                        <div className={styles.div1_1}>
                            <div className={styles.div4}>
                                <Image src={ton} className={styles.div5} />
                            </div>
                            <div className={styles.div6}>
                                <div className={styles.div7}>TON</div>
                                <div className={styles.div8}>
                                    {WalletHelper.formatPrice(WalletHelper.convert(amount, t('t4'), tonCurrency))}
                                    &#160;{t(currencyWord[tonCurrency])}
                                </div>
                            </div>
                            <div className={styles.div1_2}>
                                <Card
                                    className={styles.div521}
                                    onClick={(e) => {
                                        e?.stopPropagation();
                                        e?.preventDefault();
                                        onChangeTonCurrency();
                                    }}
                                >
                                    <CurrencyIcon currency={tonCurrency} className={styles.div522} />
                                    <div className={styles.div523}>{t(currencyWord[tonCurrency])}</div>
                                </Card>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
