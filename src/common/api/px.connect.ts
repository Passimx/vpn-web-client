import { Envs } from '../config/envs/envs.ts';
import { PxConnect } from '@passimx/px.connect';
import { EventsEnum } from '../types/events/events.enum.ts';

export const px = new PxConnect(Envs.pxConnectUrl);

export const callAction = <T>(action: EventsEnum, payload?: unknown) =>
    px.callAction<T>({ channelId: Envs.pxChannelId }, { action, payload });
