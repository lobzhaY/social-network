import { RefObject, createRef } from 'react';
import styles from './MyPosts.module.scss';
import { PostType } from './MyPostsType';
import { Post } from './Post';

type MyPostsType = {
    posts: PostType[];
    newPostText: string;
    updateNewPostText: (text: string) => void;
    addPost: () => void;
};

export const MyPosts: React.FC<MyPostsType> = ({ posts, newPostText, updateNewPostText, addPost }) => {
    const newPostElement: RefObject<HTMLTextAreaElement> = createRef();

    const handleAddPost = () => {
        addPost();
    };

    const handlePostChange = () => {
        const text = newPostElement.current?.value;
        updateNewPostText(text as string);
    };

    return (
        <div className={styles.postsBlock}>
            <h3>My Posts</h3>
            <div>
                <div>
                    <textarea
                        ref={newPostElement}
                        onChange={handlePostChange}
                        value={newPostText}
                    />
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
