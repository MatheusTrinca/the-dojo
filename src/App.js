import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './navigation/Routes';
import { useAuthContext } from './contexts/AuthContext';

// Components
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import OnlineUsers from './components/onlineUsers/OnlineUsers';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Sidebar />}
        <div className="container">
          <Navbar />
          <Routes />
        </div>
        {user && <OnlineUsers />}
      </BrowserRouter>
    </div>
  );
}

export default App;
