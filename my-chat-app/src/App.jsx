import React from 'react';
import Sidebar from './components/Sidebar';
import ProfileMenu from './components/ProfileMenu';
import ChatWindow from './components/ChatWindow';
import './App.css';

function App() {
    return (
        <div id="root">
            <Sidebar />
            <div className="main-content">
                <ProfileMenu />
                <ChatWindow />
            </div>
        </div>
    );
}

export default App;
