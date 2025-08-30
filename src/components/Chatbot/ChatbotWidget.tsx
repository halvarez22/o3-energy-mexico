import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import ChatWindow from './ChatWindow';
import { ChatMessage, ChatbotState } from './types';

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
      // Simular respuesta del bot (aquí integraremos OpenAI)
      const botResponse = await generateBotResponse(text, userInfo);
      
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: botResponse.text,
          sender: 'bot',
          timestamp: new Date(),
          type: botResponse.type || 'text',
          options: botResponse.options
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);

        // Actualizar información del usuario si se capturó
        if (botResponse.userInfo) {
          setUserInfo(prev => ({ ...prev, ...botResponse.userInfo }));
        }
      }, 1000 + Math.random() * 1000); // Simular tiempo de respuesta humano

    } catch (error) {
      console.error('Error generating bot response:', error);
      setIsTyping(false);
    }
  };

  const generateBotResponse = async (userText: string, currentUserInfo: any) => {
    // Lógica básica de respuesta (después integraremos OpenAI)
    const text = userText.toLowerCase();
    
    // Detectar si el usuario dio su nombre
    if (!currentUserInfo.name && (text.includes('soy ') || text.includes('me llamo ') || text.includes('mi nombre es '))) {
      const nameMatch = text.match(/(?:soy|me llamo|mi nombre es)\s+([a-záéíóúñ\s]+)/i);
      if (nameMatch) {
        const name = nameMatch[1].trim();
        return {
          text: `¡Mucho gusto ${name}! 😊 Me da mucho gusto conocerte. Para poder ayudarte mejor y enviarte información personalizada sobre nuestros servicios de energía solar, ¿podrías compartirme tu email o número de teléfono?`,
          userInfo: { name, hasProvidedInfo: true }
        };
      }
    }

    // Detectar email
    const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (emailMatch && !currentUserInfo.email) {
      return {
        text: `Perfecto, he guardado tu email: ${emailMatch[1]}. ${currentUserInfo.phone ? '' : '¿También podrías compartirme tu número de teléfono para contactarte más fácilmente?'}`,
        userInfo: { email: emailMatch[1] }
      };
    }

    // Detectar teléfono
    const phoneMatch = text.match(/(\+?52\s?)?(\d{3}\s?\d{3}\s?\d{4}|\d{10})/);
    if (phoneMatch && !currentUserInfo.phone) {
      return {
        text: `Excelente, he guardado tu teléfono. Ahora puedo ayudarte mejor. ¿Qué te interesa saber sobre energía solar? Puedo contarte sobre:`,
        userInfo: { phone: phoneMatch[0] },
        type: 'options',
        options: [
          'Costos de instalación',
          'Beneficios de la energía solar',
          'Nuestros proyectos',
          'Proceso de instalación',
          'Financiamiento disponible'
        ]
      };
    }

    // Respuestas sobre servicios
    if (text.includes('costo') || text.includes('precio') || text.includes('cuanto')) {
      return {
        text: `Los costos de instalación de paneles solares varían según varios factores:\n\n• Tamaño del sistema (kW)\n• Tipo de paneles\n• Complejidad de la instalación\n• Ubicación geográfica\n\nEn O3 ENERGY MEXICO ofrecemos evaluaciones gratuitas. Un sistema residencial típico puede costar entre $80,000 y $200,000 MXN, pero se paga solo en 5-7 años con los ahorros en electricidad.\n\n¿Te gustaría que uno de nuestros especialistas te haga una cotización personalizada?`
      };
    }

    if (text.includes('beneficio') || text.includes('ventaja') || text.includes('ahorro')) {
      return {
        text: `Los beneficios de la energía solar son increíbles:\n\n🌞 **Económicos:**\n• Reduce tu recibo de luz hasta 95%\n• ROI en 5-7 años\n• Aumenta el valor de tu propiedad\n\n🌱 **Ambientales:**\n• Energía 100% limpia\n• Reduces tu huella de carbono\n• Contribuyes al medio ambiente\n\n⚡ **Técnicos:**\n• Tecnología confiable (25+ años)\n• Mantenimiento mínimo\n• Independencia energética\n\n¿Qué aspecto te interesa más?`
      };
    }

    // Respuesta por defecto
    return {
      text: `Entiendo tu consulta. En O3 ENERGY MEXICO somos especialistas en energía solar con más de 10 años de experiencia. Hemos instalado más de 1,000 sistemas en México.\n\n¿Podrías contarme más específicamente qué te interesa? Por ejemplo:\n• ¿Es para tu casa o negocio?\n• ¿Qué tanto pagas de luz al mes?\n• ¿Ya tienes alguna cotización?`
    };
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('chatbot_dismissed', 'true');
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
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="bg-[#A4E834] hover:bg-[#8fcf2a] text-[#121212] p-4 rounded-full shadow-lg transition-all duration-300 group"
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
            className={`fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="bg-[#A4E834] text-[#121212] p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#121212] rounded-full flex items-center justify-center">
                  <MessageCircle size={16} className="text-[#A4E834]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Asistente O3 ENERGY MEXICO</h3>
                  <p className="text-xs opacity-80">En línea</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleMinimize}
                  className="hover:bg-[#8fcf2a] p-1 rounded transition-colors"
                >
                  <Minimize2 size={16} />
                </button>
                <button
                  onClick={handleClose}
                  className="hover:bg-[#8fcf2a] p-1 rounded transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
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