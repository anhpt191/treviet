import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useContent } from '../context/ContentContext';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const { content } = useContent();
  const { hero, contact } = content;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Restaurant', href: '/about' },
    { name: 'Menu', href: '/menu' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/' ? 'bg-tre-dark/95 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex flex-col">
              {hero.logoImage ? (
                <img 
                  src={hero.logoImage} 
                  alt={hero.title} 
                  className="h-8 w-auto object-contain mb-1" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className={`font-serif text-2xl font-bold tracking-wider transition-colors ${isScrolled || location.pathname !== '/' ? 'text-tre-cream' : 'text-white'}`}>
                  {hero.title}
                </span>
              )}
              <span className={`text-[10px] uppercase tracking-[0.2em] ${isScrolled || location.pathname !== '/' ? 'text-tre-gold' : 'text-tre-cream/80'}`}>
                {hero.subtitle}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm uppercase tracking-widest font-medium transition-colors hover:text-tre-gold ${
                  isScrolled || location.pathname !== '/' ? 'text-tre-cream' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
              className="px-6 py-2 border border-tre-gold text-tre-gold hover:bg-tre-gold hover:text-tre-dark transition-all duration-300 uppercase text-xs tracking-widest font-bold"
            >
              Hotline
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-tre-dark z-50 md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-white/10">
                <span className="font-serif text-xl font-bold text-tre-cream">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col p-4 space-y-4 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-tre-cream hover:text-tre-gold py-3 uppercase tracking-widest text-sm border-b border-white/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
