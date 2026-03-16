import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      // Success
      setError('');
      onClose();
      navigate('/admin');
    } else {
      setError('Ungültiger Benutzername oder Passwort');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-md h-fit bg-tre-cream rounded-xl shadow-2xl z-[101] overflow-hidden"
          >
            <div className="bg-tre-dark p-6 flex justify-between items-center">
              <h2 className="text-tre-gold font-serif text-2xl flex items-center gap-2">
                <Lock size={20} />
                Admin Login
              </h2>
              <button onClick={onClose} className="text-tre-cream/60 hover:text-tre-gold transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-tre-dark/60 mb-2">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 bg-white border border-tre-dark/10 rounded focus:border-tre-gold focus:outline-none transition-colors"
                    placeholder="admin"
                  />
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-widest text-tre-dark/60 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-white border border-tre-dark/10 rounded focus:border-tre-gold focus:outline-none transition-colors"
                    placeholder="•••••"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-tre-dark text-tre-cream py-3 uppercase tracking-widest font-bold hover:bg-tre-gold hover:text-tre-dark transition-all duration-300"
                >
                  Anmelden
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
