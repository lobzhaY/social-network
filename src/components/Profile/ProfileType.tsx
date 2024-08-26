export type ProfileType = {
    userId: number;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    contacts: {
        [key: string]: string
    };
    photos: PhotosType,
    aboutMe?: string;
};

export type PhotosType = {
    small: string;
    large: string;
};