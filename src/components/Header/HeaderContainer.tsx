import React from 'react';
import { Header } from './Header';
import { logoutThunkCreator } from '../../redux/auth.reducer';
import { useAppDispatch, useAppSelector } from '../../hooks';

type HeaderAPIContainerType = {
    setUserData: () => void;
    logout: () => void;
    isAuth: boolean;
    userLogin: string;
};

export class HeaderAPIContainer extends React.Component<HeaderAPIContainerType, {}> {

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
    const { userLogin, isAuth } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(logoutThunkCreator());
    };

    return (
        <Header
            isAuth={isAuth}
            userLogin={userLogin}
            logout={logout}
        />
    );
};
