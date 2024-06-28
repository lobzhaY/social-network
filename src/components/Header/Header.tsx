import { useContext } from 'react';
import styles from './Header.module.scss';
import { ThemeContext } from '../../themeContext';
import { NavLink } from 'react-router-dom';
import { ROUTER_PATH } from '../../routes/router-constants';

type HeaderType = {
    isAuth: boolean;
    userLogin: string;
    logout: () => void;
};

export const Header: React.FC<HeaderType> = ({ isAuth, userLogin, logout }) => {
    const theme = useContext(ThemeContext);

    return (
        <header className={styles.header}>
            <div>
                <button>{theme}</button>
                <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBI-gDyic29NaQVvUqNSYbO3zm4DDwm3OM8sxGUM32Xw&s'
                    alt=''
                />
            </div>
            <div className={styles.loginBlock}>
                {isAuth ? (
                    <div>
                        <p>{userLogin}</p>
                        <button onClick={logout}>Log out</button>
                    </div>
                ) : (
                    <NavLink to={ROUTER_PATH.login}>Login</NavLink>
                )}
            </div>
        </header>
    );
};
