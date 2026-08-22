import { FC, useState } from 'react';
import styles from './index.module.css';
import { CurrencyIcon } from '../currency-icon';
import { BalanceAccount } from '../../store/app/types/app-state.type.ts';
import { useTranslation } from 'react-i18next';
import { Card } from '../card';
import { FaCheck } from 'react-icons/fa';
import { PropsType } from './types/props.type.ts';

export const ChangeTonCurrency: FC<PropsType> = ({ onChange, currency }) => {
    const { t } = useTranslation();
    const currencyWord = { ton: 'TON', usd: 'USD' };
    const [localCurrency, setLocalCurrency] = useState<keyof BalanceAccount>(currency);

    const onClick = (value: string) => {
        onChange(value as keyof BalanceAccount);
        setLocalCurrency(value as keyof BalanceAccount);
    };

    return (
        <Card className={styles.div1}>
            <div className={styles.div11}>{t('t88')}</div>
            {Object.entries(currencyWord).map(([key, name]) => (
                <div key={key} className={styles.div2} onClick={() => onClick(key)}>
                    <CurrencyIcon className={styles.div3} currency={key as keyof BalanceAccount} />
                    <div className={styles.div4}>
                        <div className={styles.div5}>{t(name)}</div>
                    </div>
                    {localCurrency === key && <FaCheck className={'icon'} />}
                </div>
            ))}
        </Card>
    );
};
