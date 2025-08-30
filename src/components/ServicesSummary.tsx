
import React, { useState, useEffect, useRef } from 'react';

const CompassIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L8 6l4 14 4-14-4-4z"></path></svg>
);

const CogIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001.51 1H15a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path></svg>
);

const HardHatIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2c-3.31 0-6 2.69-6 6 0 1.55.58 2.96 1.5 4L4 20h16l-3.5-8A5.94 5.94 0 0018 8c0-3.31-2.69-6-6-6z"></path></svg>
);

interface Service {
    icon: React.ElementType;
    title: string;
    description: string;
}

const services: Service[] = [
    {
        icon: CompassIcon,
        title: 'Selección y Análisis de Sitios',
        description: 'Identificamos y aseguramos ubicaciones óptimas para proyectos solares, realizando análisis exhaustivos de viabilidad técnica y financiera.'
    },
    {
        icon: CogIcon,
        title: 'Ingeniería y Diseño',
        description: 'Nuestro equipo de ingeniería diseña sistemas solares y de almacenamiento personalizados y de alto rendimiento, optimizados para la máxima producción y longevidad.'
    },
    {
        icon: HardHatIcon,
        title: 'Gestión de Construcción',
        description: 'Supervisamos cada fase del proceso de construcción, garantizando que los proyectos se completen a tiempo, dentro del presupuesto y con los más altos estándares de calidad.'
    }
];

const ServiceCard: React.FC<Service> = ({ icon: Icon, title, description }) => {
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
        <div ref={cardRef} className={`bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center transform transition-all duration-700 ease-out hover:shadow-2xl hover:!translate-y-[-8px] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-o3-green/10 text-o3-green rounded-full p-4 mb-6">
                <Icon className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-o3-dark-gray mb-4">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
};

const ServicesSummary: React.FC = () => {
    return (
        <section id="services" className="py-20 lg:py-32 bg-o3-light-gray">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-o3-dark-gray">Lo Que Hacemos</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Ofrecemos soluciones integrales para el desarrollo de energía renovable a gran escala.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServicesSummary;
