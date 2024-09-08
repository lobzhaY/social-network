import React, { useEffect } from 'react';

import { Users } from './Users';
import { Loader } from '../commen';

import { actions, FilterFormType, getUsersThunkCreator } from '../../redux/users-reducer';
import { useAppDispatch, useAppSelector } from '../../hooks';

export const UsersPage: React.FC = () => {
    const { isFetching, currentPage, pageSize, filter } = useAppSelector(
        (state) => state.usersPage,
    );
    const dispatch = useAppDispatch();

    const getUsers = (
        pageItem: number,
        pageSize: number,
        filter: FilterFormType = { term: '', friend: null },
    ) => {
        dispatch(getUsersThunkCreator(pageItem, pageSize, filter));
    };

    const handleChangeCurrentPage = (pageItem: number) => {
        dispatch(actions.setCurrentPageActionCreator(pageItem));
        getUsers(pageItem, pageSize, filter);
    };

    useEffect(() => {
        getUsers(currentPage, pageSize);
    }, []);

    return (
        <>
            {isFetching ? <Loader /> : null}
            <Users handleChangeCurrentPage={handleChangeCurrentPage} />
        </>
    );
};

