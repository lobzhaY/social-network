import * as Yup from "yup";

export const validateLoginForm = values => {
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

export const validationSchemaLoginForm = Yup.object().shape( {
  password: Yup.string()
     .min( 2, "Must be longer than 2 characters" )
     .max( 15, "Must be shorter than 15 characters" )
     .required( "Required 2" )
} );