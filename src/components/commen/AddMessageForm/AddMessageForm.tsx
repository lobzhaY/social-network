import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './AddMessageForm.module.scss';

type AddMessageFormType = {
    buttonTitle: string;
    sendMessage: (value: string) => void;
};

export const AddMassageForm: React.FC<AddMessageFormType> = ({ buttonTitle, sendMessage }) => {
    const addNewMessage = (values: string) => {
        sendMessage(values);
    };

    const validateNewMessageBody = values => {
        const errors = {};
        if (!values.newMessageBody) {
           errors.newMessageBody = 'Required 1';
        } else if (
           values.newMessageBody.length < 10
        ) {
           errors.newMessageBody = 'Invalid newMessageBody';
        }
        return errors;
      };

    return (
        <Formik
            initialValues={{
                newMessageBody: '',
            }}
            validate={validateNewMessageBody}
            onSubmit={(values, { resetForm }) => {
                addNewMessage(values.newMessageBody);
                resetForm({ values: { newMessageBody: '' } });
            }}
        >
            {({errors, touched}) => (
                <Form>
                    <div className="form-group">
                        <Field name={'newMessageBody'} as={'textarea'} placeholder={'enter text'} className={`form-control ${
                           touched.newMessageBody && errors.newMessageBody ? styles.isInvalid : ""
                         }`} />
                    </div>
                    {errors.newMessageBody && touched.newMessageBody &&  <ErrorMessage name="newMessageBody" component="div"  className={styles.invalidFeedback} /> }

                    <button type={'submit'}>{buttonTitle}</button>
                </Form>
            )}
        </Formik>
    );
};
