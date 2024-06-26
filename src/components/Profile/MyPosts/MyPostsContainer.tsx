import {
    addPostActionCreator
} from '../../../redux/profile-reducer';
import { MyPosts } from './MyPosts';
import { useDispatch, useSelector } from 'react-redux';

export const MyPostsContainer: React.FC = () => {
    const dispatch = useDispatch();

    const { posts } = useSelector((state) => state.profilePage);

    const addPost = (text: string) => {
        dispatch(addPostActionCreator(text));
    };

    return (
        <MyPosts
            addPost={addPost}
            posts={posts}
        />
    );
};
