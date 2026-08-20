import { FC } from 'react';
import styles from './index.module.css';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/card';
import { Image } from '../../components/image';
import telegram from '../../../../public/assets/images/telegram-icon.png';
import max from '../../../../public/assets/images/max.png';
import wechat from '../../../../public/assets/images/wechat.png';
import whatsapp from '../../../../public/assets/images/whatsapp.png';
import { LuExternalLink } from 'react-icons/lu';
import { useAppAction } from '../../store';
import { InvoicePage } from '../../components/invoice-page';

export const Support: FC = () => {
    const { t } = useTranslation();
    const { setStateApp } = useAppAction();

    const onClick = (url: string) => {
        setStateApp({
            foreground: <InvoicePage request={new Promise((resolve) => resolve(url))} />,
        });
    };

    return (
        <div className={styles.div0}>
            <div className={styles.div1}>
                <div className={styles.div4}>{t('t78')}</div>
                <Card className={styles.div2} onClick={() => onClick('https://t.me/passimx_support')}>
                    <Image src={telegram} className={styles.div3} />
                    <div>{t('t79')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
                <Card
                    className={styles.div2}
                    onClick={() =>
                        onClick('https://max.ru/u/f9LHodD0cOJ18rfdNljgwdHCLoEjiHNl0Qcg3yN0Kdd9fHt2argZW7zbiLA')
                    }
                >
                    <Image src={max} className={styles.div3} />
                    <div>{t('t80')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
                <Card
                    className={styles.div2}
                    onClick={() => onClick('https://u.wechat.com/MDreC9osxAFa5I2J3Su-3HQ?s=2')}
                >
                    <Image src={wechat} className={styles.div3} />
                    <div>{t('t81')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
                <Card className={styles.div2} onClick={() => onClick('https://wa.me/qr/HT56NCP7L5BRG1')}>
                    <Image src={whatsapp} className={styles.div3} />
                    <div>{t('t82')}</div>
                    <LuExternalLink className={'icon'} />
                </Card>
            </div>
        </div>
    );
};
