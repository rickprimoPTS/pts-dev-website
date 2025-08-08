// SUBSTITUA O CONTEÚDO INTEIRO DESTE ARQUIVO

import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import { functions } from '../firebase'; 
import { httpsCallable } from 'firebase/functions';

const ChatIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> );
const CloseIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> );

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);

  // --- LÓGICA DE IDENTIFICAÇÃO (SESSION ID) ---
  useEffect(() => {
    let currentSessionId = localStorage.getItem('chatbotSessionId');
    if (!currentSessionId) {
      currentSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      localStorage.setItem('chatbotSessionId', currentSessionId);
    }
    setSessionId(currentSessionId);
  }, []);

  // --- LÓGICA DE AUTO-SCROLL ---
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // --- FUNÇÃO CENTRALIZADA PARA CHAMAR O BACKEND ---
  const callChatFunction = async (messageText) => {
    setIsLoading(true);
    
    if (messageText !== "__INITIATE_CHAT__") {
        const userMessage = { id: Date.now(), sender: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage]);
    }

    const thinkingMessageId = 'thinking_message';
    setMessages(prev => [...prev, { id: thinkingMessageId, sender: 'bot', text: '...' }]);

    try {
        const callChat = httpsCallable(functions, 'chat');
        const result = await callChat({ data: {
            sessionId: sessionId,
            message: messageText,
        }});

        const botReply = result.data.reply;
        const botMessage = { id: Date.now() + 1, sender: 'bot', text: botReply };
        
        setMessages(prev => prev.filter(msg => msg.id !== thinkingMessageId).concat(botMessage));

    } catch (error) {
        console.error("Erro ao chamar a Cloud Function:", error);
        const errorMessage = { id: Date.now() + 1, sender: 'bot', text: 'Desculpe, estou com um problema para me conectar. Tente novamente.' };
        setMessages(prev => prev.filter(msg => msg.id !== thinkingMessageId).concat(errorMessage));
    } finally {
        setIsLoading(false);
    }
  };

  // --- EFEITO PARA INICIAR O CHAT AO ABRIR ---
  useEffect(() => {
    if (isOpen && !isLoading && messages.length === 0 && sessionId) {
        callChatFunction("__INITIATE_CHAT__");
    }
  }, [isOpen, sessionId]);


  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // --- LÓGICA DE ENVIO DE MENSAGEM PELO USUÁRIO ---
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (userInput.trim() === '' || isLoading) return;
    
    callChatFunction(userInput.trim());
    setUserInput('');
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Assistente Virtual IA PTS DEV</h3>
            <button onClick={toggleChat} className="close-chat-button"><CloseIcon /></button>
          </div>
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <form className="chat-input-area" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={isLoading ? "Aguarde..." : "Digite sua mensagem..."}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>Enviar</button>
          </form>
        </div>
      )}

      <button onClick={toggleChat} className="chatbot-fab"><ChatIcon /></button>
    </div>
  );
};

export default Chatbot;