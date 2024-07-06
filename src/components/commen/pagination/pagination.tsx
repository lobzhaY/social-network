import { useEffect, useState } from 'react';

import { UserType } from '../../Users/UsersType';

import styles from './pagination.module.scss';


export type PaginationTypeProps = {
    users: UserType[];
    pageSize: number;
    currentPage: number;
    totalUsersCount: number;
    handleChangeCurrentPage: (currentPage: number) => void;
};

export const Pagination: React.FC<PaginationTypeProps> = ({
    users,
    handleChangeCurrentPage,
    totalUsersCount,
    pageSize,
    currentPage,
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
    );
};
