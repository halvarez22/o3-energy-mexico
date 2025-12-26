import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoneyBillWave, FaHandHoldingUsd, FaFileContract, FaChartLine, FaShieldAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

const SolarFinancingPage: React.FC = () => {
  const financingOptions = [
    {
      title: 'Acuerdo de Compra de Energía (PPA)',
      icon: <FaFileContract className="w-8 h-8 text-blue-500 mx-auto mb-4" />,
      description: 'Pague solo por la energía que produce su sistema solar, sin costos iniciales y con tarifas predecibles.',
      features: [
        'Sin costo inicial',
        'Pagos mensuales fijos basados en producción',
        'Mantenimiento incluido',
        'Plazos flexibles de 10 a 20 años',
        'Opción de compra al final del contrato'
      ]
    },
    {
      title: 'Arrendamiento Operativo',
      icon: <FaHandHoldingUsd className="w-8 h-8 text-blue-500 mx-auto mb-4" />,
      description: 'Obtenga un sistema solar con pagos mensuales fijos y la opción de comprar al final del plazo.',
      features: [
        'Pagos fijos predecibles',
        'Plazo típico de 7 años',
        'Mantenimiento incluido',
        'Deducción de pagos como gasto operativo',
        'Opción de compra al valor de mercado'
      ]
    },
    {
      title: 'Financiamiento PACE',
      icon: <FaChartLine className="w-8 h-8 text-green-500 mx-auto mb-4" />,
      description: 'Financiamiento a largo plazo para mejoras de eficiencia energética a través de su factura de impuestos.',
      features: [
        'Hasta 20 años para pagar',
        'Sin pago inicial',
        'Transferible al vender la propiedad',
        'Aprobación basada en equidad, no en crédito',
        'Para propietarios de negocios y viviendas'
      ]
    },
    {
      title: 'Préstamos Solares',
      icon: <FaMoneyBillWave className="w-8 h-8 text-blue-500 mx-auto mb-4" />,
      description: 'Financiamiento tradicional para ser propietario de su sistema solar desde el primer día.',
      features: [
        'Sea dueño de su sistema inmediatamente',
        'Aproveche incentivos fiscales',
        'Aumente el valor de su propiedad',
        'Ahorros inmediatos en su factura eléctrica',
        'Tasas competitivas'
      ]
    }
  ];

  const incentives = [
    {
      title: 'Crédito Fiscal Federal',
      amount: '30%',
      description: 'Descuento directo en sus impuestos federales por la instalación de sistemas solares.'
    },
    {
      title: 'Amortización Acelerada',
      amount: '100%',
      description: 'Deducciones por depreciación acelerada del equipo en el primer año.'
    },
    {
      title: 'Exención de IVA',
      amount: '16%',
      description: 'Exención del Impuesto al Valor Agregado en la compra de equipos solares.'
    },
    {
      title: 'Tarifas Preferenciales',
      amount: 'Hasta 20 años',
      description: 'Contratos de interconexión con CFE con tarifas preferenciales para la energía que inyectes a la red.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white pt-32 pb-20 -mt-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Financiamiento Solar</h1>
            <p className="text-xl mb-8">
              Hacemos que la energía solar sea accesible para todos con opciones de financiamiento flexibles y asequibles.
            </p>
            <Link 
              to="/contacto" 
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
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Financiamiento Solar para su Negocio o Hogar</h2>
          <div className="prose prose-lg text-gray-600 mx-auto">
            <p className="mb-6">
              En O3 ENERGY MEXICO, entendemos que la inversión en energía solar es significativa. Es por eso que ofrecemos diversas opciones de financiamiento para que pueda comenzar a ahorrar desde el primer día, sin necesidad de un desembolso inicial significativo.
            </p>
            <p>
              Ya sea que prefiera ser dueño de su sistema solar o simplemente pagar por la energía que produce, tenemos una solución que se adapta a sus necesidades financieras y objetivos de sostenibilidad.
            </p>
          </div>
        </div>

        {/* Financing Options */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Opciones de Financiamiento Disponibles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {financingOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="p-8">
                  <div className="text-center mb-6">
                    {option.icon}
                    <h3 className="text-2xl font-bold text-gray-900 mt-4">{option.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-center">{option.description}</p>
                  <ul className="space-y-3 mb-8">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <FaCheckCircle className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 text-center">
                  <Link 
                    to="/#contact" 
                    className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
                  >
                    Más información
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incentives Section */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-12 mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Incentivos Fiscales y Beneficios</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Aproveche los incentivos disponibles para hacer que su inversión en energía solar sea aún más atractiva.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {incentives.map((incentive, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                  <div className="w-3 h-3 rounded-full bg-blue-500 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{incentive.title}</h3>
                  <p className="text-gray-600">{incentive.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Finance Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">¿Por qué Financiar su Proyecto Solar?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaShieldAlt className="w-8 h-8 text-blue-500 mx-auto mb-4" />,
                title: 'Protección contra el Aumento de Tarifas',
                description: 'Proteja su negocio de los constantes aumentos en las tarifas eléctricas con costos de energía predecibles.'
              },
              {
                icon: <FaChartLine className="w-8 h-8 text-blue-500 mx-auto mb-4" />,
                title: 'Mejor Flujo de Efectivo',
                description: 'Conserve su capital de trabajo mientras disfruta de los beneficios de la energía solar.'
              },
              {
                icon: <FaClock className="w-8 h-8 text-blue-500 mx-auto mb-4" />,
                title: 'Tiempo de Recuperación Rápido',
                description: 'Los ahorros en su factura eléctrica a menudo cubren los pagos del financiamiento desde el primer día.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-center">
                  {item.icon}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Descubrir sus Opciones de Financiamiento?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestros expertos en financiamiento están listos para ayudarlo a encontrar la mejor solución para su proyecto solar.
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

export default SolarFinancingPage;
