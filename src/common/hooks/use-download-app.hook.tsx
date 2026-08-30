import { useEffect } from 'react';
import { useAppAction, useAppSelector } from '../store';
import { NotificationType } from '../store/app/types/app-state.type.ts';
import { useNavigate } from 'react-router-dom';

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
}

let deferredPrompt: BeforeInstallPromptEvent | undefined;

export const useDownloadApp = () => {
    const { pushNotification } = useAppAction();
    const lang = useAppSelector((state) => state.app.lang);
    const isIos = useAppSelector((state) => state.app.isIos);
    const isPhone = useAppSelector((state) => state.app.isPhone);
    const navigate = useNavigate();

    useEffect(() => {
        const beforeinstallprompt = (e: any) => {
            e.preventDefault();
            deferredPrompt = e;
        };

        window.addEventListener('beforeinstallprompt', beforeinstallprompt);
        return () => window.removeEventListener('beforeinstallprompt', beforeinstallprompt);
    }, []);

    useEffect(() => {
        const interval = 5000;
        if (!lang?.length) return;
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (isStandalone) return;

        const push = () => {
            const onclick = () => {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    return;
                }
                navigate('/download-pwa');
            };

            const notification: NotificationType = {
                id: globalThis.crypto.randomUUID(),
                title: 't98',
                description: 't99',
                onclick,
            };
            pushNotification(notification);
        };

        const handler = setTimeout(push, interval);
        return () => clearTimeout(handler);
    }, [lang, isIos, isPhone]);
};
