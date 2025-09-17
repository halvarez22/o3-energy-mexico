import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '526143654440'; // Número de teléfono sin el signo +
  const message = 'Hola, me gustaría más información sobre sus servicios de energía solar';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-8 left-8 z-50"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Chatea con nosotros por WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.498 14.382v-.002c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.148-.673.15-.197.295-.771.96-.94 1.162-.175.195-.35.218-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.462.13-.607.135-.135.3-.351.45-.525.146-.181.194-.3.292-.5.1-.195.05-.364-.025-.5-.075-.15-.673-1.62-.922-2.207-.24-.584-.487-.51-.672-.51l-.57-.011a1.1 1.1 0 0 0-.79.375c-.27.3-.69.9-.69 2.19 0 1.29.99 2.55 1.11 2.7.12.15 1.91 2.85 4.65 4.02l.01.006.01.003c.63.3 1.23.39 1.69.36.48 0 1.07-.15 1.61-.3.15-.06.36-.03.51.12.18.18.78.9.96 1.08.18.18.36.39.06.75l-.01.01c-.12.15-.21.27-.36.42-.15.15-.3.3-.45.45-.15.15-.3.3-.15.6.15.3.66 1.26 1.41 2.04.93.96 1.71 1.26 2.01 1.41.3.15.48.12.66-.09.18-.21.75-.9.9-1.2.15-.3.3-.24.45-.39.15-.15.3-.3.45-.45.18-.15.36-.15.6-.09.24.06 1.5.69 1.74.81.24.12.39.18.45.27.06.09.06.51-.12.99l-.01.01z" />
          <path d="M12 2a10 10 0 0 0-8.46 15.3l-1.45 4.08a1 1 0 0 0 1.25 1.25l4.08-1.44A10 10 0 1 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
        </svg>
      </a>
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 768px) {
            .whatsapp-button-container {
              bottom: 5rem !important;
              left: 1rem !important;
            }
          }
        `
      }} />
    </motion.div>
  );
};

export default WhatsAppButton;
