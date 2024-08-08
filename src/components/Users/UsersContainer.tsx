import {
    followUserThunkCreator,
    getUsersThunkCreator,
    unfollowUserThunkCreator,
    actions
} from '../../redux/users-reducer';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { UsersAPIContainer } from './UsersClass';

export const UsersContainer: React.FC = () => {
    const { users, pageSize, totalUsersCount, currentPage, isFetching, isProgressRequest } =
        useAppSelector((state) => state.usersPage);
    const dispatch = useAppDispatch();

    const setCurrentPage = (currentPage: number) => {
        dispatch(actions.setCurrentPageActionCreator(currentPage));
    };

    const getUsersThunk = (pageItem: number, pageSize: number) => {
        dispatch(getUsersThunkCreator(pageItem, pageSize));
    };

    const unfollowUserThunk = (id: number) => {
        dispatch(unfollowUserThunkCreator(id));
    };

    const followUserThunk = (id: number) => {
        dispatch(followUserThunkCreator(id));
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
            unfollowUserThunk={unfollowUserThunk}
            followUserThunk={followUserThunk}
        />
    );
};
