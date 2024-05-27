import { RefObject, createRef } from 'react';
import styles from './MyPosts.module.scss';
import { PostType } from './MyPostsType';
import { Post } from './Post';

type MyPostsType = {
    posts: PostType[];
};

export const MyPosts: React.FC<MyPostsType> = ({ posts }) => {
    const newPostElement: RefObject<HTMLTextAreaElement> = createRef();

    const handleAddPost = () => {
        const text = newPostElement.current?.value;
        alert(text);
    };

    return (
        <div className={styles.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
                </div>
                <div>
                    <button onClick={handleAddPost}>Add post</button>
                </div>
            </div>
            <div className={styles.posts}>
                {posts.map((post) => (
                    <Post message={post.message} likeCount={post.likeCount} key={post.id} />
                ))}
            </div>
        </div>
    );
};
