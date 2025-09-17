import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { projects } from '../data/projects';
import { FaSearch, FaFilter, FaArrowRight, FaArrowLeft, FaArrowCircleRight } from 'react-icons/fa';

const ProjectsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  // Obtener categorías únicas
  const categories = ['Todos', ...new Set(projects.map(project => project.category))];

  // Filtrar proyectos por búsqueda y categoría
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'Todos' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(location.pathname === '/');
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Botón de regreso */}
      {!isHomePage && (
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
      )}
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-[#022240] text-white pt-32 pb-20 -mt-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Proyectos Solares</h1>
        </div>
      </div>

      {/* Introducción */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestros Proyectos y Casos de Estudio</h2>
            <p className="text-xl text-gray-600 mb-8">
              Desde 2011, hemos proporcionado soluciones de energía renovable y servicios de soporte en toda América del Norte y las Islas del Pacífico. 
              Tómese un momento para ver la prueba del impacto positivo que hemos tenido con nuestros clientes.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Hemos construido nuestra reputación como uno de los principales desarrolladores solares de la nación y el desarrollador solar comercial número uno en México, 
              haciendo que la energía limpia sea asequible y disponible para todos. Desde pequeña generación solar distribuida hasta plantas solares a escala 
              comercial, O3 Energy® tiene el conocimiento y las herramientas para ejecutar sistemas de energía solar de casi cualquier tamaño.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link 
                to="/soluciones-energeticas" 
                className="bg-[#f36f20] hover:bg-[#d45e1b] text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center"
              >
                Ver Nuestras Soluciones <FaArrowCircleRight className="ml-2" />
              </Link>
              <Link 
                to="/contacto" 
                className="border-2 border-[#022240] text-[#022240] hover:bg-[#022240] hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar proyectos..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f36f20] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f36f20] focus:border-transparent appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'Solar' ? 'Energía Solar' : 
                     category === 'Eólico' ? 'Energía Eólica' : 
                     'Todas las categorías'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Lista de Proyectos */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={project.image}
                      alt={`${project.title} - ${project.location}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                        <p className="text-gray-200">{project.location}</p>
                        <p className="text-[#f36f20] font-semibold mt-2">{project.capacity}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{project.title}</h3>
                        <p className="text-gray-600">{project.location}</p>
                      </div>
                      <span className={`inline-block text-xs px-3 py-1 rounded-full ${
                        project.category === 'Solar' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {project.category}
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="text-2xl font-bold text-[#022240]">{project.capacity}</span>
                      {project.description && (
                        <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                          {project.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-6">
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-700">No se encontraron proyectos que coincidan con tu búsqueda.</h3>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todos');
                }}
                className="mt-4 text-[#f36f20] hover:underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sección de CTA */}
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
              Solicitar Cotización
            </Link>
            <Link 
              to="/soluciones-energeticas" 
              className="border-2 border-white text-white hover:bg-white hover:text-[#022240] px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Ver Soluciones
            </Link>
          </div>
          <a 
            href="#contact" 
            className="inline-block bg-[#022240] hover:bg-blue-900 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
