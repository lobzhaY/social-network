import { NavLink, Outlet } from 'react-router-dom';
import styles from './Dialogs.module.scss';

export const Dialogs: React.FC = () => {
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                <div className={`${styles.dialog} ${styles.active}`}>
                  <NavLink to={'1'}>Юля</NavLink></div>
                <div className={styles.dialog}>
                  <NavLink to={'2'}>Юля</NavLink></div>
                <div className={styles.dialog}>
                  <NavLink to={'3'}>Юля</NavLink></div>
            </div>
            <div className={styles.messages}>
                <Outlet />
            </div>
        </div>
    );
};
