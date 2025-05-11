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
      initial={{ backgroundPosition: '0% 50%', opacity: 0.9 }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        opacity: [0.9, 1, 0.9],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        backgroundImage: 'radial-gradient(circle at center, #0a0f2c, #001f3f, #003B72)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '200% 200%',
        backgroundPosition: '0% 50%',
      }}
      className="relative flex flex-col items-center justify-center min-h-screen w-full text-white overflow-hidden"
    >
      {/* Floating Icon */}
      <motion.div
        className="absolute top-10 right-10 text-white text-5xl opacity-30"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌊
      </motion.div>

      {/* Glass Blur Layer */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-0" />

      {/* Content Layer */}
      <div className="z-10 flex flex-col items-center">
        <motion.div variants={itemVariants} initial="hidden" animate="show">
          <img
            src="/images/weekgo_logo.svg"
            alt="WeekGo Logo"
            className="w-48 h-auto mb-8 transform transition-transform duration-500 hover:scale-110"
          />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg text-center mb-8 px-6 max-w-lg text-white"
        >
          WeekGo adalah platform penyewaan penginapan jangka menengah yang memberikan kemudahan dan fleksibilitas harga dengan sistem mingguan. Temukan penginapan yang sesuai dengan kebutuhan Anda!
        </motion.p>

        <motion.div variants={itemVariants} className="flex space-x-6">
          <button
            onClick={() => router.push('/guest-home')}
            style={{
              backgroundImage: 'linear-gradient(to right, #00B5E2,rgb(5, 126, 156))',
            }}
            className="text-white px-8 py-4 rounded-xl text-lg shadow-xl transform transition-transform duration-300 hover:scale-105 hover:brightness-110"
          >
            Guest
          </button>

          <button
            onClick={() => router.push('/host-feature')}
            style={{
              backgroundImage: 'linear-gradient(to right, #00B5E2, rgb(5, 126, 156))',
            }}
            className="text-white px-8 py-4 rounded-xl text-lg shadow-xl transform transition-transform duration-300 hover:scale-105 hover:brightness-110"
          >
            Host
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
