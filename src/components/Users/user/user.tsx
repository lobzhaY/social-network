import { NavLink } from 'react-router-dom';

import { ROUTER_PATH } from '../../../routes/router-constants';

import { UserType } from '../UsersType';

import userMock from '../../../assets/images/user-mock.png';

import styles from './user.module.scss';

type UserTypeProps = {
    user: UserType;
    isProgress: number[];
    followUser: (userId: number) => void;
    unfollowUser: (userId: number) => void;
};

export const User: React.FC<UserTypeProps> = ({ user, isProgress, followUser, unfollowUser }) => {
    const handleFollowUser = (id: number) => {
        followUser(id);
    };

    const handleUnfollowUser = (id: number) => {
        unfollowUser(id);
    };
    return (
        <div key={user.id}>
            <span>
                <div className={styles.userAvatar}>
                    <NavLink to={`${ROUTER_PATH.profile}/${user.id}`}>
                        <img src={user.photos.small || userMock} alt='User avatar' />
                    </NavLink>
                </div>
                <div>
                    {user.followed ? (
                        <button
                            disabled={isProgress.some((id) => user.id === id)}
                            onClick={() => handleUnfollowUser(user.id)}
                        >
                            unfollow
                        </button>
                    ) : (
                        <button
                            disabled={isProgress.some((id) => user.id === id)}
                            onClick={() => handleFollowUser(user.id)}
                        >
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
            </span>
        </div>
    );
};
