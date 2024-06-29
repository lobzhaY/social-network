import { loginAPI, logoutAPI } from '../api/api';
import { actionsTypes } from './store';
import { getCurrentAuthUserThunkCreator } from './users-reducer';

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

export const loginThunkCreator =
    (email, password, rememberMe, setStatus) =>
    (dispatch) => {
        loginAPI(email, password, rememberMe)
            .then(({ resultCode, messages }) => {
                if (resultCode === 0) {
                    dispatch(getCurrentAuthUserThunkCreator());
                } else {
                    setStatus({error: messages});
                }
            })
            .catch((error) => console.log(error));
    };

export const logoutThunkCreator = () => (dispatch) => {
    logoutAPI()
        .then(({ resultCode }) => {
            if (resultCode === 0) {
                dispatch(setUserDataActionCreator(null, null, null, false));
            }
        })
        .catch((err) => console.log(err));
};
