type UserContactProps = {
  contactTitle: string;
  contactValue: string;
};

export const UserContacts: React.FC<UserContactProps> = ({contactTitle, contactValue}) => {
  return (
    <div>
      <span>{contactTitle}:</span> {contactValue}
    </div>
  )
}