import React from 'react';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import logo2 from '../assets/logo2.png';
import logoHalal from '../assets/logo-halal.png'; 
import logoPartner from '../assets/logo-partner.png'; 

export default function Footer() {
  const whatsappNumber = "6289601769293";
  const preFilledMessage = encodeURIComponent("Halo, saya ingin bertanya tentang produk Pangsit Sou Hot.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${preFilledMessage}`;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-2">
            <img src={logo2} alt="Pangsit SouHot Logo" className="h-16 w-auto mb-4" />
            
            <p className="text-gray-300 mb-6 max-w-md">
Pangsit khas Indonesia yang autentik, dibuat segar setiap hari dengan resep tradisional dan sentuhan rasa modern.
Rasakan perpaduan sempurna antara cita rasa dan kualitas di setiap gigitan.
            </p>
            
            <div className="flex space-x-4 mb-8">
              <a href="https://www.instagram.com/souhot_official" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-pink-600 p-3 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-green-500 p-3 rounded-full transition-colors">
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a href="https://shopee.co.id/souhot.coorporation" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-orange-500 p-3 rounded-full transition-colors">
                <FaShoppingCart className="w-5 h-5" />
              </a>
            </div>

            <div className="flex items-center space-x-6">
              <img src={logoHalal} alt="Halal Certified" className="h-14" />
              <img src={logoPartner} alt="Partner Logo" className="h-14" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Akses Cepat</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-red-400 transition-colors">Beranda</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-red-400 transition-colors">Menu</a></li>
              <li><a href="#reviews" className="text-gray-300 hover:text-red-400 transition-colors">Ulasan</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-red-400 transition-colors">Hubungi Kami</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300"><MapPin className="w-4 h-4 mr-2 text-red-400" /><span className="text-sm">Jomin Timur, Kec. Kota Baru, Karawang, Jawa Barat 41374</span></li>
              <li className="flex items-center text-gray-300"><Phone className="w-4 h-4 mr-2 text-red-400" /><span className="text-sm">+62 896-0176-9293</span></li>
              <li className="flex items-center text-gray-300"><Mail className="w-4 h-4 mr-2 text-red-400" /><span className="text-sm">pangsitsouhot@gmail.com</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Pangsit SouHot. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}