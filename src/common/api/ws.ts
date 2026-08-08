import { Envs } from '../config/envs/envs.ts';
import { PxConnect } from '@passimx/px.connect';
// import { PxConnect } from './package/src';
import { EventsEnum } from '../types/events/events.enum.ts';

export const px = new PxConnect('ws://localhost:7022');

export const callAction = <T>(action: EventsEnum, payload?: unknown) =>
    px.callAction<T>({ channelId: Envs.pxChannelId }, { action, payload });
