import styles from './Post.module.scss';

type PostType = {
    message: string;
    likeCount: number;
};

export const Post: React.FC<PostType> = ({ message, likeCount }) => {
    return (
        <div className={styles.post}>
            <img
                src='https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png'
                alt=''
            />
            {message}
            <div>
                <span>{likeCount} like</span>
            </div>
        </div>
    );
};
