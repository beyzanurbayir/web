// Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link bileşenini import et
import './Sidebar.css';

const Sidebar = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className="sidebar">
            <h2 onClick={toggleChat}>Geçmiş</h2>
            {isChatOpen && (
                <ul>
                    <li>Sohbet 1</li>
                    <li>Sohbet 2</li>
                    <li>Sohbet 3</li>
                </ul>
            )}
            <Link to="/film-ekle">
                <h2>Film Ekle</h2>
            </Link>
            <h2>Ayarlar</h2>
        </div>
    );
};

export default Sidebar;
