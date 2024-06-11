import React from 'react';
import userMock from '../../assets/images/user-mock.png';
import styles from './Users.module.scss';
import axios from 'axios';
import { API_URL, headers } from '../../constants';
import { UsersType } from './Users';

export class UsersClass extends React.Component<UsersType, {}> {
    constructor(props: UsersType) {
        super(props);
    }

    getUsers = () => {
        axios
            .get(`${API_URL}users`, { headers })
            .then((data) => {
                this.props.setUsers(data.data.items);
            })
            .catch((e) => console.log(e));
    };

    componentDidMount(): void {
        this.getUsers();
    }

    render() {
        return (
            <div>
                <button onClick={this.getUsers}>!</button>
                {this.props.users.map((user) => (
                    <div key={user.id}>
                        <span>
                            <div className={styles.userAvatar}>
                                {user.photos.small ? (
                                    <img src={user.photos.small} alt='User avatar' />
                                ) : (
                                    <img src={userMock} alt='No photo available' />
                                )}
                            </div>
                            <div>
                                {user.followed ? (
                                    <button onClick={() => this.props.unfollowUser(user.id)}>
                                        unfollow
                                    </button>
                                ) : (
                                    <button onClick={() => this.props.followUser(user.id)}>
                                        follow
                                    </button>
                                )}
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{user.name}</div>
                                <div>{user.status}</div>
                            </span>
                            {/*   <span>
                      <div>{user.location.city}</div>
                      <div>{user.location.country}</div>
                  </span> */}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
}
