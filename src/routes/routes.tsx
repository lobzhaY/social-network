import { createBrowserRouter } from 'react-router-dom';
import { Music, News, Profile, Settings, UsersContainer } from '../components';
import App from '../App';
import { ROUTER_PATH } from './router-constants';
import { store } from '../redux/redux-store';
import { SuperDialogsContainer } from '../components/Dialogs/DialogsContainer';
import { ProfileContainer } from '../components/Profile/ProfileContainer';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: `${ROUTER_PATH.profile}/:id?`,
                element: (
                    <ProfileContainer />
                ),
            },
            {
                path: ROUTER_PATH.dialogs,
                element: (
                    <SuperDialogsContainer />
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
                element: <UsersContainer />
            }
        ],
    },
]);
