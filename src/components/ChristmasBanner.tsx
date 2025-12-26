import React from 'react';

const ChristmasBanner: React.FC = () => {
  // Verificar si estamos en diciembre
  // TEMPORAL: Para pruebas, forzar que aparezca el banner (cambiar a true para probar)
  const forceShowForTesting = true; // CAMBIAR A false PARA PRODUCCIÓN (solo diciembre)
  const isDecember = forceShowForTesting || new Date().getMonth() === 11; // 0-indexed (noviembre = 11)

  // Verificar si el usuario prefiere movimiento reducido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Obtener el nombre de la empresa desde variables de entorno
  const companyName = import.meta.env.VITE_COMPANY_NAME || 'O3 Energy Mexico';

  // Si no estamos en diciembre, no renderizar nada
  if (!isDecember) {
    return null;
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Banner navideño de felicitaciones de O3 Energy Mexico"
      role="banner"
    >
      {/* Imagen de fondo con guirnaldas navideñas */}
      <div className="w-full relative">
        <img
          src="/images/guirnaldas_navideñas.png"
          alt="Guirnaldas navideñas decorativas con campanas"
          className="w-full h-auto object-cover"
          loading="eager"
        />

        {/* Banner deslizable superpuesto */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm py-3 md:py-4 overflow-hidden">
          <div
            className={`whitespace-nowrap text-center marquee-text ${prefersReducedMotion ? 'no-animation' : ''}`}
            aria-live="polite"
          >
            <span className="inline-block font-bold text-2xl md:text-4xl px-4 text-shadow-lg" style={{ color: '#f36f20' }}>
              🎄 Felices Fiestas!! Les deseamos desde {companyName}!! 🎅
            </span>
          </div>
        </div>
      </div>

      {/* Estilos CSS en línea para la animación (fallback) */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .marquee-text {
          animation: marquee 25s linear infinite;
          will-change: transform;
        }

        .no-animation {
          animation: none;
        }

        .text-shadow-lg {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9), 0px 0px 8px rgba(243, 111, 32, 0.5);
        }

        /* Respetar preferencias de movimiento reducido */
        @media (prefers-reduced-motion: reduce) {
          .marquee-text {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default ChristmasBanner;
