import { Api } from './index.ts';
import { UserType } from '../store/app/types/app-state.type.ts';

export const getUser = async (id: string) => {
    return Api<UserType>(`/users/passimx/${id}`);
};
