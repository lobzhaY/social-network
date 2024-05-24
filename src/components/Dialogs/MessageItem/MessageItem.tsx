import styles from './MessageItem.module.scss';

type MessageItemType = {
    message: string;
};

export const MessageItem: React.FC<MessageItemType> = ({ message }) => {
    return <div className={styles.message}>{message}</div>;
};
