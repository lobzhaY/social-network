export type UserType = {
  id: string,
  fullName: string,
  status:string,
  location: {
      city: string,
      country: string,
  },
  followed: boolean,
  avatar: string,
}