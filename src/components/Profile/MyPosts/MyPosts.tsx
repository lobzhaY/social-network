import styles from './MyPosts.module.scss';
import { Post } from './Post';
import { postsData } from './utils';

export const MyPosts = () => {
    return (
        <div className={styles.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={styles.posts}>
                {postsData.map((post) => (
                    <Post message={post.message} likeCount={post.likeCount} key={post.id} />
                ))}
            </div>
        </div>
    );
};
