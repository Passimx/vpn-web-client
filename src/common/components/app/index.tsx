import type { FC } from 'react';
import type { PropsType } from './types/props.type.ts';
import { useTranslation } from '../../hooks/translations/use-translation.ts';
import { useIsIos } from '../../hooks/use-is-ios.hook.ts';
import { useIsPhone } from '../../hooks/use-is-phone.hook.ts';
import { useLoadUser } from '../../hooks/use-load-user.hook.ts';
import styles from './index.module.css';
import { Header } from '../header';
import { TopElements } from '../top-elements';
import { RotateLoading } from '../rotate-loading';
import { useRegisterServiceWorkerWorker } from '../../hooks/use-register-service-worker.hook.ts';
import { useChangeLocation } from '../../hooks/use-change-location.hook.ts';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBoundaryPage } from '../error-boundary-page';
import { useLocation } from 'react-router-dom';
import { useDownloadApp } from '../../hooks/use-download-app.hook.tsx';

export const App: FC<PropsType> = ({ children }) => {
    useIsIos();
    useIsPhone();
    useLoadUser();
    useDownloadApp();
    useChangeLocation();
    useRegisterServiceWorkerWorker();
    const loaded = useTranslation();
    const location = useLocation();

    return (
        <ErrorBoundary FallbackComponent={ErrorBoundaryPage} resetKeys={[location.pathname]}>
            <div className={styles.div1}>
                <TopElements />
                {loaded ? (
                    <>
                        <Header />
                        <div id={'root2'} className={styles.div2}>
                            {children}
                        </div>
                    </>
                ) : (
                    <>
                        <div></div>
                        <RotateLoading />
                    </>
                )}
            </div>
        </ErrorBoundary>
    );
};
