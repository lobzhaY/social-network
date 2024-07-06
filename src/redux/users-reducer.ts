import { followUserAPI, getUsersAPI, unfollowUserAPI } from '../api/api';
import { UserType } from '../components/Users/UsersType';
import { updateObjectInArray } from '../utils/objects-helpers';
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

export const getUsersThunkCreator = (pageItem: number, pageSize: number) => async (dispatch) => {
    dispatch(toggleIsFetchingActionCreator(true));

    try {
        const { items, totalCount } = await getUsersAPI(pageItem, pageSize);
        dispatch(setUsersActionCreator(items));
        dispatch(setTotalUsersCountActionCreator(totalCount));
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(toggleIsFetchingActionCreator(false));
    }
};

const followUnfollowFlow = async (dispatch, id: number, apiMethod, actionCreator) => {
    dispatch(toggleIsProgressRequestActionCreator(true, id));
    try {
        const { resultCode } = await apiMethod(id);
        if (resultCode === 0) {
            dispatch(actionCreator(id));
        }
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(toggleIsProgressRequestActionCreator(false, id));
    }
};

export const followUserThunkCreator = (id: number) => async (dispatch) => {
    followUnfollowFlow(dispatch, id, followUserAPI, followActionCreator);
};

export const unfollowUserThunkCreator = (id: number) => async (dispatch) => {
    followUnfollowFlow(dispatch, id, unfollowUserAPI, unfollowActionCreator);
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
                users: updateObjectInArray(state.users, action.payload, 'id', { followed: true }),
            };

        case actionsTypes.unfollowUser:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.payload, 'id', { followed: false }),
            };

        default:
            return state;
    }
};
