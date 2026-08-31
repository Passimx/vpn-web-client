import { FC } from 'react';
import styles from './index.module.css';
import { Card } from '../../components/card';
import { useAppSelector } from '../../store';
import { useTranslation } from 'react-i18next';
import { WalletHelper } from '../put-money-wallet/helper.ts';
import { useNavigate } from 'react-router-dom';
import { RiArrowDownLongLine, RiArrowUpDownLine, RiArrowUpLongLine } from 'react-icons/ri';
import { CurrencyIcon } from '../../components/currency-icon';
import { TransactionsHistory } from '../../components/transactions-history';

export const Wallet: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const balanceAccount = useAppSelector((state) => state.app.user?.balance)!;

    if (!balanceAccount) return;

    return (
        <div className={styles.background}>
            <div className={styles.div0}>
                <div className={styles.div01}>
                    {WalletHelper.formatPrice(WalletHelper.getTotalBalance(balanceAccount, t('t4')))}&#160;
                    {t('t3')}
                </div>
                <div className={styles.div011}>
                    <div className={styles.div012} onClick={() => navigate('/deposit')}>
                        <Card className={styles.div013}>
                            <RiArrowDownLongLine className={styles.div014} />
                        </Card>
                        <div>{t('t12')}</div>
                    </div>
                    <div className={styles.div012} onClick={() => navigate('/transfer')}>
                        <Card className={styles.div013}>
                            <RiArrowUpLongLine className={styles.div014} />
                        </Card>
                        <div>{t('t89')}</div>
                    </div>
                    <div className={styles.div012} onClick={() => navigate('/exchange')}>
                        <Card className={styles.div013}>
                            <RiArrowUpDownLine className={styles.div014} />
                        </Card>
                        <div>{t('t90')}</div>
                    </div>
                </div>
                <Card>
                    <div className={styles.div0}>
                        <div className={styles.div1}>
                            <CurrencyIcon currency={'rub'} className={styles.div2} />
                            <div className={styles.div4}>
                                <div className={styles.div5}>
                                    <div className={styles.div6}>{t('t11')}</div>
                                    <div className={`${styles.div6} ${styles.div8}`}>
                                        {WalletHelper.formatPrice(balanceAccount.rub)}
                                    </div>
                                </div>
                                <div className={styles.div5}>
                                    <div className={styles.div7}>
                                        {WalletHelper.formatPrice(WalletHelper.convert(1, 'rub', t('t4')))}&#160;
                                        {t('t3')}
                                    </div>
                                    <div className={`${styles.div7} ${styles.div8}`}>
                                        {WalletHelper.formatPrice(
                                            WalletHelper.convert(balanceAccount.rub, 'rub', t('t4')),
                                        )}
                                        &#160;{t('t3')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.div1}>
                            <CurrencyIcon currency={'cny'} className={styles.div2} />
                            <div className={styles.div4}>
                                <div className={styles.div5}>
                                    <div className={styles.div6}>{t('t13')}</div>
                                    <div className={`${styles.div6} ${styles.div8}`}>
                                        {WalletHelper.formatPrice(balanceAccount.cny)}
                                    </div>
                                </div>
                                <div className={styles.div5}>
                                    <div className={styles.div7}>
                                        {WalletHelper.formatPrice(WalletHelper.convert(1, 'cny', t('t4')))}&#160;
                                        {t('t3')}
                                    </div>
                                    <div className={`${styles.div7} ${styles.div8}`}>
                                        {WalletHelper.formatPrice(
                                            WalletHelper.convert(balanceAccount.cny, 'cny', t('t4')),
                                        )}
                                        &#160;
                                        {t('t3')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.div1}>
                            <CurrencyIcon currency={'usd'} className={styles.div2} />
                            <div className={styles.div4}>
                                <div className={styles.div5}>
                                    <div className={styles.div6}>USD</div>
                                    <div className={`${styles.div6} ${styles.div8}`}>
                                        {WalletHelper.formatPrice(balanceAccount.usd)}
                                    </div>
                                </div>
                                <div className={styles.div5}>
                                    <div className={styles.div7}>
                                        {WalletHelper.formatPrice(WalletHelper.convert(1, 'usd', t('t4')))}&#160;
                                        {t('t3')}
                                    </div>
                                    <div className={`${styles.div7} ${styles.div8}`}>
                                        {WalletHelper.formatPrice(
                                            WalletHelper.convert(balanceAccount.usd, 'usd', t('t4')),
                                        )}
                                        &#160;{t('t3')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.div1}>
                            <CurrencyIcon currency={'ton'} className={styles.div2} />
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
                                        {WalletHelper.formatPrice(
                                            WalletHelper.convert(balanceAccount.ton, 'ton', t('t4')),
                                        )}
                                        &#160;{t('t3')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.div1}>
                            <CurrencyIcon currency={'ethereum'} className={styles.div2} />
                            <div className={styles.div4}>
                                <div className={styles.div5}>
                                    <div className={styles.div6}>ETHEREUM</div>
                                    <div className={`${styles.div6} ${styles.div8}`}>
                                        {WalletHelper.formatPrice(balanceAccount.ethereum)}
                                    </div>
                                </div>
                                <div className={styles.div5}>
                                    <div className={styles.div7}>
                                        {WalletHelper.formatPrice(WalletHelper.convert(1, 'ethereum', t('t4')))}
                                        &#160;{t('t3')}
                                    </div>
                                    <div className={`${styles.div7} ${styles.div8}`}>
                                        {WalletHelper.formatPrice(
                                            WalletHelper.convert(balanceAccount.ethereum, 'ethereum', t('t4')),
                                        )}
                                        &#160;{t('t3')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.div1}>
                            <CurrencyIcon currency={'bitcoin'} className={styles.div2} />
                            <div className={styles.div4}>
                                <div className={styles.div5}>
                                    <div className={styles.div6}>BITCOIN</div>
                                    <div className={`${styles.div6} ${styles.div8}`}>
                                        {WalletHelper.formatPrice(balanceAccount.bitcoin)}
                                    </div>
                                </div>
                                <div className={styles.div5}>
                                    <div className={styles.div7}>
                                        {WalletHelper.formatPrice(WalletHelper.convert(1, 'bitcoin', t('t4')))}
                                        &#160;{t('t3')}
                                    </div>
                                    <div className={`${styles.div7} ${styles.div8}`}>
                                        {WalletHelper.formatPrice(
                                            WalletHelper.convert(balanceAccount.bitcoin, 'bitcoin', t('t4')),
                                        )}
                                        &#160;{t('t3')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className={styles.div001}>{t('t84')}</div>
                <TransactionsHistory />
            </div>
        </div>
    );
};
