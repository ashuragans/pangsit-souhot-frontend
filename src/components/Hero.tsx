import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import logotext from '../assets/logotext.png';

import heroBg1 from '../assets/hero-bg-1.png';
import heroBg2 from '../assets/hero-bg-2.png';
import heroBg3 from '../assets/hero-bg-3.png';
import heroBg4 from '../assets/hero-bg-4.png';

const backgroundImages = [heroBg1, heroBg2, heroBg3, heroBg4];

interface HeroProps {
  onNotificationClick: () => void;
  notificationEnabled: boolean;
}

export default function Hero({ onNotificationClick, notificationEnabled }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const scrollToMenu = () => {
    const element = document.getElementById('products');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // --- THE FIX IS HERE ---
    // The section is now a vertical flex container instead of a centering one.
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Slideshow (no changes) */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Background ${index + 1}`}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Main Centered Content */}
      {/* This container now grows to fill available space and centers its own content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="mb-6 mt-24">
          <span className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 mr-2" />
            #1 Jajanan ter SouHot di Karawang
          </span>
        </div>

        <img src={logotext} alt="Pangsit Sou Hot" className="h-auto w-full max-w-xl mx-auto mb-6" />

        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
          Rasakan perpaduan sempurna antara resep tradisional dan cita rasa modern. 
          <br />
          Pangsit buatan kami dibuat segar setiap hari dengan bahan-bahan premium pilihan.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToMenu}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <span>Udah Siap Ngiler?</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {!notificationEnabled && (
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={onNotificationClick}
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-all transform hover:scale-105 border border-white/30"
                >
                  Dapatkan Penawaran Spesial!
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stats Bar */}
      {/* This container is no longer absolutely positioned. It's now a natural part of the layout flow. */}
      <div className="relative z-10 p-4 md:pb-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
            <div className="flex items-center justify-center mb-2"><Clock className="w-7 h-7 text-red-300" /></div>
            <h3 className="text-xl font-bold text-white mb-1">2 - 5 Min</h3>
            <p className="text-sm text-gray-300">Hangat, Cepat, Lezat!</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
            <div className="flex items-center justify-center mb-2"><Star className="w-7 h-7 text-yellow-300" /></div>
            <h3 className="text-xl font-bold text-white mb-1">4.8/5</h3>
            <p className="text-sm text-gray-300">Ulasan Pelanggan</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
            <div className="flex items-center justify-center mb-2"><MapPin className="w-7 h-7 text-green-300" /></div>
            <h3 className="text-xl font-bold text-white mb-1">1+ Years</h3>
            <p className="text-sm text-gray-300">Mengatasi Kelaparan</p>
          </div>
        </div>
      </div>
    </section>
  );
}