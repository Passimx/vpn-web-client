import { FC } from 'react';
import styles from './index.module.css';
import { PropsType } from './types/props.type.ts';
import cny from '../../../../public/assets/images/cny.svg';
import ton from '../../../../public/assets/images/ton.svg';
import { Image } from '../image';
import { FaRubleSign } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';

const CURRENCY_CONFIG = {
    cny: { wrap: styles.cny1, icon: <Image src={cny} className={styles.cny2} /> },
    rub: { wrap: styles.rub1, icon: <FaRubleSign className={styles.rub2} /> },
    ton: { wrap: styles.ton1, icon: <Image src={ton} className={styles.ton2} /> },
    usd: { wrap: styles.usd1, icon: <BiDollar className={styles.usd2} /> },
} as const;

export const CurrencyIcon: FC<PropsType> = ({ currency, className }) => {
    const config = CURRENCY_CONFIG[currency as keyof typeof CURRENCY_CONFIG];
    if (!config) return null;

    return <div className={`${config.wrap} ${className}`}>{config.icon}</div>;
};
