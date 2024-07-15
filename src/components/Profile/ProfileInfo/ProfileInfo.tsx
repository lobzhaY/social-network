import { ProfileType } from '../ProfileType';
import styles from './ProfileInfo.module.scss';
import userMock from '../../../assets/images/user-mock.png';
import { ProfileStatus } from './ProfileStatus';
import { ProfileData } from './profile-data';
import { ProfileForm } from './profile-form';
import { useState } from 'react';

type ProfileInfoType = {
    isOwner: boolean;
    status: string;
    userProfile: ProfileType;
    setUserStatus: (status: string) => void;
    savePhoto: (photo: object) => void;
    saveDataProfileForm: (dataForm: any, setStatus: any) => void;
};

export const ProfileInfo: React.FC<ProfileInfoType> = ({
    savePhoto,
    isOwner,
    userProfile,
    status,
    setUserStatus,
    saveDataProfileForm
}) => {
    const mainImgSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };

    const [editMode, setEditMode] = useState(false);


    return (
        <>
            <div className={styles.imgWrapper}>
                <img
                    src='https://s3.eu-central-1.amazonaws.com/aviata-blog-2.0/blog/posts/optimized/0_0e8a363f5e2211a7fa0290d454db7ee67c86c4d0.png.webp'
                    alt=''
                />
                {isOwner && <input type='file' onChange={mainImgSelected} />}
            </div>

            <div className={styles.descriptionBlock}>
                <div className={styles.avatar}>
                    <img src={userProfile.photos.large || userMock} alt='User avatar' />
                </div>

                {
                    isOwner && editMode ? <ProfileForm saveDataProfileForm={saveDataProfileForm} userProfile={userProfile} toEditMode={setEditMode} /> : <ProfileData userProfile={userProfile} isOwner={isOwner} toEditMode={setEditMode}  />
                }
               

                <div>
                    Status:{' '}
                    <ProfileStatus
                        isOwner={isOwner}
                        status={status}
                        setUserStatus={setUserStatus}
                    />
                </div>
            </div>
        </>
    );
};
