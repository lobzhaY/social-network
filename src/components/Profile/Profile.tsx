import { MyPosts } from './MyPosts';
import { ProfileInfo } from './ProfileInfo';

import styles from './Profile.module.scss';

export const Profile = () => {
    return (
        <div>
            <ProfileInfo />
            <MyPosts />
        </div>
    );
};
