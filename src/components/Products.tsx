import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Leaf, Award, MessageCircle, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

import pangsit1 from '../assets/pangsit1.png';
import pangsit2 from '../assets/pangsit2.png';
import pangsit3 from '../assets/pangsit3.png';
import mie1 from '../assets/mie1.jpg';
import mie2 from '../assets/mie2.png';
import dimsum1 from '../assets/dimsum1.png';
import dimsum2 from '../assets/dimsum2.jpg';
import bundle from '../assets/bundle.jpg';

const showcaseProducts = [
  {
    id: 1,
    name: "Pangsit SouHot Rebus - Goreng",
    long_description: "Mau direbus atau digoreng, Pangsit SouHot selalu jadi solusi cepat saat lapar melanda. Lezat, praktis, dan cocok dijadikan camilan atau teman makan!",
    original_price: "Rp 25,000",
    price: "Rp 15,000",
    images: [ // Each product now has an array of images
      pangsit1,
      pangsit2,
      pangsit3,
    ],
    thumbnail: pangsit1,
    spiceLevel: 1,
    isBestSeller: true,
  },
  {
    id: 2,
    name: "Mie SouHot Pangsit",
    long_description: "Perpaduan mie gurih dan pangsit renyah dalam satu sajian praktis. Dibuat dari bahan pilihan, menjadikan setiap suapan sebagai mood booster yang siap menemani hari kamu.",
    original_price: "Rp 25,000",
    price: "Rp 15,000",
    images: [
      mie1,
      mie2,
    ],
    thumbnail: mie1,
    spiceLevel: 3,
    isBestSeller: true,
  },
  {
    id: 3,
    name: "Dimsum Frozen Daging Ayam",
    long_description: "Dimsum isi ayam lezat yang siap dikukus kapan saja. Tekstur lembut dan rasa otentik ala restoran, kini bisa kamu nikmati di rumah. Bonus chili oil untuk sensasi pedas menggoda!",
    original_price: "Rp 30,000",
    price: "Rp 20,000",
    images: [
      dimsum1,
      dimsum2,
    ],
    thumbnail: dimsum1,
    spiceLevel: 1,
    isTanpaPengawet: true,
  },
  {
    id: 4,
    name: "SouHot Trio Bundle",
    long_description: (
      <>
        <p className="mb-2">Tiga rasa, tiga gaya, <strong>satu solusi untuk semua mood!</strong></p>
        <p className="mb-2">Nikmati paket lengkap berisi:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Pangsit Kuah</strong> yang lembut dan menghangatkan.</li>
          <li><strong>Pangsit Goreng</strong> renyah yang bikin nagih.</li>
          <li><strong>Mie Pangsit</strong> gurih nan praktis.</li>
        </ul>
        <p className="mt-4">Semuanya dibuat dari bahan berkualitas dan diracik khusus untuk jadi mood booster kapan pun kamu butuh camilan cepat dan lezat!</p>
      </>
    ),
    price: "Rp 40,000",
    images: [
      bundle,
    ],
    thumbnail: bundle,
    spiceLevel: 0,
  },
];

// --- NEW ANIMATION VARIANTS ---
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const getSpiceIcons = (level: number) => {
    if (level === 0) return null;
    return Array(level).fill(0).map((_, i) => <Flame key={i} className="w-5 h-5 text-red-500" />);
};

export default function Products() {
  const [selectedProductId, setSelectedProductId] = useState(showcaseProducts[0].id);
  const selectedProduct = showcaseProducts.find(p => p.id === selectedProductId)!;

  // State for the image gallery
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = page % selectedProduct.images.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleProductSelect = (productId: number) => {
    setSelectedProductId(productId);
    setPage([0, 0]); // Reset image gallery to the first image
  };

  const whatsappNumber = "6289601769293";
  const preFilledMessage = encodeURIComponent(`Halo, saya tertarik untuk memesan: ${selectedProduct.name}`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${preFilledMessage}`;

  return (
    <section id="products" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">SouHot Signature Picks</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Pangsit bukan sekadar camilan, ini booster mood dalam setiap suapan.
            <br />
            Yuk, intip menu andalan kami!</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* --- NEW: Image Gallery with 3D Carousel Animation --- */}
          <div className="w-full lg:w-1/2 h-96 relative flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={page}
                src={selectedProduct.images[imageIndex]}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </AnimatePresence>
            {selectedProduct.images.length > 1 && (
              <>
                <div className="absolute right-4 z-10">
                  <button onClick={() => paginate(1)} className="bg-white/50 hover:bg-white/80 rounded-full p-2 text-gray-800">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute left-4 z-10">
                  <button onClick={() => paginate(-1)} className="bg-white/50 hover:bg-white/80 rounded-full p-2 text-gray-800">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Product Details with Animation */}
          <div className="w-full lg:w-1/2">
             <AnimatePresence mode="wait">
              <motion.div
                key={selectedProductId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  {selectedProduct.isBestSeller && <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center"><Award className="w-4 h-4 mr-1.5" />Best Seller</span>}
                  {selectedProduct.isTanpaPengawet && <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center"><Leaf className="w-4 h-4 mr-1.5" />Tanpa Pengawet</span>}
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{selectedProduct.long_description}</p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">{getSpiceIcons(selectedProduct.spiceLevel)}</div>
                  <div className="text-right">
                    {selectedProduct.original_price && (
                      <p className="text-xl text-gray-400 line-through">{selectedProduct.original_price}</p>
                    )}
                    <p className="text-3xl font-bold text-red-600">{selectedProduct.price}</p>
                  </div>
                </div>
                
                {/* --- FIX: Added back the Shopee button --- */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="https://shopee.co.id/souhot.coorporation" target="_blank" rel="noopener noreferrer" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3">
                        <ShoppingCart className="w-6 h-6" /> Pesan di Shopee
                    </a>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3">
                        <MessageCircle className="w-6 h-6" /> Pesan via WhatsApp
                    </a>
                </div>
              </motion.div>
             </AnimatePresence>
          </div>
        </div>
        
        {/* Thumbnail Selector */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {showcaseProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => handleProductSelect(product.id)}
              className={`rounded-xl p-2 transition-all duration-300 ${selectedProduct.id === product.id ? 'bg-red-600 shadow-lg scale-105' : 'bg-white hover:bg-red-100'}`}
            >
              <img src={product.thumbnail} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
              <p className={`mt-2 text-sm font-semibold ${selectedProduct.id === product.id ? 'text-white' : 'text-gray-700'}`}>
                {product.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}