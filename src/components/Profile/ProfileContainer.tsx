import React from 'react';
import { Profile } from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileType } from './ProfileType';
import { useNavigate, useParams } from 'react-router-dom';
import { getProfileUserThunkCreator, getStatusUserThunkCreator, updateStatusUserThunkCreator } from '../../redux/users-reducer';
import { withAuthRedirect } from '../../hoc/AuthRedirect';

type ProfileAPIType = {
    status: string;
    userProfile: ProfileType;
    userId: string | undefined;
    authorizedUserId: string;
    isAuth: boolean;
    setUserProfile: (id: string) => void;
    getUserStatus: (id: string) => void;
    setUserStatus: (id: string) => void;
    navigate: any;
};

class ProfileAPIContainer extends React.Component<ProfileAPIType, {}> {
    componentDidMount(): void {
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

    render() {
        return <Profile userProfile={this.props.userProfile} status={this.props.status} setUserStatus={this.props.setUserStatus} />;
    }
}

export const ProfileContainer = () => {
    const { userProfile, status } = useSelector((state) => state.profilePage);
   const { userId, isAuth } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
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
    }

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
        />
    );
};

export const AuthRedirectProfileComponent: React.FC = withAuthRedirect(ProfileContainer)
