import { Api } from './index.ts';
import { DownloadLinksType } from '../types/api/apps.ts';

export const getApps = () => {
    return Api<DownloadLinksType>('/apps');
};
