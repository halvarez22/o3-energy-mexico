import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { projects } from '../data/projects';
import { FaSearch, FaFilter, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

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
      <div className="relative bg-gradient-to-r from-green-700 to-green-900 text-white pt-32 pb-20 -mt-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Proyectos Solares</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Descubre nuestros proyectos de energía solar realizados en Norteamérica y las Islas del Pacífico.
          </p>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar proyectos..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de Proyectos */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.location}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-600 text-sm">Ubicación</p>
                      <p className="font-medium">{project.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 text-sm">Capacidad</p>
                      <p className="font-bold text-green-600">{project.capacity}</p>
                    </div>
                  </div>
                  <button className="mt-4 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Ver detalles <FaArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">No se encontraron proyectos que coincidan con tu búsqueda</h3>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('Todos');
              }}
              className="mt-4 text-green-600 hover:underline"
            >
              Mostrar todos los proyectos
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para tu propio proyecto solar?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Contáctanos hoy mismo para una consulta gratuita y descubre cómo podemos ayudarte a hacer la transición a energía limpia.
          </p>
          <a 
            href="#contact" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
