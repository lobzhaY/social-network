import { Provider } from 'react-redux';
import { createContext } from 'react';

export const theme = {
    light: 'light',
    dark: 'dark',
};

export const ThemeContext = createContext(theme.light);

