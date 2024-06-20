import styles from './Dialogs.module.scss';
import { DialogItem } from './DialogItem';
import { MessageItem } from './MessageItem';
import { DialogsType, MessagesType } from './dataType';

type DialogsComponentType = {
    dialogs: DialogsType[];
    messages: MessagesType[];
    newMessageText: string;
    addMessage: () => void;
    updateMessage: (text: string) => void;
};
export const Dialogs: React.FC<DialogsComponentType> = ({
    dialogs,
    messages,
    newMessageText,
    addMessage,
    updateMessage,
}) => {
    const handleAddMessage = () => {
        addMessage();
    };

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        updateMessage(text);
    };

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogs.map((dialog) => (
                    <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
                ))}
            </div>
            <div className={styles.messages}>
                {messages.map((message) => (
                    <MessageItem message={message.message} key={message.id} />
                ))}

                {/*  <Outlet /> */}
                <div>
                    <div>
                        <textarea onChange={handleMessageChange} value={newMessageText}></textarea>
                    </div>
                    <div>
                        <button onClick={handleAddMessage}>Add message</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


