import React from 'react';
import { Users } from './Users';
import { UserType } from './UsersType';
import { Loader } from '../commen';
import { getUsersAPI } from '../../api/api';

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

    getUsers = (pageItem: number, pageSize: number) => {
        this.props.toggleIsFetching(true);

        getUsersAPI(pageItem, pageSize)
            .then(({ items, totalCount }) => {
                this.props.setUsers(items);
                if (0 == this.props.totalUsersCount) {
                    this.props.setTotalUsersCount(totalCount);
                }
            })
            .catch((e) => console.log(e))
            .finally(() => this.props.toggleIsFetching(false));
    };

    componentDidMount(): void {
        this.getUsers(this.props.currentPage, this.props.pageSize);
    }

    handleChangeCurrentPage = (pageItem: number) => {
        this.props.setCurrentPage(pageItem);
        this.getUsers(pageItem, this.props.pageSize);
    };

    render() {
        return (
            <>
                {this.props.isFetching ? <Loader /> : null}
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
