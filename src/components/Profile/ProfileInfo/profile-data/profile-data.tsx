import { ProfileType } from '../../ProfileType';
import { UserContacts } from '../user-contacts';

type ProfileDataProps = {
    userProfile: ProfileType;
    isOwner: boolean;
    toEditMode: (edit: boolean) => void;
};

export const ProfileData: React.FC<ProfileDataProps> = ({ userProfile, isOwner, toEditMode }) => {
    return (
        <>
            {isOwner && <button onClick={() => toEditMode(true)}>edit</button>}
            <h2>{userProfile.fullName}</h2>
            <div>
                <div>Looking for a job: {userProfile.lookingForAJob ? 'yes' : 'no'}</div>
                {userProfile.lookingForAJob && (
                    <div>My professional skills:{userProfile.lookingForAJobDescription}</div>
                )}
                <div>About me: {userProfile.aboutMe || '***'}</div>
            </div>

            <div>
                Contacts:{' '}
                {Object.keys(userProfile.contacts).map((key: string) => (
                    <UserContacts
                        key={key}
                        contactTitle={key}
                        contactValue={userProfile.contacts[key]}
                    />
                ))}
            </div>
        </>
    );
};
