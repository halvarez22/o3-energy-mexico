
import React from 'react';
import { NAV_LINKS, SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A0A0A] text-gray-400 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-black text-[#f36f20]">
              O3<span className="text-white">ENERGY</span>
            </h3>
            <p className="mt-2">Liderando la transición energética en México.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-3">Navegación</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-[#f36f20] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-3">Síguenos</h4>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social, index) => (
                <a key={index} href={social.href} className="text-gray-400 hover:text-[#A4E834] transition-colors">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>Powered by pai-b &copy; {new Date().getFullYear()}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
