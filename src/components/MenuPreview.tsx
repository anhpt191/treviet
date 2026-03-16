import { motion } from 'motion/react';
import { useContent } from '../context/ContentContext';

export default function MenuPreview() {
  const { content } = useContent();
  const { menu } = content;

  return (
    <section id="menu" className="py-24 bg-tre-dark text-tre-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="font-script text-5xl md:text-6xl text-tre-gold mb-4">{menu.title}</h2>
          <p className="text-tre-cream/60 uppercase tracking-widest text-sm">{menu.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menu.items.map((dish, index) => (
            <motion.div 
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-serif text-2xl text-tre-gold mb-2">{dish.name}</h3>
                <p className="text-sm text-tre-cream/70 mb-4 h-12 overflow-hidden">{dish.description}</p>
                <span className="inline-block px-4 py-1 border border-tre-gold/50 rounded-full text-tre-gold font-bold">
                  {dish.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a 
            href="#" 
            className="inline-block px-8 py-3 bg-tre-gold text-tre-dark font-bold uppercase tracking-widest hover:bg-white transition-colors duration-300"
          >
            {menu.buttonText}
          </a>
        </div>

      </div>
    </section>
  );
}
