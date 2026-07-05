import { FC, useEffect } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { IoIosAdd, IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { WalletHelper } from '../../pages/wallet/helper.ts';
import { BalanceAccount } from '../../store/app/types/app-state.type.ts';

export const Header: FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.app.user);

    useEffect(() => {
        const element = document.getElementById(styles.div33);
        if (!element) return;
        element.style.transform = `scale(${location.pathname === '/' ? 0 : 1})`;
    }, [location.pathname]);

    return (
        <div className={styles.div1}>
            <div className={styles.div22}>
                <div id={styles.div33} onClick={() => navigate(-1)}>
                    <IoIosArrowBack className={styles.div4} />
                </div>
            </div>
            <div className={styles.div3}>
                {user && (
                    <div className={styles.div4}>
                        <div>
                            {WalletHelper.formatPrice(
                                WalletHelper.getTotalBalance(user.balance, t('t4') as keyof BalanceAccount),
                            )}
                        </div>
                        <div>{t('t3')}</div>
                    </div>
                )}
                <div className={styles.div5} onClick={() => navigate('/wallet')}>
                    <IoIosAdd className={styles.div6} />
                </div>
            </div>
        </div>
    );
};
