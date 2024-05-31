import { DialogsType, MessagesType } from '../components/Dialogs/dataType';
import { FriendType } from '../components/Navbar/NavbarType';
import { PostType } from '../components/Profile/MyPosts/MyPostsType';

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

    _addPost() {
        const newPost: PostType = {
            id: '5',
            message: this.getState().profilePage.newPostText,
            likeCount: 0,
        };

        this.getState().profilePage.posts.push(newPost);
        this.getState().profilePage.newPostText = '';

        this._callSubscriber();
    },
    _addMessage() {
        const newMessage: {id: string, message: string} = {
            id: '6',
            message: this.getState().messagesPage.newMessageText,
        }

        this._state.messagesPage.messages.unshift(newMessage);
        this.getState().messagesPage.newMessageText = '';

        this._callSubscriber();
    },
    _updateNewPostText(newText: string) {
        this.getState().profilePage.newPostText = newText;

        this._callSubscriber();
    },
    _updateNewMessageText(newText: string) {
        this._state.messagesPage.newMessageText = newText;

        this._callSubscriber();
    },

    dispatch(action: ActionType) {
        if (action.type === actionsTypes.addPost) {
            this._addPost();
        } else if (action.type === actionsTypes.updateNewPostText) {
            this._updateNewPostText(action.payload as string);
        } else if (action.type === actionsTypes.updateNewMessageText) {
            this._updateNewMessageText(action.payload as string);
        } else if (action.type === actionsTypes.addMessage) {
            this._addMessage();
        }
    },
};

export type ActionType = { type: string; payload?: string };

export const actionsTypes = {
    addPost: 'ADD_POST',
    updateNewPostText: 'UPDATE_NEW_POST_TEXT',
    addMessage: 'ADD_MESSAGE',
    updateNewMessageText: 'UPDATE_NEW_MESSAGE_TEXT'
};

export const addPostActionCreator = () => ({
    type: actionsTypes.addPost,
});

export const addMessageActionCreator = () => ({
    type: actionsTypes.addMessage,
});

export const updateNewPostTextActionCreator = (text: string) => ({
    type: actionsTypes.updateNewPostText,
    payload: text,
});

export const updateNewMessageTextActionCreator = (text: string) => ({
    type: actionsTypes.updateNewMessageText,
    payload: text,
});
