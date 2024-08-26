import { File } from 'buffer';
import { ResultCodes } from '../api/api';
import { profileApi } from '../api/profile-api';
import { PostType } from '../components/Profile/MyPosts/MyPostsType';
import { ProfileType } from '../components/Profile/ProfileType';
import { AppDispatch, GetActionsTypes } from './redux-store';
import { actionsTypes } from './store';

type InitialStateType = {
    posts: PostType[];
    newPostText: string;
    userProfile: null | ProfileType;
    status: string;
};

type ActionsTypes = GetActionsTypes<typeof profileActions>;

type PhotosType = { small: string; large: string };

export const postsData: PostType[] = [
    { id: '3', message: 'И с медведем.', likeCount: 0 },
    { id: '4', message: 'Танцы с бубном.', likeCount: 7 },
    { id: '5', message: 'Всё будет хорошо!', likeCount: 25 },
];

const initialState = {
    posts: postsData,
    newPostText: '',
    userProfile: null,
    status: '',
};

export const profileActions = {
    addPostActionCreator: (text: string) =>
        ({
            type: actionsTypes.addPost,
            payload: text,
        }) as const,
    setUserProfileActionCreator: (profile: ProfileType) =>
        ({
            type: actionsTypes.setUserProfile,
            payload: profile,
        }) as const,
    getUserStatusActionCreator: (status: string) =>
        ({
            type: actionsTypes.getUserStatus,
            payload: status,
        }) as const,
    deletePostActionCreator: (id: string) =>
        ({
            type: actionsTypes.deletePost,
            payload: id,
        }) as const,
    saveUserPhotoSuccessActionCreator: (photos: PhotosType) =>
        ({
            type: actionsTypes.saveUserPhoto,
            payload: photos,
        }) as const,
};

export const getProfileUserThunkCreator = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const data = await profileApi.getProfileUserAPI(id);
        dispatch(profileActions.setUserProfileActionCreator(data));
    } catch (error) {
        console.log(error);
    }
};

export const getStatusUserThunkCreator = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await profileApi.getUserStatusAPI(id);
        dispatch(profileActions.getUserStatusActionCreator(data));
    } catch (error) {
        console.log(error);
    }
};

export const updateStatusUserThunkCreator = (status: string) => async (dispatch: AppDispatch) => {
    try {
        const { resultCode } = await profileApi.updateUserStatusAPI(status);
        if (!resultCode) {
            dispatch(profileActions.getUserStatusActionCreator(status));
        }
    } catch (error) {
        console.log(error);
    }
};

export const savePhotoUserThunkCreator = (photo: File) => async (dispatch: AppDispatch) => {
    try {
        const { resultCode, data } = await profileApi.saveUserPhoto(photo);
        if (!resultCode) {
            dispatch(profileActions.saveUserPhotoSuccessActionCreator(data.photos));
        }
    } catch (error) {
        console.log(error);
    }
};

export const saveProfileUserThunkCreator =
    (profile: ProfileType, setStatus: any) =>
    async (dispatch: AppDispatch, getState) => {
        const userId = getState().auth.userId;

        try {
            const { resultCode, messages } = await profileApi.saveUserProfile(profile);
            if (resultCode === ResultCodes.Success) {
                dispatch(getProfileUserThunkCreator(userId));
            } else {
                setStatus({ error: messages });
            }
        } catch (error) {
            console.log(error);
        }
    };

export const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case actionsTypes.addPost:
            const newPost: PostType = {
                id: '5',
                message: action.payload as string,
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
                userProfile: action.payload as ProfileType,
            };

        case actionsTypes.getUserStatus:
            return {
                ...state,
                status: action.payload as string,
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
                    photos: { ...(action.payload as PhotosType) },
                },
            };

        default:
            return state;
    }
};
