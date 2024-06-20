import React from 'react';
import { Users } from './Users';
import { UserType } from './UsersType';
import { Loader } from '../commen';

type UsersAPIType = {
    users: UserType[];
    pageSize: number;
    currentPage: number;
    totalUsersCount: number;
    isFetching: boolean;
    isProgress: number[];
   
    setCurrentPage: (currentPage: number) => void; 
    getUsersThunk: (isFetching: number, isProgress: number) => void;
    unfollowUserThunk: (id: number) => void;
    followUserThunk: (id: number) => void;
};

export class UsersAPIContainer extends React.Component<UsersAPIType, {}> {
    constructor(props: UsersAPIType) {
        super(props);
    }

    getUsers = (pageItem: number, pageSize: number) => {
        this.props.getUsersThunk(pageItem, pageSize);
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
                    followUser={this.props.followUserThunk}
                    unfollowUser={this.props.unfollowUserThunk}
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    isProgress={this.props.isProgress}
                />
            </>
        );
    }
}
