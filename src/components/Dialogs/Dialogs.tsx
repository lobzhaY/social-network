import { Outlet } from 'react-router-dom';
import styles from './Dialogs.module.scss';
import { DialogItem } from './DialogItem';
import { MessageItem } from './MessageItem';
import { DialogsType, MessagesType } from './dataType';
import { RefObject, createRef } from 'react';
import { ActionType } from '../../redux/store';
import {
    addMessageActionCreator,
    updateNewMessageTextActionCreator,
} from '../../redux/message-reducer';

type DialogsComponentType = {
    state: {
        dialogs: DialogsType[];
        messages: MessagesType[];
        newMessageText: string;
    };
    dispatch: (action: ActionType) => void;
};
export const Dialogs: React.FC<DialogsComponentType> = ({ state, dispatch }) => {
    const handleAddMessage = () => {
        dispatch(addMessageActionCreator());
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        dispatch(updateNewMessageTextActionCreator(text as string));
    };

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {state.dialogs.map((dialog) => (
                    <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
                ))}
            </div>
            <div className={styles.messages}>
                {state.messages.map((message) => (
                    <MessageItem message={message.message} key={message.id} />
                ))}

                {/*  <Outlet /> */}
                <div>
                    <div>
                        <textarea
                            onChange={handleMessageChange}
                            value={state.newMessageText}
                        ></textarea>
                    </div>
                    <div>
                        <button onClick={handleAddMessage}>Add message</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
