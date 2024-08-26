import React from 'react';
import { FilterFormType } from '../../redux/users-reducer';
import { Pagination } from '../commen';
import { User } from './user/user';
import { UsersSearchForm } from './users-search-form';

import { UserType } from './UsersType';

export type UsersType = {
    users: UserType[];
    pageSize: number;
    currentPage: number;
    totalUsersCount: number;
    isProgress: number[];
    followUser: (userId: number) => void;
    unfollowUser: (userId: number) => void;
    handleChangeCurrentPage: (currentPage: number) => void;
    filterChanged: (filter: FilterFormType) => void;
};

export const Users: React.FC<UsersType> = React.memo(
    ({
        users,
        followUser,
        unfollowUser,
        totalUsersCount,
        pageSize,
        currentPage,
        handleChangeCurrentPage,
        isProgress,
        filterChanged,
    }) => {
        return (
            <div>
                <UsersSearchForm filterChanged={filterChanged} />

                <Pagination
                    dependency={users}
                    positionSize={20}
                    totalItemsCount={totalUsersCount}
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
                        key={user.id}
                    />
                ))}
            </div>
        );
    },
);
