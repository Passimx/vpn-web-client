import { ChangeEvent, FC, useState } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/card';
import { BalanceAccount } from '../../store/app/types/app-state.type.ts';
import { useAppAction, useAppSelector } from '../../store';
import { CurrencyIcon } from '../../components/currency-icon';
import { currencyWord } from './consts/currency-word.ts';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { LuEqualApproximately } from 'react-icons/lu';
import { ChangeCurrency } from '../../components/change-currency';
import { WalletHelper } from '../put-money-wallet/helper.ts';

export const Exchange: FC = () => {
    const { t } = useTranslation();
    const inputSetBalanceId = 'inputSetBalanceId';
    const inputGetBalanceKeyId = 'inputGetBalanceKeyId';
    const user = useAppSelector((state) => state.app.user);
    const { setStateApp } = useAppAction();

    const allKeys = Object.keys(user!.balance) as (keyof BalanceAccount)[];
    const otherKey = allKeys.find((key) => key !== t('t4'))!;

    const [setBalanceKey, setSetBalanceKey] = useState<keyof BalanceAccount>(t('t4') as keyof BalanceAccount);
    const [getBalanceKey, getSetBalanceKey] = useState<keyof BalanceAccount>(otherKey);

    const [setBalanceAmount, setSetBalanceAmount] = useState<number | undefined>(0);
    const [getBalanceAmount, getSetBalanceAmount] = useState<number | undefined>(0);

    const setBalanceAmountFunc = (value: number | undefined) => {
        const element = document.getElementById(inputSetBalanceId) as HTMLInputElement;
        if (!element) return;

        element.value = `${value}`;
        setSetBalanceAmount(value);
    };

    const getBalanceAmountFunc = (value: number | undefined) => {
        const element = document.getElementById(inputGetBalanceKeyId) as HTMLInputElement;
        if (!element) return;

        element.value = `${value}`;
        getSetBalanceAmount(value);
    };

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>, from: string) => {
        let getAmount: number | undefined;
        let setAmount: number | undefined;
        const value = event.target.value;

        if (value.length) {
            const number = Number(value);

            if (number > 0) {
                setAmount = WalletHelper.convert(Number(value), from, setBalanceKey);
                getAmount = WalletHelper.convert(Number(value), from, getBalanceKey);
            }
        }

        setBalanceAmountFunc(setAmount);
        getBalanceAmountFunc(getAmount);
    };

    const onChangeSetBalanceKey = () => {
        const onChange = (currency: keyof BalanceAccount) => {
            setSetBalanceKey(currency);
        };

        setStateApp({ foreground: <ChangeCurrency currency={setBalanceKey} onChange={onChange} /> });
    };

    const onChangeGetBalanceKey = () => {
        const onChange = (currency: keyof BalanceAccount) => {
            getSetBalanceKey(currency);
        };

        setStateApp({ foreground: <ChangeCurrency currency={getBalanceKey} onChange={onChange} /> });
    };

    const setBalanceKeyMax = () => {
        const amount = WalletHelper.formatPrice(user!.balance[setBalanceKey]).replace(',', '.');
        setBalanceAmountFunc(Number(amount));
    };

    const onRevert = () => {
        setSetBalanceKey(getBalanceKey);
        getSetBalanceKey(setBalanceKey);
        setBalanceAmountFunc(getBalanceAmount);
        getBalanceAmountFunc(setBalanceAmount);
    };

    const isNoActive =
        setBalanceKey === getBalanceKey || !setBalanceAmount || setBalanceAmount > user!.balance[setBalanceKey];

    const onSubmit = () => {
        if (isNoActive) return;
    };

    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                <div className={styles.div3}>{t('t63')}</div>
                <Card className={styles.div4}>
                    <div className={styles.div5}>
                        <div>{t('t65')}</div>
                        {(setBalanceAmount ?? 0) > user!.balance[setBalanceKey] ? (
                            <div className={styles.div7}>{t('t67')}</div>
                        ) : (
                            <div>
                                {t('t64')}:&#160;{WalletHelper.formatPrice(user!.balance[setBalanceKey])}
                            </div>
                        )}
                        <div className={styles.div6} onClick={setBalanceKeyMax}>
                            MAX
                        </div>
                    </div>
                    <div className={styles.div51}>
                        <input
                            id={inputSetBalanceId}
                            className={styles.div52}
                            type={'number'}
                            placeholder={'0'}
                            onChange={(event) => onChangeInput(event, setBalanceKey)}
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
                            id={inputGetBalanceKeyId}
                            className={styles.div52}
                            type={'number'}
                            placeholder={'0'}
                            onChange={(event) => onChangeInput(event, getBalanceKey)}
                        />
                        <Card className={styles.div521} onClick={onChangeGetBalanceKey}>
                            <CurrencyIcon currency={getBalanceKey} className={styles.div522} />
                            <div className={styles.div523}>{t(currencyWord[getBalanceKey])}</div>
                        </Card>
                    </div>
                </Card>
                <Card className={`${styles.div33} ${isNoActive && styles.noActive}`} onClick={onSubmit}>
                    {t('t62')}
                </Card>
            </div>
        </div>
    );
};
