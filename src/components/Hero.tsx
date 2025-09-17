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
          <span className="text-[#f36f20] animate-pulse">energética en México</span>
        </h1>
        <div className="mt-8 flex justify-center">
          <img 
            src="/images/logo-o3.png" 
            alt="O3 Energy Logo" 
            className="h-16 md:h-20 lg:h-24 object-contain"
          />
        </div>
        <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-200">
          Desarrollamos, construimos y operamos proyectos de energía renovable a gran escala.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#about" 
            className="inline-block bg-[#f36f20] text-white font-bold py-3 px-8 rounded-full uppercase tracking-wider 
                      hover:bg-[#d45e1b] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f36f20]"
            aria-label="Conocer más sobre nuestra empresa"
          >
            Conócenos
          </a>
          <a 
            href="/cotizador" 
            className="inline-block bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full uppercase tracking-wider 
                      hover:bg-white hover:text-[#f36f20] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            aria-label="Calcular cotización solar"
          >
            Cotizar Ahora
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
