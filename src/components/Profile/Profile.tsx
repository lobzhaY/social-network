import { MyPosts } from './MyPosts';
import { ProfileInfo } from './ProfileInfo';

import styles from './Profile.module.scss';
import { PostType } from './MyPosts/MyPostsType';

type ProfileType = {
    state: {
        posts: PostType[];
        newPostText: string;
    },
    addPost: () => void;
    updateNewPostText: (text: string) => void;
};

export const Profile: React.FC<ProfileType> = ({ state, addPost, updateNewPostText }) => {
    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={state.posts} addPost={addPost} newPostText={state.newPostText} updateNewPostText={updateNewPostText} />
        </div>
    );
};
