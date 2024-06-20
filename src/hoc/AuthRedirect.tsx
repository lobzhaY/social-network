import { Navigate } from 'react-router-dom';
import { ROUTER_PATH } from '../routes/router-constants';
import { useSelector } from 'react-redux';

export const withAuthRedirect = (Component) => {
    const RedirectComponent: React.FC = ({}) => {
        const { isAuth } = useSelector((state) => state.auth);

        if (!isAuth) {
            return <Navigate to={ROUTER_PATH.login} />;
        }

        return <Component />;
    };
    
    return RedirectComponent;
};
