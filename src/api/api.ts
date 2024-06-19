import axios from 'axios';
import { API_URL, headers } from '../constants';

const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers,
});

export const getUsersAPI = (pageItem: number = 1, pageSize: number = 10) => {
    return instance
        .get(`users?page=${pageItem}&count=${pageSize}`)
        .then((response) => response.data);
};

export const followUserAPI = (id: number) => {
    return instance.post(`follow/${id}`, {}).then((response) => response.data);
};

export const unfollowUserAPI = (id: number) => {
    return instance.delete(`follow/${id}`).then((response) => response.data);
};

export const getCurrentAuthUserAPI = () => {
    return instance.get('auth/me').then((response) => response.data);
};