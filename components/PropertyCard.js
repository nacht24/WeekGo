'use client';
import {useState} from 'react';
import Image from 'next/image';
import {FaStar, FaHeart} from 'react-icons/fa';
import {motion} from 'framer-motion';
import {useRouter} from 'next/navigation';

export default function PropertyCard({property}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const prices = [Number(property.price3Days || 0), Number(property.price1Week || 0), Number(property.price2Weeks || 0), Number(property.price3Weeks || 0)].filter(Boolean);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <div
      onClick={() => router.push(`/property/${property.id}`)}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden"
      style={{position: 'relative'}}
    >
      <motion.div
        whileHover={{scale: 1.04, boxShadow: '0 8px 24px rgba(0,0,0,0.08)'}}
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        transition={{type: 'spring', stiffness: 200, damping: 20}}
        className="rounded-xl overflow-hidden"
      >
        <Image
          src={property.image}
          alt={property.name}
          width={500}
          height={256}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <motion.button
          whileTap={{scale: 1.3}}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <FaHeart className={`${isFavorite ? 'text-primary' : 'text-gray-700'}`} />
        </motion.button>
      </motion.div>
      <div className="mt-3 space-y-1 px-3 pb-3">
        <div className="flex justify-between">
          <h3 className="font-semibold truncate">{property.name}</h3>
          <div className="flex items-center">
            <FaStar className="text-primary" />
            <span className="ml-1">{property.rating}</span>
          </div>
        </div>
        <p className="text-gray-500">
          {minPrice.toLocaleString('id-ID')} - {maxPrice.toLocaleString('id-ID')}
        </p>
      </div>
    </div>
  );
}
