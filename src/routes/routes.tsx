import React, { Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { Music, News, Settings, UsersContainer } from '../components';
import { Login } from '../components/Login';
import { Loader } from '../components/commen';
import App from '../App';

import { ROUTER_PATH } from './router-constants';

const DialogsComponent = React.lazy(() => import('../components/Dialogs/DialogsContainer'));
const ProfileComponent = React.lazy(() => import('../components/Profile/ProfileContainer'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loader />}>
                        <ProfileComponent />
                    </Suspense>
                ),
            },
            {
                path: `${ROUTER_PATH.profile}/:id?`,
                element: (
                    <Suspense fallback={<Loader />}>
                        <ProfileComponent />
                    </Suspense>
                ),
            },
            {
                path: ROUTER_PATH.dialogs,
                element: (
                    <Suspense fallback={<Loader />}>
                        <DialogsComponent />
                    </Suspense>
                ),
                children: [
                    {
                        path: `${ROUTER_PATH.dialogs}/:id`,
                        element: <div>123</div>,
                    },
                ],
            },
            {
                path: ROUTER_PATH.news,
                element: <News />,
            },
            {
                path: ROUTER_PATH.music,
                element: <Music />,
            },
            {
                path: ROUTER_PATH.settings,
                element: <Settings />,
            },
            {
                path: ROUTER_PATH.users,
                element: <UsersContainer />,
            },
            {
                path: ROUTER_PATH.login,
                element: <Login />,
            },
            {
                path: '*',
                element: <div>
                    <span>404</span>
                    <h1>Not found</h1>
                </div>
            }
        ],
    },
]);
