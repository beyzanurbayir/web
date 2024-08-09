// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import ProfileMenu from './components/ProfileMenu';
import ChatWindow from './components/ChatWindow';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true); // Set the user as logged in
    };

    const handleGuestLogin = () => {
        setIsLoggedIn(true); // Set the user as logged in as a guest
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage onLogin={handleLogin} onGuestLogin={handleGuestLogin} />} />
                <Route path="/chat" element={<ChatPage setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
        </Router>
    );
}

const ChatPage = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <ProfileMenu />
                <ChatWindow />
                <button className="logout-button" onClick={handleLogout}>Çıkış Yap</button>
            </div>
        </div>
    );
};

export default App;
