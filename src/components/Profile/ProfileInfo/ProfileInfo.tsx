import { ProfileType } from '../ProfileType';
import styles from './ProfileInfo.module.scss';
import userMock from '../../../assets/images/user-mock.png';
import { ProfileStatus } from './ProfileStatus';

type ProfileInfoType = {
    status: string;
    userProfile: ProfileType;
    setUserStatus: (status: string) => void;
};

export const ProfileInfo: React.FC<ProfileInfoType> = ({ userProfile, status, setUserStatus }) => {
    return (
        <>
            <div className={styles.imgWrapper}>
                <img
                    src='https://s3.eu-central-1.amazonaws.com/aviata-blog-2.0/blog/posts/optimized/0_0e8a363f5e2211a7fa0290d454db7ee67c86c4d0.png.webp'
                    alt=''
                />
            </div>

            <div className={styles.descriptionBlock}>
                <div className={styles.avatar}>
                    <img src={userProfile.photos.large || userMock} alt='User avatar' />
                </div>
                <h2>{userProfile.fullName}</h2>

                <ProfileStatus status={status} setUserStatus={setUserStatus} />

                <p>{userProfile.lookingForAJob && userProfile.lookingForAJobDescription}</p>
            </div>
        </>
    );
};
