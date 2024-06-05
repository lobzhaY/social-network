import {
    addPostActionCreator,
    updateNewPostTextActionCreator,
} from '../../../redux/profile-reducer';
import { MyPosts } from './MyPosts';
import { useDispatch, useSelector } from 'react-redux';

export const MyPostsContainer: React.FC = () => {
    const dispatch = useDispatch();

    const { posts, newPostText } = useSelector((state) => state.profilePage);

    const updateNewPostText = (text: string) => {
        dispatch(updateNewPostTextActionCreator(text as string));
    };

    const addPost = () => {
        dispatch(addPostActionCreator());
    };

    return (
        <MyPosts
            updateNewPostText={updateNewPostText}
            addPost={addPost}
            posts={posts}
            newPostText={newPostText}
        />
    );
};
