import React from 'react';
import { Header } from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentAuthUserThunkCreator } from '../../redux/users-reducer';

type HeaderAPIContainerType = {
    setUserData: () => void;
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

    return (
        <HeaderAPIContainer
            setUserData={setUserData}
            isAuth={isAuth}
            userLogin={userLogin}
        />
    );
};
