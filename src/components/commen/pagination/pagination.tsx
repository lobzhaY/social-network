import { useEffect, useState } from 'react';

import styles from './pagination.module.scss';
import { UserType } from '../../Users/UsersType';


export type PaginationTypeProps = {
    dependency: UserType[];
    pageSize: number;
    currentPage: number;
    totalItemsCount: number;
    handleChangeCurrentPage: (currentPage: number) => void;
    positionSize?: number;
};

export const Pagination: React.FC<PaginationTypeProps> = ({
    handleChangeCurrentPage,
    totalItemsCount,
    pageSize,
    currentPage,
    positionSize = 20,
    dependency
}) => {
    const [pages, setPages] = useState<number[]>([]);
    const [positionNumber, setPositionNumber] = useState(1);

    useEffect(() => {
        pagesOfCount();
    }, [dependency]);

    const pagesOfCount = () => {
        const pagesCount = Math.ceil(totalItemsCount / pageSize);
        const pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        setPages([...pages]);
    };

    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const positionCount = Math.ceil(pagesCount / pageSize);
    
    const leftPositionPageNumber = (positionNumber - 1) * positionSize + 1;
    const rightPositionPageNumber = positionNumber * positionSize;


    return (
        <div>
            {
                positionNumber > 1 && <button onClick={() => setPositionNumber(positionNumber - 1)}>Prev</button>
            }
            {pages!.filter((p) => p >= leftPositionPageNumber && p <= rightPositionPageNumber).map((pageItem) => (
                <span
                    key={pageItem}
                    className={currentPage === pageItem ? styles.selectedPage : styles.pageItem}
                    onClick={() => handleChangeCurrentPage(pageItem)}
                >
                    {pageItem}
                </span>
            ))}
            {
                positionCount > positionNumber && <button onClick={() => setPositionNumber(positionNumber + 1)}>Next</button>
            }
        </div>
    );
};
