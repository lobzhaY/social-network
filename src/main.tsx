import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './routes/routes.tsx';
import { RouterProvider } from 'react-router-dom';

import './index.css';

import { Provider } from 'react-redux';
import { store } from './redux/redux-store.ts';
import { ThemeContext, theme } from './themeContext.ts';

/* const rerenderEntireTree = () => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>,
    );
};

rerenderEntireTree();
store.subscribe(rerenderEntireTree); */

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeContext.Provider value={theme.light}>
                <RouterProvider router={router} />
            </ThemeContext.Provider>
        </Provider>
    </React.StrictMode>,
);
