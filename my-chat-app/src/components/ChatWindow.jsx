import React, { useState } from 'react';
import './ChatWindow.css';

const ChatWindow = () => {
    const [messages, setMessages] = useState([
        { text: "Merhaba, size nasıl yardımcı olabilirim?", sender: "bot" },
        
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: "user" }]);
            setInput(""); // input alanını temizle

            // Chatbot cevabı
            setTimeout(() => {
                setMessages([...messages, { text: input, sender: "user" }, { text: "merhaba", sender: "bot" }]);
            }, 500); // 500 ms sonra cevap göster
        }
    };

    return (
        <div className="chat-window">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message-box ${msg.sender}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Mesajınızı yazın..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="send-button" onClick={handleSend}>
                    Gönder
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
