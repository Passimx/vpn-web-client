import styles from './index.module.css';
import { FC, Suspense } from 'react';
import { RotateLoading } from '../../components/rotate-loading';

const Lazy: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Suspense
            fallback={
                <div className={styles.div1}>
                    <RotateLoading />
                </div>
            }
        >
            {children}
        </Suspense>
    );
};

export default Lazy;
