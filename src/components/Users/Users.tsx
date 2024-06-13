import { UserType } from './UsersType';
import styles from './Users.module.scss';
import userMock from '../../assets/images/user-mock.png';
import { useEffect, useState } from 'react';

export type UsersType = {
    users: UserType[];
    pageSize: number;
    currentPage: number;
    totalUsersCount: number;
    followUser: (userId: string) => void;
    unfollowUser: (userId: string) => void;
    handleChangeCurrentPage: (currentPage: number) => void;
};

export const Users: React.FC<UsersType> = ({
    users,
    followUser,
    unfollowUser,
    totalUsersCount,
    pageSize,
    currentPage,
    handleChangeCurrentPage
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
                            {user.photos.small ? (
                                <img src={user.photos.small} alt='User avatar' />
                            ) : (
                                <img src={userMock} alt='No photo available' />
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
                    </span>
                </div>
            ))}
        </div>
    );
};
