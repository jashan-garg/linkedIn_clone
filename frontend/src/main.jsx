import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import AuthContext from './context/AuthContext.jsx';
import UserContext from './context/UserContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <SocketProvider>
            <AuthContext>
                <UserContext>
                    <App />
                </UserContext>
            </AuthContext>
        </SocketProvider>
    </BrowserRouter>
);
