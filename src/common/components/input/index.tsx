import { FC, useState } from 'react';
import { PropsType } from './types/props.type.ts';
import styles from './index.module.css';
import { MdOutlineCancel } from 'react-icons/md';

const Input: FC<Partial<PropsType>> = ({ placeholder, id, type, value = '', onChangeValue }) => {
    const [ownValue, setOwnValue] = useState<string>(value);
    const isTexted = ownValue.length > 0;

    const cancel = () => {
        setOwnValue('');
        if (onChangeValue) onChangeValue('');
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
                    const val = e.target.value;

                    if (type !== 'number') {
                        setOwnValue(val);
                        if (onChangeValue) onChangeValue(val);
                        return;
                    }

                    try {
                        const number = Number(val);
                        if (number < 0 || String(number) !== val) {
                            setOwnValue('');
                            if (onChangeValue) onChangeValue('');
                            return;
                        }
                        setOwnValue(val);
                        if (onChangeValue) onChangeValue(val);
                    } catch (error) {
                        console.log(error);
                        setOwnValue('');
                        if (onChangeValue) onChangeValue('');
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
