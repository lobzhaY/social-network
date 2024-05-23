import { createBrowserRouter } from 'react-router-dom';
import { Dialogs, Music, News, Profile, Settings } from '../components';
import App from '../App';
import { ROUTER_PATH } from './router-constants';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: ROUTER_PATH.profile,
                element: <Profile />,
            },
            {
                path: ROUTER_PATH.dialogs,
                element: <Dialogs />,
               /*  children: [
                    {
                    path: '/:id',
                    element: <div>123</div>
                    }
                ] */
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
        ],
    },
]);
