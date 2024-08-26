import {
    followUserThunkCreator,
    getUsersThunkCreator,
    unfollowUserThunkCreator,
    actions,
    FilterFormType
} from '../../redux/users-reducer';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { UsersAPIContainer } from './UsersClass';

export const UsersContainer: React.FC = () => {
    const { users, pageSize, totalUsersCount, currentPage, isFetching, isProgressRequest, filter } =
        useAppSelector((state) => state.usersPage);
    const dispatch = useAppDispatch();

    const setCurrentPage = (currentPage: number) => {
        dispatch(actions.setCurrentPageActionCreator(currentPage));
    };

    const getUsersThunk = (pageItem: number, pageSize: number, filter: FilterFormType = {term: '', friend: null}) => {
        dispatch(getUsersThunkCreator(pageItem, pageSize, filter));
    };

    const unfollowUserThunk = (id: number) => {
        dispatch(unfollowUserThunkCreator(id));
    };

    const followUserThunk = (id: number) => {
        dispatch(followUserThunkCreator(id));
    };

    const filterChanged = (filter: FilterFormType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter));
    };


    return (
        <UsersAPIContainer
            users={users}
            pageSize={pageSize}
            currentPage={currentPage}
            totalUsersCount={totalUsersCount}
            setCurrentPage={setCurrentPage}
            isFetching={isFetching}
            isProgress={isProgressRequest}
            getUsersThunk={getUsersThunk}
            filterChanged={filterChanged}
            unfollowUserThunk={unfollowUserThunk}
            followUserThunk={followUserThunk}
            filter={filter}
        />
    );
};
