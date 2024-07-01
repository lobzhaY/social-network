import { LoginForm } from './LoginForm';
import { loginThunkCreator } from '../../redux/auth.reducer';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from '../../routes/router-constants';
import { useAppDispatch, useAppSelector } from '../../hooks';

export const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {isAuth} = useAppSelector((state) => state.auth)

    const loginUser = (email: string, password: string, rememberMe: boolean, setStatus: any) => {
        dispatch(loginThunkCreator(email, password, rememberMe, setStatus))
    }

    if (isAuth) {
        navigate(ROUTER_PATH.profile);
    };

    return (
        <>
            <h1>LOGIN</h1>

            <LoginForm loginUser={loginUser} />
        </>
    );
};

