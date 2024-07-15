import { ProfileInfo } from './ProfileInfo';
import { MyPostsContainer } from './MyPosts/MyPostsContainer';
import { ProfileType } from './ProfileType';
import { Loader } from '../commen';

type ProfileComponentType = {
    isOwner: boolean;
    status: string;
    userProfile: ProfileType | null;
    setUserStatus: (status: string) => void;
    savePhoto: (photo: object) => void;
    saveDataProfileForm: (dataForm: any, setStatus: any) => void;
};

export const Profile: React.FC<ProfileComponentType> = ({saveDataProfileForm, savePhoto, isOwner, userProfile, status, setUserStatus}) => {
    return (
        !userProfile ? (<Loader />) : (<div>
            <ProfileInfo saveDataProfileForm={saveDataProfileForm} savePhoto={savePhoto} isOwner={isOwner} userProfile={userProfile} status={status} setUserStatus={setUserStatus} />
            <MyPostsContainer />
        </div>)
    );
};
