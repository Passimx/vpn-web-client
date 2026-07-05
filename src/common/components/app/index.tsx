import type { FC } from 'react';
import type { PropsType } from './types/props.type.ts';
import { useTranslation } from '../../hooks/translations/use-translation.ts';
import { useIsIos } from '../../hooks/use-is-ios.hook.ts';
import { useIsPhone } from '../../hooks/use-is-phone.hook.ts';
import { useLoadUser } from '../../hooks/use-load-user.hook.ts';
import styles from './index.module.css';
import { Header } from '../header';
import { TopElements } from '../top-elements';

export const App: FC<PropsType> = ({ children }) => {
    useIsIos();
    useIsPhone();
    useLoadUser();
    const loaded = useTranslation();

    if (loaded)
        return (
            <div className={styles.div1}>
                <TopElements />
                <Header />
                <div className={styles.div2}>{children}</div>
            </div>
        );
};
