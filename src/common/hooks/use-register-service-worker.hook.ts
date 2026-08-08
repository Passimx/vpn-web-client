import { useEffect } from 'react';

export const useRegisterServiceWorkerWorker = () => {
    useEffect(() => {
        const init = async () => {
            const exists = await navigator.serviceWorker.getRegistration();
            if (!exists) await navigator.serviceWorker?.register('/worker.js', { scope: '/' });
        };

        init();
    }, []);
};
