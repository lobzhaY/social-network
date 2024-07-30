import { followUserAPI, getUsersAPI, unfollowUserAPI } from '../api/api';
import { UserType } from '../components/Users/UsersType';
import { updateObjectInArray } from '../utils/objects-helpers';
import { AppDispatch } from './redux-store';
import { actionsTypes } from './store';

type FollowType = {
    type: typeof actionsTypes.followUser,
    payload: number,
};

export const followActionCreator = (userId: number): FollowType => ({
    type: actionsTypes.followUser,
    payload: userId,
});

type UnFollowType = {
    type: typeof actionsTypes.unfollowUser,
    payload: number,
};

export const unfollowActionCreator = (userId: number): UnFollowType => ({
    type: actionsTypes.unfollowUser,
    payload: userId,
});

type SetUserType = {
    type: typeof actionsTypes.setUsers,
    payload: UserType[],
};

export const setUsersActionCreator = (users: UserType[]): SetUserType => ({
    type: actionsTypes.setUsers,
    payload: users,
});

type SetCurrentPageType = {
    type: typeof actionsTypes.setCurrentPage,
    payload: number,
}

export const setCurrentPageActionCreator = (currentPage: number): SetCurrentPageType => ({
    type: actionsTypes.setCurrentPage,
    payload: currentPage,
});

type SetTotalUsersCountType = {
    type: typeof actionsTypes.setTotalUsersCount,
    payload: number,
}

export const setTotalUsersCountActionCreator = (totalUsers: number): SetTotalUsersCountType => ({
    type: actionsTypes.setTotalUsersCount,
    payload: totalUsers,
});

type ToggleIsFetchingType = {
    type: typeof actionsTypes.toggleIsFetching,
    payload: boolean,
}

export const toggleIsFetchingActionCreator = (isFetching: boolean): ToggleIsFetchingType => ({
    type: actionsTypes.toggleIsFetching,
    payload: isFetching,
});

type ToggleIsProgressRequestType = {
    type: typeof actionsTypes.toggleIsProgressRequest,
    payload: {
        isFetching: boolean,
        isProgressId: number,
    },
}

export const toggleIsProgressRequestActionCreator = (
    isFetching: boolean,
    isProgressId: number,
): ToggleIsProgressRequestType => ({
    type: actionsTypes.toggleIsProgressRequest,
    payload: {
        isFetching,
        isProgressId,
    },
});

export const getUsersThunkCreator = (pageItem: number, pageSize: number) => async (dispatch: AppDispatch) => {
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

const followUnfollowFlow = async (dispatch: AppDispatch, id: number, apiMethod: (id: number) => Promise<any>, actionCreator: any) => {
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

export const followUserThunkCreator = (id: number) => async (dispatch: AppDispatch) => {
    followUnfollowFlow(dispatch, id, followUserAPI, followActionCreator);
};

export const unfollowUserThunkCreator = (id: number) => async (dispatch: AppDispatch) => {
    followUnfollowFlow(dispatch, id, unfollowUserAPI, unfollowActionCreator);
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

export const usersReducer = (state = initialState, action: FollowType | UnFollowType | SetUserType | SetCurrentPageType | SetTotalUsersCountType | ToggleIsFetchingType | ToggleIsProgressRequestType ): InitialStateType => {
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
