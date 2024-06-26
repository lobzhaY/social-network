import styles from './Dialogs.module.scss';
import { DialogItem } from './DialogItem';
import { MessageItem } from './MessageItem';
import { DialogsType, MessagesType } from './dataType';
import { AddMassageForm } from '../commen';

type DialogsComponentType = {
    dialogs: DialogsType[];
    messages: MessagesType[];
    addMessage: (text: string) => void;
};
export const Dialogs: React.FC<DialogsComponentType> = ({
    dialogs,
    messages,
    addMessage,
}) => {
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
                    <AddMassageForm sendMessage={addMessage} buttonTitle='Add message' />
                </div>
            </div>
        </div>
    );
};
