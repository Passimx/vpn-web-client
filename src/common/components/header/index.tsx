import { FC, useEffect } from 'react';
import styles from './index.module.css';
import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppAction, useAppSelector } from '../../store';
import { FaUserCircle } from 'react-icons/fa';
import { MyProfile } from '../my-profile';

export const Header: FC = () => {
    const { setStateApp } = useAppAction();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.app.user);

    useEffect(() => {
        const element = document.getElementById(styles.div33);
        if (!element) return;
        element.style.transform = `scale(${['/menu', '/', '/login'].includes(location.pathname) ? 0 : 1})`;
    }, [location.pathname]);

    const onProfile = () => {
        setStateApp({ foreground: <MyProfile /> });
    };

    return (
        <div className={styles.div1}>
            <div className={styles.div22}>
                <div id={styles.div33} onClick={() => navigate(-1)}>
                    <IoIosArrowBack className={styles.div4} />
                </div>
            </div>
            {user && (
                <div className={styles.div3} onClick={onProfile}>
                    <div className={styles.div5}>
                        <FaUserCircle className={styles.div6} />
                    </div>
                </div>
            )}
        </div>
    );
};
