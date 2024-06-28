import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import styles from './LoginForm.module.scss';
import { useNavigate } from "react-router-dom";

const validateLoginForm = values => {
  const errors = {};
  if (!values.email) {
     errors.email = 'Required 1';
  } else if (
     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( values.email )
  ) {
     errors.email = 'Invalid email address';
  }
  return errors;
};

const validationSchemaLoginForm = Yup.object().shape( {

  password: Yup.string()
     .min( 2, "Must be longer than 2 characters" )
     .max( 15, "Must be shorter than 15 characters" )
     .required( "Required 2" )
} );

type LoginFormProps = {
   loginUser: (email: string, password: string, rememberMe: boolean) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ loginUser }) => {   
   return (
    <Formik
            initialValues={{
               email: "",
               password: "",
               rememberMe: false
            }}
            validate={validateLoginForm}
            validationSchema={validationSchemaLoginForm}
            onSubmit={(values) => {
               loginUser(values.email, values.password, values.rememberMe);
               
            }}
         >
            {({ errors, touched, validateField, validateForm }) => (
               <Form>
                  <div className="form-group">
                     <Field
                        name={'email'}
                        type={'text'}
                        placeholder={'e-mail'}
                        className={`form-control ${
                           touched.email && errors.email ? styles.isInvalid : ""
                         }`} />
                  </div>
                  {errors.email && touched.email &&  <ErrorMessage name="email" component="div"  className={styles.invalidFeedback} /> }

                  <div>
                     <Field
                        name={'password'}
                        type={'password'}
                        placeholder={'password'} />
                  </div>
                  <ErrorMessage name="password" component="div" />

                  <div>
                     <Field
                        type={'checkbox'}
                        name={'rememberMe'}
                        id='rememberMe' />
                     <label htmlFor={'rememberMe'}> remember me </label>
                  </div>

                  <button type={'submit'}>Login</button>
               </Form>
            )}
         </Formik>
  )
}