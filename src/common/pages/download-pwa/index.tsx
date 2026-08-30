import { FC } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import iphone from '../../../../public/assets/images/iphone.png';
import { Image } from '../../components/image';
import pxicon from '../../../../public/assets/icons/256.png';
import { IoCopyOutline, IoShareOutline } from 'react-icons/io5';
import { CiSquarePlus } from 'react-icons/ci';
import { useAppAction } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';

export const DownloadPwa: FC = () => {
    const { t } = useTranslation();
    const { postMessage } = useAppAction();

    const copyHost = () => {
        window.navigator.clipboard.writeText(window.location.host);

        postMessage({ event: EventsEnum.SHOW_TEXT, data: 't10' });
    };

    return (
        <div className={styles.div0}>
            <div className={styles.div1}>
                <div className={styles.div2}>{t('t97')}</div>
                <div className={styles.div3}>
                    <div className={styles.div31}>
                        <Image src={iphone} className={styles.div311} />
                        <div className={styles.div312}>
                            <div className={styles.div3121}></div>
                            <div className={styles.div3121}></div>
                            <div className={styles.div3121}></div>
                            <div className={styles.div3121}></div>
                            <div className={styles.div3121}></div>
                            <div className={styles.div3121}></div>
                            <div className={styles.div3121}></div>
                            <div className={styles.div3121}></div>
                            <div className={styles.div3121}></div>
                            <div className={styles.div3121}></div>
                            <div className={styles.div3121}></div>
                            <Image src={pxicon} className={styles.div3121} />
                        </div>
                    </div>
                    <div className={styles.div32}>
                        <div className={styles.div321}>
                            {t('t100')}&#160;PassimX VPN&#160;{t('t101')}
                        </div>
                        <div className={styles.div322}>
                            <div className={styles.div3221} onClick={copyHost}>
                                <div className={styles.div32211}>{t('t107')}</div>
                                <div className={`${styles.div32212} ${styles.div32211}`}>
                                    &#160;{window.location.host}
                                </div>
                                <IoCopyOutline className={'icon'} />
                            </div>
                            <div className={styles.div3221}>
                                <div className={styles.div32211}>{t('t108')}</div>
                            </div>
                            <div className={styles.div3221}>
                                <div className={styles.div32211}>{t('t102')}</div>
                                <IoShareOutline className={styles.div32212} />
                                <div className={styles.div32211}>{t('t103')}</div>
                            </div>
                            <div className={styles.div3221}>
                                <div className={styles.div32211}>{t('t104')}</div>
                                <CiSquarePlus className={styles.div32212} />
                                <div className={`${styles.div32212} ${styles.div32211}`}>{t('t105')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
