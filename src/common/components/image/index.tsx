import { FC, useState } from 'react';
import styles from './index.module.css';
import { PropsType } from './types/props.type.ts';

export const Image: FC<PropsType> = ({ src, className, onClick }) => {
    const [loading, setLoading] = useState<boolean>(true);

    const onLoad = () => {
        setLoading(false);
    };

    return (
        <div className={`${styles.background} ${loading ? styles.load : ''} ${className}`} onClick={onClick}>
            <img src={src} className={className} alt={'icon'} onLoad={onLoad} />
        </div>
    );
};
