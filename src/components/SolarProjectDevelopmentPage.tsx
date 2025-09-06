import React from 'react';
import { Link } from 'react-router-dom';
import { FaSolarPanel, FaChartLine, FaMapMarkedAlt, FaClipboardCheck, FaTools, FaSearchDollar } from 'react-icons/fa';

const SolarProjectDevelopmentPage: React.FC = () => {
  const processSteps = [
    {
      icon: <FaMapMarkedAlt className="w-8 h-8 text-blue-500" />,
      title: 'Selección del Sitio',
      description: 'Identificamos la ubicación ideal para su proyecto solar, considerando factores como la exposición solar, el espacio disponible y la infraestructura cercana.'
    },
    {
      icon: <FaSearchDollar className="w-8 h-8 text-blue-500" />,
      title: 'Estudio de Factibilidad',
      description: 'Realizamos un análisis detallado para evaluar la viabilidad técnica y económica de su proyecto solar.'
    },
    {
      icon: <FaSolarPanel className="w-8 h-8 text-blue-500" />,
      title: 'Diseño del Sistema',
      description: 'Nuestros ingenieros diseñan un sistema personalizado que maximiza la producción de energía y el retorno de inversión.'
    },
    {
      icon: <FaClipboardCheck className="w-8 h-8 text-blue-500" />,
      title: 'Permisos y Aprobaciones',
      description: 'Nos encargamos de toda la documentación y trámites necesarios para obtener las aprobaciones requeridas.'
    },
    {
      icon: <FaTools className="w-8 h-8 text-blue-500" />,
      title: 'Construcción',
      description: 'Nuestro equipo calificado ejecuta la instalación con los más altos estándares de calidad y seguridad.'
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-blue-500" />,
      title: 'Monitoreo y Mantenimiento',
      description: 'Ofrecemos servicios continuos para garantizar el rendimiento óptimo de su sistema solar a lo largo del tiempo.'
    }
  ];

  const benefits = [
    'Reducción significativa en costos de energía',
    'Retorno de inversión atractivo',
    'Solución sostenible y respetuosa con el medio ambiente',
    'Independencia energética',
    'Incentivos fiscales y financiamiento disponible',
    'Soporte continuo y mantenimiento'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white pt-32 pb-20 -mt-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Desarrollo de Proyectos Solares</h1>
            <p className="text-xl mb-8">
              Soluciones integrales para el desarrollo de proyectos solares a la medida de sus necesidades.
            </p>
            <Link 
              to="/contacto" 
              className="inline-block bg-[#f36f20] hover:bg-[#d45e1b] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
            >
              Iniciar Proyecto
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Expertos en Desarrollo de Proyectos Solares</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              En O3 ENERGY MEXICO, nos especializamos en el desarrollo de proyectos solares llave en mano para clientes comerciales e industriales. Nuestro enfoque integral abarca desde la concepción inicial hasta la puesta en marcha y más allá.
            </p>
            <p className="mb-6">
              Con años de experiencia en el sector, hemos completado con éxito proyectos que van desde pequeñas instalaciones hasta plantas solares a gran escala, siempre con un compromiso inquebrantable con la calidad y la satisfacción del cliente.
            </p>
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestro Proceso de Desarrollo</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg h-full">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 rounded-xl p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Beneficios de Nuestros Servicios</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para guiarlo a través de cada paso del desarrollo de su proyecto solar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contacto" 
              className="bg-[#f36f20] hover:bg-[#d45e1b] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contáctenos
            </Link>
            <Link 
              to="/soluciones-energeticas" 
              className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Volver a Soluciones
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarProjectDevelopmentPage;
