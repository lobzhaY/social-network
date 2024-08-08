import {
    addMessageActionCreator,
    getDialogsSelector,
    getMessagesSelector,
} from '../../redux/message-reducer';
import { connect } from 'react-redux';
import { Dialogs } from './Dialogs';
import { withAuthRedirect } from '../../hoc/AuthRedirect';
import { compose } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppDispatch, RootState } from '../../redux/redux-store';
import { DialogsType, MessagesType } from './dataType';

export const DialogsContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dialogs, messages } = useAppSelector((state) => state.messagePage);

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

const mapStateToProps = (state: RootState): {dialogs: DialogsType[], messages: MessagesType[]} => {
    return {
        dialogs: getDialogsSelector(state),
        messages: getMessagesSelector(state)
    };
};

const mapDispatchToProps = (dispatch: AppDispatch): {addMessage: (text: string) => void} => {
    return {
        addMessage: (text: string) => { dispatch(addMessageActionCreator(text));},
    };
};

const AuthRedirectDialogsComponent = compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);

export default AuthRedirectDialogsComponent;
