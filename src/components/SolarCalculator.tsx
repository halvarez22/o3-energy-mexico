import React, { useState } from 'react';
import { FaCalculator, FaHome, FaBuilding, FaBolt, FaFileInvoice, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

interface CalculatorData {
  installationType: string;
  billingFrequency: string;
  monthlyConsumption: string;
  paymentMethod: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cfeReceipt: File | null;
}

const SolarCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CalculatorData>({
    installationType: '',
    billingFrequency: '',
    monthlyConsumption: '',
    paymentMethod: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    cfeReceipt: null
  });

  const [calculatedQuote, setCalculatedQuote] = useState<{
    systemSize: number;
    panels: number;
    estimatedCost: number;
    monthlySavings: number;
    paybackPeriod: number;
  } | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleInputChange = (field: keyof CalculatorData, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateQuote = () => {
    const consumption = parseInt(formData.monthlyConsumption);
    let systemSize = 0;
    let panels = 0;
    let estimatedCost = 0;
    let monthlySavings = 0;
    let paybackPeriod = 0;

    // Cálculo basado en consumo mensual
    if (consumption <= 1000) {
      systemSize = 3; // kW
      panels = 8;
      estimatedCost = 45000;
      monthlySavings = 800;
    } else if (consumption <= 3000) {
      systemSize = 5; // kW
      panels = 14;
      estimatedCost = 75000;
      monthlySavings = 1200;
    } else if (consumption <= 5000) {
      systemSize = 8; // kW
      panels = 22;
      estimatedCost = 120000;
      monthlySavings = 2000;
    } else if (consumption <= 7000) {
      systemSize = 10; // kW
      panels = 28;
      estimatedCost = 150000;
      monthlySavings = 2500;
    } else if (consumption <= 20000) {
      systemSize = 15; // kW
      panels = 42;
      estimatedCost = 225000;
      monthlySavings = 3750;
    } else {
      systemSize = 25; // kW
      panels = 70;
      estimatedCost = 375000;
      monthlySavings = 6250;
    }

    paybackPeriod = Math.round(estimatedCost / (monthlySavings * 12));

    setCalculatedQuote({
      systemSize,
      panels,
      estimatedCost,
      monthlySavings,
      paybackPeriod
    });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateQuote();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setSendStatus(null);
    if (!calculatedQuote) {
      setSendStatus({ success: false, message: 'Primero calcula tu cotización.' });
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
    const templateIdDefault = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
    const templateIdQuote = (import.meta.env.VITE_EMAILJS_QUOTE_TEMPLATE_ID as string | undefined) || templateIdDefault;
    const contactEmail = (import.meta.env.VITE_EMAILJS_TO_EMAIL as string | undefined) || 'contacto@o3mexico.com';

    if (!serviceId || !publicKey || !templateIdDefault) {
      setSendStatus({ success: false, message: 'Configuración de EmailJS incompleta. Verifica variables VITE_EMAILJS_*.' });
      return;
    }

    const summary = `Sistema: ${calculatedQuote.systemSize} kW\nPaneles: ${calculatedQuote.panels}\nInversión estimada: $${calculatedQuote.estimatedCost.toLocaleString()}\nAhorro mensual: $${calculatedQuote.monthlySavings.toLocaleString()}\nRecuperación: ${calculatedQuote.paybackPeriod} años`;

    const userParams = {
      from_name: formData.name || 'Prospecto',
      from_email: formData.email,
      phone: formData.phone || 'No proporcionado',
      message: `¡Gracias por tu interés! Aquí está tu resumen de cotización:\n\n${summary}`,
      subject: `Tu cotización solar - O3 Energy` ,
      to_email: formData.email,
    } as Record<string, any>;

    const contactParams = {
      from_name: formData.name || 'Prospecto',
      from_email: formData.email,
      phone: formData.phone || 'No proporcionado',
      message: `Nueva solicitud de cotización. Datos del cliente:\n\nNombre: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\nDirección: ${formData.address}\n\nResumen de cotización:\n${summary}`,
      subject: `Nueva solicitud de cotización - ${formData.name}`,
      to_email: contactEmail,
    } as Record<string, any>;

    setIsSending(true);
    try {
      // Enviar cotización al usuario (usa template de cotización si existe, si no, el default con to_email)
      const sendToUser = emailjs.send(serviceId, templateIdQuote, userParams, publicKey);
      // Enviar notificación al correo de contacto
      const sendToContact = emailjs.send(serviceId, templateIdDefault, contactParams, publicKey);
      await Promise.all([sendToUser, sendToContact]);

      setSendStatus({ success: true, message: '¡Cotización enviada! Revisa tu bandeja de entrada.' });
    } catch (err) {
      console.error('Error enviando cotización:', err);
      setSendStatus({ success: false, message: 'No se pudo enviar la cotización. Intenta más tarde.' });
    } finally {
      setIsSending(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center mb-6">¿Dónde instalará sus paneles?</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => handleInputChange('installationType', 'Casa')}
          className={`p-6 rounded-lg border-2 transition-all calculator-button ${
            formData.installationType === 'Casa' 
              ? 'border-[#f36f20] bg-[#f36f20]/10' 
              : 'border-gray-300 hover:border-[#f36f20]/50'
          }`}
        >
          <FaHome className="text-4xl mx-auto mb-3 text-[#f36f20]" />
          <h4 className="font-semibold text-lg text-gray-900">Casa</h4>
          <p className="text-sm text-gray-600">Residencial</p>
        </button>
        
        <button
          onClick={() => handleInputChange('installationType', 'Negocio')}
          className={`p-6 rounded-lg border-2 transition-all calculator-button ${
            formData.installationType === 'Negocio' 
              ? 'border-[#f36f20] bg-[#f36f20]/10' 
              : 'border-gray-300 hover:border-[#f36f20]/50'
          }`}
        >
          <FaBuilding className="text-4xl mx-auto mb-3 text-[#f36f20]" />
          <h4 className="font-semibold text-lg text-gray-900">Negocio</h4>
          <p className="text-sm text-gray-600">Comercial</p>
        </button>
        
        <button
          onClick={() => handleInputChange('installationType', 'Aislado')}
          className={`p-6 rounded-lg border-2 transition-all calculator-button ${
            formData.installationType === 'Aislado' 
              ? 'border-[#f36f20] bg-[#f36f20]/10' 
              : 'border-gray-300 hover:border-[#f36f20]/50'
          }`}
        >
          <FaBolt className="text-4xl mx-auto mb-3 text-[#f36f20]" />
          <h4 className="font-semibold text-lg text-gray-900">Aislado</h4>
          <p className="text-sm text-gray-600">Sin red CFE</p>
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center mb-6">¿Su recibo CFE le llega?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => handleInputChange('billingFrequency', 'Mensual')}
          className={`p-6 rounded-lg border-2 transition-all calculator-button ${
            formData.billingFrequency === 'Mensual' 
              ? 'border-[#f36f20] bg-[#f36f20]/10' 
              : 'border-gray-300 hover:border-[#f36f20]/50'
          }`}
        >
          <h4 className="font-semibold text-lg text-gray-900">Mensual</h4>
        </button>
        
        <button
          onClick={() => handleInputChange('billingFrequency', 'Bimestral')}
          className={`p-6 rounded-lg border-2 transition-all calculator-button ${
            formData.billingFrequency === 'Bimestral' 
              ? 'border-[#f36f20] bg-[#f36f20]/10' 
              : 'border-gray-300 hover:border-[#f36f20]/50'
          }`}
        >
          <h4 className="font-semibold text-lg text-gray-900">Bimestral</h4>
        </button>
      </div>
      
      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-4">Gasto promedio mensual</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['500-1000', '1000-3000', '3000-5000', '5000-7000', '10000-20000', '100000+'].map((range) => (
            <button
              key={range}
              onClick={() => handleInputChange('monthlyConsumption', range)}
              className={`p-3 rounded-lg border-2 transition-all calculator-button text-gray-900 ${
                formData.monthlyConsumption === range 
                  ? 'border-[#f36f20] bg-[#f36f20]/10' 
                  : 'border-gray-300 hover:border-[#f36f20]/50'
              }`}
            >
              ${range}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center mb-6">¿Desea información?</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => handleInputChange('paymentMethod', 'Financiado')}
          className={`p-6 rounded-lg border-2 transition-all calculator-button ${
            formData.paymentMethod === 'Financiado' 
              ? 'border-[#f36f20] bg-[#f36f20]/10' 
              : 'border-gray-300 hover:border-[#f36f20]/50'
          }`}
        >
          <h4 className="font-semibold text-lg text-gray-900">Financiado</h4>
          <p className="text-sm text-gray-600">Meses sin intereses</p>
        </button>
        
        <button
          onClick={() => handleInputChange('paymentMethod', 'Contado')}
          className={`p-6 rounded-lg border-2 transition-all calculator-button ${
            formData.paymentMethod === 'Contado' 
              ? 'border-[#f36f20] bg-[#f36f20]/10' 
              : 'border-gray-300 hover:border-[#f36f20]/50'
          }`}
        >
          <h4 className="font-semibold text-lg text-gray-900">Contado</h4>
          <p className="text-sm text-gray-600">Pago único</p>
        </button>
        
        <button
          onClick={() => handleInputChange('paymentMethod', 'Meses sin Intereses')}
          className={`p-6 rounded-lg border-2 transition-all calculator-button ${
            formData.paymentMethod === 'Meses sin Intereses' 
              ? 'border-[#f36f20] bg-[#f36f20]/10' 
              : 'border-gray-300 hover:border-[#f36f20]/50'
          }`}
        >
          <h4 className="font-semibold text-lg text-gray-900">Meses sin Intereses</h4>
          <p className="text-sm text-gray-600">Financiamiento especial</p>
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-center mb-6">Información de contacto</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f36f20] focus:border-transparent calculator-input"
            placeholder="Tu nombre completo"
            style={{ backgroundColor: 'white', color: '#111827' }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f36f20] focus:border-transparent calculator-input"
            placeholder="(614) 123-4567"
            style={{ backgroundColor: 'white', color: '#111827' }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f36f20] focus:border-transparent calculator-input"
            placeholder="tu@email.com"
            style={{ backgroundColor: 'white', color: '#111827' }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f36f20] focus:border-transparent calculator-input"
            placeholder="Dirección de instalación"
            style={{ backgroundColor: 'white', color: '#111827' }}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Adjuntar recibo CFE (opcional)</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleInputChange('cfeReceipt', e.target.files?.[0] || new File([], ''))}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f36f20] focus:border-transparent calculator-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f36f20] file:text-white hover:file:bg-[#d45e1b]"
          style={{ backgroundColor: 'white', color: '#111827' }}
        />
        <p className="text-sm text-gray-500 mt-1">Tamaño máximo 15 MB (PDF, JPG, PNG)</p>
      </div>
    </div>
  );

  const renderQuote = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">¡Tu cotización está lista!</h3>
        <p className="text-gray-600">Basada en tu consumo de ${formData.monthlyConsumption} mensuales</p>
      </div>
      
      {calculatedQuote && (
        <div className="bg-gradient-to-r from-[#f36f20] to-[#d45e1b] text-white p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">{calculatedQuote.systemSize} kW</div>
              <div className="text-sm opacity-90">Sistema solar</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{calculatedQuote.panels}</div>
              <div className="text-sm opacity-90">Paneles solares</div>
            </div>
            <div>
              <div className="text-3xl font-bold">${calculatedQuote.estimatedCost.toLocaleString()}</div>
              <div className="text-sm opacity-90">Inversión total</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{calculatedQuote.paybackPeriod} años</div>
              <div className="text-sm opacity-90">Recuperación</div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <div className="text-2xl font-bold">Ahorro mensual estimado: ${calculatedQuote.monthlySavings.toLocaleString()}</div>
          </div>
        </div>
      )}
      
      {sendStatus && (
        <div className={`p-3 rounded-md ${sendStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {sendStatus.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleSubmit}
          disabled={isSending}
          className="flex-1 bg-[#f36f20] hover:bg-[#d45e1b] disabled:opacity-60 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          <FaEnvelope className="mr-2" />
          {isSending ? 'Enviando…' : 'Enviar cotización por email'}
        </button>
        
        <button
          onClick={() => window.open('https://wa.me/526141110080?text=Hola, me interesa la cotización solar', '_blank')}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
        >
          <FaWhatsapp className="mr-2" />
          Enviar por WhatsApp
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#f36f20] to-[#d45e1b] text-white p-6 text-center">
        <FaCalculator className="text-4xl mx-auto mb-3" />
        <h2 className="text-3xl font-bold">Cotizador Solar O3 Energy</h2>
        <p className="text-lg opacity-90">¡Haga su propio ejercicio y calcule su ahorro!</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-100 p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Paso {currentStep} de 4</span>
          <span className="text-sm font-medium text-gray-700">{Math.round((currentStep / 4) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-[#f36f20] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {calculatedQuote && renderQuote()}

        {/* Navigation */}
        {!calculatedQuote && (
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed calculator-nav-button text-gray-900"
            >
              Anterior
            </button>
            
            <button
              onClick={nextStep}
              disabled={
                (currentStep === 1 && !formData.installationType) ||
                (currentStep === 2 && (!formData.billingFrequency || !formData.monthlyConsumption)) ||
                (currentStep === 3 && !formData.paymentMethod) ||
                (currentStep === 4 && (!formData.name || !formData.phone || !formData.email))
              }
              className="px-6 py-2 bg-[#f36f20] text-white rounded-lg hover:bg-[#d45e1b] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 4 ? 'Calcular cotización' : 'Siguiente'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolarCalculator;
