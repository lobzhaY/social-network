import { ProfileType } from '../../ProfileType';
import { Field, Form, Formik } from 'formik';
import styles from './profile-form.module.scss';

type ProfileFormProps = {
    userProfile: ProfileType;
    toEditMode: (edit: boolean) => void;
    saveDataProfileForm: (dataForm: any, setStatus: any) => void;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({
    saveDataProfileForm,
    userProfile,
    toEditMode,
}) => {
    return (
        <>
            <Formik
                initialValues={{
                    fullName: userProfile.fullName || '',
                    lookingForAJob: userProfile.lookingForAJob || '',
                    lookingForAJobDescription: userProfile.lookingForAJobDescription || '',
                    aboutMe: userProfile.aboutMe || '',
                    contacts: {
                        github: userProfile.contacts.github || '',
                        vk: userProfile.contacts.vk || '',
                        facebook: userProfile.contacts.facebook || '',
                        instagram: userProfile.contacts.instagram || '',
                        twitter: userProfile.contacts.twitter || '',
                        website: userProfile.contacts.website || '',
                        youtube: userProfile.contacts.youtube || '',
                        mainLink: userProfile.contacts.mainLink || '',
                    },
                }}
                onSubmit={(values, submitProps) => {
                   // toEditMode(false);
                 
                    saveDataProfileForm(values, submitProps.setStatus)
                     
                }}
            >
                {({errors, touched, status}) => (
                    <Form>
                        <button type='submit'>save</button>
                        <div>
                            Full name: <Field key='fullName' type='text' name='fullName' placeholder='Full name' />
                        </div>
                        <div>
                            Looking for a job: <Field type='checkbox' key='lookingForAJob' name='lookingForAJob' />
                        </div>
                        <div>
                            My professional skills:{' '}
                            <Field
                            key='lookingForAJobDescription'
                                type='textarea'
                                name='lookingForAJobDescription'
                                placeholder='My professional skills'
                            />
                        </div>
                        <div>
                            About me: <Field key='aboutMe' type='text' name='aboutMe' placeholder='About me' />
                        </div>
                        <div>
                            Contacts:{' '}
                            {Object.keys(userProfile.contacts).map((key: string) => (
                                <div>
                                    {key}:{' '}
                                    <Field
                                        key={key}
                                        type='text'
                                        name={`contacts.${key}`}
                                        placeholder={key}
                                    />
                                </div>
                            ))}
                        </div>

                        {status &&
                          status.error.length > 0 &&
                          status.error.map((item, index) => (
                              <p key={index} className={styles.invalidFeedback}>
                                  {item}
                              </p>
                          ))}
                     <br />
                    </Form>
                )}
            </Formik>
        </>
    );
};
