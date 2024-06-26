import styles from './MyPosts.module.scss';
import { PostType } from './MyPostsType';
import { Post } from './Post';
import { AddMassageForm } from '../../commen';

type MyPostsType = {
    posts: PostType[];
    addPost: (text: string) => void;
};

export const MyPosts: React.FC<MyPostsType> = ({ posts, addPost }) => {

    return (
        <div className={styles.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <AddMassageForm sendMessage={addPost} buttonTitle='Add post' />
            </div>
            <div className={styles.posts}>
                {posts.map((post) => (
                    <Post message={post.message} likeCount={post.likeCount} key={post.id} />
                ))}
            </div>
        </div>
    );
};
