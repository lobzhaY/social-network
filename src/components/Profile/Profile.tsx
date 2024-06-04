import { MyPosts } from './MyPosts';
import { ProfileInfo } from './ProfileInfo';

import styles from './Profile.module.scss';
import { PostType } from './MyPosts/MyPostsType';
import { ActionType } from '../../redux/store';

type ProfileType = {
    state: {
        posts: PostType[];
        newPostText: string;
    };
    dispatch: (action: ActionType) => void;
};

export const Profile: React.FC<ProfileType> = ({ state, dispatch }) => {
    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={state.posts} newPostText={state.newPostText} dispatch={dispatch} />
        </div>
    );
};
