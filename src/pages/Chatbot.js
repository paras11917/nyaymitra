import React, { useState, useRef, useEffect } from 'react';


const Chatbot = () => {
  const [userQuery, setUserQuery] = useState('');
  const [botResponse, setBotResponse] = useState([]);
  const chatRef = useRef(null);

  const handleUserQuery = (e) => {
    setUserQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const responseFromBot = "The sun hung low on the horizon, casting long shadows across the tranquil meadow. Birds sang their evening serenade as a gentle breeze rustled the leaves of the ancient oak trees. In the distance, a river glistened like a ribbon of silver under the fading light.";

    const newMessages = [
      ...botResponse,
      { type: 'User', text: userQuery, avatar: '/user.png' },
      { type: 'Legal Expert', text: responseFromBot, avatar: '/bot.png' },
    ];

    setBotResponse(newMessages);
    setUserQuery('');

    // Scroll to the bottom to show the latest message
    scrollToBottom();
  };

  const handleClearChat = () => {
    setBotResponse([]);
  };

  const scrollToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  useEffect(() => {
    // Scroll to the bottom when component first loads
    scrollToBottom();
  }, []);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    scrollToBottom();
  }, [botResponse]);

  return (
    <div className='Ai-bot-full-screen'>
      <div className='chatbot-heading'>
        <h1>NyayKosh</h1>
        <h3>Your AI Legal Expert</h3>
      </div>
      <div className="chatbot-container">
        <div className="chatbot-chat" ref={chatRef}>
          {botResponse.map((message, index) => (
            <div key={index} className={`chat ${message.type}`}>
              <img src={message.avatar} alt={`${message.type} avatar`} className="avatar" />
              <div className="message-text">{message.text}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your question..."
            value={userQuery}
            onChange={handleUserQuery}
          />
          <button type="submit">Send</button>
          <button type="button" onClick={handleClearChat}>Clear Chat</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
