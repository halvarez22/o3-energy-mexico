
import { NavLink, Service, Project, TeamMember, SocialLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { href: '#about', label: 'Sobre O3' },
  { href: '/soluciones-energeticas', label: 'Soluciones' },
  { href: '/cotizador', label: 'Cotizador' },
  { href: '#services', label: 'Servicios' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#team', label: 'Equipo' },
  { href: '#contact', label: 'Contacto' },
];

export const SERVICES_DATA: Service[] = [
  {
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#A4E834]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.443V21a1 1 0 11-2 0v-2.557a3.374 3.374 0 00-.73-.242l-.548-.547z" />
        </svg>
    ),
    title: 'Desarrollo',
    description: 'Nos especializamos en el desarrollo de proyectos de energía renovable a gran escala en México, desde la concepción hasta la operación.',
  },
  {
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#A4E834]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0121 10c0 3-1.5 6-4.343 8.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 21a8.003 8.003 0 008.157-5.657" />
        </svg>
    ),
    title: 'Construcción',
    description: 'Contamos con un equipo de profesionales con experiencia para la construcción de nuestros proyectos, asegurando la más alta calidad y seguridad.',
  },
  {
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#A4E834]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    title: 'Operación y Mantenimiento',
    description: 'Nos encargamos de la operación y mantenimiento de todos nuestros proyectos, optimizando su rendimiento y garantizando la máxima producción de energía.',
  },
];

export const PROJECTS_DATA: Project[] = [
    { image: "/images/volkswagen-solar-project.jpg", name: "Volkswagen Solar Project", location: "Richmond, CA", capacity: "116 KW" },
    { image: "/images/holiday-inn-solar.jpg", name: "Holiday Inn Solar Installation", location: "Dripping Springs, TX", capacity: "80.7 KW" },
    { image: "/images/chase-bank-solar.jpg", name: "Chase Bank Solar Project", location: "Denton, TX", capacity: "50 KW" },
    { image: "/images/murrieta-solar-farm.jpg", name: "City of Murrieta Solar Farm", location: "Murrieta, CA", capacity: "503 KW" },
];

export const TEAM_DATA: TeamMember[] = [
    { image: "/images/team/Brad Stutzman.jpeg", name: "Brad Stutzman", title: "CEO" },
    { image: "/images/team/Brenda Aguirre.jpeg", name: "Brenda Aguirre", title: "Directora Chihuahua" },
    { image: "/images/team/David Santoyo.jpeg", name: "David Santoyo", title: "Representante Legal y Director de Operaciones" },
    { image: "/images/team/Alejandro Velasco.jpeg", name: "Alejandro Velasco", title: "Presidente" },
    { image: "/images/team/Jesus Morales.jpg", name: "Jesús Morales", title: "Chief Technology Officer" },
];

export const SOCIAL_LINKS: SocialLink[] = [
    { href: "#", icon: <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-current h-5 w-5"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg> },
];

