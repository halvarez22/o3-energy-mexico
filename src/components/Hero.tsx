import React from 'react';

// Importar la imagen optimizada
const heroImage = '/images/energía-solar-en-un-ambiente-320w.avif';

const Hero: React.FC = () => {
  return (
    <section id="home" className="h-screen flex items-center justify-center text-center relative overflow-hidden">
      {/* Imagen de fondo optimizada */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroImage}
          alt="Paneles solares en un ambiente natural"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      
      {/* Capa de degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      
      {/* Contenido */}
      <div className="relative z-10 px-6 max-w-6xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-tight">
          Liderando la transición <br />
          <span className="text-[#A4E834] animate-pulse">energética en México</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-200">
          Desarrollamos, construimos y operamos proyectos de energía renovable a gran escala.
        </p>
        <a 
          href="#about" 
          className="mt-8 inline-block bg-[#A4E834] text-black font-bold py-3 px-8 rounded-full uppercase tracking-wider 
                    hover:bg-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A4E834]"
          aria-label="Conocer más sobre nuestra empresa"
        >
          Conócenos
        </a>
      </div>
    </section>
  );
};

export default Hero;
