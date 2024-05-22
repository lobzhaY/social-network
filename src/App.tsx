import './App.scss';
import { Dialogs, Header, Navbar, Profile } from './components';

function App() {
    return (
        <div className='app-wrapper'>
            <Header />
            <Navbar />
            <div className='app-wrapper-content'>
                <Dialogs />
                {/* <Profile /> */}
            </div>
        </div>
    );
}

export default App;
