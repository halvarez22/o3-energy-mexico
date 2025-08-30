import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobeAmericas } from 'react-icons/fa';

const Locations: React.FC = () => {
  const locations = [
    {
      id: 1,
      title: 'Dallas, Texas, HQ',
      address: 'Republic Tower 325 N. St. Paul St., Suite 4550',
      city: 'Dallas, TX 75201',
      phone: '+1 (214) 432-2000',
      email: 'info@o3energy.com',
      mapUrl: 'https://goo.gl/maps/zYkh8hGMVyR2TYBX8',
      image: '/images/dallas-320w.avif'
    },
    {
      id: 2,
      title: 'San Francisco, California',
      address: '71 Stevenson St., Suite 400',
      city: 'San Francisco, CA 94105',
      phone: '+1 (415) 200-3000',
      email: 'sf@o3energy.com',
      mapUrl: 'https://goo.gl/maps/LMC5VW8mbuMsYHbd6',
      image: '/images/san_francisco-320w.avif'
    },
    {
      id: 3,
      title: 'México',
      address: 'Calle Misión de San Cristóbal 5918, Fraccionamiento El Campanario',
      city: 'CP 31213 Chihuahua, Chihuahua',
      phone: '+52 614 775 6600 / +52 614 775 6606',
      email: 'contacto@o3mexico.com',
      mapUrl: 'https://www.google.com/maps/place/Calle+Misi%C3%B3n+de+San+Crist%C3%B3bal+5918,+El+Campanario,+31213+Chihuahua,+Chih./@28.6353,-106.0889,17z/data=!3m1!4b1!4m6!3m5!1s0x86ea5d8f5a9d2b6e1f:0x1c3b9d8e4e9e8b1a5!8m2!3d28.6353!4d-106.0889!16s%2Fg%2F11h5q5q5q5?entry=ttu',
      image: '/images/energía-solar-en-un-ambiente-320w.avif'
    },
    {
      id: 4,
      title: 'Marianas',
      address: '127 Chalan Pasaheru',
      city: 'Tamuning, GU',
      phone: '+1 (671) 300-4000',
      email: 'marianas@o3energy.com',
      mapUrl: 'https://goo.gl/maps/vRxxvFSQteia2nbb8',
      image: '/images/marianas-320w.avif'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nuestras Ubicaciones</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Con presencia en múltiples ubicaciones en América del Norte, estamos listos para atender tus necesidades de energía solar dondequiera que estés.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {locations.map((location) => (
            <div key={location.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img 
                  src={location.image} 
                  alt={location.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{location.title}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-[#f36f20] mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-gray-700">{location.address}</p>
                      <p className="text-gray-700">{location.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaPhone className="text-[#f36f20] mr-3 flex-shrink-0" />
                    <a href={`tel:${location.phone.replace(/\D/g, '')}`} className="text-gray-700 hover:text-[#f36f20] transition-colors">
                      {location.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <FaEnvelope className="text-[#f36f20] mr-3 flex-shrink-0" />
                    <a href={`mailto:${location.email}`} className="text-gray-700 hover:text-[#f36f20] transition-colors">
                      {location.email}
                    </a>
                  </div>
                  
                  <div className="pt-2">
                    <a 
                      href={location.mapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#f36f20] font-medium hover:underline"
                    >
                      <FaGlobeAmericas className="mr-2" />
                      Ver en el mapa
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Listo para hablar sobre tu proyecto de energía solar?</h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestro equipo está listo para ayudarte a encontrar la mejor solución de energía renovable para tus necesidades.
          </p>
          <a 
            href="#contact" 
            className="inline-block bg-[#f36f20] hover:bg-[#d45e1b] text-white font-bold py-3 px-8 rounded-md transition-colors duration-300"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  );
};

export default Locations;
