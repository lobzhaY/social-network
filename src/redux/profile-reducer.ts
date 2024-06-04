import { PostType } from '../components/Profile/MyPosts/MyPostsType';
import { actionsTypes } from './store';

export const addPostActionCreator = () => ({
    type: actionsTypes.addPost,
});

export const updateNewPostTextActionCreator = (text: string) => ({
    type: actionsTypes.updateNewPostText,
    payload: text,
});

export const postsData: PostType[] = [
    { id: '3', message: 'И с медведем.', likeCount: 0 },
    { id: '4', message: 'Танцы с бубном.', likeCount: 7 },
    { id: '5', message: 'Всё будет хорошо!', likeCount: 25 },
];

const initialState = {
    posts: postsData,
    newPostText: '',
}


export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.addPost:
            const newPost: PostType = {
                id: '5',
                message: state.newPostText,
                likeCount: 0,
            };

            state.posts.push(newPost);
            state.newPostText = '';
            break;

        case actionsTypes.updateNewPostText:
            state.newPostText = action.payload as string;
            break;

        default:
            break;
    }

    return state;
};
