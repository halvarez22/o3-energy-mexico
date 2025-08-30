
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

// Función para obtener la ruta base sin el hash
const getBasePath = (path: string) => {
  return path.split('#')[0];
};

// Función para verificar si la ruta actual coincide con el enlace
const isActiveLink = (currentPath: string, linkHref: string) => {
  if (linkHref.startsWith('#')) {
    return getBasePath(currentPath) === '/' && window.location.hash === linkHref;
  }
  return currentPath === linkHref;
};

// Función para manejar la navegación a secciones
const handleSectionNavigation = (e: React.MouseEvent, href: string) => {
  if (href.startsWith('#')) {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100, // Ajuste para el header fijo
        behavior: 'smooth'
      });
      // Actualizar la URL sin recargar la página
      window.history.pushState(null, '', `${window.location.pathname}${href}`);
    }
  }
};

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0F0F0F]/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-[#f36f20] flex items-center">
          <span>O3</span>
          <span className="text-white"> ENERGY MEXICO</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive = isActiveLink(location.pathname, link.href);
            const className = `transition-colors duration-300 font-medium ${
              isActive ? 'text-[#f36f20]' : 'text-white hover:text-[#f36f20]'
            }`;

            return link.href.startsWith('#') ? (
              <a 
                key={link.href} 
                href={link.href} 
                className={className}
                onClick={(e) => {
                  if (location.pathname !== '/') {
                    window.location.href = `/${link.href}`;
                  } else {
                    handleSectionNavigation(e, link.href);
                  }
                }}
              >
                {link.label}
              </a>
            ) : (
              <Link 
                key={link.href} 
                to={link.href} 
                className={className}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    )}
                </svg>
            </button>
        </div>
      </div>
      {isMenuOpen && (
          <div className="md:hidden bg-[#0F0F0F]">
              <nav className="flex flex-col items-center space-y-4 py-4">
                  {NAV_LINKS.map((link) => {
                      const isActive = isActiveLink(location.pathname, link.href);
                      const className = `transition-colors duration-300 font-medium block py-2 ${
                        isActive ? 'text-[#f36f20]' : 'text-white hover:text-[#f36f20]'
                      }`;

                      return link.href.startsWith('#') ? (
                          <a 
                              key={link.href} 
                              href={link.href} 
                              onClick={(e) => {
                                  e.preventDefault();
                                  setIsMenuOpen(false);
                                  if (location.pathname !== '/') {
                                      window.location.href = `/${link.href}`;
                                  } else {
                                    handleSectionNavigation(e, link.href);
                                  }
                              }}
                              className={className}
                          >
                              {link.label}
                          </a>
                      ) : (
                          <Link 
                              key={link.href} 
                              to={link.href} 
                              onClick={() => setIsMenuOpen(false)} 
                              className={className}
                          >
                              {link.label}
                          </Link>
                      );
                  })}
              </nav>
          </div>
      )}
    </header>
  );
};

export default Header;
