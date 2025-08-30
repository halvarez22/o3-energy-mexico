
import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 md:py-32 bg-[#121212]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">Nuestros Proyectos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROJECTS_DATA.slice(0, 4).map((project, index) => (
            <div key={index} className="bg-[#1a1a1a] rounded-lg overflow-hidden group">
              <img 
                src={project.image} 
                alt={project.name} 
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#f36f20]">{project.name}</h3>
                <p className="text-gray-400 mt-1">{project.location}</p>
                <p className="mt-2 text-white font-semibold">{project.capacity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link 
            to="/proyectos" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#f36f20] hover:bg-[#d45e1b] transition-colors duration-300"
          >
            Ver todos los proyectos
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
