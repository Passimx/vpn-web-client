import { FC } from 'react';
import styles from './index.module.css';
import { Menu } from '../menu';

export const Phone: FC = () => {
    return (
        <div className={styles.div1}>
            <Menu />
        </div>
    );
};
