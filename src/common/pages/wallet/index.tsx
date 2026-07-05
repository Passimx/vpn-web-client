import { FC } from 'react';
import styles from './index.module.css';
import { Card } from '../../components/card';
import { useAppSelector } from '../../store';
import { FaRubleSign } from 'react-icons/fa';
import ton from '../../../../public/assets/images/ton.svg';
import cny from '../../../../public/assets/images/cny.svg';
import { useTranslation } from 'react-i18next';
import { WalletHelper } from '../put-money-wallet/helper.ts';
import { useNavigate } from 'react-router-dom';
import { BiDollar } from 'react-icons/bi';
import { Image } from '../../components/image';

export const Wallet: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const balanceAccount = useAppSelector((state) => state.app.user?.balance)!;

    if (!balanceAccount) return;

    return (
        <div className={styles.background}>
            <div className={styles.div01}>
                {WalletHelper.formatPrice(WalletHelper.getTotalBalance(balanceAccount, t('t4')))}&#160;{t('t3')}
            </div>
            <Card>
                <div className={styles.div0}>
                    <div className={styles.div1}>
                        <div className={styles.div2} style={{ backgroundColor: '#800000' }}>
                            <FaRubleSign className={styles.div3} />
                        </div>
                        <div className={styles.div4}>
                            <div className={styles.div5}>
                                <div className={styles.div6}>{t('t11')}</div>
                                <div className={`${styles.div6} ${styles.div8}`}>
                                    {WalletHelper.formatPrice(balanceAccount.rub)}
                                </div>
                            </div>
                            <div className={styles.div5}>
                                <div className={styles.div7}>
                                    {WalletHelper.formatPrice(WalletHelper.convert(1, 'rub', t('t4')))}&#160;{t('t3')}
                                </div>
                                <div className={`${styles.div7} ${styles.div8}`}>
                                    {WalletHelper.formatPrice(WalletHelper.convert(balanceAccount.rub, 'rub', t('t4')))}
                                    &#160;{t('t3')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.div1}>
                        <div className={styles.div2} style={{ backgroundColor: 'red' }}>
                            <Image src={cny} className={styles.div3} />
                        </div>
                        <div className={styles.div4}>
                            <div className={styles.div5}>
                                <div className={styles.div6}>{t('t13')}</div>
                                <div className={`${styles.div6} ${styles.div8}`}>
                                    {WalletHelper.formatPrice(balanceAccount.cny)}
                                </div>
                            </div>
                            <div className={styles.div5}>
                                <div className={styles.div7}>
                                    {WalletHelper.formatPrice(WalletHelper.convert(1, 'cny', t('t4')))}&#160;{t('t3')}
                                </div>
                                <div className={`${styles.div7} ${styles.div8}`}>
                                    {WalletHelper.formatPrice(WalletHelper.convert(balanceAccount.cny, 'cny', t('t4')))}
                                    &#160;
                                    {t('t3')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.div1}>
                        <div className={styles.div2} style={{ backgroundColor: '#0098ea' }}>
                            <Image src={ton} className={styles.div3} />
                        </div>
                        <div className={styles.div4}>
                            <div className={styles.div5}>
                                <div className={styles.div6}>TON</div>
                                <div className={`${styles.div6} ${styles.div8}`}>
                                    {WalletHelper.formatPrice(balanceAccount.ton)}
                                </div>
                            </div>
                            <div className={styles.div5}>
                                <div className={styles.div7}>
                                    {WalletHelper.formatPrice(WalletHelper.convert(1, 'ton', t('t4')))}
                                    &#160;{t('t3')}
                                </div>
                                <div className={`${styles.div7} ${styles.div8}`}>
                                    {WalletHelper.formatPrice(WalletHelper.convert(balanceAccount.ton, 'ton', t('t4')))}
                                    &#160;{t('t3')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.div1}>
                        <div className={styles.div2} style={{ backgroundColor: '#00b386' }}>
                            <BiDollar className={styles.div3} />
                        </div>
                        <div className={styles.div4}>
                            <div className={styles.div5}>
                                <div className={styles.div6}>USD</div>
                                <div className={`${styles.div6} ${styles.div8}`}>
                                    {WalletHelper.formatPrice(balanceAccount.usd)}
                                </div>
                            </div>
                            <div className={styles.div5}>
                                <div className={styles.div7}>
                                    {WalletHelper.formatPrice(WalletHelper.convert(1, 'usd', t('t4')))}&#160;{t('t3')}
                                </div>
                                <div className={`${styles.div7} ${styles.div8}`}>
                                    {WalletHelper.formatPrice(WalletHelper.convert(balanceAccount.usd, 'usd', t('t4')))}
                                    &#160;{t('t3')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <Card onClick={() => navigate('/put-money-wallet')}>
                <div className={styles.div20}>{t('t12')}</div>
            </Card>
        </div>
    );
};
