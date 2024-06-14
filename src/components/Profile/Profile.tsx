import { ProfileInfo } from './ProfileInfo';

import styles from './Profile.module.scss';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { ProfileType } from './ProfileType';
import { Loader } from '../commen';

type ProfileComponentType = {
    userProfile: ProfileType
};

export const Profile: React.FC<ProfileComponentType> = ({userProfile}) => {
    return (
        !userProfile ? (<Loader />) : (<div>
            <ProfileInfo userProfile={userProfile} />
            <MyPostsContainer />
        </div>)
    );
};
