import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from './types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  userInfo: {
    name: string;
    email: string;
    phone: string;
    hasProvidedInfo: boolean;
  };
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isTyping,
  onSendMessage,
  userInfo
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleOptionClick = (option: string) => {
    onSendMessage(option);
  };

  return (
    <div className="flex flex-col h-[436px]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        <AnimatePresence>
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onOptionClick={handleOptionClick}
            />
          ))}
        </AnimatePresence>
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#A4E834] focus:border-transparent text-sm"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="bg-[#A4E834] hover:bg-[#8fcf2a] disabled:bg-gray-300 text-[#121212] p-2 rounded-full transition-colors duration-200"
          >
            <Send size={16} />
          </button>
        </form>
        
        {/* User Info Display */}
        {userInfo.hasProvidedInfo && (
          <div className="mt-2 text-xs text-gray-500 flex items-center space-x-4">
            {userInfo.name && (
              <span className="flex items-center space-x-1">
                <User size={12} />
                <span>{userInfo.name}</span>
              </span>
            )}
            {userInfo.email && (
              <span>📧 {userInfo.email}</span>
            )}
            {userInfo.phone && (
              <span>📱 {userInfo.phone}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;