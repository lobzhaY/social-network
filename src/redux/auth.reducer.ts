import { ResultCodeForCaptcha, ResultCodes } from '../api/api';
import { authApi } from '../api/auth-api';
import { AppDispatch, GetActionsTypes } from './redux-store';
import { actionsTypes } from './store';

type UserDataType = {
    userId: number | null;
    userEmail: string | null;
    userLogin: string | null;
    isAuth: boolean;
};

type InitialStateType = {
    userId: number | null | undefined;
    userEmail: string | null;
    userLogin: string | null;
    isFetching: boolean;
    isAuth: boolean;
    captchaUrl: string | null;
};

type ActionsTypes = GetActionsTypes<typeof authActions>;

const initialState: InitialStateType = {
    userId: null,
    userEmail: null,
    userLogin: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null,
};

export const authActions = {
    setUserDataActionCreator: (
        userId: number | null,
        userEmail: string | null,
        userLogin: string | null,
        isAuth: boolean,
    ) =>
        ({
            type: actionsTypes.setUserData,
            payload: {
                userId,
                userEmail,
                userLogin,
                isAuth,
            },
        }) as const,
    getCaptchaActionCreator: (url: string) =>
        ({
            type: actionsTypes.getCaptchaUrl,
            payload: url,
        }) as const,
};

export const getCurrentAuthUserThunkCreator = () => async (dispatch: AppDispatch) => {
    try {
        const { resultCode, data } = await authApi.getCurrentAuthUserAPI();
        if (resultCode === ResultCodes.Success) {
            const { id, email, login } = data;
            dispatch(authActions.setUserDataActionCreator(id, email, login, true));
        }
    } catch (err) {
        console.log(err);
    }
};

export const loginThunkCreator =
    (email: string, password: string, rememberMe: boolean, captcha: string, setStatus: any) =>
    async (dispatch: AppDispatch) => {
        try {
            const { resultCode, messages } = await authApi.loginAPI(
                email,
                password,
                rememberMe,
                captcha,
            );

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
            dispatch(authActions.setUserDataActionCreator(null, null, null, false));
        }
    } catch (error) {
        console.log(error);
    }
};

export const getCaptchaUrlThunkCreator = () => async (dispatch: AppDispatch) => {
    try {
        const { url } = await authApi.getCaptchaUrl();
        authActions.getCaptchaActionCreator(url);
    } catch (error) {
        console.log(error);
    }
};

export const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case actionsTypes.setUserData:
            return {
                ...state,
                ...(action.payload as UserDataType),
            };

        case actionsTypes.getCaptchaUrl:
            return {
                ...state,
                captchaUrl: action.payload as string,
            };

        default:
            return state;
    }
};
