import { FriendType } from '../NavbarType';
import styles from './Friend.module.scss';

type FriendComponentType = {
    friend: FriendType;
};
export const Friend: React.FC<FriendComponentType> = ({ friend }) => {
    return (
        <div className={styles.friend}>
            <img src={friend.imgSrc} alt='' />
            <h5>{friend.name}</h5>
        </div>
    );
};
