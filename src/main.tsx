import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes.tsx';

import { Provider } from 'react-redux';
import { store } from './redux/redux-store.ts';

import { ThemeContext, theme } from './themeContext.ts';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeContext.Provider value={theme.light}>
                <RouterProvider router={router} />
            </ThemeContext.Provider>
        </Provider>
    </React.StrictMode>,
);
