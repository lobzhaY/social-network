import { useDispatch, useSelector } from 'react-redux';
import { Users } from './Users';
import {
    followActionCreator,
    setUsersActionCreator,
    unfollowActionCreator,
} from '../../redux/users-reducer';
import { UserType } from './UsersType';
import { UsersClass } from './UsersClass';

export const UsersContainer: React.FC = () => {
    const { users } = useSelector((state) => state.usersPage);
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

    return (
        <UsersClass
            users={users}
            setUsers={setUsers}
            followUser={followUser}
            unfollowUser={unfollowUser}
        />
    );
};
