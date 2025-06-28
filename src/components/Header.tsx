import { useState } from 'react';
import { Menu, X, User, Bell, LogOut, Award} from 'lucide-react';
import logo from '../assets/logo.png';

// --- FIX: Updated props to receive user and logout function ---
interface User {
  username: string;
  points?: number;
}

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onNotificationClick: () => void;
  onLoyaltyClick: () => void;
  notificationEnabled: boolean;
  isVisible: boolean;
}

export default function Header({ user, onLogout, onNotificationClick, onLoyaltyClick, notificationEnabled, isVisible }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20"> 
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center space-x-3">
            <button onClick={() => scrollToSection('home')}>
              <img src={logo} alt="Pangsit Sou Hot" className="h-14 w-auto" />
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">Beranda</button>
            <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">Menu</button>
            <button onClick={() => scrollToSection('reviews')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">Ulasan</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">Hubungi Kami</button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={onNotificationClick} className="p-2 rounded-full hover:bg-gray-100" title="Notifications">
              <Bell className="w-5 h-5" />
            </button>

        {user ? (
          <div className="flex items-center gap-4">
            {/* --- NEW: Display User Points --- */}
            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 font-bold px-3 py-1.5 rounded-full">
              <Award className="w-5 h-5" />
              <span>{user.points || 0} Poin</span>
            </div>
            <span className="font-semibold text-gray-700">Hi, {user.username}</span>
            <button onClick={onLogout} className="..." title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
              <button 
                onClick={onLoyaltyClick} 
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
              >
            <User className="w-4 h-4" />
            <span>Poin Hadiah</span>
          </button>
        )}
      </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
             {/* Mobile Menu Logic Here */}
          </div>
        )}
      </div>
    </header>
  );
}