import { useDispatch, useSelector } from 'react-redux';
import {
    followUserThunkCreator,
    getUsersThunkCreator,
    setCurrentPageActionCreator,
    unfollowUserThunkCreator,
} from '../../redux/users-reducer';
import { UsersAPIContainer } from './UsersClass';

export const UsersContainer: React.FC = () => {
    const { users, pageSize, totalUsersCount, currentPage, isFetching, isProgressRequest } =
        useSelector((state) => state.usersPage);
    const dispatch = useDispatch();

    const setCurrentPage = (currentPage: number) => {
        dispatch(setCurrentPageActionCreator(currentPage));
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
