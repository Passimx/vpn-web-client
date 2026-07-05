import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

const useClickOutside = (
    visible?: boolean,
): [RefObject<HTMLDivElement | null>, boolean | undefined, (value: boolean) => void] => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(!!visible);

    const handleClickOutside = useCallback((event: any) => {
        if (event && ref.current && !ref.current.contains(event.target)) {
            setTimeout(() => setIsVisible(false), 50);
        }
    }, []);

    useEffect(() => {
        return () => document.removeEventListener('mouseup', handleClickOutside, false);
    }, [visible]);

    useEffect(() => {
        if (isVisible) document.addEventListener('mouseup', handleClickOutside, false);
        else document.removeEventListener('mouseup', handleClickOutside, false);
    }, [isVisible, ref]);

    return [ref, isVisible, setIsVisible];
};

export default useClickOutside;
