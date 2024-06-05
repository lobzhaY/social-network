import {
    addMessageActionCreator,
    updateNewMessageTextActionCreator,
} from '../../redux/message-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Dialogs } from './Dialogs';

export const DialogsContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { dialogs, messages, newMessageText } = useSelector((state) => state.messagePage);

    const addMessage = () => {
        dispatch(addMessageActionCreator());
    };

    const updateMessage = (text: string) => {
        dispatch(updateNewMessageTextActionCreator(text as string));
    };

    return (
        <Dialogs
            dialogs={dialogs}
            messages={messages}
            newMessageText={newMessageText}
            addMessage={addMessage}
            updateMessage={updateMessage}
        />
    );
};
