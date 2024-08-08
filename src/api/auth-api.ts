import { instance, ResponseType, ResultCodeForCaptcha, ResultCodes } from './api';

type LoginResponseType = {
        userId: number;
};

type GetCurrentAuthUserResponseType = {
      id: number;
      email: string;
      login: string;
};

type CaptchaResponseType = {
    url: string;
}

export const authApi = {
    loginAPI: async (
        email: string,
        password: string,
        rememberMe: boolean = false,
        captcha: string,
    ) => {
        const response = await instance.post<ResponseType<LoginResponseType, ResultCodes | ResultCodeForCaptcha>>('auth/login', {
            email,
            password,
            rememberMe,
            captcha,
        });
        return response.data;
    },
    logoutAPI: async () => {
        const response = await instance.delete<ResponseType>('auth/login');
        return response.data;
    },
    getCaptchaUrl: async () => {
        const response = await instance.get<CaptchaResponseType>('/security/get-captcha-url');
        return response.data;
    },
    getCurrentAuthUserAPI: async () => {
      const response = await instance.get<ResponseType<GetCurrentAuthUserResponseType>>('auth/me');
      return response.data;
  },
};
