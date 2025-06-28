import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence for the button
import { Star, MapPin, Instagram, User, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'; // Import new icons
import { ReviewForm } from './ReviewForm';
import { getPublishedReviews, getSocialPosts, submitReview } from '../services/api';
import { InstagramEmbed } from './InstagramEmbed';

// Interfaces remain the same
interface StrapiReview {
  id: number;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
  is_published: boolean;
}

interface StrapiSocialPost {
  id: number;
  embed_code: string;
}

const REVIEWS_TO_SHOW_INITIALLY = 3;
const REVIEWS_TO_LOAD_MORE = 6;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};


export default function Reviews() {
  const [allReviews, setAllReviews] = useState<StrapiReview[]>([]);
  const [socialPosts, setSocialPosts] = useState<StrapiSocialPost[]>([]);
  const [status, setStatus] = useState<string>('loading');
  const [visibleReviewCount, setVisibleReviewCount] = useState(REVIEWS_TO_SHOW_INITIALLY);

  // Data fetching and sorting logic remains the same
  useEffect(() => {
    async function loadContent() {
      setStatus('loading');
      try {
        const [reviewData, socialData] = await Promise.all([
          getPublishedReviews(),
          getSocialPosts(),
        ]);
        
        if (reviewData && socialData) {
          const published = reviewData.filter((r: StrapiReview) => r.is_published);
          setAllReviews(published);
          setSocialPosts(socialData);
          setStatus('success');
        } else {
          throw new Error("API call failed to return data.");
        }
      } catch (error) {
        console.error("Error loading content:", error);
        setStatus('error');
      }
    }
    loadContent();
  }, []);

  const sortedReviews = useMemo(() => {
    return [...allReviews].sort((a, b) => b.rating - a.rating);
  }, [allReviews]);

  const topThreeReviews = sortedReviews.slice(0, 3);
  const otherReviews = sortedReviews.slice(3);

  const handleReviewSubmit = async (newReview: { name: string; rating: number; text: string; }) => {
    try {
      await submitReview(newReview);
      alert("Thank you for your review!");
      window.location.reload(); 
    } catch (error) {
      alert("Sorry, there was an error submitting your review.");
    }
  };
  
  const handleLoadMore = () => {
    setVisibleReviewCount(prevCount => prevCount + REVIEWS_TO_LOAD_MORE);
  };

  // --- NEW: "Show Less" Functionality ---
  const handleShowLess = () => {
    setVisibleReviewCount(REVIEWS_TO_SHOW_INITIALLY);
  };

  const renderStars = (rating: number) => Array(5).fill(0).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />);

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Bukan Katanya, Tapi Kata Mereka!</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Lihat sendiri kenapa SouHot jadi favorit banyak orang.</p>
        </div>

        {/* Top Reviews Section - With Hover Animation */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <MapPin className="w-6 h-6 text-red-500 mr-2" />
            <h3 className="text-2xl font-bold text-gray-900">Ulasan Terfavorit</h3>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[150px]"
            variants={containerVariants}
            initial="hidden"
            animate={status === 'success' ? 'visible' : 'hidden'}
          >
            {status === 'success' && topThreeReviews.map((review) => (
              <motion.div 
                key={review.id} 
                variants={itemVariants}
                // --- NEW: Hover Animation ---
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border border-blue-100 h-full cursor-pointer">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center"><User className="w-6 h-6 text-white" /></div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <div className="flex items-center">{renderStars(review.rating)}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                  <p className="text-sm text-gray-500">Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* "More Reviews" Section - With Hover and Toggable Buttons */}
        {otherReviews.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Semua Ulasan</h3>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {otherReviews.slice(0, visibleReviewCount).map((review) => (
                  <motion.div 
                    key={review.id} 
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    layout // This makes the layout animate smoothly when items are added/removed
                    whileHover={{ scale: 1.03, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-gray-50 rounded-lg p-6 h-full cursor-pointer">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-white" /></div>
                        <div className="ml-3">
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <div className="flex items-center">{renderStars(review.rating)}</div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">"{review.text}"</p>
                      <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <div className="text-center mt-12">
              {visibleReviewCount < otherReviews.length && (
                <button
                  onClick={handleLoadMore}
                  className="bg-red-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-red-700 transition-colors shadow-md flex items-center mx-auto"
                >
                  Tampilkan Lebih Banyak <ChevronDown className="w-5 h-5 ml-2" />
                </button>
              )}
              {visibleReviewCount > REVIEWS_TO_SHOW_INITIALLY && (
                <button
                  onClick={handleShowLess}
                  className="bg-gray-200 text-gray-800 font-semibold px-8 py-3 rounded-full hover:bg-gray-300 transition-colors shadow-md flex items-center mx-auto mt-4"
                >
                  Sembunyikan Ulasan <ChevronUp className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Form and Social Media Sections remain the same */}
        <div className="mb-16 max-w-2xl mx-auto">
          <ReviewForm onSubmit={handleReviewSubmit} />
        </div>
        
        <div>
          <div className="flex items-center justify-center mb-8">
            <Instagram className="w-6 h-6 text-pink-500 mr-2" />
            <h3 className="text-2xl font-bold text-gray-900">Cek Keseruan Kami di Sosmed!</h3>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center min-h-[400px]"
            variants={containerVariants}
            initial="hidden"
            animate={status === 'success' ? 'visible' : 'hidden'}
          >
            {status === 'success' && socialPosts.map((post) => (
              <motion.div 
                key={post.id} 
                variants={itemVariants} 
                className="w-full max-w-sm"
                whileHover={{ y: -5 }} // Add a subtle lift on hover for social posts
                transition={{ duration: 0.2 }}
              >
                <InstagramEmbed embedCode={post.embed_code} />
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-8">
            <a href="https://www.instagram.com/souhot_official" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
              <Instagram className="w-5 h-5 mr-2" />
              Jangan Ketinggalan Update Lezatnya! Follow Sekarang!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}