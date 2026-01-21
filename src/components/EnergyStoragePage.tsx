import React from 'react';
import { Link } from 'react-router-dom';
import { FaCarBattery, FaBolt, FaShieldAlt, FaChartLine, FaClock, FaLeaf, FaIndustry, FaBuilding, FaHome, FaDownload, FaCheckCircle } from 'react-icons/fa';

const EnergyStoragePage: React.FC = () => {
  const batterySystems = [
    {
      capacity: '250kW-500kWh',
      power: '250kW',
      energy: '500kWh',
      ideal: 'Instalaciones pequeñas y medianas',
      features: ['Backup power', 'Optimización solar', 'Escalabilidad modular']
    },
    {
      capacity: '375kW-772kWh',
      power: '375kW',
      energy: '772kWh',
      ideal: 'Comercios medianos',
      features: ['Alto rendimiento', 'Monitoreo remoto', 'Mantenimiento reducido']
    },
    {
      capacity: '500kW-1MWh',
      power: '500kW',
      energy: '1MWh',
      ideal: 'Industrias pequeñas',
      features: ['Capacidad premium', 'Independencia energética', 'ROI acelerado']
    },
    {
      capacity: '625kW-1286kWh',
      power: '625kW',
      energy: '1286kWh',
      ideal: 'Aplicaciones industriales grandes',
      features: ['Máxima capacidad', 'Sistemas críticos', 'Eficiencia energética']
    }
  ];

  const benefits = [
    {
      icon: <FaBolt className="w-8 h-8 text-[#f36f20]" />,
      title: 'Independencia Energética',
      description: 'Almacene energía solar para uso nocturno y emergencias, reduciendo su dependencia de la red eléctrica.'
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-[#f36f20]" />,
      title: 'Backup Power Confiable',
      description: 'Protección total contra cortes de energía con sistemas de batería de alta confiabilidad y respaldo.'
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-[#f36f20]" />,
      title: 'Optimización de Costos',
      description: 'Maximice su inversión solar almacenando excedentes y reduciendo costos de demanda máxima.'
    },
    {
      icon: <FaClock className="w-8 h-8 text-[#f36f20]" />,
      title: 'Flexibilidad Horaria',
      description: 'Utilice energía solar almacenada cuando más la necesite, independientemente del horario solar.'
    },
    {
      icon: <FaLeaf className="w-8 h-8 text-[#f36f20]" />,
      title: 'Sostenibilidad Total',
      description: 'Complete su transición energética con almacenamiento limpio y renovable.'
    },
    {
      icon: <FaIndustry className="w-8 h-8 text-[#f36f20]" />,
      title: 'Escalabilidad Empresarial',
      description: 'Sistemas modulares que crecen con su negocio y necesidades energéticas.'
    }
  ];

  const applications = [
    {
      icon: <FaBuilding className="w-12 h-12 text-[#f36f20] mb-4" />,
      title: 'Comercial e Industrial',
      description: 'Backup power crítico, optimización de cargas y reducción de costos operativos para empresas.',
      benefits: ['ROI acelerado', 'Backup uninterrumpible', 'Gestión de demanda']
    },
    {
      icon: <FaHome className="w-12 h-12 text-[#f36f20] mb-4" />,
      title: 'Residencial Premium',
      description: 'Independencia energética completa con sistemas solares + baterías para hogares sostenibles.',
      benefits: ['Autonomía total', 'Ahorro en electricidad', 'Valorización de propiedad']
    },
    {
      icon: <FaIndustry className="w-12 h-12 text-[#f36f20] mb-4" />,
      title: 'Off-Grid y Remoto',
      description: 'Soluciones completas para áreas sin conexión a red eléctrica o con suministro inestable.',
      benefits: ['Independencia total', 'Fiabilidad 24/7', 'Bajo mantenimiento']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-[#022240] to-blue-800 text-white pt-32 pb-20 -mt-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center relative">
          <div className="flex justify-center mb-6">
            <FaCarBattery className="w-20 h-20 text-[#f36f20]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Almacenamiento de Energía</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Sistemas de baterías avanzados para máxima independencia energética y optimización de su inversión solar
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            La Energía del Futuro: Almacenamiento Inteligente
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            En O3 ENERGY MEXICO, entendemos que la energía solar es solo el principio.
            El almacenamiento inteligente de energía le permite aprovechar al máximo su inversión,
            garantizando suministro continuo, independencia energética y optimización de costos.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl border border-blue-100">
            <p className="text-gray-700 text-lg">
              <span className="font-semibold text-[#022240]">¿Sabía que combinar paneles solares con baterías puede aumentar su ahorro energético hasta un 50%?</span>
              Nuestros sistemas de almacenamiento le permiten almacenar energía solar excedente para usarla cuando más la necesite.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Beneficios del Almacenamiento de Energía
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{benefit.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Battery Systems */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sistemas de Baterías Disponibles
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tecnología de litio-ion avanzada con capacidades que se adaptan a cualquier necesidad energética
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {batterySystems.map((system, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#022240] mb-2">{system.capacity}</h3>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span><strong>Potencia:</strong> {system.power}</span>
                    <span><strong>Energía:</strong> {system.energy}</span>
                  </div>
                  <p className="text-gray-700 font-medium">{system.ideal}</p>
                </div>

                <div className="space-y-2">
                  {system.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <FaCheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Todos nuestros sistemas incluyen certificaciones internacionales y garantía extendida.
            </p>
            <button className="bg-[#f36f20] hover:bg-[#d45e1b] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              <FaDownload className="inline w-4 h-4 mr-2" />
              Descargar Especificaciones Técnicas
            </button>
          </div>
        </div>

        {/* Applications */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Aplicaciones Ideales
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {applications.map((app, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="p-8 text-center">
                  <div className="flex justify-center">
                    {app.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{app.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{app.description}</p>

                  <div className="space-y-2">
                    {app.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center justify-center text-sm text-gray-600">
                        <FaCheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BESS Gallery */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Instalaciones BESS Destacadas
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/bess_1.jpeg"
                  alt="Sistema BESS de alta capacidad - Instalación industrial"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Sistema BESS Industrial</h3>
                  <p className="text-sm opacity-90">Capacidad premium para aplicaciones críticas</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/bess_2.jpeg"
                  alt="Sistema BESS modular - Solución escalable"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Sistema BESS Modular</h3>
                  <p className="text-sm opacity-90">Flexibilidad y escalabilidad garantizada</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Excellence */}
        <div className="bg-gradient-to-r from-blue-900 to-[#022240] text-white rounded-2xl p-8 md:p-12 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Excelencia Técnica Garantizada</h2>
            <p className="text-lg mb-8 leading-relaxed">
              Nuestros sistemas de almacenamiento utilizan tecnología de litio-ion de última generación,
              con certificaciones internacionales y respaldo de fabricantes líderes mundiales.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-[#f36f20] mb-2">99.9%</div>
                <div className="text-sm">Eficiencia de Ciclo</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-[#f36f20] mb-2">10+</div>
                <div className="text-sm">Años de Garantía</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-[#f36f20] mb-2">24/7</div>
                <div className="text-sm">Monitoreo Remoto</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para Alcanzar la Independencia Energética Total?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Nuestro equipo de expertos le ayudará a dimensionar el sistema perfecto para sus necesidades.
            Combine lo mejor de la energía solar con almacenamiento inteligente.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contacto"
              className="bg-[#f36f20] hover:bg-[#d45e1b] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Solicitar Evaluación Gratuita
            </Link>
            <Link
              to="/cotizador"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all"
            >
              Calcular mi Sistema Ideal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyStoragePage;
