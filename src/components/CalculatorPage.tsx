import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCalculator, FaLeaf, FaDollarSign, FaClock, FaShieldAlt } from 'react-icons/fa';
import SolarCalculator from './SolarCalculator';

const CalculatorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0F0F0F] shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-[#f36f20] hover:text-white font-medium transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Volver al inicio
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-[#022240] text-white pt-16 pb-20">
        <div className="container mx-auto px-6 text-center">
          <FaCalculator className="text-6xl mx-auto mb-6 text-[#f36f20]" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cotizador Solar</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Calcule su ahorro con energía solar en solo 4 pasos. 
            Obtenga una cotización personalizada basada en su consumo actual.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir energía solar?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              La energía solar es la inversión más inteligente que existe. 
              Descubra los beneficios y calcule su ahorro potencial.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#f36f20]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaDollarSign className="text-2xl text-[#f36f20]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ahorro Garantizado</h3>
              <p className="text-gray-600">Reduzca su factura eléctrica hasta un 95%</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#f36f20]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-2xl text-[#f36f20]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recuperación Rápida</h3>
              <p className="text-gray-600">Recupere su inversión en 3-5 años</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#f36f20]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-2xl text-[#f36f20]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Energía Limpia</h3>
              <p className="text-gray-600">Contribuya al cuidado del medio ambiente</p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#f36f20]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-2xl text-[#f36f20]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Garantía Extendida</h3>
              <p className="text-gray-600">Hasta 25 años de garantía en paneles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <SolarCalculator />
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro proceso</h2>
            <p className="text-lg text-gray-600">
              Desde la cotización hasta la instalación, estamos con usted en cada paso
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#f36f20] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cotización</h3>
              <p className="text-gray-600">
                Complete nuestro formulario y reciba una cotización personalizada en 24 horas
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#f36f20] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Diseño</h3>
              <p className="text-gray-600">
                Nuestros ingenieros diseñan el sistema perfecto para su propiedad
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#f36f20] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instalación</h3>
              <p className="text-gray-600">
                Instalación profesional con garantía de 10 años en la obra
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 to-[#022240] text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para comenzar su proyecto solar?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Nuestro equipo de expertos está listo para ayudarle a encontrar la solución solar perfecta para sus necesidades.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contacto" 
              className="bg-[#f36f20] hover:bg-[#d45e1b] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Contactar Asesor
            </Link>
            <Link 
              to="/soluciones-energeticas" 
              className="border-2 border-white text-white hover:bg-white hover:text-[#022240] px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Ver Soluciones
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
