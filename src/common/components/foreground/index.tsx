import { FC, useEffect } from 'react';
import { useAppAction, useAppSelector } from '../../store';
import { MdOutlineClose } from 'react-icons/md';
import styles from './index.module.css';
import useClickOutside from '../../hooks/use-click-outside.ts';

export const Foreground: FC = () => {
    const { setStateApp } = useAppAction();
    const [ref, isVisible, setIsVisible] = useClickOutside();
    const foreground = useAppSelector((state) => state.app.foreground);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setStateApp({ foreground: undefined });
    };

    useEffect(() => {
        setIsVisible(!!foreground);
    }, [foreground]);

    useEffect(() => {
        if (isVisible) {
            window.addEventListener('keydown', handleKeyDown);
        }

        if (!isVisible) {
            setStateApp({ foreground: undefined });
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isVisible]);

    if (foreground)
        return (
            <div className={styles.background}>
                <div className={styles.cancel_background}>
                    <MdOutlineClose className={styles.cancel_button} />
                </div>
                <div ref={ref} className={styles.foreground}>
                    {foreground}
                </div>
            </div>
        );
};
