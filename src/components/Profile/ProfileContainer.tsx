import React, { useEffect } from 'react';
import { Profile } from './Profile';
import axios from 'axios';
import { API_URL, headers } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfileActionCreator } from '../../redux/profile-reducer';
import { ProfileType } from './ProfileType';
import { useLocation, useParams } from 'react-router-dom';

type ProfileAPIType = {
    userProfile: ProfileType;
    userId: string | undefined;
    setUserProfile: (profile: ProfileType) => void;
};

class ProfileAPIContainer extends React.Component<ProfileAPIType, {}> {
    componentDidMount(): void {
        let userId = this.props.userId;
        if (!this.props.userId) {
            userId = '2';
        }
        axios
            .get(`${API_URL}profile/${userId}`, { headers })
            .then((data) => {
                this.props.setUserProfile(data.data);
            })
            .catch((error) => console.log(error));
        /* .finally(() => console.log('finally')); */
    }

    render() {
        return <Profile userProfile={this.props.userProfile} />;
    }
}

export const ProfileContainer = () => {
    const { userProfile } = useSelector((state) => state.profilePage);
    const dispatch = useDispatch();

    const location = useLocation();
    const params = useParams();

    const setUserProfile = (profile: ProfileType) => {
        dispatch(setUserProfileActionCreator(profile));
    };

    useEffect(() => {
        console.log(location);
        console.log(params);
    }, [location]);

    return (
        <ProfileAPIContainer
            setUserProfile={setUserProfile}
            userProfile={userProfile}
            userId={params.id}
        />
    );
};
