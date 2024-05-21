import styles from './Post.module.scss';

export const Post = () => {
    return (
        <div className={styles.post}>
            <img
                src='https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png'
                alt=''
            />
            post 1
            <div>
                <span>like</span>
            </div>
        </div>
    );
};
