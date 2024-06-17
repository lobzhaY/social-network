import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header, Navbar } from './components';
import { store } from './redux/store';
import { HeaderContainer } from './components/Header';

function App() {
    return (
        <div className='app-wrapper'>
            <HeaderContainer />
            <Navbar state={store.getState().sidebar} />
            <div className='app-wrapper-content'>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
