import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header, Navbar } from './components';
import { state } from './redux/state';

function App() {
    return (
        <div className='app-wrapper'>
            <Header />
            <Navbar state={state.sidebar} />
            <div className='app-wrapper-content'>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
