import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className="sidebar">
            <h2 onClick={toggleChat}>Geçmiş </h2>
            {isChatOpen && (
                <ul>
                    <li>Sohbet 1</li>
                    <li>Sohbet 2</li>
                    <li>Sohbet 3</li>
                </ul>
            )}
            <h2>Ayarlar</h2>
        </div>
    );
};

export default Sidebar;
