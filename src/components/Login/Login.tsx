import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LoginForm } from './LoginForm';

export const Login: React.FC = () => {
    return (
        <>
            <h1>LOGIN</h1>

            <LoginForm />
        </>
    );
};

