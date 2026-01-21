
import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Team from './components/Team';
import Locations from './components/Locations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatbotWidget from './components/Chatbot/ChatbotWidget';
import WhatsAppButton from './components/WhatsAppButton';

// Code Splitting: Carga dinámica de componentes de página
const ProjectsPage = lazy(() => import('./components/ProjectsPage'));
const EnergySolutionsPage = lazy(() => import('./components/EnergySolutionsPage'));
const EPCSolarPage = lazy(() => import('./components/EPCSolarPage'));
const SolarProjectDevelopmentPage = lazy(() => import('./components/SolarProjectDevelopmentPage'));
const SolarInstallationPage = lazy(() => import('./components/SolarInstallationPage'));
const SolarFinancingPage = lazy(() => import('./components/SolarFinancingPage'));
const SolarMaintenancePage = lazy(() => import('./components/SolarMaintenancePage'));
const EnergyEfficiencyPage = lazy(() => import('./components/EnergyEfficiencyPage'));
const CalculatorPage = lazy(() => import('./components/CalculatorPage'));

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si no hay un hash, desplázate al inicio de la página
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // Si hay un hash, encuentra el elemento y haz scroll hacia él
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
};

const Home: React.FC = () => {
  const { hash } = useLocation();
  
  useEffect(() => {
    // Manejar el scroll al cargar la página con un hash
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        // Pequeño retraso para asegurar que el DOM esté listo
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Team />
      <Locations />
      <Contact />
    </>
  );
};

const App: React.FC = () => {
  return (
    <div className="bg-[#0F0F0F] text-white">
      <ScrollToTop />
      <Header />
      <main>
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Cargando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proyectos" element={<ProjectsPage />} />
            <Route path="/cotizador" element={<CalculatorPage />} />
            <Route path="/soluciones-energeticas" element={<EnergySolutionsPage />} />
            <Route path="/soluciones-energeticas/epc-solar" element={<EPCSolarPage />} />
            <Route path="/soluciones-energeticas/desarrollo-proyectos" element={<SolarProjectDevelopmentPage />} />
            <Route path="/soluciones-energeticas/instalacion-solar" element={<SolarInstallationPage />} />
            <Route path="/soluciones-energeticas/financiamiento" element={<SolarFinancingPage />} />
            <Route path="/soluciones-energeticas/mantenimiento" element={<SolarMaintenancePage />} />
            <Route path="/soluciones-energeticas/eficiencia-energetica" element={<EnergyEfficiencyPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      
      {/* Chatbot Widget */}
      <ChatbotWidget />
      <WhatsAppButton />
    </div>
  );
};

export default App;
