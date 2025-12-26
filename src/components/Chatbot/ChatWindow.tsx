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
      // Mantener el foco en el campo de entrada después de enviar
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleOptionClick = (option: string) => {
    onSendMessage(option);
    // Mantener el foco en el campo de entrada después de hacer clic en opción
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-12rem)] sm:max-h-[436px]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
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
      <div className="border-t border-gray-200 p-2 sm:p-3 bg-white rounded-b-lg">
        <form onSubmit={handleSubmit} className="flex items-center space-x-1 sm:space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 border border-gray-300 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-[#f36f20] focus:border-transparent text-xs sm:text-sm text-gray-900 placeholder-gray-500"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="bg-[#f36f20] hover:bg-[#e05e10] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex-shrink-0"
            aria-label="Enviar mensaje"
          >
            <Send size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </form>
        
        {/* User Info Display */}
        {userInfo.hasProvidedInfo && (
          <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-gray-500 flex flex-wrap items-center gap-x-2 gap-y-1">
            {userInfo.name && (
              <span className="flex items-center space-x-1">
                <User size={10} className="flex-shrink-0" />
                <span className="truncate max-w-[100px] sm:max-w-none">{userInfo.name}</span>
              </span>
            )}
            {userInfo.email && (
              <span className="inline-flex items-center truncate max-w-[120px] sm:max-w-none">
                <span className="mr-0.5">📧</span>
                <span className="truncate">{userInfo.email}</span>
              </span>
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