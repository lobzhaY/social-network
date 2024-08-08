import {  ResultCodes } from '../api/api';
import { usersApi } from '../api/users-api';
import { UserType } from '../components/Users/UsersType';
import { updateObjectInArray } from '../utils/objects-helpers';
import { ActionsTypeReturn, AppDispatch} from './redux-store';
import { actionsTypes } from './store';

export const actions = {
   followActionCreator: (userId: number) => ({
        type: actionsTypes.followUser,
        payload: userId,
    } as const),
     unfollowActionCreator: (userId: number) => ({
        type: actionsTypes.unfollowUser,
        payload: userId,
    }),
    setUsersActionCreator: (users: UserType[]) => ({
        type: actionsTypes.setUsers,
        payload: users,
    }),
    setCurrentPageActionCreator: (currentPage: number) => ({
        type: actionsTypes.setCurrentPage,
        payload: currentPage,
    }),
    setTotalUsersCountActionCreator: (totalUsers: number) => ({
        type: actionsTypes.setTotalUsersCount,
        payload: totalUsers,
    }),
   toggleIsFetchingActionCreator: (isFetching: boolean) => ({
        type: actionsTypes.toggleIsFetching,
        payload: isFetching,
    }),
    toggleIsProgressRequestActionCreator: (
        isFetching: boolean,
        isProgressId: number,
    ) => ({
        type: actionsTypes.toggleIsProgressRequest,
        payload: {
            isFetching,
            isProgressId,
        },
    }),
}

type FollowType = {
    type: typeof actionsTypes.followUser,
    payload: number,
};
type UnFollowType = {
    type: typeof actionsTypes.unfollowUser,
    payload: number,
};
type SetUserType = {
    type: typeof actionsTypes.setUsers,
    payload: UserType[],
};
type SetCurrentPageType = {
    type: typeof actionsTypes.setCurrentPage,
    payload: number,
}
type SetTotalUsersCountType = {
    type: typeof actionsTypes.setTotalUsersCount,
    payload: number,
}
type ToggleIsFetchingType = {
    type: typeof actionsTypes.toggleIsFetching,
    payload: boolean,
}
type ToggleIsProgressRequestType = {
    type: typeof actionsTypes.toggleIsProgressRequest,
    payload: {
        isFetching: boolean,
        isProgressId: number,
    },
}

export const getUsersThunkCreator = (pageItem: number, pageSize: number) => async (dispatch: AppDispatch) => {
    dispatch(actions.toggleIsFetchingActionCreator(true));

    try {
        const { items, totalCount } = await usersApi.getUsersAPI(pageItem, pageSize);
        dispatch(actions.setUsersActionCreator(items));
        dispatch(actions.setTotalUsersCountActionCreator(totalCount));
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actions.toggleIsFetchingActionCreator(false));
    }
};

const followUnfollowFlow = async (dispatch: AppDispatch, id: number, apiMethod: (id: number) => Promise<any>, actionCreator: (id: number) => FollowType | UnFollowType) => {
    dispatch(actions.toggleIsProgressRequestActionCreator(true, id));
    try {
        const { resultCode } = await apiMethod(id);
        if (resultCode === ResultCodes.Success) {
            dispatch(actionCreator(id));
        }
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(actions.toggleIsProgressRequestActionCreator(false, id));
    }
};

export const followUserThunkCreator = (id: number) => async (dispatch: AppDispatch) => {
    followUnfollowFlow(dispatch, id, usersApi.followUserAPI, actions.followActionCreator);
};

export const unfollowUserThunkCreator = (id: number) => async (dispatch: AppDispatch) => {
    followUnfollowFlow(dispatch, id, usersApi.unfollowUserAPI, actions.unfollowActionCreator);
};

type InitialStateType = {
    users: UserType[],
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    isFetching: boolean,
    isProgressRequest: number[],
}

const initialState: InitialStateType = {
    users: [],
    totalUsersCount: 0,
    pageSize: 20,
    currentPage: 1,
    isFetching: false,
    isProgressRequest: [],
};

type ActionsTypes = ActionsTypeReturn<typeof actions>;

export const usersReducer = (state = initialState, action: ActionsTypes ): InitialStateType => {
    switch (action.type) {
        case actionsTypes.setUsers:
            return {
                ...state,
                users: [...(action as SetUserType).payload],
            };

        case actionsTypes.setCurrentPage:
            return {
                ...state,
                currentPage: (action as SetCurrentPageType).payload,
            };

        case actionsTypes.setTotalUsersCount:
            return {
                ...state,
                totalUsersCount: (action as SetTotalUsersCountType).payload,
            };

        case actionsTypes.toggleIsFetching:
            return {
                ...state,
                isFetching: (action as ToggleIsFetchingType).payload,
            };

        case actionsTypes.toggleIsProgressRequest:
            return {
                ...state,
                isProgressRequest: (action as ToggleIsProgressRequestType).payload.isFetching
                    ? [...state.isProgressRequest, (action as ToggleIsProgressRequestType).payload.isProgressId]
                    : state.isProgressRequest.filter((id) => id !== (action as ToggleIsProgressRequestType).payload.isProgressId),
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
