import { useContent } from '../context/ContentContext';
import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage({ onOpenLogin }: { onOpenLogin: () => void }) {
  const { content } = useContent();
  const { about } = content;

  return (
    <div className="font-sans antialiased text-tre-dark bg-tre-cream min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-script text-5xl md:text-7xl text-tre-gold mb-4">{about.title}</h1>
            <p className="text-tre-dark/60 uppercase tracking-widest text-sm font-bold">
              {about.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <p className="text-lg leading-relaxed text-tre-dark/80 font-serif">
                {about.text1}
              </p>
              <p className="text-lg leading-relaxed text-tre-dark/80 font-serif">
                {about.text2}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <img 
                  src={about.image1} 
                  alt="Vietnamese Dish" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <img 
                  src={about.image2} 
                  alt="Restaurant Interior" 
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4 pt-8"
              >
                <img 
                  src={about.image3} 
                  alt="Fresh Ingredients" 
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <img 
                  src={about.image4} 
                  alt="Chef Cooking" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer onOpenLogin={onOpenLogin} />
    </div>
  );
}
