
import React from 'react';

const CTA: React.FC = () => {
  return (
    <section id="quote" className="relative bg-gray-800 py-24 sm:py-32">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20" 
        style={{ backgroundImage: "url('/images/energía-solar-en-un-ambiente-320w.avif')" }}
      ></div>
      <div className="relative container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          ¿Listo para Empezar tu Próximo Proyecto Solar?
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
          Nuestro equipo está listo para ayudarle a alcanzar sus objetivos de energía renovable. Contáctenos hoy para una consulta gratuita.
        </p>
        <div className="mt-10">
          <a
            href="#contact"
            className="bg-[#f36f20] hover:bg-[#d45e1b] text-white font-bold py-4 px-10 rounded-full text-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            Solicitar Cotización
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;
