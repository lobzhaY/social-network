import React from 'react';
import { Header } from './Header';
import axios from 'axios';
import { API_URL, headers } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDataActionCreator } from '../../redux/auth.reducer';

type HeaderAPIContainerType = {
    setUserData: (userId: number, userEmail: string, userLogin: string) => void;
    isAuth: boolean;
    userLogin: string;
};

export class HeaderAPIContainer extends React.Component<HeaderAPIContainerType, {}> {
    componentDidMount(): void {
        axios
            .get(`${API_URL}auth/me`, { withCredentials: true })
            .then((data) => {
                if (data.data.resultCode === 0) {
                  const {id, email, login} = data.data.data;
                    this.props.setUserData(
                        id,
                        email,
                        login,
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            });
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

    const setUserData = (userId: number, userEmail: string, userLogin: string) => {
        dispatch(setUserDataActionCreator(userId, userEmail, userLogin));
    };

    return (
        <HeaderAPIContainer
            setUserData={setUserData}
            isAuth={isAuth}
            userLogin={userLogin}
        />
    );
};
