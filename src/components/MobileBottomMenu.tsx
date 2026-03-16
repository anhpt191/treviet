import { MapPin, Phone } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useLocation } from 'react-router-dom';

export default function MobileBottomMenu() {
  const { content } = useContent();
  const { contact } = content;
  const location = useLocation();

  if (location.pathname === '/admin') {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-tre-dark border-t border-tre-gold/30 z-50 flex">
      <a 
        href={contact.googleMapsLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-3 text-tre-cream hover:text-tre-gold transition-colors border-r border-tre-gold/30"
      >
        <MapPin size={24} className="mb-1" />
        <span className="text-[10px] uppercase tracking-widest">Google Maps</span>
      </a>
      <a 
        href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
        className="flex-1 flex flex-col items-center justify-center py-3 text-tre-cream hover:text-tre-gold transition-colors"
      >
        <Phone size={24} className="mb-1" />
        <span className="text-[10px] uppercase tracking-widest">Hotline</span>
      </a>
    </div>
  );
}
