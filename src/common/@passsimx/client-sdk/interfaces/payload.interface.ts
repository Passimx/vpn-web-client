import { UserInterface } from './user.interface.ts';

export interface PayloadInterface {
    readonly lang: string;

    readonly connectionId: string;

    readonly user: UserInterface;
}
