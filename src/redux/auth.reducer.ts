import { getCaptchaUrl, getCurrentAuthUserAPI, loginAPI, logoutAPI } from '../api/api';
import { actionsTypes } from './store';

export const setUserDataActionCreator = (
    userId: number | null,
    userEmail: string | null,
    userLogin: string | null,
    isAuth: boolean,
) => ({
    type: actionsTypes.setUserData,
    payload: {
        userId,
        userEmail,
        userLogin,
        isAuth,
    },
});

export const getCaptchaActionCreator = (url: string) => ({
    type: actionsTypes.getCaptchaUrl,
    payload: url,
});

export const getCurrentAuthUserThunkCreator = () => async (dispatch) => {
    try {
        const { resultCode, data } = await getCurrentAuthUserAPI();
        if (resultCode === 0) {
            const { id, email, login } = data;
            dispatch(setUserDataActionCreator(id, email, login, true));
        }
    } catch (err) {
        console.log(err);
    }
};

export const loginThunkCreator =
    (email: string, password: string, rememberMe: boolean, captcha: boolean, setStatus: any) => async (dispatch) => {
        try {
            const { resultCode, messages } = await loginAPI(email, password, rememberMe, captcha);

            if (resultCode === 0) {
                dispatch(getCurrentAuthUserThunkCreator());
            } else {
               if (resultCode === 10) {
                    dispatch(getCaptchaUrlThunkCreator());
                }
                setStatus({ error: messages });
            }
        } catch (error) {
            console.log(error);
        }
    };

export const logoutThunkCreator = () => async (dispatch) => {
    try {
        const { resultCode } = await logoutAPI();
        if (resultCode === 0) {
            dispatch(setUserDataActionCreator(null, null, null, false));
        }
    } catch (error) {
        console.log(error);
    }
};

export const getCaptchaUrlThunkCreator = () => async (dispatch) => {
    try {
        const { url } = await getCaptchaUrl();
        getCaptchaActionCreator(url);
    } catch (error) {
        console.log(error);
    }
};



const initialState = {
    userId: null,
    userEmail: null,
    userLogin: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.setUserData:
            return {
                ...state,
                ...action.payload,
            };
        
        case actionsTypes.getCaptchaUrl: 
            return {
                ...state,
                captchaUrl: action.payload,
            }

        default:
            return state;
    }
};
