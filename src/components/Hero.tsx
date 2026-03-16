import { motion } from 'motion/react';
import { useContent } from '../context/ContentContext';

export default function Hero() {
  const { content } = useContent();
  const { hero } = content;

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundImage}
          alt="Vietnamese Countryside Sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-tre-dark/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          {hero.logoImage && (
            <img 
              src={hero.logoImage} 
              alt="Restaurant Logo" 
              className="max-w-[250px] md:max-w-[400px] h-auto object-contain drop-shadow-2xl mb-4"
            />
          )}
          {hero.openingHours && (
            <p className="text-tre-cream/90 text-sm md:text-base font-medium tracking-wide drop-shadow-md bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
              {hero.openingHours}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
