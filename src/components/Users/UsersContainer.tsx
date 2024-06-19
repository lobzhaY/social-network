import { useDispatch, useSelector } from 'react-redux';
import {
    followActionCreator,
    setCurrentPageActionCreator,
    setTotalUsersCountActionCreator,
    setUsersActionCreator,
    toggleIsFetchingActionCreator,
    unfollowActionCreator,
} from '../../redux/users-reducer';
import { UserType } from './UsersType';
import { UsersAPIContainer } from './UsersClass';

export const UsersContainer: React.FC = () => {
    const { users, pageSize, totalUsersCount, currentPage, isFetching } = useSelector(
        (state) => state.usersPage,
    );
    const dispatch = useDispatch();

    const followUser = (userId: number) => {
        dispatch(followActionCreator(userId));
    };

    const unfollowUser = (userId: number) => {
        dispatch(unfollowActionCreator(userId));
    };

    const setUsers = (users: UserType[]) => {
        dispatch(setUsersActionCreator(users));
    };

    const setCurrentPage = (currentPage: number) => {
        dispatch(setCurrentPageActionCreator(currentPage));
    };

    const setTotalUsersCount = (totalUsers: number) => {
        dispatch(setTotalUsersCountActionCreator(totalUsers));
    };

    const toggleIsFetching = (isFetching: boolean) => {
        dispatch(toggleIsFetchingActionCreator(isFetching));
    };

    return (
        <UsersAPIContainer
            users={users}
            pageSize={pageSize}
            currentPage={currentPage}
            totalUsersCount={totalUsersCount}
            setUsers={setUsers}
            followUser={followUser}
            unfollowUser={unfollowUser}
            setCurrentPage={setCurrentPage}
            setTotalUsersCount={setTotalUsersCount}
            isFetching={isFetching}
            toggleIsFetching={toggleIsFetching}
        />
    );
};
