import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useContext } from 'react';
import { userDataContext } from './context/UserContext.jsx';
import Network from './pages/Network.jsx';
import Profile from './pages/Profile.jsx';
import Notification from './pages/Notification.jsx';
import About from './pages/About.jsx';
import Careers from './pages/Careers.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import Terms from './pages/Terms.jsx';

export default function App() {
    let { userData, loading } = useContext(userDataContext);

    if (loading) {
        return <h1>Loading...</h1>;
    }
    return (
        <Routes>
            <Route
                path="/"
                element={userData ? <Home /> : <Navigate to="/login" />}
            />
            <Route
                path="/signup"
                element={!userData ? <Signup /> : <Navigate to="/" />}
            />
            <Route
                path="/login"
                element={!userData ? <Login /> : <Navigate to="/" />}
            />
            <Route
                path="/network"
                element={userData ? <Network /> : <Navigate to="/login" />}
            />
            <Route
                path="/profile/:username"
                element={userData ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
                path="/profile"
                element={userData ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
                path="/notifications"
                element={userData ? <Notification /> : <Navigate to="/login" />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
        </Routes>
    );
}
