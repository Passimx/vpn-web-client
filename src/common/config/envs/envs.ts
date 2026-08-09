import json from '../../../../package.json';

export enum EnvironmentEnum {
    STAGING = 'staging',
    PRODUCTION = 'production',
}

type EnvsType = {
    pxConnectUrl: string;
    environment: EnvironmentEnum;
    version: string;
    pxChannelId: string;
};

export const Envs: EnvsType = {
    pxConnectUrl: import.meta.env.VITE_PX_CONNECT_URL,
    environment: import.meta.env.VITE_ENVIRONMENT,
    version: import.meta.env.VITE_APP_VERSION ?? json.version,
    pxChannelId: import.meta.env.VITE_APP_CHANNEL_ID,
};
