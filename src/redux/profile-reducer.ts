import { PostType } from '../components/Profile/MyPosts/MyPostsType';
import { ProfileType } from '../components/Profile/ProfileType';
import { actionsTypes } from './store';

export const addPostActionCreator = () => ({
    type: actionsTypes.addPost,
});

export const updateNewPostTextActionCreator = (text: string) => ({
    type: actionsTypes.updateNewPostText,
    payload: text,
});

export const setUserProfileActionCreator = (profile: ProfileType) => ({
    type: actionsTypes.setUserProfile,
    payload: profile
});

export const getUserStatusActionCreator = (status: string) => ({
    type: actionsTypes.getUserStatus,
    payload: status
});

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

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.addPost:
            const newPost: PostType = {
                id: '5',
                message: state.newPostText,
                likeCount: 0,
            };

            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, newPost],
            };

        case actionsTypes.updateNewPostText:
            return {
                ...state,
                newPostText: action.payload as string,
            };

        case actionsTypes.setUserProfile: 
            return {
                ...state,
                userProfile: action.payload as ProfileType
            };

        case actionsTypes.getUserStatus: 
            return {
                ...state,
                status: action.payload
            };
    
        default:
            return state;
    }
};
