
import { useEffect, Suspense, lazy, useState } from 'react';
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
const EnergyStoragePage = lazy(() => import('./components/EnergyStoragePage'));
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

const WarningPage: React.FC = () => {
  const [showImage, setShowImage] = useState(true);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#0F0F0F] text-white">
      <div className="w-full max-w-3xl text-center">
        {showImage ? (
          <img
            src="/images/warning_1774971664.png"
            alt="Cuenta con pago pendiente"
            className="w-full h-auto rounded-xl shadow-2xl"
            onError={() => setShowImage(false)}
          />
        ) : (
          <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-8">
            <h1 className="text-3xl font-bold text-yellow-300">Pago pendiente</h1>
            <p className="mt-3 text-lg text-yellow-100">
              Tu cuenta presenta un adeudo. Realiza tu pago para reactivar el acceso.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const App: React.FC = () => {
  // Modo prueba: forzamos warning al entrar sin integrar pasarela.
  const FORCE_WARNING_PAGE = true;

  return (
    <div className="bg-[#0F0F0F] text-white">
      <ScrollToTop />
      {!FORCE_WARNING_PAGE && <Header />}
      <main>
        {FORCE_WARNING_PAGE ? (
          <WarningPage />
        ) : (
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
              <Route path="/soluciones-energeticas/almacenamiento-energia" element={<EnergyStoragePage />} />
            </Routes>
          </Suspense>
        )}
      </main>
      {!FORCE_WARNING_PAGE && <Footer />}

      {/* Chatbot Widget */}
      {!FORCE_WARNING_PAGE && <ChatbotWidget />}
      {!FORCE_WARNING_PAGE && <WhatsAppButton />}
    </div>
  );
};

export default App;
