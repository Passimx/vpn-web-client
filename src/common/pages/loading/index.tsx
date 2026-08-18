import styles from './index.module.css';
import { RotateLoading } from '../../components/rotate-loading';
import { FC } from 'react';

const Loading: FC = () => {
    return (
        <div className={styles.div1}>
            <RotateLoading />
        </div>
    );
};

export default Loading;
