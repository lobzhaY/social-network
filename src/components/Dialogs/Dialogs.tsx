import { Outlet } from 'react-router-dom';
import styles from './Dialogs.module.scss';
import { DialogItem } from './DialogItem';
import { MessageItem } from './MessageItem';
import { dialogsData, messagesData } from './utils';

export const Dialogs: React.FC = () => {
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsData.map((dialog) => (
                    <DialogItem name={dialog.name} id={dialog.id} key={dialog.id} />
                ))}
            </div>
            <div className={styles.messages}>
                {messagesData.map((message) => (
                    <MessageItem message={message.message} key={message.id} />
                ))}

                <Outlet />
            </div>
        </div>
    );
};
