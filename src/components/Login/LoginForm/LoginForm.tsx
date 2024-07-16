import { Formik, Form, Field, ErrorMessage } from 'formik';

import { validateLoginForm, validationSchemaLoginForm } from '../../../utils/validation-helpers';

import styles from './LoginForm.module.scss';

type LoginFormProps = {
    captchaUrl: string | null;
    loginUser: (email: string, password: string, rememberMe: boolean, captcha: string, setStatus: any) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ captchaUrl, loginUser }) => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                rememberMe: false,
                captcha: '',
            }}
            validate={validateLoginForm}
            validationSchema={validationSchemaLoginForm}
            onSubmit={(values, submitProps) => {
                loginUser(values.email, values.password, values.rememberMe, values.captcha, submitProps.setStatus);
                submitProps.resetForm();
            }}
        >
            {({ errors, touched, status }) => (
                <Form>
                    <div className='form-group'>
                        <Field
                            name={'email'}
                            type={'text'}
                            placeholder={'e-mail'}
                            className={`form-control ${
                                touched.email && errors.email ? styles.isInvalid : ''
                            }`}
                        />
                    </div>
                    {errors.email && touched.email && (
                        <ErrorMessage
                            name='email'
                            component='div'
                            className={styles.invalidFeedback}
                        />
                    )}

                    <div>
                        <Field name={'password'} type={'password'} placeholder={'password'} />
                    </div>
                    <ErrorMessage name='password' component='div' />

                    <div>
                        <Field type={'checkbox'} name={'rememberMe'} id='rememberMe' />
                        <label htmlFor={'rememberMe'}> remember me </label>
                    </div>

                    {
                        captchaUrl && <img src={captchaUrl} />
                    }
                    {
                        captchaUrl && (
                            <div>
                                <Field name={'captcha'} type={'text'} placeholder={'Symbols from image'} />
                            </div>
                        )
                    }

                    {status &&
                        status.error.length > 0 &&
                        status.error.map((item, index) => (
                            <p key={index} className={styles.invalidFeedback}>
                                {item}
                            </p>
                        ))}

                    <button type={'submit'}>Login</button>
                </Form>
            )}
        </Formik>
    );
};
