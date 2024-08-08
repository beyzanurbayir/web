import React from 'react';
import './ChatWindow.css';

const ChatWindow = () => {
    return (
        <div className="chat-window">
            <h2>Chatbot</h2>
            <div className="messages">
                <p>Chatbot: Merhaba, size nasıl yardımcı olabilirim?</p>
                <p>Kullanıcı: Merhaba!</p>
            </div>
            <input type="text" placeholder="Mesajınızı yazın..." />
        </div>
    );
};

export default ChatWindow;
