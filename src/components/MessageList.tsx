import React from 'react';
import { Message } from '../types/chat';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              message.sender === 'user'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-tr-none'
                : 'bg-gray-200 text-gray-800 rounded-tl-none'
            }`}
          >
            <p className="break-words">{message.content}</p>
            <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
              {formatTime(message.timestamp)}
            </p>
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3">
            <TypingIndicator />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;