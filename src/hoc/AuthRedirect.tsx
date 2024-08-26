import { Navigate } from 'react-router-dom';
import { ROUTER_PATH } from '../routes/router-constants';
import { useAppSelector } from '../hooks';

export const withAuthRedirect = (Component: React.FC) => {
    const RedirectComponent: React.FC = ({}) => {
        const { isAuth } = useAppSelector((state) => state.auth);

        if (!isAuth) {
            return <Navigate to={ROUTER_PATH.login} />;
        }

        return <Component />;
    };
    
    return RedirectComponent;
};
