import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell } from 'lucide-react';

interface NotificationBannerProps {
  isVisible: boolean;
  onClose: () => void;
  onEnable: () => void;
  isEnabled: boolean;
}

export default function NotificationBanner({ isVisible, onClose, onEnable, isEnabled }: NotificationBannerProps) {
  return (
    <AnimatePresence>
      {isVisible && !isEnabled && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-2xl z-50 p-6"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">Dapatkan Penawaran Spesial!</h3>
              <p className="text-white/90 text-sm mb-4">
                Izinkan notifikasi untuk mendapatkan info menu baru dan diskon eksklusif dari Pangsit Sou Hot!
              </p>
              <button
                onClick={onEnable}
                className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <Bell className="w-4 h-4" />
                <span>Enable Notifications</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}