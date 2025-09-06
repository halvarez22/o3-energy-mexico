import React from 'react';
import { Link } from 'react-router-dom';
import { FaLightbulb, FaClipboardCheck, FaTools, FaClock, FaShieldAlt, FaLeaf } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa6';

const SolarInstallationPage: React.FC = () => {
  const features = [
    {
      icon: <FaLightbulb className="w-8 h-8 text-blue-500" />,
      title: 'Soluciones Creativas',
      description: 'Ofrecemos soluciones personalizadas que se adaptan a sus necesidades específicas, incluso si su propiedad no es ideal para paneles solares tradicionales.'
    },
    {
      icon: <FaClipboardCheck className="w-8 h-8 text-blue-500" />,
      title: 'Auditoría Energética',
      description: 'Realizamos una evaluación detallada de su consumo energético para recomendar la solución solar más eficiente para su negocio.'
    },
    {
      icon: <FaTools className="w-8 h-8 text-blue-500" />,
      title: 'Instalación Profesional',
      description: 'Nuestro equipo certificado se encarga de toda la instalación con los más altos estándares de calidad y seguridad.'
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-blue-500" />,
      title: 'Garantía y Soporte',
      description: 'Ofrecemos garantía en nuestra mano de obra y soporte continuo para asegurar el rendimiento óptimo de su sistema.'
    }
  ];

  const benefits = [
    'Reducción significativa en costos de energía',
    'Retorno de inversión atractivo',
    'Solución sostenible y respetuosa con el medio ambiente',
    'Independencia energética de la red eléctrica',
    'Incentivos fiscales disponibles',
    'Aumento del valor de su propiedad',
    'Bajo mantenimiento y larga vida útil',
    'Protección contra el aumento de tarifas eléctricas'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white pt-32 pb-20 -mt-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Instalación de Paneles Solares</h1>
            <p className="text-xl mb-8">
              Soluciones de instalación solar sin preocupaciones para su hogar o negocio.
            </p>
            <Link 
              to="/#contact" 
              className="inline-block bg-[#f36f20] hover:bg-[#d45e1b] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
            >
              Solicitar Cotización
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Instalación Solar Sin Preocupaciones</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              En O3 ENERGY MEXICO, entendemos que la instalación de paneles solares puede parecer abrumadora. Es por eso que hemos simplificado el proceso para que sea lo más sencillo y transparente posible. Desde la evaluación inicial hasta la puesta en marcha, nos encargamos de todo.
            </p>
            <p className="mb-6">
              Con años de experiencia en el sector, hemos completado con éxito instalaciones que van desde pequeños sistemas residenciales hasta grandes proyectos comerciales e industriales, siempre con un compromiso inquebrantable con la calidad y la satisfacción del cliente.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg h-full">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestro Proceso de Instalación</h2>
          <div className="relative">
            {/* Timeline */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-100"></div>
            
            {/* Timeline Items */}
            <div className="relative z-10 space-y-12">
              {[
                {
                  title: '1. Consulta Inicial',
                  description: 'Evaluamos sus necesidades energéticas y objetivos para recomendar la mejor solución solar.',
                  icon: <FaClipboardCheck className="w-6 h-6 text-green-500" />
                },
                {
                  title: '2. Diseño Personalizado',
                  description: 'Nuestros ingenieros diseñan un sistema solar personalizado para maximizar su retorno de inversión.',
                  icon: <FaTools className="w-6 h-6 text-green-500" />
                },
                {
                  title: '3. Aprobación y Permisos',
                  description: 'Nos encargamos de toda la documentación y trámites necesarios para su proyecto.',
                  icon: <FaClipboardCheck className="w-6 h-6 text-green-500" />
                },
                {
                  title: '4. Instalación Profesional',
                  description: 'Nuestro equipo certificado instala su sistema con los más altos estándares de calidad.',
                  icon: <FaTools className="w-6 h-6 text-green-500" />
                },
                {
                  title: '5. Puesta en Marcha',
                  description: 'Realizamos pruebas exhaustivas y le mostramos cómo monitorear el rendimiento de su sistema.',
                  icon: <FaChartLine className="w-6 h-6 text-green-500" />
                }
              ].map((item, index) => (
                <div key={index} className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                  <div className="hidden md:block w-1/2"></div>
                  <div className={`w-full md:w-1/2 p-6 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 p-2 rounded-full mr-4">
                          {item.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 rounded-xl p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Beneficios de la Energía Solar</h2>
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

        {/* Financing Section */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Opciones de Financiamiento Flexible</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Ofrecemos diversas opciones de financiamiento para que pueda comenzar a ahorrar desde el primer día, sin necesidad de un desembolso inicial significativo.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Compra Directa',
                description: 'Sea dueño de su sistema desde el primer día y maximice sus ahorros a largo plazo.',
                icon: <FaChartLine className="w-8 h-8 text-green-500 mx-auto mb-4" />
              },
              {
                title: 'Arrendamiento',
                description: 'Pague una tarifa fija mensual por la energía producida, sin costos iniciales.',
                icon: <FaClock className="w-8 h-8 text-green-500 mx-auto mb-4" />
              },
              {
                title: 'PPA (Acuerdo de Compra de Energía)',
                description: 'Compre la energía que produce su sistema a una tarifa reducida, sin preocuparse por el mantenimiento.',
                icon: <FaLeaf className="w-8 h-8 text-green-500 mx-auto mb-4" />
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar su proyecto solar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos está listo para guiarlo a través de cada paso del proceso de instalación solar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/#contact" 
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

export default SolarInstallationPage;
