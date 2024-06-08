import { UserType } from './UsersType';
import styles from './Users.module.scss';
import { usersData } from '../../redux/users-reducer';
import { useEffect } from 'react';

type UsersType = {
    users: UserType[];
    setUsers: (users: UserType[]) => void;
    followUser: (userId: string) => void;
    unfollowUser: (userId: string) => void;
};

export const Users: React.FC<UsersType> = ({ users, followUser, unfollowUser, setUsers }) => {
    useEffect(() => {
        if (!users.length) {
            setUsers(usersData);
        }
    }, []);

    return (
        <div>
            {users.map((user) => (
                <div key={user.id}>
                    <span>
                        <div className={styles.userAvatar}>
                            {user.avatar ? (
                                <img src={user.avatar} alt='User avatar' />
                            ) : (
                                <img
                                    src='https://img.freepik.com/free-photo/user-profile-icon-front-side-with-white-background_187299-40010.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1711929600&semt=ais'
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
                            <div>{user.fullName}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{user.location.city}</div>
                            <div>{user.location.country}</div>
                        </span>
                    </span>
                </div>
            ))}
        </div>
    );
};
