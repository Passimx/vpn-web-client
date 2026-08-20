import { FC } from 'react';
import styles from './index.module.css';
import { Card } from '../../components/card';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { LuExternalLink, LuSearchX } from 'react-icons/lu';
import { useAppSelector } from '../../store';
import { shortText } from '../../hooks/short-text.ts';

export const MySubscriptions: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const keys = useAppSelector((state) => state.app.user?.keys);

    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                <div className={styles.div21}>{t('t1')}</div>
                {!keys?.length ? (
                    <Card className={styles.div3}>
                        <LuSearchX className={'icon'} />
                        <div>{t('t45')}</div>
                    </Card>
                ) : (
                    <>
                        {keys.map((key, index) => (
                            <Card
                                key={key.id}
                                className={styles.div4}
                                onClick={() => navigate(`/my-subscriptions/${key.id}`)}
                            >
                                <div>
                                    {index + 1})&#160;
                                    {shortText(key.id)}
                                </div>
                                <LuExternalLink className={'icon'} />
                            </Card>
                        ))}
                    </>
                )}

                <Card className={styles.div3} onClick={() => navigate('/tariffs')}>
                    <IoIosAddCircleOutline className={'icon'} />
                    <div>{t('t40')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
            </div>
        </div>
    );
};
