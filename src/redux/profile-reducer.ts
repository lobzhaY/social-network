import {
    getProfileUserAPI,
    getUserStatusAPI,
    saveUserPhoto,
    saveUserProfile,
    updateUserStatusAPI,
} from '../api/api';
import { PostType } from '../components/Profile/MyPosts/MyPostsType';
import { ProfileType } from '../components/Profile/ProfileType';
import { AppDispatch } from './redux-store';
import { actionsTypes } from './store';

type AddPostType = {
    type: typeof actionsTypes.addPost;
    payload: string;
};

export const addPostActionCreator = (text: string): AddPostType => ({
    type: actionsTypes.addPost,
    payload: text,
});

type SetUserProfileType = {
    type: typeof actionsTypes.setUserProfile;
    payload: ProfileType;
};

export const setUserProfileActionCreator = (profile: ProfileType): SetUserProfileType => ({
    type: actionsTypes.setUserProfile,
    payload: profile,
});

type GetUserStatusType = {
    type: typeof actionsTypes.getUserStatus;
    payload: string;
};
export const getUserStatusActionCreator = (status: string): GetUserStatusType => ({
    type: actionsTypes.getUserStatus,
    payload: status,
});

type DeletePostType = {
    type: typeof actionsTypes.deletePost;
    payload: string;
};
export const deletePostActionCreator = (id: string): DeletePostType => ({
    type: actionsTypes.deletePost,
    payload: id,
});

type PhotosType = { small: string; large: string };
type SaveUserPhotoSuccessType = {
    type: typeof actionsTypes.saveUserPhoto;
    payload: PhotosType;
};

export const saveUserPhotoSuccessActionCreator = (
    photos: PhotosType,
): SaveUserPhotoSuccessType => ({
    type: actionsTypes.saveUserPhoto,
    payload: photos,
});

export const postsData: PostType[] = [
    { id: '3', message: 'И с медведем.', likeCount: 0 },
    { id: '4', message: 'Танцы с бубном.', likeCount: 7 },
    { id: '5', message: 'Всё будет хорошо!', likeCount: 25 },
];

export const getProfileUserThunkCreator = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const data = await getProfileUserAPI(id);
        dispatch(setUserProfileActionCreator(data));
    } catch (error) {
        console.log(error);
    }
};

export const getStatusUserThunkCreator = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await getUserStatusAPI(id);
        dispatch(getUserStatusActionCreator(data));
    } catch (error) {
        console.log(error);
    }
};

export const updateStatusUserThunkCreator = (status: string) => async (dispatch: AppDispatch) => {
    try {
        const { resultCode } = await updateUserStatusAPI(status);
        if (!resultCode) {
            dispatch(getUserStatusActionCreator(status));
        }
    } catch (error) {
        console.log(error);
    }
};

export const savePhotoUserThunkCreator = (photo: object) => async (dispatch: AppDispatch) => {
    try {
        const { resultCode, data } = await saveUserPhoto(photo);
        if (!resultCode) {
            dispatch(saveUserPhotoSuccessActionCreator(data.photos));
        }
    } catch (error) {
        console.log(error);
    }
};

export const saveProfileUserThunkCreator =
    (profile: any, setStatus: any) =>
    async (dispatch: AppDispatch, getState: () => { auth: { userId: any } }) => {
        const userId = getState().auth.userId;

        try {
            const { resultCode, messages } = await saveUserProfile(profile);
            if (resultCode === 0) {
                dispatch(getProfileUserThunkCreator(userId));
            } else {
                setStatus({ error: messages });
            }
        } catch (error) {
            console.log(error);
        }
    };

type InitialStateType = {
    posts: PostType[];
    newPostText: string;
    userProfile: null | ProfileType;
    status: string;
};

const initialState = {
    posts: postsData,
    newPostText: '',
    userProfile: null,
    status: '',
};

export const profileReducer = (state = initialState, action: AddPostType | SetUserProfileType | GetUserStatusType | SaveUserPhotoSuccessType): InitialStateType => {
    switch (action.type) {
        case actionsTypes.addPost:
            const newPost: PostType = {
                id: '5',
                message: (action as AddPostType).payload,
                likeCount: 0,
            };

            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost],
            };

        case actionsTypes.setUserProfile:
            return {
                ...state,
                userProfile: (action as SetUserProfileType).payload,
            };

        case actionsTypes.getUserStatus:
            return {
                ...state,
                status: (action as GetUserStatusType).payload,
            };

        case actionsTypes.deletePost:
            const posts = [...state.posts].filter((post) => post.id !== action.payload);
            return {
                ...state,
                posts,
            };

        case actionsTypes.saveUserPhoto:
            return {
                ...state,
                userProfile: {
                    ...(state.userProfile as unknown as ProfileType),
                    photos: { ...(action as SaveUserPhotoSuccessType).payload },
                },
            };

        default:
            return state;
    }
};
