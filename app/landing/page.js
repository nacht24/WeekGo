'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import './globals.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
      ease: 'easeOut',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function LandingPage() {
  const router = useRouter();

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-300 text-white"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Logo */}
      <motion.div variants={itemVariants}>
        <img
          src="/images/weekgo_logo.svg"
          alt="WeekGo Logo"
          className="w-48 h-auto mb-8 transform transition-transform duration-500 hover:scale-110"
        />
      </motion.div>

      {/* Deskripsi */}
      <motion.p
        variants={itemVariants}
        className="text-lg text-center mb-8 px-6 max-w-lg text-gray-800"
      >
        WeekGo adalah platform penyewaan penginapan jangka menengah yang memberikan kemudahan dan fleksibilitas harga dengan sistem mingguan. Temukan penginapan yang sesuai dengan kebutuhan Anda!
      </motion.p>

      {/* Tombol */}
      <motion.div variants={itemVariants} className="flex space-x-6">
        <button
          onClick={() => router.push('/guest-home')}
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl text-lg shadow-xl transform transition-transform duration-300 hover:scale-105"
        >
          Guest
        </button>
        <button
          onClick={() => router.push('/host-feature')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-4 rounded-xl text-lg shadow-xl transform transition-transform duration-300 hover:scale-105"
        >
          Host
        </button>
      </motion.div>
    </motion.div>
  );
}
