
import React from 'react';
import { SERVICES_DATA } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-[#0F0F0F]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Servicios</h2>
        <p className="max-w-3xl mx-auto text-gray-300 mb-16 text-lg">
          Cubrimos todo el ciclo de vida de los proyectos de energía renovable.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <div key={index} className="bg-[#1a1a1a] p-8 rounded-lg text-left transform hover:-translate-y-2 transition-transform duration-300">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-[#f36f20]">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
