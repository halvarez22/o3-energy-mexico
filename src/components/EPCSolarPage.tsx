import React from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardCheck, FaLightbulb, FaHardHat } from 'react-icons/fa';

const EPCSolarPage: React.FC = () => {
  const features = [
    {
      icon: <FaLightbulb className="w-8 h-8 text-blue-500" />,
      title: 'Ingeniería Solar Inteligente',
      description: 'Nuestro equipo de ingenieros altamente capacitados diseña sistemas de energía renovable personalizados. Proporcionamos ilustraciones dinámicas del concepto inicial, diseño y plan de construcción detallado de su sistema de energía solar.'
    },
    {
      icon: <FaClipboardCheck className="w-8 h-8 text-blue-500" />,
      title: 'Adquisición Integral de Energía Solar',
      description: 'Gracias a nuestras relaciones con los principales fabricantes, podemos ofrecer precios preferenciales. Nuestro equipo dedicado se encarga de todo el proceso de compra y logística para su proyecto.'
    },
    {
      icon: <FaHardHat className="w-8 h-8 text-blue-500" />,
      title: 'Construcción EPC de Primera Clase',
      description: 'Contamos con gerentes de proyecto certificados, contratantes y líderes de equipo con experiencia en todas las áreas de la fase de construcción, asegurando los más altos estándares de calidad y seguridad.'
    }
  ];

  const benefits = [
    'Un solo punto de contacto para todo su proyecto solar',
    'Equipo con amplia experiencia en energía renovable',
    'Soluciones personalizadas para cada cliente',
    'Soporte continuo después de la instalación',
    'Cumplimiento de todas las normativas y permisos',
    'Monitoreo y mantenimiento continuo'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white pt-32 pb-20 -mt-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Servicios EPC Solar</h1>
            <p className="text-xl mb-8">
              Una solución integral para sus necesidades de energía solar, desde el diseño hasta la construcción y más allá.
            </p>
            <Link 
              to="/contacto" 
              className="inline-block bg-[#f36f20] hover:bg-[#d45e1b] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
            >
              Contáctenos para una cotización
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Un único punto de contacto para su proyecto solar</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              Los servicios EPC (Ingeniería, Adquisición y Construcción) de O3 ENERGY MEXICO han simplificado el proceso de implementación de energía solar para nuestros clientes. Puede confiarnos su proyecto solar y nosotros nos encargaremos de todo el proceso, desde los primeros diseños hasta la construcción final.
            </p>
            <p className="mb-6">
              Contratarnos como su único proveedor de servicios significa que solo tendrá un número al que llamar para cualquier aspecto de su sistema de energía solar. Hacemos que el acceso a energía limpia y el ahorro de costos sea lo más sencillo posible para usted.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-gray-50 rounded-xl p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Beneficios de Elegir Nuestros Servicios EPC</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar su proyecto solar?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Nuestro equipo de expertos está listo para guiarlo a través de cada paso del proceso EPC, asegurando que su proyecto de energía solar sea un éxito.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contacto" 
              className="bg-[#f36f20] hover:bg-[#d45e1b] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Solicitar Cotización
            </Link>
            <Link 
              to="/soluciones-energeticas" 
              className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Volver a Soluciones
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EPCSolarPage;
