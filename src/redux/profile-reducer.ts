import {
    getProfileUserAPI,
    getUserStatusAPI,
    saveUserPhoto,
    saveUserProfile,
    updateUserStatusAPI,
} from '../api/api';
import { PostType } from '../components/Profile/MyPosts/MyPostsType';
import { ProfileType } from '../components/Profile/ProfileType';
import { actionsTypes } from './store';

export const addPostActionCreator = (text: string) => ({
    type: actionsTypes.addPost,
    payload: text,
});

export const setUserProfileActionCreator = (profile: ProfileType) => ({
    type: actionsTypes.setUserProfile,
    payload: profile,
});

export const getUserStatusActionCreator = (status: string) => ({
    type: actionsTypes.getUserStatus,
    payload: status,
});

export const deletePostActionCreator = (id: string) => ({
    type: actionsTypes.deletePost,
    payload: id,
});

export const saveUserPhotoSuccessActionCreator = (photos: { small: string; large: string }) => ({
    type: actionsTypes.saveUserPhoto,
    payload: photos,
});

export const postsData: PostType[] = [
    { id: '3', message: 'И с медведем.', likeCount: 0 },
    { id: '4', message: 'Танцы с бубном.', likeCount: 7 },
    { id: '5', message: 'Всё будет хорошо!', likeCount: 25 },
];

export const getProfileUserThunkCreator = (id: string) => async (dispatch) => {
    try {
        const data = await getProfileUserAPI(id);
        dispatch(setUserProfileActionCreator(data));
    } catch (error) {
        console.log(error);
    }
};

export const getStatusUserThunkCreator = (id: string) => async (dispatch) => {
    try {
        const { data } = await getUserStatusAPI(id);
        dispatch(getUserStatusActionCreator(data));
    } catch (error) {
        console.log(error);
    }
};

export const updateStatusUserThunkCreator = (status: string) => async (dispatch) => {
    try {
        const { resultCode } = await updateUserStatusAPI(status);
        if (!resultCode) {
            dispatch(getUserStatusActionCreator(status));
        }
    } catch (error) {
        console.log(error);
    }
};

export const savePhotoUserThunkCreator = (photo: object) => async (dispatch) => {
    try {
        const { resultCode, data } = await saveUserPhoto(photo);
        if (!resultCode) {
            dispatch(saveUserPhotoSuccessActionCreator(data.photos));
        }
    } catch (error) {
        console.log(error);
    }
};

export const saveProfileUserThunkCreator = (profile: any, setStatus: any) => async (dispatch, getState) => {
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
}

const initialState = {
    posts: postsData,
    newPostText: '',
    userProfile: null,
    status: '',
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.addPost:
            const newPost: PostType = {
                id: '5',
                message: action.payload,
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
                status: action.payload,
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
                    photos: {...action.payload},
                },
            };

        default:
            return state;
    }
};
