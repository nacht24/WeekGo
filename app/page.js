'use client';
import 'animate.css'; // Import Animate.css
import './globals.css';

import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-300 text-white">
      {/* Animasi Logo (Fade In + Slide Up) */}
      <div className="animate__animated animate__fadeInUp animate__delay-1s animate__slow">
        <img
          src="/images/weekgo_logo.svg"
          alt="WeekGo Logo"
          className="w-48 h-auto mb-8 transform transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Deskripsi Singkat (Fade In + Slide Up Animation) */}
      <p className="animate__animated animate__fadeInUp animate__delay-2s animate__slow text-lg text-center mb-8 px-6 max-w-lg text-gray-800">
        WeekGo adalah platform penyewaan penginapan jangka menengah yang memberikan kemudahan dan fleksibilitas harga dengan sistem mingguan. Temukan penginapan yang sesuai dengan kebutuhan Anda!
      </p>

      {/* Tombol untuk Guest dan Host (Fade In + Slide Up Animation) */}
      <div className="flex space-x-6 animate__animated animate__fadeInUp animate__delay-3s animate__slow">
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
      </div>
    </div>
  );
}
