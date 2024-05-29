import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './routes/routes.tsx';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import { store } from './redux/state.ts';


const rerenderEntireTree = () => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>,
    );
  }


rerenderEntireTree();
store.subscribe(rerenderEntireTree);

/* ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
); */
