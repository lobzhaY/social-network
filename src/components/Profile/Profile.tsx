import { MyPosts } from './MyPosts';
import { ProfileInfo } from './ProfileInfo';

import styles from './Profile.module.scss';
import { PostType } from './MyPosts/MyPostsType';

type ProfileType = {
    state: {
        posts: PostType[];
    };
};

export const Profile: React.FC<ProfileType> = ({ state }) => {
    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={state.posts} />
        </div>
    );
};
