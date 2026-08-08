import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type AppStateType } from './types/app-state.type.ts';
import type { EventsType } from '../../types/events/event-data.type.ts';

const initialState: AppStateType = {};

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        postMessage(_state, { payload }: PayloadAction<EventsType>) {
            window.postMessage(payload, window.origin);
        },

        setStateApp(state, { payload }: PayloadAction<Partial<AppStateType>>) {
            for (const [key, value] of Object.entries(payload) as [
                keyof AppStateType,
                AppStateType[keyof AppStateType],
            ][]) {
                state[key] = value as never;
            }

            if (state.user !== undefined) localStorage.setItem('user', JSON.stringify(state.user));
        },
    },
});

export const AppActions = AppSlice.actions;
export const AppReducers = AppSlice.reducer;
