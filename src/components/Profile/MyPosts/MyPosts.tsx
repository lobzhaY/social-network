import { RefObject, createRef } from 'react';
import styles from './MyPosts.module.scss';
import { PostType } from './MyPostsType';
import { Post } from './Post';
import { ActionType, addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/state';

type MyPostsType = {
    posts: PostType[];
    newPostText: string;
    dispatch: (action: ActionType) => void;
};

export const MyPosts: React.FC<MyPostsType> = ({ posts, newPostText, dispatch }) => {
    const newPostElement: RefObject<HTMLTextAreaElement> = createRef();

    const handleAddPost = () => {
        dispatch(addPostActionCreator());
    };

    const handlePostChange = () => {
        const text = newPostElement.current?.value;
        dispatch(updateNewPostTextActionCreator(text as string));
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
