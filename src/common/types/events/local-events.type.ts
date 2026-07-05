import { EventsEnum } from './events.enum.ts';

type ShowText = {
    readonly event: EventsEnum.SHOW_TEXT;
    readonly data: string;
};

export type LocalEvents = ShowText;
