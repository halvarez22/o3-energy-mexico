import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import ChatWindow from './ChatWindow';
import { ChatMessage, ChatbotState } from './types';
import { geminiChatService } from '../../services/geminiService';
import { groqChatService } from '../../services/groqService';
import { ConversationContext } from '../../services/appContextService';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    hasProvidedInfo: false
  });
  
  // Estado para mantener contexto de la conversación
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    propertyType: '',
    monthlyBill: 0,
    hasRoofSpace: false,
    currentStep: 'initial',
    userInterest: []
  });

  // Mensaje inicial del bot
  useEffect(() => {
    const initialMessage: ChatMessage = {
      id: '1',
      text: '¡Hola! 👋 Soy el asistente virtual de O3 ENERGY MEXICO. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([initialMessage]);
  }, []);

  // Auto-abrir después de 30 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !localStorage.getItem('chatbot_dismissed')) {
        setIsOpen(true);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Actualizar contexto antes de generar respuesta
      const currentContext = geminiChatService.getConversationContext();
      
      // Intentar primero con Gemini
      const geminiResponse = await geminiChatService.generateResponse(text, userInfo, currentContext);
      
      // Actualizar contexto local con el contexto del servicio
      const updatedContext = geminiChatService.getConversationContext();
      setConversationContext(updatedContext);
      
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: geminiResponse.text,
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        extractUserInfoFromResponse(text, geminiResponse.text);
      }, 1000 + Math.random() * 1000);

    } catch (geminiError) {
      console.warn('Gemini falló, intentando con Groq:', geminiError);
      
      try {
        // Fallback a Groq con contexto
        const currentContext = groqChatService.getConversationContext();
        const groqResponse = await groqChatService.generateResponse(text, userInfo, currentContext);
        
        // Actualizar contexto local con el contexto del servicio Groq
        const updatedContext = groqChatService.getConversationContext();
        setConversationContext(updatedContext);
        
        setTimeout(() => {
          const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: groqResponse.text,
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
          };

          setMessages(prev => [...prev, botMessage]);
          setIsTyping(false);
          extractUserInfoFromResponse(text, groqResponse.text);
        }, 1000 + Math.random() * 1000);

      } catch (groqError) {
        console.error('Ambos servicios fallaron:', groqError);
        setIsTyping(false);
        
        // Respuesta de fallback final
        const fallbackMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: 'Disculpa, tuve un problema técnico. ¿Podrías repetir tu pregunta? Mientras tanto, puedes contactarnos directamente al +52 614 775 6600 / +52 614 775 6606 o usar el formulario de contacto en nuestra página web.',
          sender: 'bot',
          timestamp: new Date(),
          type: 'text'
        };
        setMessages(prev => [...prev, fallbackMessage]);
      }
    }
  };

  // Función para extraer información del usuario de las respuestas
  const extractUserInfoFromResponse = (userText: string, botResponse: string) => {
    const text = userText.toLowerCase();
    
    // Detectar nombre
    if (!userInfo.name && (text.includes('soy ') || text.includes('me llamo ') || text.includes('mi nombre es '))) {
      const nameMatch = text.match(/(?:soy|me llamo|mi nombre es)\s+([a-záéíóúñ\s]+)/i);
      if (nameMatch) {
        const name = nameMatch[1].trim();
        setUserInfo(prev => ({ ...prev, name, hasProvidedInfo: true }));
      }
    }

    // Detectar email
    const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (emailMatch && !userInfo.email) {
      setUserInfo(prev => ({ ...prev, email: emailMatch[1] }));
    }

    // Detectar teléfono
    const phoneMatch = text.match(/(\+?52\s?)?(\d{3}\s?\d{3}\s?\d{4}|\d{10})/);
    if (phoneMatch && !userInfo.phone) {
      setUserInfo(prev => ({ ...prev, phone: phoneMatch[0] }));
    }
  };


  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('chatbot_dismissed', 'true');
    
    // Resetear la conversación al estado inicial
    const initialMessage: ChatMessage = {
      id: '1',
      text: '¡Hola! 👋 Soy el asistente virtual de O3 ENERGY MEXICO. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([initialMessage]);
    
    // Resetear información del usuario
    setUserInfo({
      name: '',
      email: '',
      phone: '',
      hasProvidedInfo: false
    });
    
    // Resetear contexto de conversación
    setConversationContext({
      propertyType: '',
      monthlyBill: 0,
      hasRoofSpace: false,
      currentStep: 'initial',
      userInterest: []
    });
    
    // Limpiar historial de ambos servicios
    geminiChatService.clearHistory();
    groqChatService.clearHistory();
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Widget Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-center w-14 h-14 bg-[#f36f20] hover:bg-[#e05e10] text-white rounded-full shadow-lg transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(164, 232, 52, 0.4)",
                  "0 0 0 10px rgba(164, 232, 52, 0)",
                  "0 0 0 0 rgba(164, 232, 52, 0)"
                ]
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              <MessageCircle size={24} />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                1
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className={`fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-2xl border border-[#f36f20]/20 ${
              isMinimized 
                ? 'w-20 h-16 sm:w-80' 
                : 'w-[calc(100%-3rem)] sm:w-96 h-[calc(100vh-8rem)] max-h-[600px]'
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="bg-[#f36f20] text-white p-2 sm:p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={14} className="text-[#f36f20] w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                {!isMinimized && (
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xs sm:text-sm truncate">Asistente O3 ENERGY MEXICO</h3>
                    <p className="text-[10px] sm:text-xs opacity-80">En línea</p>
                  </div>
                )}
              </div>
              {!isMinimized && (
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={handleMinimize}
                    className="hover:bg-[#e05e10] p-1 rounded transition-colors text-white"
                    aria-label="Minimizar chat"
                  >
                    <Minimize2 size={14} className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="hover:bg-[#e05e10] p-1 rounded transition-colors text-white"
                    aria-label="Cerrar chat"
                  >
                    <X size={14} className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <ChatWindow
                messages={messages}
                isTyping={isTyping}
                onSendMessage={handleSendMessage}
                userInfo={userInfo}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;