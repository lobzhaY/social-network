import { MyPosts } from './MyPosts';
import { ProfileInfo } from './ProfileInfo';

import styles from './Profile.module.scss';
import { PostType } from './MyPosts/MyPostsType';
import { ActionType } from '../../redux/store';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';

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
            <MyPostsContainer />
        </div>
    );
};
