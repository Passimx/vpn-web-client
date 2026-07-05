import { MouseEventHandler } from 'react';

export type PropsType = {
    src?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
};
