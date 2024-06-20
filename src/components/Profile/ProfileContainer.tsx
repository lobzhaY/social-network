import React, { useEffect } from 'react';
import { Profile } from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfileActionCreator } from '../../redux/profile-reducer';
import { ProfileType } from './ProfileType';
import { useParams } from 'react-router-dom';
import { getProfileUserAPI } from '../../api/api';
import { getProfileUserThunkCreator } from '../../redux/users-reducer';

type ProfileAPIType = {
    userProfile: ProfileType;
    userId: string | undefined;
    setUserProfile: (id: string) => void;
};

class ProfileAPIContainer extends React.Component<ProfileAPIType, {}> {
    componentDidMount(): void {
        let userId = this.props.userId;
        if (!this.props.userId) {
            userId = '2';
        }
        
        this.props.setUserProfile(userId as string);
    }

    render() {
        return <Profile userProfile={this.props.userProfile} />;
    }
}

export const ProfileContainer = () => {
    const { userProfile } = useSelector((state) => state.profilePage);
    const dispatch = useDispatch();
    const params = useParams();

    const setUserProfile = (id: string) => {
        dispatch(getProfileUserThunkCreator(id));
    };

    return (
        <ProfileAPIContainer
            setUserProfile={setUserProfile}
            userProfile={userProfile}
            userId={params.id}
        />
    );
};
