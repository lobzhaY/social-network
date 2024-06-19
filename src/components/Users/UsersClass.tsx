import React from 'react';
import axios from 'axios';
import { API_URL, headers } from '../../constants';
import { Users } from './Users';
import { UserType } from './UsersType';
import { Loader } from '../commen';

type UsersAPIType = {
    users: UserType[];
    pageSize: number;
    currentPage: number;
    totalUsersCount: number;
    isFetching: boolean;
    setUsers: (users: UserType[]) => void;
    followUser: (userId: number) => void;
    unfollowUser: (userId: number) => void;
    setCurrentPage: (currentPage: number) => void;
    setTotalUsersCount: (totalUsers: number) => void;
    toggleIsFetching: (isFetching: boolean) => void;
};

export class UsersAPIContainer extends React.Component<UsersAPIType, {}> {
    constructor(props: UsersAPIType) {
        super(props);
    }

    getUsers = (pageItem: number = this.props.currentPage) => {
        this.props.toggleIsFetching(true);
        axios
            .get(`${API_URL}users?page=${pageItem}&count=${this.props.pageSize}`, {
                withCredentials: true,
                headers,
            })
            .then((data) => {
                this.props.setUsers(data.data.items);
                if (0 == this.props.totalUsersCount) {
                    this.props.setTotalUsersCount(data.data.totalCount);
                }
            })
            .catch((e) => console.log(e))
            .finally(() => this.props.toggleIsFetching(false));
    };

    componentDidMount(): void {
        this.getUsers();
    }

    handleChangeCurrentPage = (pageItem: number) => {
        this.props.setCurrentPage(pageItem);
        this.getUsers(pageItem);
    };

    render() {
        return (
            <>
            {
                this.props.isFetching ? <Loader /> : null
            }
            <Users
                handleChangeCurrentPage={this.handleChangeCurrentPage}
                followUser={this.props.followUser}
                unfollowUser={this.props.unfollowUser}
                users={this.props.users}
                currentPage={this.props.currentPage}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
            />
            </>
        );
    }
}
