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
        imgSrc: 'https://cdn.iz.ru/sites/default/files/styles/900x600/public/photo_item-2022-10/1666271042_3.jpg?itok=wfKX8cMC'
    },
    {
        id: '2',
        name: 'Юля',
        imgSrc: 'https://kartinki.pics/uploads/posts/2022-03/1646528278_1-kartinkin-net-p-krasivie-kartinki-pro-zhivotnikh-1.jpg'
    },
    {
        id: '3',
        name: 'Юля',
        imgSrc: 'https://static.insales-cdn.com/files/1/1158/25838726/original/8_ae6b6513214f1992ed752af830e37479.jpg'
    },
]

export const state = {
    profilePage: {
        posts: postsData,
    },
    messagesPage: {
        dialogs: dialogsData,
        messages: messagesData,
    },
    sidebar: {
        friends: friendsData,
    },
};
