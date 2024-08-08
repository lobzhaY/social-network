import { UserType } from '../components/Users/UsersType';
import { GetItemsType, instance, ResponseType } from './api';

export const usersApi = {
    getUsersAPI: async (pageItem: number = 1, pageSize: number = 10) => {
        const response = await instance.get<GetItemsType<UserType>>(`users?page=${pageItem}&count=${pageSize}`);
        return response.data;
    },
    followUserAPI: async (id: number) => {
        const response = await instance.post<ResponseType>(`follow/${id}`, {});
        return response.data;
    },
    unfollowUserAPI: async (id: number) => {
        const response = await instance.delete<ResponseType>(`follow/${id}`);
        return response.data;
    },
};
