import { EventsEnum } from './events.enum.ts';

type ShowText = {
    readonly event: EventsEnum.SHOW_TEXT;
    readonly data: string;
};

type SetStateApp = {
    readonly event: EventsEnum.SET_STATE_APP;
    readonly data: string;
};

export type LocalEvents = ShowText | SetStateApp;
