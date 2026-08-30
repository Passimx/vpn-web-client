import { createSlice, type PayloadAction, current } from '@reduxjs/toolkit';
import { type AppStateType, NotificationType } from './types/app-state.type.ts';
import type { EventsType } from '../../types/events/event-data.type.ts';

const initialState: AppStateType = {
    notifications: [],
};

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        postMessage(_state, { payload }: PayloadAction<EventsType>) {
            window.postMessage(payload, window.origin);
        },

        pushNotification(state, { payload }: PayloadAction<NotificationType>) {
            if (!state.notifications) state.notifications = [];
            state.notifications.unshift(payload);
        },

        removeNotification(state, { payload }: PayloadAction<string>) {
            const index = state.notifications?.findIndex((item) => item.id === payload);
            if (index === undefined || index < 0) return;
            state.notifications?.splice(index, 1);
        },

        setStateApp(state, { payload }: PayloadAction<Partial<AppStateType>>) {
            for (const [key, value] of Object.entries(payload) as [
                keyof AppStateType,
                AppStateType[keyof AppStateType],
            ][]) {
                state[key] = value as never;
            }

            const actualString = localStorage.getItem('state');
            const actual = JSON.parse(actualString ?? '{}');
            localStorage.setItem('state', JSON.stringify({ ...actual, ...current(state) }));
        },
    },
});

export const AppActions = AppSlice.actions;
export const AppReducers = AppSlice.reducer;
