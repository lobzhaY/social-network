import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header, Navbar } from './components';

function App() {
    return (
        <div className='app-wrapper'>
            <Header />
            <Navbar />
            <div className='app-wrapper-content'>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
