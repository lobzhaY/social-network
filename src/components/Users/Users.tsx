import { UserType } from './UsersType';
import styles from './Users.module.scss';
import userMock from '../../assets/images/user-mock.png';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTER_PATH } from '../../routes/router-constants';

export type UsersType = {
    users: UserType[];
    pageSize: number;
    currentPage: number;
    totalUsersCount: number;
    isProgress: number[];
    followUser: (userId: number) => void;
    unfollowUser: (userId: number) => void;
    handleChangeCurrentPage: (currentPage: number) => void;
};

export const Users: React.FC<UsersType> = ({
    users,
    followUser,
    unfollowUser,
    totalUsersCount,
    pageSize,
    currentPage,
    handleChangeCurrentPage,
    isProgress,
}) => {
    const [pagesCount, setPagesCount] = useState<number[]>([]);

    useEffect(() => {
        pagesOfCount();
    }, [users]);

    const pagesOfCount = () => {
        const pagesCount = Math.ceil(totalUsersCount / pageSize);
        const pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        setPagesCount([...pages]);
    };

    const handleFollowUser = (id: number) => {
        followUser(id);
    };

    const handleUnfollowUser = (id: number) => {
        unfollowUser(id);
    };

    return (
        <div>
            <div>
                {pagesCount!.map((pageItem) => (
                    <span
                        key={pageItem}
                        className={currentPage === pageItem ? styles.selectedPage : styles.pageItem}
                        onClick={() => handleChangeCurrentPage(pageItem)}
                    >
                        {pageItem}
                    </span>
                ))}
            </div>
            {users.map((user) => (
                <div key={user.id}>
                    <span>
                        <div className={styles.userAvatar}>
                            <NavLink to={`${ROUTER_PATH.profile}/${user.id}`}>
                                <img src={user.photos.small || userMock} alt='User avatar' />
                            </NavLink>
                        </div>
                        <div>
                            {user.followed ? (
                                <button disabled={isProgress.some((id) => user.id === id)} onClick={() => handleUnfollowUser(user.id)}>
                                    unfollow
                                </button>
                            ) : (
                                <button disabled={isProgress.some((id) => user.id === id)} onClick={() => handleFollowUser(user.id)}>follow</button>
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
            ))}
        </div>
    );
};
