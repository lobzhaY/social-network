import { DialogsType, MessagesType } from '../components/Dialogs/dataType';
import { RootState } from './redux-store';
import { actionsTypes } from './store';

export const addMessageActionCreator = (text: string) => ({
    type: actionsTypes.addMessage,
    payload: text
});

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

const initialState = {
    dialogs: dialogsData,
    messages: messagesData,
};

export const getDialogsSelector = (state: RootState) => {
    return state.messagePage.dialogs
};

export const getMessagesSelector = (state: RootState) => {
    return  state.messagePage.messages
}

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.addMessage:
            const newMessage: { id: string; message: string } = {
                id: '6',
                message: action.payload,
            };

            return {
                ...state,
                messages: [...state.messages, newMessage],
            };

        default:
            return state;
    }
};
