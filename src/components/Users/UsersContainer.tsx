import { useDispatch, useSelector } from 'react-redux';
import {
    followActionCreator,
    setCurrentPageActionCreator,
    setTotalUsersCountActionCreator,
    setUsersActionCreator,
    unfollowActionCreator,
} from '../../redux/users-reducer';
import { UserType } from './UsersType';
import { UsersAPIContainer } from './UsersClass';

export const UsersContainer: React.FC = () => {
    const { users, pageSize, totalUsersCount, currentPage } = useSelector((state) => state.usersPage);
    const dispatch = useDispatch();

    const followUser = (userId: string) => {
        dispatch(followActionCreator(userId));
    };

    const unfollowUser = (userId: string) => {
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
        />
    );
};
