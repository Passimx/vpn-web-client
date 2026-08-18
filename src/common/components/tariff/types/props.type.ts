import { ITariff } from '../../../types/api/tariffs.interface.ts';

export type PropsType = {
    tariff: ITariff;
    onClick?: (...args: unknown[]) => void;
    children?: React.ReactNode[] | React.ReactNode;
};
