import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface FooterProps {
  onOpenLogin?: () => void;
}

export default function Footer({ onOpenLogin }: FooterProps) {
  const { content } = useContent();
  const { contact } = content;

  return (
    <footer id="footer" className="bg-tre-dark text-tre-cream py-16 border-t border-tre-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* Opening Hours */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-tre-gold font-serif text-2xl mb-2">Öffnungszeiten</h3>
            <div className="space-y-2 text-sm tracking-wide opacity-80 font-light">
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <Clock size={16} className="text-tre-gold" />
                <span>{contact.openingHours.weekdays}:</span>
              </p>
              <p className="pl-6">{contact.openingHours.weekdayHours}</p>
              <p className="pl-6">{contact.openingHours.weekendHours}</p>
              <p className="mt-4 text-tre-accent font-medium">{contact.openingHours.closedDay}</p>
              <p className="text-xs opacity-60">(außer Feiertags)</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border border-tre-gold/30 rounded-full flex items-center justify-center mb-2">
              <span className="font-script text-2xl text-tre-gold">Tv</span>
            </div>
            <h3 className="text-tre-gold font-serif text-2xl">Adresse</h3>
            <div className="space-y-2 text-sm tracking-wide opacity-80 font-light text-center">
              <p>{contact.address.street}</p>
              <p>{contact.address.city}</p>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="block hover:text-tre-gold transition-colors mt-2">
                Tel: {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="block hover:text-tre-gold transition-colors">
                {contact.email}
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <h3 className="text-tre-gold font-serif text-2xl mb-2">Rechtliches</h3>
            <div className="text-xs text-center md:text-right opacity-50 space-y-2 mt-4">
              <a href="#" className="hover:text-tre-gold block">Impressum</a>
              <a href="#" className="hover:text-tre-gold block">Datenschutz</a>
              <a href="#" className="hover:text-tre-gold block">Cookie-Richtlinie</a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 text-center text-xs opacity-40 tracking-widest">
          &copy; <button onClick={onOpenLogin} className="hover:text-tre-gold transition-colors">2026</button> TreViet Restaurant. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
