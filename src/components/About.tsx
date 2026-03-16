import { motion } from 'motion/react';
import { useContent } from '../context/ContentContext';

export default function About() {
  const { content } = useContent();
  const { about } = content;

  return (
    <section id="about" className="py-24 bg-tre-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-script text-5xl md:text-6xl text-tre-accent mb-4"
          >
            {about.title}
          </motion.h2>
          <div className="w-24 h-1 bg-tre-gold mx-auto mb-6 opacity-50"></div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-tre-dark/80 font-light leading-relaxed"
          >
            {about.text1}
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-tre-dark/80 font-light"
          >
            <h3 className="font-serif text-3xl text-tre-green mb-4">{about.subtitle}</h3>
            <p>
              {about.text2}
            </p>
            <p>
              In unserem Speiseangebot finden Sie eine reichhaltige Auswahl an Gerichten der vietnamesische Küche, 
              darunter typische Vorspeisen und Hauptgerichte, Salate, Suppen und Desserts.
            </p>
            
            <div className="pt-8">
              <img 
                src={about.image1}
                alt="Restaurant Interior" 
                className="rounded-lg shadow-xl w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4 mt-8">
              <img 
                src={about.image2}
                alt="Spring Rolls" 
                className="rounded-lg shadow-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
              <img 
                src={about.image3}
                alt="Pho Soup" 
                className="rounded-lg shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-4">
              <img 
                src={about.image4}
                alt="Bun Cha" 
                className="rounded-lg shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
              <img 
                src={about.image5}
                alt="Asian Spices" 
                className="rounded-lg shadow-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
