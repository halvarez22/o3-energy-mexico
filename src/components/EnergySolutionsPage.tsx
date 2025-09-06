import React from 'react';
import { Link } from 'react-router-dom';
import { FaSolarPanel, FaLightbulb, FaSun, FaHandHoldingUsd, FaLeaf, FaTools, FaPlug, FaCarBattery, FaBuilding } from 'react-icons/fa';

const EnergySolutionsPage: React.FC = () => {
  const solutions = [
    {
      icon: <FaSolarPanel className="w-12 h-12 text-[#f36f20] mb-4" />,
      title: 'Desarrollo de Proyectos Solares',
      description: 'Ofrecemos desarrollo de proyectos llave en mano de principio a fin, adaptados a sus necesidades específicas.',
      link: '/soluciones-energeticas/desarrollo-proyectos',
      linkText: 'Más información'
    },
    {
      icon: <FaLightbulb className="w-12 h-12 text-[#f36f20] mb-4" />,
      title: 'EPC Solar',
      description: 'Gestionamos su proyecto solar completo con experiencia y recursos para garantizar el éxito.',
      link: '/soluciones-energeticas/epc-solar',
      linkText: 'Descubra cómo'
    },
    {
      icon: <FaSun className="w-12 h-12 text-[#f36f20] mb-4" />,
      title: 'Instalación Solar',
      description: 'Nuestros equipos están capacitados para manejar instalaciones solares personalizadas de cualquier escala.',
      link: '/soluciones-energeticas/instalacion-solar',
      linkText: 'Ver casos de éxito'
    },
    {
      icon: <FaHandHoldingUsd className="w-12 h-12 text-[#f36f20] mb-4" />,
      title: 'Financiamiento',
      description: 'Ofrecemos opciones flexibles de financiamiento para que pueda comenzar a ahorrar desde el primer día.',
      link: '/soluciones-energeticas/financiamiento',
      linkText: 'Ver opciones'
    },
    {
      icon: <FaLightbulb className="w-12 h-12 text-[#f36f20] mb-4" />,
      title: 'Mantenimiento',
      description: 'Servicios profesionales de mantenimiento para garantizar el rendimiento óptimo de su sistema solar.',
      link: '/soluciones-energeticas/mantenimiento',
      linkText: 'Más información'
    },
    {
      icon: <FaLeaf className="w-12 h-12 text-[#f36f20] mb-4" />,
      title: 'Eficiencia Energética',
      description: 'Soluciones para optimizar el consumo de energía y reducir costos operativos en sus instalaciones.',
      link: '/soluciones-energeticas/eficiencia-energetica',
      linkText: 'Más información'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-[#022240] text-white pt-32 pb-20 -mt-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Soluciones Energéticas</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Soluciones solares llave en mano para el futuro de su negocio
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Soluciones Solares Integrales para su Negocio</h2>
          <p className="text-lg text-gray-600 mb-8">
            En O3 ENERGY MEXICO, entendemos que cada negocio es único, con sus propias necesidades y objetivos energéticos. 
            Por eso ofrecemos un amplio rango de soluciones de energía solar diseñadas para ayudar a negocios de 
            todos los tamaños a reducir su huella de carbono, disminuir costos energéticos y alcanzar sus metas de sostenibilidad.
          </p>
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-[#022240]">
            <p className="text-gray-700">
              <span className="font-semibold">¿Sabía que la energía solar puede hacer más que solo reducir sus costos de electricidad?</span> 
              Con energía limpia y alternativa, su negocio ya no dependerá exclusivamente de la red eléctrica, 
              dándole mayor control sobre sus costos energéticos y protegiéndolo contra fallas de energía.
            </p>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="p-8 text-center">
                <div className="flex justify-center">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <Link 
                  to={solution.link}
                  className="inline-flex items-center text-[#022240] hover:text-blue-800 font-medium transition-colors"
                >
                  {solution.linkText}
                  <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="bg-gray-50 rounded-xl p-8 md:p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Beneficios Adicionales</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaBuilding className="w-6 h-6 text-[#022240]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Para Empresas</h3>
                  <p className="text-gray-600">
                    Reduzca sus costos operativos y mejore su perfil de sostenibilidad con soluciones solares 
                    personalizadas para su negocio.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaCarBattery className="w-6 h-6 text-[#022240]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Almacenamiento de Energía</h3>
                  <p className="text-gray-600">
                    Maximice su independencia energética con sistemas de almacenamiento de batería que le permiten 
                    aprovechar al máximo su producción de energía solar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-800 to-[#022240] text-white rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar su viaje hacia la energía limpia?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarle a encontrar la solución solar perfecta para sus necesidades.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contacto" 
              className="bg-[#f36f20] hover:bg-[#d45e1b] text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contáctenos
            </Link>
            <Link 
              to="/proyectos" 
              className="border-2 border-white text-white hover:bg-white hover:text-[#022240] px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Ver Proyectos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergySolutionsPage;
