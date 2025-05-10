import React, { useState, useEffect, useCallback } from 'react';
import { MessageCircle, Send, Sparkles } from 'lucide-react';
import { Message } from '../types/chat';
import { generateResponse } from '../utils/responseGenerator';

const InteractiveChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [orbPosition, setOrbPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const welcomeTimeout = setTimeout(() => {
      const welcomeMessage: Message = {
        id: '1',
        content: '¡Hola! Soy Lucia, tu asistente virtual. ¿En qué puedo ayudarte hoy?',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }, 1000);

    return () => clearTimeout(welcomeTimeout);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrbPosition({ x, y });
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsThinking(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      onMouseMove={handleMouseMove}
    >
      <div className="relative w-full max-w-4xl h-[80vh] glass rounded-3xl overflow-hidden shadow-lg">
        {/* Animated orb */}
        <div 
          className="absolute lucia-orb w-64 h-64 rounded-full bg-gradient-to-r from-[#8EBECF] to-[#B3CDE0] blur-3xl opacity-30"
          style={{
            left: `${orbPosition.x}%`,
            top: `${orbPosition.y}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.3s ease-out, top 0.3s ease-out',
          }}
        />

        {/* Main content */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="p-6 flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8EBECF] to-[#B3CDE0] flex items-center justify-center">
                <Sparkles className="text-white" size={24} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#90EE90] rounded-full border-2 border-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2C3E50]">Lucia</h1>
              <p className="text-[#5D7B8E]">Asistente Interactivo</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`message-container flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} opacity-0 fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`message-bubble max-w-[80%] p-4 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-[#8EBECF] to-[#B3CDE0] text-white'
                      : 'bg-white/80 text-[#2C3E50] shadow-sm'
                  }`}
                >
                  <p className="text-lg">{message.content}</p>
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start opacity-0 fade-in">
                <div className="bg-white/80 rounded-2xl p-4 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#8EBECF] lucia-pulse" />
                    <div className="w-3 h-3 rounded-full bg-[#8EBECF] lucia-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-3 h-3 rounded-full bg-[#8EBECF] lucia-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6">
            <div className="bg-white/80 rounded-xl p-2 flex items-center space-x-4 shadow-sm">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-transparent text-[#2C3E50] placeholder-[#8EBECF] outline-none px-4 py-2"
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === '' || isThinking}
                className="p-2 rounded-lg bg-gradient-to-r from-[#8EBECF] to-[#B3CDE0] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveChat;