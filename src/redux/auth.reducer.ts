import { actionsTypes } from './store';

export const setUserDataActionCreator = (userId: number, userEmail: string, userLogin: string) => ({
    type: actionsTypes.setUserData,
    payload: {
        userId,
        userEmail,
        userLogin,
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
                isAuth: true,
            };

        default:
            return state;
    }
};
