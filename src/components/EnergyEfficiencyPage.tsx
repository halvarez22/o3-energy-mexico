import React from 'react';
import { Link } from 'react-router-dom';
import { FaLightbulb, FaSnowflake, FaSolarPanel, FaBuilding, FaTools, FaCheckCircle } from 'react-icons/fa';

const EnergyEfficiencyPage: React.FC = () => {
  const solutions = [
    {
      icon: <FaLightbulb className="w-8 h-8 text-green-500" />,
      title: 'Iluminación LED',
      description: 'Actualización a sistemas de iluminación LED de alta eficiencia que consumen hasta un 80% menos de energía que las bombillas tradicionales.',
      benefits: [
        'Mayor durabilidad y vida útil',
        'Menor generación de calor',
        'Encendido instantáneo',
        'Amplia gama de temperaturas de color'
      ]
    },
    {
      icon: <FaSnowflake className="w-8 h-8 text-green-500" />,
      title: 'Sistemas HVAC Eficientes',
      description: 'Optimización de sistemas de calefacción, ventilación y aire acondicionado para reducir el consumo energético y mejorar el confort.',
      benefits: [
        'Reducción de costos operativos',
        'Mayor vida útil del equipo',
        'Mejor calidad del aire interior',
        'Control inteligente de temperatura'
      ]
    },
    {
      icon: <FaBuilding className="w-8 h-8 text-green-500" />,
      title: 'Aislamiento Térmico',
      description: 'Mejora del aislamiento en techos, paredes y ventanas para mantener temperaturas estables y reducir la carga de climatización.',
      benefits: [
        'Reducción de pérdidas de energía',
        'Mayor confort térmico',
        'Protección contra ruido exterior',
        'Retorno de inversión rápido'
      ]
    },
    {
      icon: <FaTools className="w-8 h-8 text-green-500" />,
      title: 'Automatización y Control',
      description: 'Sistemas inteligentes de gestión energética que optimizan el consumo en tiempo real según las necesidades reales.',
      benefits: [
        'Monitoreo en tiempo real',
        'Programación inteligente',
        'Detección de ineficiencias',
        'Control remoto'
      ]
    }
  ];

  const benefits = [
    'Reducción significativa en facturas de energía',
    'Mayor confort y productividad',
    'Menor huella de carbono',
    'Mejor imagen corporativa',
    'Cumplimiento normativo',
    'Aumento del valor de la propiedad'
  ];

  const processSteps = [
    {
      title: '1. Auditoría Energética',
      description: 'Evaluación detallada del consumo energético de sus instalaciones para identificar oportunidades de mejora.'
    },
    {
      title: '2. Análisis de Viabilidad',
      description: 'Estudio de las soluciones más adecuadas con un análisis detallado de costos y retorno de inversión.'
    },
    {
      title: '3. Implementación',
      description: 'Instalación profesional de las soluciones de eficiencia energética seleccionadas.'
    },
    {
      title: '4. Monitoreo y Seguimiento',
      description: 'Seguimiento continuo del desempeño para garantizar los ahorros esperados.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white pt-32 pb-20 -mt-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Eficiencia Energética</h1>
            <p className="text-xl mb-8">
              Soluciones inteligentes para reducir el consumo de energía y maximizar el rendimiento de sus instalaciones.
            </p>
            <Link 
              to="/contacto" 
              className="inline-block bg-[#3B82F6] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
            >
              Solicitar Auditoría
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Maximice el Potencial de su Sistema Solar con Eficiencia Energética</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              La eficiencia energética no se trata de usar menos energía, sino de usar la energía de manera más inteligente. Al combinar soluciones de eficiencia energética con su sistema solar, puede lograr ahorros aún mayores y reducir significativamente su huella ambiental.
            </p>
            <p>
              Nuestro equipo de expertos en eficiencia energética trabaja junto con nuestros especialistas en energía solar para ofrecerle una solución integral que maximice su inversión y minimice el desperdicio de energía.
            </p>
          </div>
        </div>

        {/* Solutions Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestras Soluciones de Eficiencia Energética</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  {solution.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <h4 className="font-semibold text-gray-900 mb-3">Beneficios:</h4>
                <ul className="space-y-2 mb-6">
                  {solution.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/#contact" 
                  className="text-green-600 hover:text-green-800 font-semibold inline-flex items-center"
                >
                  Más información
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-12 mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Beneficios de la Eficiencia Energética</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Invertir en eficiencia energética ofrece ventajas que van más allá del ahorro económico.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-4 text-lg font-medium text-gray-900">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestro Proceso de Eficiencia Energética</h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-green-100"></div>
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div key={index} className="relative md:flex items-center">
                  <div className="hidden md:block w-1/2"></div>
                  <div className={`md:absolute md:left-1/2 md:ml-6 md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                      <h3 className="text-xl font-bold text-green-700 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Integration Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-20">
          <div className="md:flex">
            <div className="md:flex-shrink-0 bg-green-600 md:w-1/3 flex items-center justify-center p-8">
              <FaSolarPanel className="w-16 h-16 text-white" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Integración con Energía Solar</h3>
              <p className="text-gray-600 mb-6">
                La combinación de eficiencia energética con energía solar es la fórmula perfecta para maximizar sus ahorros y sostenibilidad. Al reducir su consumo energético total, puede satisfacer una mayor parte de sus necesidades con energía solar, reduciendo aún más su dependencia de la red eléctrica.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Un sistema de eficiencia energética bien diseñado puede reducir significativamente el tamaño (y el costo) del sistema solar necesario para cubrir sus necesidades energéticas.
                    </p>
                  </div>
                </div>
              </div>
              <Link 
                to="/soluciones-energeticas" 
                className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold"
              >
                <span>Conozca nuestras soluciones solares</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Reducir su Consumo Energético?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestros expertos están listos para ayudarle a identificar oportunidades de ahorro y eficiencia en sus instalaciones.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/#contact" 
              className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Solicitar Auditoría
            </Link>
            <Link 
              to="/soluciones-energeticas" 
              className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Ver Todas las Soluciones
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyEfficiencyPage;
