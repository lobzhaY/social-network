import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LoginForm } from './LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunkCreator } from '../../redux/auth.reducer';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATH } from '../../routes/router-constants';

export const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isAuth} = useSelector((state) => state.auth)

    const loginUser = (email: string, password: string, rememberMe: boolean) => {
        dispatch(loginThunkCreator(email, password, rememberMe))
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

