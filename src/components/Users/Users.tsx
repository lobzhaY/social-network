import { UserType } from './UsersType';
import styles from './Users.module.scss';
import { usersData } from '../../redux/users-reducer';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL, headers } from '../../constants';

import userMock from '../../assets/images/user-mock.png';

export type UsersType = {
    users: UserType[];
    setUsers: (users: UserType[]) => void;
    followUser: (userId: string) => void;
    unfollowUser: (userId: string) => void;
};

export const Users: React.FC<UsersType> = ({ users, followUser, unfollowUser, setUsers }) => {
    useEffect(() => {
            axios
                .get(`${API_URL}users`, { headers })
                .then((data) => console.log(data))
                .catch((e) => console.log(e));
            // setUsers(usersData);
    }, [users]);

    return (
        <div>
            {users.map((user) => (
                <div key={user.id}>
                    <span>
                        <div className={styles.userAvatar}>
                            {user.photos.small ? (
                                <img src={user.photos.small} alt='User avatar' />
                            ) : (
                                <img
                                    src={userMock}
                                    alt='No photo available'
                                />
                            )}
                        </div>
                        <div>
                            {user.followed ? (
                                <button onClick={() => unfollowUser(user.id)}>unfollow</button>
                            ) : (
                                <button onClick={() => followUser(user.id)}>follow</button>
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
};
