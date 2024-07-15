import React from 'react';
import { Profile } from './Profile';
import { ProfileType } from './ProfileType';
import { useNavigate, useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/AuthRedirect';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProfileUserThunkCreator, getStatusUserThunkCreator, savePhotoUserThunkCreator, saveProfileUserThunkCreator, updateStatusUserThunkCreator } from '../../redux/profile-reducer';

type ProfileAPIType = {
    status: string;
    userProfile: ProfileType | null;
    userId: string | undefined;
    authorizedUserId: string;
    isAuth: boolean;
    setUserProfile: (id: string) => void;
    getUserStatus: (id: string) => void;
    setUserStatus: (id: string) => void;
    navigate: any;
    savePhoto: (photo: object) => void;
    saveDataProfileForm: (dataForm: any, setStatus: any) => void;
};

class ProfileAPIContainer extends React.Component<ProfileAPIType, {}> {
    updateProfile() {
        let userId = this.props.userId;
        
        if (!this.props.userId) {
            userId = this.props.authorizedUserId;
            
            if (!userId) {
                this.props.navigate('/login');
            }
        }

        this.props.setUserProfile(userId as string);
        this.props.getUserStatus(userId as string);
    }
    componentDidMount(): void {
       this.updateProfile()
    }

    componentDidUpdate(prevProps: Readonly<ProfileAPIType>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.userId !== this.props.userId) {
          this.updateProfile()
        }
    }

    render() {
        return <Profile saveDataProfileForm={this.props.saveDataProfileForm} savePhoto={this.props.savePhoto} isOwner={!this.props.userId} userProfile={this.props.userProfile} status={this.props.status} setUserStatus={this.props.setUserStatus} />;
    }
}

export const ProfileContainer = () => {
    const { userProfile, status } = useAppSelector((state) => state.profilePage);
   const { userId, isAuth } = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();
    const params = useParams();

    const navigate = useNavigate();

    const setUserProfile = (id: string) => {
        dispatch(getProfileUserThunkCreator(id));
    };

    const getUserStatus = (id: string) => {
        dispatch(getStatusUserThunkCreator(id));
    };

    const setUserStatus = (status: string) => {
        dispatch(updateStatusUserThunkCreator(status))
    };

    const savePhoto = (photo: object) => {
        dispatch(savePhotoUserThunkCreator(photo));
    };

    const saveDataProfileForm = (dataForm: any, setStatus: any) => {
        dispatch(saveProfileUserThunkCreator(dataForm, setStatus));
    };

    return (
        <ProfileAPIContainer
            setUserStatus={setUserStatus}
            setUserProfile={setUserProfile}
            getUserStatus={getUserStatus}
            userProfile={userProfile}
            userId={params.id}
            authorizedUserId={userId}
            status={status}
            isAuth={isAuth}
            navigate={navigate}
            savePhoto={savePhoto}
            saveDataProfileForm={saveDataProfileForm}
        />
    );
};

const AuthRedirectProfileComponent: React.FC = withAuthRedirect(ProfileContainer);

export default AuthRedirectProfileComponent;
