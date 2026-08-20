import { FC } from 'react';
import styles from './index.module.css';

export const VideoAppStore: FC = () => {
    return (
        <video className={styles.div1} controls playsInline preload="metadata">
            <source src="/assets/videos/app-store-instruction.mp4#t=0.001" type="video/mp4" />
        </video>
    );
};
