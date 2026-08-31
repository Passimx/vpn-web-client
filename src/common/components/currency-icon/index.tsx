import { FC } from 'react';
import styles from './index.module.css';
import { PropsType } from './types/props.type.ts';
import cny from '../../../../public/assets/images/cny.svg';
import ton from '../../../../public/assets/images/ton.svg';
import { Image } from '../image';
import { FaEthereum, FaRubleSign } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';
import { TbCurrencyBitcoin } from 'react-icons/tb';

const CURRENCY_CONFIG = {
    cny: { wrap: styles.cny1, icon: <Image src={cny} className={`${styles.cny2} ${styles.icon}`} /> },
    rub: { wrap: styles.rub1, icon: <FaRubleSign className={`${styles.rub2} ${styles.icon}`} /> },
    usd: { wrap: styles.usd1, icon: <BiDollar className={`${styles.usd2} ${styles.icon}`} /> },
    ton: { wrap: styles.ton1, icon: <Image src={ton} className={`${styles.ton2} ${styles.icon}`} /> },
    ethereum: { wrap: styles.ethereum1, icon: <FaEthereum className={`${styles.ethereum2} ${styles.icon}`} /> },
    bitcoin: { wrap: styles.bitcoin1, icon: <TbCurrencyBitcoin className={`${styles.bitcoin2} ${styles.icon}`} /> },
} as const;

export const CurrencyIcon: FC<PropsType> = ({ currency, className }) => {
    const config = CURRENCY_CONFIG[currency as keyof typeof CURRENCY_CONFIG];
    if (!config) return null;

    return <div className={`${config.wrap} ${className}`}>{config.icon}</div>;
};
