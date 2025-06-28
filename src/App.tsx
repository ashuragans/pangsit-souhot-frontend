import { useState, useEffect } from 'react'; // Removed unused 'React' import
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoyaltyModal from './components/LoyaltyModal';
import NotificationBanner from './components/NotificationBanner';
import { NotificationHistory } from './components/NotificationHistory';
import { registerServiceWorker, subscribeUser } from './services/notificationService';
import { getMe } from './services/api'

interface User {
  id: number;
  username: string;
  email: string;
  points?: number; // Points are optional
}

interface AuthData {
  jwt: string;
  user: User;
}

// Define the shape of a single notification object
interface Notification {
  id: number;
  title: string;
  body: string;
  icon_url?: string;
}

const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL;

// This function now has a proper return type
async function getNotifications(): Promise<Notification[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/notifications`);
    if (!response.ok) throw new Error('Failed to fetch notifications');
    const data = await response.json();
    // FIX #1: Added an explicit type for the 'item' parameter
    return data.data.map((item: { id: number; attributes: any; }) => ({ 
      id: item.id, 
      ...item.attributes 
    }));
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}

function App() {
  const [isLoyaltyModalOpen, setIsLoyaltyModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]); // Use the defined interface
  
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [showNotificationBanner, setShowNotificationBanner] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
        const savedUser = localStorage.getItem('strapiUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

        const token = localStorage.getItem('strapiToken');
    if (token) {
      getMe(token).then(userData => {
        if (userData) {
          setUser(userData);
        } else {
          // Token might be invalid, so log out
          handleLogout();
        }
      });
    }

    registerServiceWorker();

    getNotifications().then(data => {
      setNotifications(data.reverse());
    });

    if (Notification.permission === 'granted') {
      setNotificationEnabled(true);
    } else {
      const timer = setTimeout(() => setShowNotificationBanner(true), 3000);
      return () => clearTimeout(timer);
    }

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setIsHeaderVisible(window.scrollY < lastScrollY || window.scrollY < 100);
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthSuccess = (authData: AuthData) => {
    // Now, we also store the token to fetch full user data
    localStorage.setItem('strapiToken', authData.jwt);
    setUser(authData.user);
    // We can optionally call getMe here as well to get points immediately
    getMe(authData.jwt).then(fullUserData => setUser(fullUserData));
    setIsLoyaltyModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('strapiToken');
    localStorage.removeItem('strapiUser');
  };

  const handleNotificationRequest = async () => {
    const success = await subscribeUser();
    if (success) {
      setNotificationEnabled(true);
      setShowNotificationBanner(false);
    }
  };
  
  const handleLoyaltyClick = () => setIsLoyaltyModalOpen(true);
  const closeLoyaltyModal = () => setIsLoyaltyModalOpen(false);
  const closeNotificationBanner = () => setShowNotificationBanner(false);

  const toggleNotificationHistory = () => {
    setIsHistoryOpen(prevState => !prevState);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        user={user} // Pass user state to Header
        onLogout={handleLogout} // Pass logout function
        onNotificationClick={toggleNotificationHistory}
        onLoyaltyClick={handleLoyaltyClick}
        notificationEnabled={notificationEnabled}
        isVisible={isHeaderVisible}
      />

      <NotificationHistory 
        notifications={notifications}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
      
      <main>
        <Hero 
          onNotificationClick={handleNotificationRequest}
          notificationEnabled={notificationEnabled}
        />
        <Products />
        <Reviews />
        <Contact />
      </main>
      
      <Footer />
      
      <LoyaltyModal 
        isOpen={isLoyaltyModalOpen}
        onClose={closeLoyaltyModal}
        onAuthSuccess={handleAuthSuccess} // Pass success handler
      />
      
      <NotificationBanner
        isVisible={showNotificationBanner && !notificationEnabled}
        onClose={closeNotificationBanner}
        onEnable={handleNotificationRequest}
        isEnabled={notificationEnabled}
      />
    </div>
  );
}

export default App;