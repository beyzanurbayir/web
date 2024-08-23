import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import DIGITURKLOGO from '../assets/DIGITURKLOGO.png'; // Resim dosyasını import ettik

const Sidebar = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className="sidebar">
            <img src={DIGITURKLOGO} alt="DIGITURK Logo" className="logo" />
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