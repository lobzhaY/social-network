import { ProfileType } from "../../ProfileType";
import { Formik } from 'formik';

type ProfileFormProps = {
  userProfile: ProfileType;
  toEditMode: (edit: boolean) => void;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({userProfile, toEditMode}) => {
  const handleSaveFormData = () => {
    toEditMode(false);
  };

  return (
    <>

<Formik
       initialValues={{ name: userProfile.fullName, lookingForAJob: userProfile.lookingForAJob, lookingForAJobDescription: userProfile.lookingForAJobDescription, aboutMe: userProfile.aboutMe }}
       onSubmit={(values) => {
       toEditMode(false);
        console.log(values);
       }}
     >
       {({
         values,
         handleChange,
         handleBlur,
         handleSubmit,
       }) => (
         <form onSubmit={handleSubmit}>
           <button type="submit">
              save
           </button>

           <input
             type="text"
             name="name"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.name}
           />

           <input type="checkbox" name="lookingForAJob"  />
          
           <input
             type="text"
             name="lookingForAJobDescription"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.lookingForAJobDescription}
           />

           <input type="text" name="aboutMe"  onChange={handleChange}
             onBlur={handleBlur}
             value={values.aboutMe} />
    
         </form>
       )}
     </Formik>

           {/*  <div>
                Contacts:{' '}
                {Object.keys(userProfile.contacts).map((key: string) => (
                    <UserContacts
                        key={key}
                        contactTitle={key}
                        contactValue={userProfile.contacts[key]}
                    />
                ))}
            </div> */}
    </>
  )
}