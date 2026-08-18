import { FC, useEffect } from 'react';
import Loading from '../../pages/loading';
import { useNavigate } from 'react-router-dom';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { useAppAction } from '../../store';

interface ErrorBoundaryPageProps {
    error: unknown;
    resetErrorBoundary: () => void;
}

export const ErrorBoundaryPage: FC<ErrorBoundaryPageProps> = ({ error, resetErrorBoundary }) => {
    const { postMessage } = useAppAction();
    const navigate = useNavigate();

    useEffect(() => {
        postMessage({ event: EventsEnum.SHOW_TEXT, data: 't0' });
        resetErrorBoundary();
        console.log(error);
        navigate('/menu', { replace: true });
    }, []);

    return <Loading />;
};
