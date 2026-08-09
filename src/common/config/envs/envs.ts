import json from '../../../../package.json';

export enum EnvironmentEnum {
    STAGING = 'staging',
    PRODUCTION = 'production',
}

type EnvsType = {
    environment: EnvironmentEnum;
    version: string;
    pxChannelId: string;
};

export const Envs: EnvsType = {
    environment: import.meta.env.VITE_ENVIRONMENT,
    version: import.meta.env.VITE_APP_VERSION ?? json.version,
    pxChannelId: import.meta.env.VITE_APP_CHANNEL_ID,
};
