import { Pagination } from '../commen';

import { UserType } from './UsersType';

import { User } from './user/user';

export type UsersType = {
    users: UserType[];
    pageSize: number;
    currentPage: number;
    totalUsersCount: number;
    isProgress: number[];
    followUser: (userId: number) => void;
    unfollowUser: (userId: number) => void;
    handleChangeCurrentPage: (currentPage: number) => void;
};

export const Users: React.FC<UsersType> = ({
    users,
    followUser,
    unfollowUser,
    totalUsersCount,
    pageSize,
    currentPage,
    handleChangeCurrentPage,
    isProgress,
}) => {
    return (
        <div>
            <Pagination
                users={users}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                handleChangeCurrentPage={handleChangeCurrentPage}
            />
            {users.map((user) => (
                <User
                    user={user}
                    followUser={followUser}
                    unfollowUser={unfollowUser}
                    isProgress={isProgress}
                />
            ))}
        </div>
    );
};
