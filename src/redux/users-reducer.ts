import { ResultCodes } from '../api/api';
import { usersApi } from '../api/users-api';
import { UserType } from '../components/Users/UsersType';
import { updateObjectInArray } from '../utils/objects-helpers';
import { GetActionsTypes, AppDispatch } from './redux-store';
import { actionsTypes } from './store';

type InitialStateType = {
    users: UserType[];
    totalUsersCount: number;
    pageSize: number;
    currentPage: number;
    isFetching: boolean;
    isProgressRequest: number[];
    filter: FilterFormType;
};

export type FilterFormType = {
    term: string;
    friend: boolean | null;
}

type ActionsTypes = GetActionsTypes<typeof actions>;

type FollowType = {
    type: typeof actionsTypes.followUser;
    payload: number;
};

type UnFollowType = {
    type: typeof actionsTypes.unfollowUser;
    payload: number;
};

type ToggleIsProgressType = {
    isFetching: boolean;
    isProgressId: number;
};

const initialState: InitialStateType = {
    users: [],
    totalUsersCount: 0,
    pageSize: 20,
    currentPage: 1,
    isFetching: false,
    isProgressRequest: [],
    filter: {
        term: '',
        friend: null,
    },
};

export const actions = {
    followActionCreator: (userId: number) =>
        ({
            type: actionsTypes.followUser,
            payload: userId,
        }) as const,
    unfollowActionCreator: (userId: number) =>
        ({
            type: actionsTypes.unfollowUser,
            payload: userId,
        }) as const,
    setUsersActionCreator: (users: UserType[]) =>
        ({
            type: actionsTypes.setUsers,
            payload: users,
        }) as const,
    setCurrentPageActionCreator: (currentPage: number) =>
        ({
            type: actionsTypes.setCurrentPage,
            payload: currentPage,
        }) as const,
    setTotalUsersCountActionCreator: (totalUsers: number) =>
        ({
            type: actionsTypes.setTotalUsersCount,
            payload: totalUsers,
        }) as const,
    toggleIsFetchingActionCreator: (isFetching: boolean) =>
        ({
            type: actionsTypes.toggleIsFetching,
            payload: isFetching,
        }) as const,
    toggleIsProgressRequestActionCreator: (isFetching: boolean, isProgressId: number) =>
        ({
            type: actionsTypes.toggleIsProgressRequest,
            payload: {
                isFetching,
                isProgressId,
            },
        }) as const,
    setFilterActionCreator: (filter?: FilterFormType | undefined) =>
        ({
            type: actionsTypes.setUsersFilter,
            payload: filter,
        }) as const,
};

export const getUsersThunkCreator =
    (pageItem: number, pageSize: number, filter: FilterFormType) => async (dispatch: AppDispatch) => {
        dispatch(actions.toggleIsFetchingActionCreator(true));
        dispatch(actions.setCurrentPageActionCreator(pageItem));
        dispatch(actions.setFilterActionCreator(filter));

        try {
            const { items, totalCount } = await usersApi.getUsersAPI(pageItem, pageSize, filter);
            dispatch(actions.setUsersActionCreator(items));
            dispatch(actions.setTotalUsersCountActionCreator(totalCount));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(actions.toggleIsFetchingActionCreator(false));
        }
    };

const followUnfollowFlow = async (
    dispatch: AppDispatch,
    id: number,
    apiMethod: (id: number) => Promise<any>,
    actionCreator: (id: number) => FollowType | UnFollowType,
) => {
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

export const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case actionsTypes.setUsers:
            return {
                ...state,
                users: [...(action.payload as UserType[])],
            };

        case actionsTypes.setCurrentPage:
            return {
                ...state,
                currentPage: action.payload as number,
            };

        case actionsTypes.setTotalUsersCount:
            return {
                ...state,
                totalUsersCount: action.payload as number,
            };

        case actionsTypes.toggleIsFetching:
            return {
                ...state,
                isFetching: action.payload as boolean,
            };

        case actionsTypes.toggleIsProgressRequest:
            return {
                ...state,
                isProgressRequest: (action.payload as ToggleIsProgressType).isFetching
                    ? [
                          ...state.isProgressRequest,
                          (action.payload as ToggleIsProgressType).isProgressId,
                      ]
                    : state.isProgressRequest.filter(
                          (id) => id !== (action.payload as ToggleIsProgressType).isProgressId,
                      ),
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

        case actionsTypes.setUsersFilter:
            return {
                ...state,
                filter: action.payload as FilterFormType,
            };

        default:
            return state;
    }
};
