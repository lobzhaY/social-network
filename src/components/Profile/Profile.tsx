import { ProfileInfo } from './ProfileInfo';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { ProfileType } from './ProfileType';
import { Loader } from '../commen';

type ProfileComponentType = {
    status: string;
    userProfile: ProfileType | null;
    setUserStatus: (status: string) => void;
};

export const Profile: React.FC<ProfileComponentType> = ({userProfile, status, setUserStatus}) => {
    return (
        !userProfile ? (<Loader />) : (<div>
            <ProfileInfo userProfile={userProfile} status={status} setUserStatus={setUserStatus} />
            <MyPostsContainer />
        </div>)
    );
};
