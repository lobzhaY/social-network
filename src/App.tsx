import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components';
import { store } from './redux/store';
import { HeaderContainer } from './components/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAppThunkCreator } from './redux/app.reducer';
import { Loader } from './components/commen';

function App() {
    const dispatch = useDispatch();
    const { initialized } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(initializeAppThunkCreator());
    }, []);

    return (
        <>
            {!initialized ? (
                <>
                <h1>LOADER</h1>
                <Loader />
                </>
            ) : (
                <div className='app-wrapper'>
                    <HeaderContainer />
                    <Navbar state={store.getState().sidebar} />
                    <div className='app-wrapper-content'>
                        <Outlet />
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
