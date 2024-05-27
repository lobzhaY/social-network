import { Outlet } from 'react-router-dom';
import styles from './Dialogs.module.scss';
import { DialogItem } from './DialogItem';
import { MessageItem } from './MessageItem';
import { DialogsType, MessagesType } from './dataType';
import { RefObject, createRef } from 'react';

type DialogsComponentType = {
    state: {
        dialogs: DialogsType[];
        messages: MessagesType[];
    };
};
export const Dialogs: React.FC<DialogsComponentType> = ({ state }) => {
    const newPostElement: RefObject<HTMLTextAreaElement> = createRef();

    const handleAddPost = () => {
        const text = newPostElement.current?.value;
        alert(text);
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
                    <textarea ref={newPostElement}></textarea>
                </div>
                <div>
                    <button onClick={handleAddPost}>Add post</button>
                </div>
         
               </div>
            </div>

           
        </div>
    );
};
