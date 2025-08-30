
import React, { useState, useEffect, useRef } from 'react';

interface NewsArticle {
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
}

const articles: NewsArticle[] = [
  {
    title: 'México alcanza nuevo récord de capacidad solar instalada en 2024',
    date: '15 de Julio, 2024',
    excerpt: 'El país ha superado los 10 GW de capacidad solar, consolidando su posición como líder en energías renovables en América Latina.',
    imageUrl: '/images/content/news-1.jpg'
  },
  {
    title: 'La importancia del almacenamiento de energía para la red eléctrica',
    date: '2 de Julio, 2024',
    excerpt: 'Expertos discuten cómo las baterías a gran escala son cruciales para garantizar la estabilidad de la red con la creciente penetración de renovables.',
    imageUrl: '/images/content/news-2.jpg'
  },
  {
    title: 'O3 Energy Mexico firma acuerdo para un nuevo proyecto en Baja California',
    date: '20 de Junio, 2024',
    excerpt: 'El nuevo parque solar de 150 MW abastecerá de energía limpia a miles de hogares y empresas en la región.',
    imageUrl: '/images/content/news-3.jpg'
  }
];

const NewsCard: React.FC<NewsArticle> = ({ title, date, excerpt, imageUrl }) => {
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
        <div ref={cardRef} className={`bg-white rounded-lg shadow-md overflow-hidden group transform transition-all duration-700 ease-out hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="overflow-hidden h-56">
                <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" decoding="async" />
            </div>
            <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{date}</p>
                <h3 className="text-xl font-bold text-o3-dark-gray mb-3 h-20">{title}</h3>
                <p className="text-gray-600 mb-4 h-24 overflow-hidden">{excerpt}</p>
                <a href="#" className="font-semibold text-o3-blue hover:text-o3-green transition-colors">Leer Más &rarr;</a>
            </div>
        </div>
    );
};


const NewsSummary: React.FC = () => {
    return (
        <section id="news" className="py-20 lg:py-32 bg-o3-light-gray">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-o3-dark-gray">Últimas Noticias</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Manténgase informado sobre las últimas tendencias y noticias del sector energético.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <NewsCard key={index} {...article} />
                    ))}
                </div>
                <div className="text-center mt-16">
                     <a href="#" className="text-white bg-o3-blue hover:bg-o3-green font-bold py-3 px-8 rounded-full transition-colors">
                        Ver Más Noticias
                    </a>
                </div>
            </div>
        </section>
    );
};

export default NewsSummary;
