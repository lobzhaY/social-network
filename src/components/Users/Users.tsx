import React from 'react';
import { FilterFormType, followUserThunkCreator, getUsersThunkCreator, unfollowUserThunkCreator } from '../../redux/users-reducer';
import { Pagination } from '../commen';
import { User } from './user/user';
import { UsersSearchForm } from './users-search-form';

import { useAppDispatch, useAppSelector } from '../../hooks';

export type UsersType = {
    handleChangeCurrentPage: (currentPage: number) => void;
};

export const Users: React.FC<UsersType> = React.memo(
    ({
        handleChangeCurrentPage,
    }) => {
        const {users, pageSize, totalUsersCount, currentPage, isProgressRequest} = useAppSelector((state) => state.usersPage);
        const dispatch = useAppDispatch();
        
        const unfollowUser = (id: number) => {
            dispatch(unfollowUserThunkCreator(id));
        };
        const followUser = (id: number) => {
            dispatch(followUserThunkCreator(id));
        };
        const filterChanged = (filter: FilterFormType) => {
            dispatch(getUsersThunkCreator(1, pageSize, filter));
        };
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
                        isProgress={isProgressRequest}
                        key={user.id}
                    />
                ))}
            </div>
        );
    },
);
