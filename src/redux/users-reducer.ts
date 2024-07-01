import {
    followUserAPI,
    getCurrentAuthUserAPI,
    getProfileUserAPI,
    getUserStatusAPI,
    getUsersAPI,
    unfollowUserAPI,
    updateUserStatusAPI,
} from '../api/api';
import { UserType } from '../components/Users/UsersType';
import { setUserDataActionCreator } from './auth.reducer';
import { getUserStatusActionCreator, setUserProfileActionCreator } from './profile-reducer';
import { actionsTypes } from './store';

export const followActionCreator = (userId: number) => ({
    type: actionsTypes.followUser,
    payload: userId,
});

export const unfollowActionCreator = (userId: number) => ({
    type: actionsTypes.unfollowUser,
    payload: userId,
});

export const setUsersActionCreator = (users: UserType[]) => ({
    type: actionsTypes.setUsers,
    payload: users,
});

export const setCurrentPageActionCreator = (currentPage: number) => ({
    type: actionsTypes.setCurrentPage,
    payload: currentPage,
});

export const setTotalUsersCountActionCreator = (totalUsers: number) => ({
    type: actionsTypes.setTotalUsersCount,
    payload: totalUsers,
});

export const toggleIsFetchingActionCreator = (isFetching: boolean) => ({
    type: actionsTypes.toggleIsFetching,
    payload: isFetching,
});

export const toggleIsProgressRequestActionCreator = (
    isFetching: boolean,
    isProgressId: number,
) => ({
    type: actionsTypes.toggleIsProgressRequest,
    payload: {
        isFetching,
        isProgressId,
    },
});

export const getUsersThunkCreator = (pageItem: number, pageSize: number) => (dispatch) => {
    dispatch(toggleIsFetchingActionCreator(true));

    getUsersAPI(pageItem, pageSize)
        .then(({ items, totalCount }) => {
            dispatch(setUsersActionCreator(items));
            dispatch(setTotalUsersCountActionCreator(totalCount));
        })
        .catch((e) => console.log(e))
        .finally(() => dispatch(toggleIsFetchingActionCreator(false)));
};

export const followUserThunkCreator = (id: number) => (dispatch) => {
    dispatch(toggleIsProgressRequestActionCreator(true, id));
    followUserAPI(id)
        .then(({ resultCode }) => {
            if (resultCode === 0) {
                dispatch(followActionCreator(id));
            }
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(toggleIsProgressRequestActionCreator(false, id)));
};

export const unfollowUserThunkCreator = (id: number) => (dispatch) => {
    dispatch(toggleIsProgressRequestActionCreator(true, id));
    unfollowUserAPI(id)
        .then(({ resultCode }) => {
            if (resultCode === 0) {
                dispatch(unfollowActionCreator(id));
            }
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(toggleIsProgressRequestActionCreator(false, id)));
};

export const getProfileUserThunkCreator = (id: string) => (dispatch) => {
    getProfileUserAPI(id)
        .then((data) => {
            dispatch(setUserProfileActionCreator(data));
        })
        .catch((error) => console.log(error));
    /* .finally(() => console.log('finally')); */
};

export const getCurrentAuthUserThunkCreator = () => (dispatch) => {
    return getCurrentAuthUserAPI()
        .then(({ resultCode, data }) => {
            if (resultCode === 0) {
                const { id, email, login } = data;
                dispatch(setUserDataActionCreator(id, email, login, true));
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getStatusUserThunkCreator = (id: string) => (dispatch) => {
    getUserStatusAPI(id)
        .then(({ data }) => {
            dispatch(getUserStatusActionCreator(data));
        })
        .catch((err) => console.log(err));
};

export const updateStatusUserThunkCreator = (status: string) => (dispatch) => {
    updateUserStatusAPI(status)
        .then(({ resultCode }) => {
            if (resultCode === 0) {
                dispatch(getUserStatusActionCreator(status));
            }
        })
        .catch((err) => console.log(err));
};

const initialState = {
    users: [],
    totalUsersCount: 0,
    pageSize: 20,
    currentPage: 1,
    isFetching: false,
    isProgressRequest: [],
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.setUsers:
            return {
                ...state,
                users: [...action.payload],
            };

        case actionsTypes.setCurrentPage:
            return {
                ...state,
                currentPage: action.payload,
            };

        case actionsTypes.setTotalUsersCount:
            return {
                ...state,
                totalUsersCount: action.payload,
            };

        case actionsTypes.toggleIsFetching:
            return {
                ...state,
                isFetching: action.payload,
            };

        case actionsTypes.toggleIsProgressRequest:
            return {
                ...state,
                isProgressRequest: action.payload.isFetching
                    ? [...state.isProgressRequest, action.payload.isProgressId]
                    : state.isProgressRequest.filter((id) => id !== action.payload.isProgressId),
            };

        case actionsTypes.followUser:
            return {
                ...state,
                users: state.users.map((user: UserType) => {
                    if (user.id === action.payload) {
                        return {
                            ...user,
                            followed: true,
                        };
                    }
                    return user;
                }),
            };

        case actionsTypes.unfollowUser:
            return {
                ...state,
                users: state.users.map((user: UserType) => {
                    if (user.id === action.payload) {
                        return {
                            ...user,
                            followed: false,
                        };
                    }
                    return user;
                }),
            };

        default:
            return state;
    }
};
