import { FriendType } from "../components/Navbar/NavbarType";

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

type InitialStateType = {
    friends: FriendType[],
}

const initialState: InitialStateType = {
    friends: friendsData,
};

export const sidebarReducer = (state = initialState, action: unknown): InitialStateType => {
    return state;
};
