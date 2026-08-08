import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

export const useChangeLocation = () => {
    const location = useLocation();

    useLayoutEffect(() => {
        const el = document.getElementById('root2');
        if (!el) return;

        el.style.transition = 'none';
        el.style.opacity = '0';

        requestAnimationFrame(() => {
            el.style.transition = 'opacity 0.3s ease-in-out';
            el.style.opacity = '1';
        });
    }, [location.pathname]);
};
