// Chatbot.js
import React, { useState } from 'react';
import './Chatbot.css';
import loaderImage from './loader.gif';
import LogoSVG from './Hush-hush.svg';

function extractProductNames(text) {
  const regex = /\{\{(.*?)\}\}/g;
  const matches = text.match(regex);

  if (!matches) {
    return [];
  }

  return matches.map(match => {
    return match.replace(/\{\{|\}\}/g, '').trim();
  });
}

const Chatbot = ({ productRecomended, setProductRecomended }) => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    try {
      setLoading(true);

      const chatResponse = await fetch('http://localhost:3015/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (chatResponse.ok) {
        const chatData = await chatResponse.json();

        const productsArray = extractProductNames(chatData.response);
        if (productsArray.length > 0) {
          setProductRecomended(productsArray);
        }

        setChatHistory(prevHistory => [
          ...prevHistory,
          { type: 'user', message: userInput },
          { type: 'bot', message: chatData.response },
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setUserInput('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div id="chat-container">
      <div id="chat-history">
        {chatHistory.map((item, index) => (
          <div key={index} className={item.type === 'user' ? 'user-message' : 'bot-message'}>
            {item.type === 'bot' && (
              <>
                <img src={LogoSVG} alt="Logo" className="small-logo" />
                <br />
              </>
            )}
            {item.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} id="chat-form">
        <input
          type="text"
          id="user-input"
          placeholder="Enter your message"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit" className="submit-button">
          <img src={LogoSVG} alt="Logo" className="small-logo" />
        </button>
      </form>
      {loading && (
        <div id="loader">
          <img src={loaderImage} width="150px" alt="Loading..." />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
