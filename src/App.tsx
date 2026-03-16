import { useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ContentProvider, useContent } from './context/ContentContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import SEO from './components/SEO';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/AdminDashboard';
import MobileBottomMenu from './components/MobileBottomMenu';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';

function MainContent({ onOpenLogin }: { onOpenLogin: () => void }) {
  const { content } = useContent();
  const location = useLocation();

  return (
    <>
      <SEO 
        title={content.seo.title} 
        description={content.seo.description}
        keywords={content.seo.keywords}
      />
      <div className="font-sans antialiased text-tre-dark bg-tre-cream selection:bg-tre-gold selection:text-tre-dark pb-16 md:pb-0">
        <Header />
        <main>
          <Hero />
          <About />
        </main>
        {location.pathname !== '/' && <Footer onOpenLogin={onOpenLogin} />}
      </div>
    </>
  );
}

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <ContentProvider>
      <HelmetProvider>
        <Router>
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/menu" element={<MenuPage onOpenLogin={() => setIsLoginOpen(true)} />} />
            <Route path="/about" element={<AboutPage onOpenLogin={() => setIsLoginOpen(true)} />} />
            <Route path="/" element={<MainContent onOpenLogin={() => setIsLoginOpen(true)} />} />
          </Routes>
          <MobileBottomMenu />
          <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </Router>
      </HelmetProvider>
    </ContentProvider>
  );
}
