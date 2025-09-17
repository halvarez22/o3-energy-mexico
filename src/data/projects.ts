interface Project {
  id: number;
  title: string;
  location: string;
  capacity: string;
  image: string;
  category: string;
  description?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Volkswagen Solar Project',
    location: 'Richmond, CA',
    capacity: '116 KW',
    image: '/images/volkswagen-solar-project.jpg',
    category: 'Commercial Solar',
    description: 'Sistema solar comercial para Volkswagen en Richmond, California, demostrando nuestro compromiso con la energía limpia en el sector automotriz.'
  },
  {
    id: 2,
    title: 'Holiday Inn Solar Installation',
    location: 'Dripping Springs, TX',
    capacity: '80.7 KW',
    image: '/images/holiday-inn-solar.jpg',
    category: 'Commercial Solar',
    description: 'Instalación solar para Holiday Inn en Dripping Springs, Texas, reduciendo costos operativos y huella de carbono del hotel.'
  },
  {
    id: 3,
    title: 'Chase Bank Solar Project',
    location: 'Denton, TX',
    capacity: '50 KW',
    image: '/images/chase-bank-solar.jpg',
    category: 'Commercial Solar',
    description: 'Proyecto solar para Chase Bank en Denton, Texas, contribuyendo a la sostenibilidad del sector financiero.'
  },
  {
    id: 4,
    title: 'City of Murrieta Solar Farm',
    location: 'Murrieta, CA',
    capacity: '503 KW',
    image: '/images/murrieta-solar-farm.jpg',
    category: 'Government Solar',
    description: 'Proyecto solar municipal para la Ciudad de Murrieta, California, uno de nuestros proyectos gubernamentales más grandes.'
  },
  {
    id: 5,
    title: 'New Hope Church Solar',
    location: 'Hilo, HI',
    capacity: '113 KW',
    image: '/images/new-hope-church-solar.jpg',
    category: 'Nonprofit Solar',
    description: 'Instalación solar para New Hope Church en Hilo, Hawaii, apoyando a organizaciones sin fines de lucro con energía limpia.'
  },
  {
    id: 6,
    title: 'Hillside Memorial Solar',
    location: 'Culver City, CA',
    capacity: '338 KW',
    image: '/images/hillside-memorial-solar.jpg',
    category: 'Commercial Solar',
    description: 'Proyecto solar para Hillside Memorial en Culver City, California, combinando sostenibilidad con servicios memoriales.'
  },
  {
    id: 7,
    title: 'Hyundai Solar Installation',
    location: 'Richmond, CA',
    capacity: '45 KW',
    image: '/images/hyundai-solar.jpg',
    category: 'Commercial Solar',
    description: 'Sistema solar para Hyundai en Richmond, California, fortaleciendo nuestro portafolio en el sector automotriz.'
  },
  {
    id: 8,
    title: 'Guam Resorts Solar Project',
    location: 'Tamuning, Guam',
    capacity: '445 KW',
    image: '/images/guam-resorts-solar.jpg',
    category: 'Commercial Solar',
    description: 'Proyecto solar para Guam Resorts en Tamuning, Guam, expandiendo nuestra presencia en las Islas del Pacífico.'
  },
  {
    id: 9,
    title: 'Church on the Way Solar',
    location: 'Santa Clarita, CA',
    capacity: '139 KW',
    image: '/images/church-on-the-way-solar.jpg',
    category: 'Nonprofit Solar',
    description: 'Instalación solar para Church on the Way en Santa Clarita, California, apoyando a la comunidad religiosa con energía renovable.'
  }
];