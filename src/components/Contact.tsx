import { motion } from 'motion/react';
import { useContent } from '../context/ContentContext';

export default function Contact() {
  const { content } = useContent();
  const { contact } = content;

  return (
    <section id="reservation" className="py-24 bg-tre-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="font-script text-5xl md:text-6xl text-tre-accent mb-4">{contact.title}</h2>
          <p className="text-tre-dark/60 uppercase tracking-widest text-sm">{contact.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white shadow-2xl rounded-2xl overflow-hidden">
          
          {/* Image Side */}
          <div className="relative h-full min-h-[400px]">
            <img 
              src={contact?.image || 'https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2070&auto=format&fit=crop'} 
              alt="Dining Table" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-tre-dark/20"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="font-serif text-3xl mb-2">Besondere Anlässe?</h3>
              <p className="text-sm opacity-90">Wir arrangieren gerne Ihre Feierlichkeiten. Sprechen Sie uns an!</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-tre-dark/60 mb-2">Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full border-b border-tre-dark/20 bg-transparent py-2 focus:border-tre-gold focus:outline-none transition-colors"
                    placeholder="Ihr Name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-tre-dark/60 mb-2">Telefon *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full border-b border-tre-dark/20 bg-transparent py-2 focus:border-tre-gold focus:outline-none transition-colors"
                    placeholder="+49 ..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-xs uppercase tracking-widest text-tre-dark/60 mb-2">Datum *</label>
                  <input 
                    type="date" 
                    id="date" 
                    className="w-full border-b border-tre-dark/20 bg-transparent py-2 focus:border-tre-gold focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="guests" className="block text-xs uppercase tracking-widest text-tre-dark/60 mb-2">Personen *</label>
                  <select 
                    id="guests" 
                    className="w-full border-b border-tre-dark/20 bg-transparent py-2 focus:border-tre-gold focus:outline-none transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, '8+'].map(num => (
                      <option key={num} value={num}>{num} Personen</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-tre-dark/60 mb-2">Nachricht</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full border-b border-tre-dark/20 bg-transparent py-2 focus:border-tre-gold focus:outline-none transition-colors resize-none"
                  placeholder="Besondere Wünsche..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-tre-dark text-tre-cream py-4 uppercase tracking-widest font-bold hover:bg-tre-gold hover:text-tre-dark transition-all duration-300"
                >
                  Tisch Reservieren
                </button>
                <p className="text-center text-xs text-tre-dark/40 mt-4">
                  Oder rufen Sie uns an: <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-tre-dark font-bold hover:text-tre-gold">{contact.phone}</a>
                </p>
              </div>
            </form>
          </div>

        </div>

        {/* Map Section */}
        <div className="mt-16 h-96 w-full rounded-2xl overflow-hidden shadow-xl grayscale hover:grayscale-0 transition-all duration-700">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2533.568748669074!2d12.49366631573656!3d50.71899997951357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a72cbaa36e7299%3A0x421b1cb42886f30!2sPeter-Breuer-Stra%C3%9Fe%2025%2C%2008056%20Zwickau%2C%20Germany!5e0!3m2!1sen!2sus!4v1645564859215!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy"
            title="Restaurant Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
