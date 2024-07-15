import { getCurrentAuthUserAPI, loginAPI, logoutAPI } from '../api/api';
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
    (email: string, password: string, rememberMe: boolean, setStatus: any) => async (dispatch) => {
        try {
            const { resultCode, messages } = await loginAPI(email, password, rememberMe);

            if (resultCode === 0) {
                dispatch(getCurrentAuthUserThunkCreator());
            } else {
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



const initialState = {
    userId: null,
    userEmail: null,
    userLogin: null,
    isFetching: false,
    isAuth: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.setUserData:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};
