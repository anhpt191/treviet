import { motion } from 'motion/react';
import { useContent } from '../context/ContentContext';

export default function Spices() {
  const { content } = useContent();
  const { spices } = content;

  return (
    <section className="relative h-[60vh] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img 
          src={spices?.image || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop"} 
          alt="Vietnamese Spices" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-tre-dark/60 mix-blend-multiply" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-tre-dark/80 backdrop-blur-sm p-12 rounded-full border border-tre-gold/30"
        >
          <h2 className="font-script text-5xl md:text-7xl text-tre-gold mb-4">{spices?.title || "Originale Zutaten"}</h2>
          <p className="text-tre-cream text-lg font-serif tracking-widest uppercase">
            {spices?.subtitle || "Frische, Tradition & Geschmack"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
