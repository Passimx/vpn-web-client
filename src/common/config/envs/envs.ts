import json from '../../../../package.json';

export enum EnvironmentEnum {
    STAGING = 'staging',
    PRODUCTION = 'production',
}

type EnvsType = {
    apiUrl: string;
    environment: EnvironmentEnum;
    version: string;
};

export const Envs: EnvsType = {
    apiUrl: import.meta.env.VITE_API_URL,
    environment: import.meta.env.VITE_ENVIRONMENT,
    version: import.meta.env.VITE_APP_VERSION ?? json.version,
};
