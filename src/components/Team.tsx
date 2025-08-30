
import React from 'react';
import { TEAM_DATA } from '../constants';

const Team: React.FC = () => {
  return (
    <section id="team" className="py-20 md:py-32 bg-[#0F0F0F]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_DATA.map((member, index) => (
            <div key={index} className="group relative bg-[#1A1A1A] rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#f36f20]/20">
              <div className="relative w-40 h-40 mx-auto mb-6 overflow-hidden rounded-full border-4 border-[#f36f20]/50 group-hover:border-[#f36f20] transition-all duration-300">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://ui-avatars.com/api/?name=' + member.name.replace(/\s+/g, '+') + '&background=random';
                  }}
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-[#f36f20] font-medium">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
