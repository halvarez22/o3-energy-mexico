
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaMapPin } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);

  const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido'),
    email: Yup.string().email('Correo electrónico inválido').required('El correo es requerido'),
    phone: Yup.string().matches(/^[0-9\s+\-()]*$/, 'Número de teléfono inválido'),
    message: Yup.string().required('El mensaje es requerido').min(10, 'El mensaje debe tener al menos 10 caracteres'),
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Configuración de EmailJS desde variables de entorno
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
      const toEmail = (import.meta.env.VITE_EMAILJS_TO_EMAIL as string | undefined) || undefined;

      if (!serviceId || !templateId || !publicKey) {
        setSubmitStatus({
          success: false,
          message: 'Configuración incompleta de EmailJS. Por favor, verifica las variables de entorno.'
        });
        return;
      }
      
      const templateParams = {
        from_name: values.name,
        from_email: values.email,
        phone: values.phone || 'No proporcionado',
        message: values.message,
        subject: `Nuevo mensaje de contacto - ${values.name}`,
        ...(toEmail ? { to_email: toEmail } : {}),
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus({
        success: true,
        message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.'
      });
      resetForm();
    } catch (error) {
      console.error('Error al enviar email:', error);
      setSubmitStatus({
        success: false,
        message: 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Coordenadas de la oficina en Chihuahua
  const officeLocation = {
    lat: 28.6353,
    lng: -106.0889,
    address: 'Calle Misión de San Cristóbal 5918',
    city: 'Fraccionamiento El Campanario, CP 31213 Chihuahua, Chih.',
    phone: '+52 614 775 6600 / +52 614 775 6606',
    email: 'contacto@o3mexico.com'
  };

  // URL del mapa de Google Maps con la ubicación
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.1234567890123!2d${officeLocation.lng}!3d${officeLocation.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ea5d8f5a9d2b6e1f%3A0x1c3b9d8e4e9e8b1a5!2sCalle%20Misi%C3%B3n%20de%20San%20Crist%C3%B3bal%205918%2C%20Fraccionamiento%20El%20Campanario%2C%2031213%20Chihuahua%2C%20Chih.!5e0!3m2!1ses-419!2smx!4v1620000000000!5m2!1ses-419!2smx`;

  return (
    <section id="contact" className="py-20 md:py-32 bg-[#121212]">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Contacto</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Contáctanos para más información sobre nuestros servicios de energía solar.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-[#1E1E1E] p-8 rounded-xl shadow-xl">
              <h3 className="text-2xl font-bold text-[#f36f20] mb-6 flex items-center">
                <FaMapPin className="mr-2" /> Oficina México
              </h3>
              
              <div className="space-y-5">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-[#f36f20] mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">{officeLocation.address}</p>
                    <p className="text-gray-300">{officeLocation.city}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <FaPhone className="text-[#f36f20] mr-3 flex-shrink-0" />
                  <a 
                    href={`tel:${officeLocation.phone.replace(/\D/g, '')}`} 
                    className="text-gray-300 hover:text-[#f36f20] transition-colors text-lg"
                  >
                    {officeLocation.phone}
                  </a>
                </div>
                
                <div className="flex items-center">
                  <FaEnvelope className="text-[#f36f20] mr-3 flex-shrink-0" />
                  <a 
                    href={`mailto:${officeLocation.email}`} 
                    className="text-gray-300 hover:text-[#f36f20] transition-colors text-lg"
                  >
                    {officeLocation.email}
                  </a>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-800">
                <h4 className="text-lg font-semibold text-gray-100 mb-3">Horario de atención</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex justify-between">
                    <span>Lunes - Viernes:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sábado:</span>
                    <span>9:00 AM - 2:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Domingo:</span>
                    <span>Cerrado</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-xl">
              <iframe
                src={mapUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="w-full h-80"
                title="Ubicación de la oficina en el mapa"
              ></iframe>
              <div className="bg-[#1E1E1E] p-4 text-center">
                <a 
                  href={`https://www.google.com/maps/dir//${officeLocation.lat},${officeLocation.lng}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#f36f20] hover:underline flex items-center justify-center"
                >
                  <FaMapMarkerAlt className="mr-2" />
                  Cómo llegar
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1E1E1E] p-8 rounded-lg shadow-2xl">
            <h3 className="text-2xl font-bold text-[#f36f20] mb-6">Envíanos un mensaje</h3>
            
            <Formik
              initialValues={{ name: '', email: '', phone: '', message: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-6">
                  {submitStatus && (
                    <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                      Nombre completo *
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className={`w-full px-4 py-3 bg-[#2D2D2D] border ${errors.name && touched.name ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#f36f20] text-white`}
                      placeholder="Tu nombre"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-400 text-sm mt-1" />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                      Correo electrónico *
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className={`w-full px-4 py-3 bg-[#2D2D2D] border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#f36f20] text-white`}
                      placeholder="tu@email.com"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">
                      Teléfono (opcional)
                    </label>
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      className={`w-full px-4 py-3 bg-[#2D2D2D] border ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#f36f20] text-white`}
                      placeholder="+52 (__) ____ ____"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-400 text-sm mt-1" />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                      Mensaje *
                    </label>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      rows={5}
                      className={`w-full px-4 py-3 bg-[#2D2D2D] border ${errors.message && touched.message ? 'border-red-500' : 'border-gray-700'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#f36f20] text-white`}
                      placeholder="¿En qué podemos ayudarte?"
                    />
                    <ErrorMessage name="message" component="div" className="text-red-400 text-sm mt-1" />
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#f36f20] hover:bg-[#d45e1b] text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </>
                      ) : 'Enviar mensaje'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
