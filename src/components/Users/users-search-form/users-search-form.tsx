import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FilterFormType } from '../../../redux/users-reducer';

type UsersSearchFormProps = {
    filterChanged: (filter: FilterFormType) => void;
};

type FriendsFieldType = 'true' | 'false' | 'null';

export const UsersSearchForm: React.FC<UsersSearchFormProps> = React.memo(({ filterChanged }) => {
    const usersSearchFormValidate = (values: {term: string, friend: FriendsFieldType}) => {
        const errors = {};
        return errors;
    };

    const submitUsersSearchForm = (
        values: {term: string, friend: FriendsFieldType},
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    ) => {
        const filter: FilterFormType = {
            term: values.term,
            friend: values.friend === 'null' ? null : !!values.friend,
        }

        filterChanged(filter);
        setSubmitting(false);
    };

    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: 'null' }}
                validate={usersSearchFormValidate}
                onSubmit={submitUsersSearchForm}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type='text' name='term' />

                        <Field as='select' name='friend'>
                            <option value='null'>All</option>
                            <option value='true'>Only followed</option>
                            <option value='false'>Only unfollowed</option>
                        </Field>

                        <button type='submit' disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
});
