import React, { useState } from 'react';
import { X, Gift, User, Mail, Lock } from 'lucide-react';
import { registerUser, loginUser } from '../services/api';

interface LoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (authData: any) => void;
}

export default function LoyaltyModal({ isOpen, onClose, onAuthSuccess }: LoyaltyModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      let response;
      if (isLogin) {
        // For login, Strapi uses 'identifier' which can be email or username
        response = await loginUser({
          identifier: formData.email,
          password: formData.password,
        });
      } else {
        // For registration, Strapi requires 'username', 'email', and 'password'
        if (!formData.username) {
          throw new Error("Username is required for registration.");
        }
        response = await registerUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
      }

      // --- THIS IS THE CRITICAL FIX ---
      // Strapi wraps errors in a specific structure. We now check for it.
      if (response.error) {
        throw new Error(response.error.message || 'An unknown error occurred.');
      }

      // If successful, pass the data up to the App component
      onAuthSuccess(response);

    } catch (err: any) {
      // Set the error state so it can be displayed to the user
      setError(err.message);
    }
  };
  
  const switchMode = (mode: 'login' | 'register') => {
    setIsLogin(mode === 'login');
    setError(null); // Clear errors when switching modes
    setFormData({ username: '', email: '', password: '' }); // Clear form fields
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in-up">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
          <button onClick={onClose} className="absolute top-3 right-3 p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3"><Gift className="w-8 h-8" /></div>
            <h2 className="text-2xl font-bold">Program Poin Hadiah</h2>
            <p className="text-white/90 text-sm">Daftar atau masuk untuk mulai mengumpulkan poin!</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <div className="flex bg-gray-100 rounded-full p-1 mb-5">
            <button onClick={() => switchMode('login')} className={`flex-1 py-2 px-4 rounded-full font-semibold transition-all duration-300 ${isLogin ? 'bg-white text-red-600 shadow-md' : 'text-gray-500'}`}>Masuk</button>
            <button onClick={() => switchMode('register')} className={`flex-1 py-2 px-4 rounded-full font-semibold transition-all duration-300 ${!isLogin ? 'bg-white text-red-600 shadow-md' : 'text-gray-500'}`}>Daftar</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Display error message here */}
            {error && <div className="bg-red-50 text-red-700 text-center p-3 rounded-lg text-sm">{error}</div>}
            
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500" placeholder="e.g., arya_w" required={!isLogin} />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500" placeholder="anda@email.com" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-red-500" placeholder="Minimal 6 karakter" required />
              </div>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold text-lg hover:from-red-700 transition-all transform hover:scale-105 shadow-lg">
              {isLogin ? 'Masuk' : 'Buat Akun'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}