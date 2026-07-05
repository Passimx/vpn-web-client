import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type AppStateType } from './types/app-state.type.ts';
import type { EventsType } from '../../types/events/event-data.type.ts';

const channel = new BroadcastChannel('ws-channel');

const initialState: AppStateType = {};

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        postMessageToBroadCastChannel(_state, { payload }: PayloadAction<EventsType>) {
            channel.postMessage(payload);
        },

        setStateApp(state, { payload }: PayloadAction<Partial<AppStateType>>) {
            for (const [key, value] of Object.entries(payload) as [
                keyof AppStateType,
                AppStateType[keyof AppStateType],
            ][]) {
                state[key] = value as never;
            }
        },
    },
});

export const AppActions = AppSlice.actions;
export const AppReducers = AppSlice.reducer;
