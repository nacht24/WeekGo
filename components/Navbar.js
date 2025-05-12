'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiUser, FiLogOut } from 'react-icons/fi';

// Ganti nama di sini, avatar otomatis ambil inisial
const userName = 'WeekGo'; // Misal ganti ke 'Hafidz Akbar' -> avatar jadi 'HA'

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    function handleClickOutside(e) {
      if (open && menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 12 }}
      className="bg-white border-b py-6 sticky top-0 z-50 shadow-sm"
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo pakai file SVG */}
        <span className="h-10 select-none pointer-events-none flex items-center">
          <Image
            src="/weekgo_logo_horizontal.svg"
            alt="WeekGo Logo"
            width={160}
            height={40}
            className="h-10 w-auto"
            priority
            draggable={false}
          />
        </span>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-4 py-2 rounded-full transition bg-primary/10 hover:bg-gray-100 group cursor-pointer"
            style={{ minHeight: 40 }}
          >
            {/* Avatar dinamis */}
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-base select-none transition">
              {getInitials(userName)}
            </span>
            <span className="text-gray-700 font-medium transition">{userName}</span>
            {/* Full area hover handled by button's hover */}
          </button>
          {open && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                <FiUser className="text-primary" />
                Profile
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
              >
                <FiLogOut className="text-primary" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}