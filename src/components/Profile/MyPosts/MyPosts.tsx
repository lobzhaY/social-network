import styles from './MyPosts.module.scss';
import { Post } from './Post';

export const MyPosts = () => {
    return (
        <div>
            My Posts
            <div>
                <textarea></textarea>
                <button>Add post</button>
            </div>
            <div>
               <Post message='Привет! Как ты?' likeCount={15} />
               <Post message='Это мой первый пост!' likeCount={20} />
            </div>
        </div>
    );
};
