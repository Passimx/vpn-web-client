import { FC } from 'react';
import { CopiedText } from '../copied-text';
import { Foreground } from '../foreground';

/** Foreground components */
export const TopElements: FC = () => {
    return (
        <>
            <Foreground />
            <CopiedText />
        </>
    );
};
