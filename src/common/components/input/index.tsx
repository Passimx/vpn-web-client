import { FC, useState } from 'react';
import { PropsType } from './types/props.type.ts';
import styles from './index.module.css';
import { MdOutlineCancel } from 'react-icons/md';

const Input: FC<Partial<PropsType>> = ({ placeholder, id, type, value = '' }) => {
    const [ownValue, setOwnValue] = useState<string>(value);
    const isTexted = ownValue.length > 0;

    const cancel = () => {
        setOwnValue('');
    };

    return (
        <div id={styles.background}>
            <input
                id={id}
                className={`${styles.button} text_translate`}
                placeholder={placeholder}
                value={ownValue}
                type={type}
                onChange={(e) => {
                    const value = e.target.value;
                    if (type !== 'number') return setOwnValue(value);

                    try {
                        const number = Number(value);

                        if (number < 0) return setOwnValue('');
                        if (String(number) != value) return setOwnValue('');
                        return setOwnValue(value);
                    } catch (e) {
                        console.log(e);
                        setOwnValue('');
                    }
                }}
            />
            <div id={styles.cancel}>
                {isTexted && (
                    <MdOutlineCancel
                        id={styles.cancel_logo}
                        className={ownValue ? styles.logo_show : styles.logo_hide}
                        onClick={cancel}
                    />
                )}
            </div>
        </div>
    );
};

export default Input;
