import {
    addMessageActionCreator,
} from '../../redux/message-reducer';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Dialogs } from './Dialogs';
import { withAuthRedirect } from '../../hoc/AuthRedirect';
import { compose } from '@reduxjs/toolkit';

export const DialogsContainer: React.FC = () => {
    const dispatch = useDispatch();
    const { dialogs, messages } = useSelector((state) => state.messagePage);

    const addMessage = (text: string) => {
        dispatch(addMessageActionCreator(text));
    };

    return (
        <Dialogs
            dialogs={dialogs}
            messages={messages}
            addMessage={addMessage}
        />
    );
};

const mapStateToProps = (state) => {
    return {
        dialogs: state.messagePage.dialogs,
        messages: state.messagePage.messages,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (text: string) => { dispatch(addMessageActionCreator(text));},
    };
};

export const AuthRedirectDialogsComponent = compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);
