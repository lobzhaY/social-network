import { useContext } from 'react';
import styles from './Header.module.scss';
import { ThemeContext } from '../../themeContext';

export const Header: React.FC = () => {
    const theme = useContext(ThemeContext);

    return (
        <header className={styles.header}>
            <button>{theme}</button>
            <img
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBI-gDyic29NaQVvUqNSYbO3zm4DDwm3OM8sxGUM32Xw&s'
                alt=''
            />
        </header>
    );
};
