import React, { useState, useEffect } from 'react';
import { fetchMovieData } from './api';  // API istek fonksiyonunu import edin
import './ChatWindow.css';

const ChatWindow = () => {
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : [
            { text: "Merhaba, lütfen bir film ismi giriniz", sender: "bot" }
        ];
    });

    const [input, setInput] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // API çağrısı yaparak film isimlerini alın
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

            localStorage.setItem('chatMessages', JSON.stringify(newMessages));

            try {
                const movieData = await fetchMovieData(input);
                const botResponse = `
                Film: ${movieData.title}\n
                Tür: ${movieData.genre}\n
                Yıl: ${movieData.year}\n
                Yönetmen: ${movieData.director}\n
                IMDb Puanı: ${movieData.imdbRating}`;
                const botMessages = [...newMessages, { sender: 'bot', text: botResponse }];
                setMessages(botMessages);

                localStorage.setItem('chatMessages', JSON.stringify(botMessages));
            } catch (error) {
                const botErrorMessage = `${error.message}`;
                const botMessages = [...newMessages, { sender: 'bot', text: botErrorMessage }];
                setMessages(botMessages);

                localStorage.setItem('chatMessages', JSON.stringify(botMessages));
            }
        }
    };

    const handleButtonClick = (movieName) => {
        setInput(movieName);
        handleSend();
    };

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
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
                <h2>Movie List</h2>
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
