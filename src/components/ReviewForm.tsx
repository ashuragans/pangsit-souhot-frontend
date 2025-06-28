import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';

// Define the structure of a new review
interface NewReview {
  name: string;
  rating: number;
  text: string;
}

// Define the props for our form component
interface ReviewFormProps {
  onSubmit: (review: NewReview) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && text && rating > 0) {
      onSubmit({ name, rating, text });
      // Reset form fields after submission
      setName('');
      setText('');
      setRating(0);
    } else {
      alert('Please fill out all fields and provide a rating.');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Bagikan Pengalamanmu!</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-center">SouHot-nya Seberapa Hot Menurutmu?</label>
          <div className="flex justify-center items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 cursor-pointer transition-colors ${
                  (hoverRating || rating) >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Siapa Nama Kamu?</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="contoh: Zahran Naufal"
            required
          />
        </div>

        {/* Review Text Input */}
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">Tulis Pengalamanmu di Sini</label>
          <textarea
            id="review"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Cerita Kamu tentang SouHot"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
        >
          <Send className="w-5 h-5 mr-2" />
          Submit Review
        </button>
      </form>
    </div>
  );
};