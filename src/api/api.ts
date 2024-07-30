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

export const getProfileUserAPI = (id: string) => {
    return instance.get(`profile/${id}`).then((data) => data.data);
};

export const getUserStatusAPI = (id: string) => {
    return instance.get(`profile/status/${id}`);
};

export const updateUserStatusAPI = (status: string) => {
    return instance.put(`profile/status`, { status }).then((response) => response.data);
};

export const loginAPI = (email: string, password: string, rememberMe: boolean = false, captcha: string) => {
    return instance
        .post('auth/login', { email, password, rememberMe, captcha })
        .then((response) => response.data);
};

export const logoutAPI = () => {
    return instance.delete('auth/login').then((response) => response.data);
};

export const saveUserPhoto = (photo: any) => {
    const formData = new FormData();
    formData.append('image', photo);
    return instance
        .put('profile/photo', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => response.data);
};

export const saveUserProfile = (profile: any) => {
    return instance.put('/profile', profile).then((response) => response.data);
};

export const getCaptchaUrl = () => {
    return instance.get('/security/get-captcha-url').then((response) => response.data);
};
