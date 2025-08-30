
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-[#121212]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Sobre <span className="text-[#f36f20]">O3 Energy</span></h2>
            <p className="text-gray-300 mb-4 text-lg">
              Somos una empresa mexicana de energía renovable, enfocada en el desarrollo, construcción y operación de proyectos solares y eólicos a gran escala en México.
            </p>
            <p className="text-gray-300 text-lg">
              Nuestro objetivo es acelerar la transición energética del país a través de la generación de energía limpia, confiable y competitiva, contribuyendo al desarrollo sustentable de México.
            </p>
          </div>
          <div>
            <img src="https://picsum.photos/seed/wind-turbine/800/600" alt="Wind turbines" className="rounded-lg shadow-2xl mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
