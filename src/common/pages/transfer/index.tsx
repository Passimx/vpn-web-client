import { FC, useEffect, useState } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/card';
import { BalanceAccount, UserType } from '../../store/app/types/app-state.type.ts';
import { useAppAction, useAppSelector } from '../../store';
import { CurrencyIcon } from '../../components/currency-icon';
import { currencyWord } from './consts/currency-word.ts';
import { ChangeCurrency } from '../../components/change-currency';
import { WalletHelper } from '../put-money-wallet/helper.ts';
import { Agreement } from '../../components/agreement';
import { callAction } from '../../api/px.connect.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { useNavigate } from 'react-router-dom';
import { RotateLoading } from '../../components/rotate-loading';

export const Transfer: FC = () => {
    const { t } = useTranslation();

    const { setStateApp } = useAppAction();
    const recipientInputId = 'recipientInputId';
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.app.user);
    const [recipient, setRecipient] = useState<string | null>();
    const [comment, setComment] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const [currency, setCurrency] = useState<keyof BalanceAccount>(t('t4') as keyof BalanceAccount);
    const [setBalanceAmount, setSetBalanceAmount] = useState<string>('');

    const setAmount = Number(setBalanceAmount);

    const isNoActive =
        !recipient ||
        !setBalanceAmount ||
        Number.isNaN(setAmount) ||
        setAmount <= 0 ||
        setAmount > user!.balance[currency];

    const onChangeInput = (value: string, from: keyof BalanceAccount) => {
        if (value === '') {
            if (from === currency) {
                setSetBalanceAmount('');
            } else {
                setSetBalanceAmount('');
            }

            return;
        }

        // Разрешаем только число
        if (!/^\d*([.,]\d*)?$/.test(value)) {
            return;
        }

        const normalizedValue = value.replace(',', '.');

        if (from === currency) {
            setSetBalanceAmount(value);
        } else {
            const amount = Number(normalizedValue);

            if (!Number.isNaN(amount)) {
                const converted = WalletHelper.convert(amount, from, currency);

                setSetBalanceAmount(`${converted}`);
            }
        }
    };

    const onChangeSetBalanceKey = () => {
        const onChange = (currency: keyof BalanceAccount) => {
            setCurrency(currency);
        };

        setStateApp({
            foreground: <ChangeCurrency currency={currency} onChange={onChange} />,
        });
    };

    const setBalanceKeyMax = () => {
        const amount = user!.balance[currency];

        const value = `${amount}`;

        setSetBalanceAmount(value);
    };

    const onSubmit = () => {
        if (isNoActive) return;

        const func = async () => {
            const result = await callAction<UserType>(EventsEnum.TRANSFER, {
                userId: user?.id,
                amount: Number(setBalanceAmount),
                currency,
                recipient,
                comment,
                seqno: user?.balance?.seqno,
            });

            if (result) {
                setStateApp({ user: result });
                navigate('/wallet');
            }
            return result;
        };

        setStateApp({
            foreground: <Agreement func={func} text={''} />,
        });
    };

    useEffect(() => {
        const element = document.getElementById(recipientInputId) as HTMLInputElement | null;
        const focusout = async () => {
            const userId = element?.value;
            if (userId === user?.id) return setRecipient(null);

            if (!userId?.length) {
                setLoading(false);
                setRecipient(undefined);
                return;
            }

            setLoading(true);
            const response = await callAction(EventsEnum.GET_IS_EXISTS_USER, userId);
            setRecipient(response ? userId : null);
            setLoading(false);
        };

        element?.addEventListener('focusout', focusout);
        return () => element?.removeEventListener('focusout', focusout);
    }, [recipient, user?.id]);

    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                <div className={styles.div3}>{t('t91')}</div>
                <Card
                    className={`${styles.div4} ${recipient?.length && styles.div4_ok} ${recipient === null && styles.div4_error}`}
                >
                    <div className={styles.div5}>
                        <div>{t('t92')}</div>
                    </div>
                    <div className={styles.div51}>
                        <input
                            id={recipientInputId}
                            className={`empty_input ${styles.div52} ${styles.div53}`}
                            type="text"
                            placeholder={t('t93')}
                        />
                        <div className={styles.div5212}>{loading && <RotateLoading />}</div>
                    </div>
                </Card>
                <Card className={styles.div4}>
                    <div className={styles.div5}>
                        <div>{t('t65')}</div>

                        {Number(setBalanceAmount) > user!.balance[currency] ? (
                            <div className={styles.div7}>{t('t67')}</div>
                        ) : (
                            <div>
                                {t('t64')}:&#160;
                                {WalletHelper.formatPrice(user!.balance[currency])}
                            </div>
                        )}
                        <div className={styles.div6} onClick={setBalanceKeyMax}>
                            MAX
                        </div>
                    </div>
                    <div className={styles.div51}>
                        <input
                            className={`empty_input ${styles.div52}`}
                            type="number"
                            placeholder="0"
                            value={setBalanceAmount}
                            onChange={(event) => onChangeInput(event.target.value, currency)}
                        />
                        <Card className={styles.div521} onClick={onChangeSetBalanceKey}>
                            <CurrencyIcon currency={currency} className={styles.div522} />
                            <div className={styles.div523}>{t(currencyWord[currency])}</div>
                        </Card>
                    </div>
                </Card>
                <Card className={styles.div4}>
                    <div className={styles.div51}>
                        <input
                            className={`empty_input ${styles.div52} ${styles.div53}`}
                            type="text"
                            placeholder={t('t94')}
                            onChange={(event) => setComment(event.target.value)}
                        />
                    </div>
                </Card>
                <Card className={`${styles.div33} ${isNoActive ? styles.noActive : ''}`} onClick={onSubmit}>
                    {t('t89')}
                </Card>
            </div>
        </div>
    );
};
