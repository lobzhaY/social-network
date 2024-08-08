import {  ResultCodeForCaptcha, ResultCodes } from '../api/api';
import { authApi } from '../api/auth-api';
import { AppDispatch } from './redux-store';
import { actionsTypes } from './store';

type UserDataType = {
    userId: number | null;
        userEmail: string | null;
        userLogin: string | null;
        isAuth: boolean;
}

type SetUserDataType = {
    type: typeof actionsTypes.setUserData;
    payload: UserDataType;
};

export const setUserDataActionCreator = (
    userId: number | null,
    userEmail: string | null,
    userLogin: string | null,
    isAuth: boolean,
): SetUserDataType => ({
    type: actionsTypes.setUserData,
    payload: {
        userId,
        userEmail,
        userLogin,
        isAuth,
    },
});

type GetCaptchaUrlType = {
    type: typeof actionsTypes.getCaptchaUrl;
    payload: string;
};

export const getCaptchaActionCreator = (url: string): GetCaptchaUrlType => ({
    type: actionsTypes.getCaptchaUrl,
    payload: url,
});

export const getCurrentAuthUserThunkCreator = () => async (dispatch: AppDispatch) => {
    try {
        const { resultCode, data } = await authApi.getCurrentAuthUserAPI();
        if (resultCode === ResultCodes.Success) {
            const { id, email, login } = data;
            dispatch(setUserDataActionCreator(id, email, login, true));
        }
    } catch (err) {
        console.log(err);
    }
};

export const loginThunkCreator =
    (email: string, password: string, rememberMe: boolean, captcha: string, setStatus: any) =>
    async (dispatch: AppDispatch) => {
        try {
            const { resultCode, messages } = await authApi.loginAPI(email, password, rememberMe, captcha);

            if (resultCode === ResultCodes.Success) {
                dispatch(getCurrentAuthUserThunkCreator());
            } else {
                if (resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                    dispatch(getCaptchaUrlThunkCreator());
                }
                setStatus({ error: messages });
            }
        } catch (error) {
            console.log(error);
        }
    };

export const logoutThunkCreator = () => async (dispatch: AppDispatch) => {
    try {
        const { resultCode } = await authApi.logoutAPI();
        if (resultCode === ResultCodes.Success) {
            dispatch(setUserDataActionCreator(null, null, null, false));
        }
    } catch (error) {
        console.log(error);
    }
};

export const getCaptchaUrlThunkCreator = () => async (dispatch: AppDispatch) => {
    try {
        const { url } = await authApi.getCaptchaUrl();
        getCaptchaActionCreator(url);
    } catch (error) {
        console.log(error);
    }
};

type InitialStateType = {
    userId: number | null | undefined;
    userEmail: string | null;
    userLogin: string | null;
    isFetching: boolean;
    isAuth: boolean;
    captchaUrl: string | null;
};

const initialState: InitialStateType = {
    userId: null,
    userEmail: null,
    userLogin: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null,
};

type ActionsTypes = SetUserDataType | GetCaptchaUrlType;

export const authReducer = (
    state = initialState,
    action: ActionsTypes,
): InitialStateType => {
    switch (action.type) {
        case actionsTypes.setUserData:
            return {
                ...state,
                ...(action as SetUserDataType).payload,
            };

        case actionsTypes.getCaptchaUrl:
            return {
                ...state,
                captchaUrl: (action as GetCaptchaUrlType).payload,
            };

        default:
            return state;
    }
};
