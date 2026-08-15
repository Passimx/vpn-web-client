import styles from './index.module.css';
import { Suspense } from 'react';
import { RotateLoading } from '../../components/rotate-loading';

const Lazy = ({ children }: { children: React.ReactNode }) => {
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
