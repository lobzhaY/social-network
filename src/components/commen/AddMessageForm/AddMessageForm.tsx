import { Formik, Form, Field } from 'formik';

type AddMessageFormType = {
    buttonTitle: string;
    sendMessage: (value: string) => void;
};

export const AddMassageForm: React.FC<AddMessageFormType> = ({ buttonTitle, sendMessage }) => {
    const addNewMessage = (values: string) => {
        sendMessage(values);
    };
    return (
        <Formik
            initialValues={{
                newMessageBody: '',
            }}
            onSubmit={(values, { resetForm }) => {
                addNewMessage(values.newMessageBody);
                resetForm({ values: { newMessageBody: '' } });
            }}
        >
            {() => (
                <Form>
                    <div>
                        <Field name={'newMessageBody'} as={'textarea'} placeholder={'enter text'} />
                    </div>

                    <button type={'submit'}>{buttonTitle}</button>
                </Form>
            )}
        </Formik>
    );
};
