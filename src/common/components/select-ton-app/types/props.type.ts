import { AppWalletEnum } from '../../../types/api/app-wallet.enum.ts';

export type PropsType = {
    onChange: (currency: AppWalletEnum) => void;
};
