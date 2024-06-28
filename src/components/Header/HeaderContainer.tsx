import React from 'react';
import { Header } from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentAuthUserThunkCreator } from '../../redux/users-reducer';
import { logoutThunkCreator } from '../../redux/auth.reducer';

type HeaderAPIContainerType = {
    setUserData: () => void;
    logout: () => void;
    isAuth: boolean;
    userLogin: string;
};

export class HeaderAPIContainer extends React.Component<HeaderAPIContainerType, {}> {
    componentDidMount(): void {
        this.props.setUserData();
    }

    render() {
        return (
            <Header
                isAuth={this.props.isAuth}
                userLogin={this.props.userLogin}
                logout={this.props.logout}
            />
        );
    }
}

export const HeaderContainer = () => {
    const { userLogin, isAuth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const setUserData = () => {
        dispatch(getCurrentAuthUserThunkCreator());
    };

    const logout = () => {
        dispatch(logoutThunkCreator());
    };

    return (
        <HeaderAPIContainer
            setUserData={setUserData}
            isAuth={isAuth}
            userLogin={userLogin}
            logout={logout}
        />
    );
};
