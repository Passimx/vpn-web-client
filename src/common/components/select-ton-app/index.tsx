import { FC } from 'react';
import styles from './index.module.css';
import { Card } from '../card';
import { PropsType } from './types/props.type.ts';
import tonkeeper from '../../../../public/assets/images/tonkeeper.png';
import mytonwallet from '../../../../public/assets/images/mytonwallet.png';
import tonhub from '../../../../public/assets/images/tonhub.png';
import { AppWalletEnum } from '../../types/api/app-wallet.enum.ts';
import { Image } from '../image';
import { useTranslation } from 'react-i18next';

export const SelectTonApp: FC<PropsType> = ({ onChange }) => {
    const { t } = useTranslation();

    const tonApps = [
        { value: AppWalletEnum.TON_KEEPER, icon: tonkeeper, name: 'Tonkeeper' },
        { value: AppWalletEnum.MY_TON_WALLET, icon: mytonwallet, name: 'MyTonWallet' },
        { value: AppWalletEnum.TON_HUB, icon: tonhub, name: 'Tonhub' },
    ];

    return (
        <Card className={styles.div1}>
            <div className={styles.div11}>{t('t87')}</div>
            {tonApps.map((app) => (
                <div key={app.value} className={styles.div2} onClick={() => onChange(app.value)}>
                    <Image src={app.icon} className={styles.div3} />
                    <div className={styles.div4}>
                        <div className={styles.div5}>{app.name}</div>
                    </div>
                </div>
            ))}
        </Card>
    );
};
