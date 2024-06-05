import { createBrowserRouter } from 'react-router-dom';
import { Dialogs, Music, News, Profile, Settings } from '../components';
import App from '../App';
import { ROUTER_PATH } from './router-constants';
import { store } from '../redux/redux-store';
import { DialogsContainer } from '../components/Dialogs/DialogsContainer';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: ROUTER_PATH.profile,
                element: (
                    <Profile
                        state={store.getState().profilePage}
                        dispatch={store.dispatch.bind(store)}
                    />
                ),
            },
            {
                path: ROUTER_PATH.dialogs,
                element: (
                    <DialogsContainer />
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
        ],
    },
]);
