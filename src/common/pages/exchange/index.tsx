import { FC, useState } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/card';
import { BalanceAccount, UserType } from '../../store/app/types/app-state.type.ts';
import { useAppAction, useAppSelector } from '../../store';
import { CurrencyIcon } from '../../components/currency-icon';
import { currencyWord } from './consts/currency-word.ts';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { LuEqualApproximately } from 'react-icons/lu';
import { ChangeCurrency } from '../../components/change-currency';
import { scale, WalletHelper } from '../put-money-wallet/helper.ts';
import { Agreement } from '../../components/agreement';
import { callAction } from '../../api/px.connect.ts';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { useNavigate } from 'react-router-dom';

export const Exchange: FC = () => {
    const { t } = useTranslation();

    const { setStateApp } = useAppAction();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.app.user);

    const allKeys = Object.keys(user!.balance) as (keyof BalanceAccount)[];
    const otherKey = allKeys.find((key) => key !== t('t4'))!;

    const [setBalanceKey, setSetBalanceKey] = useState<keyof BalanceAccount>(t('t4') as keyof BalanceAccount);
    const [getBalanceKey, getSetBalanceKey] = useState<keyof BalanceAccount>(otherKey);

    const [setBalanceAmount, setSetBalanceAmount] = useState<string>('');
    const [getBalanceAmount, getSetBalanceAmount] = useState<string>('');

    const setAmount = Number(setBalanceAmount);

    const isNoActive =
        setBalanceKey === getBalanceKey ||
        !setBalanceAmount ||
        Number.isNaN(setAmount) ||
        setAmount <= 0 ||
        setAmount > user!.balance[setBalanceKey];

    const onChangeInput = (value: string, from: keyof BalanceAccount) => {
        if (value === '') {
            if (from === setBalanceKey) {
                setSetBalanceAmount('');
                getSetBalanceAmount('');
            } else {
                getSetBalanceAmount('');
                setSetBalanceAmount('');
            }

            return;
        }

        // Разрешаем только число
        if (!/^\d*([.,]\d*)?$/.test(value)) {
            return;
        }

        const normalizedValue = value.replace(',', '.');

        if (from === setBalanceKey) {
            setSetBalanceAmount(value);

            const amount = Number(normalizedValue);

            if (!Number.isNaN(amount)) {
                const converted = WalletHelper.convert(amount, from, getBalanceKey);

                getSetBalanceAmount(`${converted}`);
            }
        } else {
            getSetBalanceAmount(value);

            const amount = Number(normalizedValue);

            if (!Number.isNaN(amount)) {
                const converted = WalletHelper.convert(amount, from, setBalanceKey);

                setSetBalanceAmount(`${converted}`);
            }
        }
    };

    const onChangeSetBalanceKey = () => {
        const onChange = (currency: keyof BalanceAccount) => {
            setSetBalanceKey(currency);

            if (setBalanceAmount) {
                const amount = WalletHelper.convert(Number(setBalanceAmount), currency, getBalanceKey);

                getSetBalanceAmount(`${amount}`);
            }
        };

        setStateApp({
            foreground: <ChangeCurrency currency={setBalanceKey} onChange={onChange} />,
        });
    };

    const onChangeGetBalanceKey = () => {
        const onChange = (currency: keyof BalanceAccount) => {
            getSetBalanceKey(currency);

            if (setBalanceAmount) {
                const amount = WalletHelper.convert(Number(setBalanceAmount), setBalanceKey, currency);

                getSetBalanceAmount(`${amount}`);
            }
        };

        setStateApp({
            foreground: <ChangeCurrency currency={getBalanceKey} onChange={onChange} />,
        });
    };

    const setBalanceKeyMax = () => {
        const amount = user!.balance[setBalanceKey];

        const value = `${amount}`;

        setSetBalanceAmount(value);

        const converted = WalletHelper.convert(Number(amount), setBalanceKey, getBalanceKey);

        getSetBalanceAmount(`${converted}`);
    };

    const onRevert = () => {
        setSetBalanceKey(getBalanceKey);
        getSetBalanceKey(setBalanceKey);

        setSetBalanceAmount(getBalanceAmount);
        getSetBalanceAmount(setBalanceAmount);
    };

    const onSubmit = () => {
        if (isNoActive) return;

        const func = async () => {
            const result = await callAction<UserType>(EventsEnum.EXCHANGE, {
                userId: user?.id,
                amountFrom: Number(setBalanceAmount),
                from: setBalanceKey,
                to: getBalanceKey,
                seqno: user?.balance.seqno,
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

    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                <div className={styles.div3}>{t('t63')}</div>
                <Card className={styles.div4}>
                    <div className={styles.div5}>
                        <div>{t('t65')}</div>

                        {Number(setBalanceAmount) > user!.balance[setBalanceKey] ? (
                            <div className={styles.div7}>{t('t67')}</div>
                        ) : (
                            <div>
                                {t('t64')}:&#160;
                                {WalletHelper.formatPrice(user!.balance[setBalanceKey])}
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
                            onChange={(event) => onChangeInput(event.target.value, setBalanceKey)}
                        />
                        <Card className={styles.div521} onClick={onChangeSetBalanceKey}>
                            <CurrencyIcon currency={setBalanceKey} className={styles.div522} />
                            <div className={styles.div523}>{t(currencyWord[setBalanceKey])}</div>
                        </Card>
                    </div>
                </Card>
                <div className={styles.div40} onClick={onRevert}>
                    <Card className={styles.div41}>
                        <RiArrowUpDownLine className={styles.div42} />
                    </Card>
                </div>
                <Card className={styles.div4}>
                    <div className={styles.div5}>
                        <div>Получить</div>
                    </div>
                    <div className={styles.div512}>
                        {getBalanceAmount ? <LuEqualApproximately className={styles.div513} /> : <div></div>}
                        <input
                            className={`empty_input ${styles.div52}`}
                            type="number"
                            placeholder="0"
                            value={getBalanceAmount}
                            onChange={(event) => onChangeInput(event.target.value, getBalanceKey)}
                        />
                        <Card className={styles.div521} onClick={onChangeGetBalanceKey}>
                            <CurrencyIcon currency={getBalanceKey} className={styles.div522} />
                            <div className={styles.div523}>{t(currencyWord[getBalanceKey])}</div>
                        </Card>
                    </div>
                </Card>
                <div className={styles.div21}>
                    <div className={styles.div22}>
                        <div>1</div>
                        <CurrencyIcon currency={setBalanceKey} className={styles.div23} />
                        <LuEqualApproximately />
                        <div>
                            {WalletHelper.convert(1, setBalanceKey, getBalanceKey)}&#160;±&#160;0.1^{scale}
                        </div>
                        <CurrencyIcon currency={getBalanceKey} className={styles.div23} />
                        <div></div>
                    </div>
                </div>
                <Card className={`${styles.div33} ${isNoActive ? styles.noActive : ''}`} onClick={onSubmit}>
                    {t('t62')}
                </Card>
            </div>
        </div>
    );
};
