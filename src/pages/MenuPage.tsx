import { useContent } from '../context/ContentContext';
import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MenuPage({ onOpenLogin }: { onOpenLogin: () => void }) {
  const { content } = useContent();
  const { menu } = content;

  return (
    <div className="font-sans antialiased text-tre-dark bg-tre-cream min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-script text-5xl md:text-7xl text-tre-gold mb-4">{menu.title}</h1>
            <p className="text-tre-dark/60 uppercase tracking-widest text-sm font-bold">
              {menu.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {menu.items.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 items-start group"
              >
                <div className="w-24 h-24 shrink-0 overflow-hidden rounded-full border-2 border-tre-gold/30">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-baseline border-b border-tre-dark/10 pb-2 mb-2">
                    <h3 className="font-serif text-xl font-bold text-tre-dark">{item.name}</h3>
                    <span className="font-serif text-tre-gold font-bold">{item.price}</span>
                  </div>
                  <p className="text-tre-dark/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer onOpenLogin={onOpenLogin} />
    </div>
  );
}
