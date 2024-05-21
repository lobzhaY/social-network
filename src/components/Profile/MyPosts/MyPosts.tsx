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
               <Post />
               <Post />
            </div>
        </div>
    );
};
