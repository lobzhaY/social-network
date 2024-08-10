import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
    profileActions
} from '../../../redux/profile-reducer';
import { MyPosts } from './MyPosts';

export const MyPostsContainer: React.FC = () => {
    const dispatch = useAppDispatch();

    const { posts } = useAppSelector((state) => state.profilePage);

    const addPost = (text: string) => {
        dispatch(profileActions.addPostActionCreator(text));
    };

    return (
        <MyPosts
            addPost={addPost}
            posts={posts}
        />
    );
};
