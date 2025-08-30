
import React, { useState, useEffect, useRef } from 'react';

interface Project {
  title: string;
  location: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    title: 'Parque Solar Sonora',
    location: 'Sonora, México',
    imageUrl: '/images/content/project-sonora.jpg'
  },
  {
    title: 'Planta Fotovoltaica Jalisco',
    location: 'Jalisco, México',
    imageUrl: '/images/content/project-jalisco.jpg'
  },
  {
    title: 'Granja Solar Chihuahua',
    location: 'Chihuahua, México',
    imageUrl: '/images/content/project-chihuahua.jpg'
  },
  {
    title: 'Proyecto Eólico Oaxaca',
    location: 'Oaxaca, México',
    imageUrl: '/images/content/project-oaxaca.jpg'
  },
  {
    title: 'Almacenamiento en Baterías',
    location: 'Nuevo León, México',
    imageUrl: '/images/content/project-baterias.jpg'
  }
];

const ProjectCard: React.FC<Project> = ({ title, location, imageUrl }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = cardRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div ref={cardRef} className={`relative flex-shrink-0 w-80 md:w-96 h-96 rounded-lg overflow-hidden shadow-lg group transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-gray-300">{location}</p>
            </div>
        </div>
    );
};

const FeaturedProjects: React.FC = () => {
  return (
    <section id="projects" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-o3-dark-gray">Proyectos Destacados</h2>
          <a href="#" className="hidden md:inline-block text-o3-blue font-semibold hover:text-o3-green transition-colors">
            Ver Todos los Proyectos &rarr;
          </a>
        </div>
      </div>
      <div className="pl-6 container mx-auto">
        <div className="flex space-x-8 overflow-x-auto pb-8 -mb-8">
            {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
            ))}
            {/* Add a spacer at the end */}
            <div className="flex-shrink-0 w-1"></div>
        </div>
      </div>
      <div className="text-center mt-12 md:hidden">
          <a href="#" className="text-o3-blue font-semibold hover:text-o3-green transition-colors">
            Ver Todos los Proyectos &rarr;
          </a>
      </div>
    </section>
  );
};

export default FeaturedProjects;
