'use client';
import { useState, useRef } from 'react';
import { FiSearch, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ratingButtonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.12, boxShadow: '0 2px 8px 0 rgba(1,183,231,0.10)' },
  tap: { scale: 0.96 },
};

// Komponen animasi tiga titik
function TypingDots() {
  return (
    <span className="flex items-center gap-0.5 w-5 h-5 justify-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-1.5 h-1.5 bg-primary rounded-full"
          animate={{ y: [0, -4, 0] }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </span>
  );
}

export default function BottomFilterBar({ onSearch, onPriceChange, onRatingChange }) {
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState([0, 2000000]);
  const [rating, setRating] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);

  const minPrice = 0;
  const maxPrice = 2000000;

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch && onSearch(e.target.value);

    setIsTyping(true);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => setIsTyping(false), 1500);
  };

  const handlePrice = (e) => {
    const newPrice = Number(e.target.value);
    setPrice([minPrice, newPrice]);
    onPriceChange && onPriceChange([minPrice, newPrice]);
  };

  const handleRating = (val) => {
    if (rating === val) {
      setRating('');
      onRatingChange && onRatingChange('');
    } else {
      setRating(val);
      onRatingChange && onRatingChange(val);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      <motion.div
        whileHover={{ scale: 1.025, boxShadow: '0 12px 40px 0 rgba(1,183,231,0.16)' }}
        className="pointer-events-auto bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl flex flex-row items-stretch gap-6 px-6 py-4 my-6 max-w-5xl w-[98%] transition-all duration-300"
      >
        {/* Search */}
        <div className="flex items-center gap-2 min-w-0 h-full flex-1 relative">
          <span className="bg-primary/10 rounded-full p-2 absolute left-0 top-1/2 -translate-y-1/2 z-10">
            {isTyping ? <TypingDots /> : <FiSearch className="text-primary" />}
          </span>
          <input
            type="text"
            placeholder="Nama properti..."
            value={search}
            onChange={handleSearch}
            className="outline-none bg-transparent w-full text-sm h-10 pl-10"
          />
        </div>
        {/* Price Range */}
        <div className="flex flex-col justify-center items-start min-w-0">
          <span className="mb-1 text-xs text-gray-500">Harga Maks:</span>
          <div className="flex items-center gap-2">
            <span className="text-primary font-semibold text-sm whitespace-nowrap">
              Rp{price[1].toLocaleString('id-ID')}
            </span>
            <motion.input
              whileHover={{ scale: 1.06 }}
              type="range"
              min={minPrice}
              max={maxPrice}
              step={50000}
              value={price[1]}
              onChange={handlePrice}
              className="w-20 md:w-28 accent-primary transition-all duration-200"
            />
          </div>
        </div>
        {/* Rating */}
        <div className="flex flex-col justify-center items-start min-w-0">
          <span className="mb-1 text-xs text-gray-500">Rating:</span>
          <div className="flex gap-1 flex-nowrap">
            {[4.5, 4.7, 4.9].map((val) => (
              <motion.button
                key={val}
                type="button"
                variants={ratingButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleRating(val)}
                className={`flex items-center px-2 py-1 rounded-full border transition text-xs
                  ${rating == val ? 'bg-primary text-white border-primary' : 'bg-white text-primary border-gray-200 hover:bg-primary/10'}`}
                style={{ minWidth: 48 }}
              >
                <FiStar className="mr-1" />
                {val}+
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
