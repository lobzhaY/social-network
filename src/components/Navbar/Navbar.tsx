import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { ROUTER_PATH } from '../../routes/router-constants';

export const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.item}>
                <NavLink to={ROUTER_PATH.profile} 
                className={({ isActive }) =>
                    isActive
                      ? styles.active
                      : ""
                  }
                >Profile</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to={ROUTER_PATH.dialogs}
                className={({ isActive }) =>
                    isActive
                      ? styles.active
                      : ""
                  }>Messages</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to={ROUTER_PATH.news}
                className={({ isActive }) =>
                    isActive
                      ? styles.active
                      : ""
                  }
                >News</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to={ROUTER_PATH.music}
                className={({ isActive }) =>
                    isActive
                      ? styles.active
                      : ""
                  }
                >Music</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to={ROUTER_PATH.settings}
                className={({ isActive }) =>
                    isActive
                      ? styles.active
                      : ""
                  }
                >Settings</NavLink>
            </div>
        </nav>
    );
};
