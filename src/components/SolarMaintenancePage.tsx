import React from 'react';
import { Link } from 'react-router-dom';
import { FaTools, FaClipboardCheck, FaTint, FaShieldAlt, FaSearchDollar, FaChartLine } from 'react-icons/fa';

const SolarMaintenancePage: React.FC = () => {
  const services = [
    {
      icon: <FaTools className="w-8 h-8 text-[#022240]" />,
      title: 'Mantenimiento Preventivo',
      description: 'Inspecciones y ajustes regulares para garantizar el rendimiento óptimo de su sistema solar.'
    },
    {
      icon: <FaTint className="w-8 h-8 text-[#022240]" />,
      title: 'Limpieza de Paneles',
      description: 'Limpieza profesional para eliminar polvo, suciedad y otros residuos que afectan la eficiencia.'
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-[#022240]" />,
      title: 'Monitoreo de Rendimiento',
      description: 'Análisis continuo del rendimiento de su sistema para detectar y solucionar problemas a tiempo.'
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-[#022240]" />,
      title: 'Garantías',
      description: 'Gestión de garantías con los fabricantes en su nombre para cualquier reparación necesaria.'
    },
    {
      icon: <FaClipboardCheck className="w-8 h-8 text-[#022240]" />,
      title: 'Inspecciones Eléctricas',
      description: 'Pruebas y verificaciones de los componentes eléctricos para garantizar la seguridad y eficiencia.'
    },
    {
      icon: <FaSearchDollar className="w-8 h-8 text-[#022240]" />,
      title: 'Auditorías de Eficiencia',
      description: 'Evaluación detallada para identificar oportunidades de mejora en el rendimiento de su sistema.'
    }
  ];

  const benefits = [
    'Maximiza el retorno de su inversión',
    'Extiende la vida útil de su sistema',
    'Mantiene la eficiencia óptima',
    'Previene costosas reparaciones futuras',
    'Garantiza el cumplimiento de garantías',
    'Protección de su inversión a largo plazo'
  ];

  const maintenanceTips = [
    'Realice inspecciones visuales periódicas',
    'Mantenga los paneles libres de escombros',
    'Revise regularmente el rendimiento del sistema',
    'Programe mantenimientos profesionales al menos una vez al año',
    'Esté atento a sombras que puedan afectar el rendimiento',
    'Mantenga la vegetación alrededor de los paneles recortada'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-[#022240] text-white pt-32 pb-20 -mt-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Mantenimiento de Sistemas Solares</h1>
            <p className="text-xl mb-8">
              Mantenga su sistema funcionando al máximo rendimiento con nuestro programa integral de mantenimiento.
            </p>
            <Link 
              to="/contacto" 
              className="inline-block bg-[#f36f20] hover:bg-[#d45e1b] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
            >
              Solicitar Servicio
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Mantenimiento Profesional para su Sistema Solar</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              Un sistema solar es una inversión significativa que requiere mantenimiento regular para garantizar su rendimiento óptimo a lo largo del tiempo. En O3 ENERGY MEXICO, ofrecemos servicios completos de mantenimiento diseñados para maximizar la eficiencia y extender la vida útil de su sistema.
            </p>
            <p>
              Nuestro equipo de técnicos certificados está capacitado para realizar inspecciones detalladas, limpieza profesional y diagnósticos avanzados para mantener su sistema funcionando como nuevo.
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestros Servicios de Mantenimiento</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg mb-8 hover:shadow-md transition-shadow">
                <div className="bg-[#022240] w-2 h-2 rounded-full mr-2"></div>
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-12 mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Beneficios del Mantenimiento Regular</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Invertir en mantenimiento preventivo puede ahorrarle costos significativos a largo plazo.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">¿Por qué es importante el mantenimiento?</h3>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Consejos para el Mantenimiento</h3>
                <ul className="space-y-4">
                  {maintenanceTips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-blue-500 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-lg text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Warranty Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="md:flex">
              <div className="md:flex-shrink-0 bg-blue-600 md:w-1/3 flex items-center justify-center p-8">
                <FaShieldAlt className="w-16 h-16 text-white" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Proteja su Inversión</h3>
                <p className="text-gray-600 mb-6">
                  Muchas garantías de fabricantes requieren mantenimiento regular para mantenerse válidas. Nuestro equipo se asegura de que su sistema cumpla con todos los requisitos de garantía y maneja cualquier reclamo de garantía en su nombre.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        El mantenimiento regular es esencial para mantener válidas las garantías del fabricante. No arriesgue su inversión.
                      </p>
                    </div>
                  </div>
                </div>
                <Link 
                  to="/#contact" 
                  className="w-full bg-[#022240] hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Consultar sobre Garantías
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-800 to-[#022240] text-white rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Optimizar su Sistema Solar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarlo a mantener su sistema funcionando al máximo rendimiento.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/#contact" 
              className="bg-white text-[#f36f20] hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Solicitar Mantenimiento
            </Link>
            <Link 
              to="/soluciones-energeticas" 
              className="border-2 border-white text-white hover:bg-white hover:text-[#f36f20] px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Volver a Soluciones
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarMaintenancePage;
