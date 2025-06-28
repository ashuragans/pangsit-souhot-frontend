import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';

// Define the structure of a notification that this component will receive
interface Notification {
  id: number;
  title: string;
  body: string;
  icon_url?: string;
}

interface NotificationHistoryProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationHistory: React.FC<NotificationHistoryProps> = ({ notifications, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-20 right-4 sm:right-6 lg:right-8 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-gray-700" />
                <h3 className="font-bold text-lg text-gray-800">Recent Notifications</h3>
              </div>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {notifications.length > 0 ? (
                <ul>
                  {notifications.map((notif, index) => (
                    <li key={notif.id} className={`p-4 ${index < notifications.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div className="flex items-start space-x-4">
                        {notif.icon_url && (
                          <img src={notif.icon_url} alt="icon" className="w-10 h-10 rounded-full object-cover" />
                        )}
                        <div>
                          <h4 className="font-semibold text-gray-900">{notif.title}</h4>
                          <p className="text-gray-600 text-sm">{notif.body}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 py-12">No recent notifications.</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};