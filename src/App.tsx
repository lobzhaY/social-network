import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';
import { initializeAppThunkCreator } from './redux/app.reducer';
import { useAppDispatch, useAppSelector } from './hooks';

import { Navbar } from './components';
import { HeaderContainer } from './components/Header';
import { Loader } from './components/commen';

import './App.scss';

function App() {
    const dispatch = useAppDispatch();
    const { initialized } = useAppSelector((state) => state.app);
    const { friends } = useAppSelector((state) => state.sidebar);

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
                    <Navbar friends={friends} />
                    <div className='app-wrapper-content'>
                        <Outlet />
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
