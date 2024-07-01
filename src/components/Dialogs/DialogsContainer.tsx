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

const mapStateToProps = (state: RootState) => {
    return {
        dialogs: getDialogsSelector(state),
        messages: getMessagesSelector(state)
    };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        addMessage: (text: string) => { dispatch(addMessageActionCreator(text));},
    };
};

export const AuthRedirectDialogsComponent = compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs);
