import { UserType } from '../components/Users/UsersType';
import { FilterFormType } from '../redux/users-reducer';
import { GetItemsType, instance, ResponseType } from './api';

export const usersApi = {
    getUsersAPI: async (pageItem: number = 1, pageSize: number = 10, filter: FilterFormType) => {
        const friendQueryString = filter.friend === null ? '' : `&friend=${filter.friend}`
        const response = await instance.get<GetItemsType<UserType>>(
            `users?page=${pageItem}&count=${pageSize}&term=${filter.term}${friendQueryString}`,
        );
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
