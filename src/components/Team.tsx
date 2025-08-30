
import React from 'react';
import { TEAM_DATA } from '../constants';

const Team: React.FC = () => {
  return (
    <section id="team" className="py-20 md:py-32 bg-[#0F0F0F]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">Nuestro Equipo</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {TEAM_DATA.map((member, index) => (
            <div key={index} className="text-center">
              <img src={member.image} alt={member.name} className="w-48 h-48 mx-auto rounded-full object-cover mb-4 border-4 border-[#f36f20]/50" />
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="text-[#f36f20]">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
