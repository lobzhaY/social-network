import { ProfileType } from '../components/Profile/ProfileType';
import { instance } from './api';

export const profileApi = {
    getProfileUserAPI: async (id: string) => {
        const data = await instance.get<ProfileType>(`profile/${id}`);
        return data.data;
    },
    getUserStatusAPI: (id: string) => {
        return instance.get(`profile/status/${id}`);
    },
    updateUserStatusAPI: async (status: string) => {
        const response = await instance.put(`profile/status`, { status });
        return response.data;
    },
    saveUserPhoto: async (photo: any) => {
        const formData = new FormData();
        formData.append('image', photo);
        const response = await instance
            .put('profile/photo', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        return response.data;
    },
    saveUserProfile: async (profile: any) => {
        const response = await instance.put('/profile', profile);
        return response.data;
    },
};
