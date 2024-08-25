import React, { useState, useEffect, useRef } from 'react';
import { fetchMovieData } from './api'; 
import './ChatWindow.css';

const ChatWindow = () => {
    const [messages, setMessages] = useState(() => {
        const username = localStorage.getItem('username');
        const storage = username ? localStorage : sessionStorage;
        const savedMessages = username ? storage.getItem(`chatMessages_${username}`) : storage.getItem('chatMessages_guest');
        return savedMessages ? JSON.parse(savedMessages) : [
            { text: "Merhaba, lütfen bir film ismi giriniz", sender: "bot" }
        ];
    });

    const [input, setInput] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null); 

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        fetch('http://localhost:5090/film/names')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movie names:', error));
    }, []);

    const handleSend = async () => {
        if (input.trim()) {
            const newMessages = [...messages, { sender: 'user', text: input }];
            setMessages(newMessages);
            setInput('');

            const username = localStorage.getItem('username');
            const storage = username ? localStorage : sessionStorage;
            const key = username ? `chatMessages_${username}` : `chatMessages_guest`;
            storage.setItem(key, JSON.stringify(newMessages));

            try {
                const movieData = await fetchMovieData(input);
                const botResponse = `
                Film: ${movieData.Title}\n
                Tür: ${movieData.Genre}\n
                Yıl: ${movieData.ReleaseYear}\n
                Yönetmen: ${movieData.Director}\n
                IMDb Puanı: ${movieData.IMDbRating}`;
                const botMessages = [...newMessages, { sender: 'bot', text: botResponse }];
                setMessages(botMessages);

                storage.setItem(key, JSON.stringify(botMessages));
            } catch (error) {
                const botErrorMessage = `Üzgünüm, aradığınız film bulunamadı. Lütfen film adını kontrol edip tekrar deneyin.`;
                const botMessages = [...newMessages, { sender: 'bot', text: botErrorMessage }];
                setMessages(botMessages);

                storage.setItem(key, JSON.stringify(botMessages));
            }
        }
    };

    const handleButtonClick = (movieName) => {
        if (selectedMovie === movieName) {
            setInput('');
            setSelectedMovie(null);
        } else {
            setInput(movieName);
            setSelectedMovie(movieName);
        }
    };

    useEffect(() => {
        const username = localStorage.getItem('username');
        const storage = username ? localStorage : sessionStorage;
        const key = username ? `chatMessages_${username}` : `chatMessages_guest`;
        storage.setItem(key, JSON.stringify(messages));
    }, [messages]);

    return (
        <div className="chat-window">
            <div className="chat-area">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message-box ${msg.sender}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> 
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Film adı girin..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button className="send-button" onClick={handleSend}>
                        Gönder
                    </button>
                </div>
            </div>
            <div className="movie-list">
                <h2 className="movie-list-title">Film Listesi</h2>
                <div>
                    {movies.map((movie, index) => (
                        <button 
                            key={index} 
                            onClick={() => handleButtonClick(movie)}
                        >
                            {movie}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
