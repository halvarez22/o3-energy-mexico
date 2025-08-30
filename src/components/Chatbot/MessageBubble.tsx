import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { ChatMessage } from './types';

interface MessageBubbleProps {
  message: ChatMessage;
  onOptionClick?: (option: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onOptionClick }) => {
  const isBot = message.sender === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-start space-x-2`}
    >
      {isBot && (
        <div className="w-8 h-8 bg-[#A4E834] rounded-full flex items-center justify-center flex-shrink-0">
          <Bot size={16} className="text-[#121212]" />
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md ${isBot ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-4 py-2 rounded-2xl ${
            isBot
              ? 'bg-white text-gray-800 shadow-sm border border-gray-200'
              : 'bg-[#A4E834] text-[#121212]'
          }`}
        >
          <p className="text-sm whitespace-pre-line">{message.text}</p>
          
          {/* Options for bot messages */}
          {message.type === 'options' && message.options && (
            <div className="mt-3 space-y-2">
              {message.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => onOptionClick?.(option)}
                  className="block w-full text-left px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className={`text-xs text-gray-500 mt-1 ${isBot ? 'text-left' : 'text-right'}`}>
          {message.timestamp.toLocaleTimeString('es-MX', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>

      {!isBot && (
        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-white" />
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;