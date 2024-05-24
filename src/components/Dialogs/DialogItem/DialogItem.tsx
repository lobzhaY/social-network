import { NavLink } from "react-router-dom";
import styles from './DialogItem.module.scss';

type DialogItemType = {
  name: string;
  id: string;
}

export const DialogItem: React.FC<DialogItemType> = ({name, id}) => {
    return (
        <div className={`${styles.dialog} ${styles.active}`}>
            <NavLink to={id}>{name}</NavLink>
        </div>
    );
};
