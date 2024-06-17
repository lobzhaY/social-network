import { DialogsType, MessagesType } from '../components/Dialogs/dataType';
import { FriendType } from '../components/Navbar/NavbarType';
import { PostType } from '../components/Profile/MyPosts/MyPostsType';
import { messageReducer } from './message-reducer';
import { profileReducer } from './profile-reducer';
import { sidebarReducer } from './sidebar-reducer';

export const postsData: PostType[] = [
    { id: '3', message: 'И с медведем.', likeCount: 0 },
    { id: '4', message: 'Танцы с бубном.', likeCount: 7 },
    { id: '5', message: 'Всё будет хорошо!', likeCount: 25 },
];

export const dialogsData: DialogsType[] = [
    { id: '1', name: 'Юля' },
    { id: '2', name: 'Даша' },
    { id: '3', name: 'Маша' },
    { id: '4', name: 'Саша' },
    { id: '5', name: 'Честер' },
];

export const messagesData: MessagesType[] = [
    { id: '1', message: 'Не сомневайся!' },
    { id: '2', message: 'У тебя всё получится!' },
    { id: '3', message: 'Что нового?' },
    { id: '4', message: 'Как дела?' },
    { id: '5', message: 'Привет!' },
];

export const friendsData: FriendType[] = [
    {
        id: '1',
        name: 'Юля',
        imgSrc: 'https://cdn.iz.ru/sites/default/files/styles/900x600/public/photo_item-2022-10/1666271042_3.jpg?itok=wfKX8cMC',
    },
    {
        id: '2',
        name: 'Юля',
        imgSrc: 'https://kartinki.pics/uploads/posts/2022-03/1646528278_1-kartinkin-net-p-krasivie-kartinki-pro-zhivotnikh-1.jpg',
    },
    {
        id: '3',
        name: 'Юля',
        imgSrc: 'https://static.insales-cdn.com/files/1/1158/25838726/original/8_ae6b6513214f1992ed752af830e37479.jpg',
    },
];

export const store = {
    _state: {
        profilePage: {
            posts: postsData,
            newPostText: '',
        },
        messagesPage: {
            dialogs: dialogsData,
            messages: messagesData,
            newMessageText: '',
        },
        sidebar: {
            friends: friendsData,
        },
    },
    _callSubscriber() {
        console.log('Функция заглушка');
    },
    getState() {
        return this._state;
    },
    subscribe(observer: () => void) {
        this._callSubscriber = observer;
    },

    dispatch(action: ActionType) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = messageReducer(this._state.messagesPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber();
    },
};

export type ActionType = { type: string; payload?: string };

export const actionsTypes = {
    addPost: 'ADD_POST',
    updateNewPostText: 'UPDATE_NEW_POST_TEXT',
    addMessage: 'ADD_MESSAGE',
    updateNewMessageText: 'UPDATE_NEW_MESSAGE_TEXT',
    setUsers: 'SET_USERS',
    followUser: 'FOLLOW_USER',
    unfollowUser: 'UNFOLLOW_USER',
    setCurrentPage: 'SET_CURRENT_PAGE',
    setTotalUsersCount: 'SET_TOTAL_USERS_COUNT',
    toggleIsFetching: 'TOGGLE_IS_FETCHING',
    setUserProfile: 'SET_USER_PROFILE',
    setUserData: 'SET_USER_DATA'
};
