import { FC } from 'react';
import styles from './index.module.css';

export const VideoAppStore: FC = () => {
    return (
        <video className={styles.div1} controls>
            <source src="/assets/videos/app-store-instruction.mp4" type="video/mp4" />
        </video>
    );
};
