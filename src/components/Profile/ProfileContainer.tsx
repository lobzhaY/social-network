import React from 'react';
import { Profile } from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileType } from './ProfileType';
import { useParams } from 'react-router-dom';
import { getProfileUserThunkCreator, getStatusUserThunkCreator, updateStatusUserThunkCreator } from '../../redux/users-reducer';
import { withAuthRedirect } from '../../hoc/AuthRedirect';

type ProfileAPIType = {
    status: string;
    userProfile: ProfileType;
    userId: string | undefined;
    setUserProfile: (id: string) => void;
    getUserStatus: (id: string) => void;
    setUserStatus: (id: string) => void;
};

class ProfileAPIContainer extends React.Component<ProfileAPIType, {}> {
    componentDidMount(): void {
        let userId = this.props.userId;
        if (!this.props.userId) {
            userId = ' 31343';
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
   
    const dispatch = useDispatch();
    const params = useParams();

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
            status={status}
        />
    );
};

export const AuthRedirectProfileComponent: React.FC = withAuthRedirect(ProfileContainer)
