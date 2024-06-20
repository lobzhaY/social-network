import {
    addMessageActionCreator,
    updateNewMessageTextActionCreator,
} from '../../redux/message-reducer';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Dialogs } from './Dialogs';
import { withAuthRedirect } from '../../hoc/AuthRedirect';

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

const mapStateToProps = (state) => {
    return {
        dialogs: state.messagePage.dialogs,
        messages: state.messagePage.messages,
        newMessageText: state.messagePage.newMessageText
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: () => { dispatch(addMessageActionCreator());},
        updateMessage: (text: string) => { dispatch(updateNewMessageTextActionCreator(text as string));},
    };
};

export const SuperDialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export const AuthRedirectDialogsComponent: React.FC = withAuthRedirect(SuperDialogsContainer);
