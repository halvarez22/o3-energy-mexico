
import React from 'react';

const AboutSummary: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="text-left md:order-last">
            <h2 className="text-4xl lg:text-5xl font-bold text-o3-dark-gray mb-6">Quiénes Somos</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              <span className="text-[#f36f20]">O3 ENERGY MÉXICO</span> es una empresa líder en el desarrollo, construcción y operación de proyectos de energía renovable a gran escala en México. Nuestro equipo de expertos se dedica a impulsar la transición de México hacia un futuro energético más limpio y sostenible, manejando proyectos desde la concepción hasta la operación con un enfoque en la innovación, eficiencia y la satisfacción del cliente.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Con una profunda experiencia en el mercado local y un historial de éxito, nos asociamos con propietarios de tierras, comunidades y inversionistas para crear valor duradero y un impacto ambiental positivo.
            </p>
            <a href="#contact" className="mt-8 inline-block bg-[#f36f20] hover:bg-[#d45e1b] text-white font-bold py-3 px-8 rounded-full transition-colors duration-300">
              Leer Más
            </a>
          </div>
          <div className="w-full h-full">
            <img 
              src="/images/energía-solar-en-un-ambiente-320w.avif"
              alt="Paneles solares en un ambiente natural" 
              className="rounded-lg shadow-2xl object-cover w-full h-[500px]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSummary;
