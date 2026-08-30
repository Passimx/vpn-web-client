import { FC } from 'react';
import { CopiedText } from '../copied-text';
import { Foreground } from '../foreground';
import { Notifications } from '../notifications';

/** Foreground components */
export const TopElements: FC = () => {
    return (
        <>
            <Foreground />
            <CopiedText />
            <Notifications />
        </>
    );
};
