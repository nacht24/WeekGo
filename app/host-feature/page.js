'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUserFriends, FaDoorOpen, FaBed, FaBath,
  FaWifi, FaSnowflake, FaTv, FaCar, FaSwimmingPool, FaUtensils,
} from 'react-icons/fa';
import { GiShower } from 'react-icons/gi';
import FloatingChat from '../../components/FloatingChat';

export default function HostFeaturePage() {
  const [propertyName, setPropertyName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [details, setDetails] = useState({
    Guest: '',
    BedRoom: '',
    Bed: '',
    BathRoom: '',
  });
  const [facilities, setFacilities] = useState([]);
  const [prices, setPrices] = useState({
    '3hari': '',
    '1minggu': '',
    '2minggu': '',
    '3minggu': '',
    'nego': '',
  });
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (
      !propertyName || !description || !address ||
      Object.values(prices).some((val) => !val) || photos.length === 0
    ) {
      alert('Silakan lengkapi semua field, termasuk alamat dan foto.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Properti berhasil disimpan!');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <motion.div
      className="min-h-screen bg-white flex items-center justify-center py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-8 p-6">
        {/* KIRI */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-2xl font-semibold mb-4">Foto Properti</h2>
          <div className="grid grid-cols-3 grid-rows-2 gap-2 h-72 border-2 border-dashed border-gray-400 rounded-xl p-2">
            {[0, 1, 2].map((idx) => (
              <label
                key={idx}
                className={`relative ${idx === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'} overflow-hidden rounded-xl cursor-pointer group border border-gray-300`}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple={idx === 2}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const files = Array.from(e.target.files).slice(0, 8);
                    const newUrls = files.map((file) => URL.createObjectURL(file));
                    setPhotos((prev) => {
                      const keep = prev.slice(0, idx);
                      return [...keep, ...newUrls].slice(0, 10);
                    });
                  }}
                />
                {photos[idx] && (
                  <img src={photos[idx]} className="w-full h-full object-cover" alt={`Foto ${idx + 1}`} />
                )}
                <div className="absolute inset-0 bg-gray-300 bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="text-white text-4xl font-bold">+</span>
                </div>
              </label>
            ))}
          </div>

          {/* Deskripsi */}
          <div className="mt-6">
            <label className="block font-semibold text-lg mb-2">Deskripsi</label>
            <textarea
              rows={4}
              placeholder="Masukkan deskripsi lengkap tentang properti Anda"
              className="w-full border border-gray-300 rounded-md p-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Detail Properti */}
          <div className="mt-6">
            <label className="block font-semibold text-lg mb-2">Detail Properti</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: <FaUserFriends />, key: 'Guest', label: 'Guest' },
                { icon: <FaDoorOpen />, key: 'BedRoom', label: 'Bed Room' },
                { icon: <FaBed />, key: 'Bed', label: 'Bed' },
                { icon: <FaBath />, key: 'BathRoom', label: 'Bath Room' },
              ].map(({ icon, key, label }) => (
                <div
                  key={key}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md shadow-sm"
                >
                  <span className="text-[#00B5E2] text-lg">{icon}</span>
                  <input
                    type="number"
                    placeholder={label}
                    value={details[key]}
                    onChange={(e) =>
                      setDetails({ ...details, [key]: e.target.value })
                    }
                    className="w-full bg-transparent focus:outline-none text-sm text-gray-700 appearance-none"
                    min="0"
                    onWheel={(e) => e.target.blur()} // disable scroll input
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KANAN */}
        <div className="md:w-1/2 w-full space-y-6">
          <div>
            <label className="block font-semibold text-lg mb-2">Nama Properti</label>
            <input
              type="text"
              placeholder="Contoh: Villa Private Pool, Bali"
              className="w-full border border-gray-300 rounded-md p-3"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">Alamat Lengkap</label>
            <textarea
              rows={2}
              placeholder="Masukkan alamat lengkap properti"
              className="w-full border border-gray-300 rounded-md p-3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="font-semibold text-lg">Status:</label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
              className="w-5 h-5"
            />
            <span>{isActive ? 'Aktif (Tampil Publik)' : 'Nonaktif (Disembunyikan)'}</span>
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2">Harga per Durasi</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '3 Hari', key: '3hari' },
                { label: '1 Minggu', key: '1minggu' },
                { label: '2 Minggu', key: '2minggu' },
                { label: '3 Minggu', key: '3minggu' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="text-sm font-medium">{label}</label>
                  <input
                    type="number"
                    placeholder="Rp"
                    className="w-full p-2 border border-gray-300 rounded-md mt-1"
                    value={prices[key]}
                    onChange={(e) =>
                      setPrices((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Fasilitas Tanpa Kotak */}
          <div>
            <label className="block font-semibold text-lg mb-2">Fasilitas</label>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: <FaWifi />, label: 'Wi-Fi', key: 'wifi' },
                { icon: <FaSnowflake />, label: 'AC', key: 'ac' },
                { icon: <FaTv />, label: 'TV', key: 'tv' },
                { icon: <FaCar />, label: 'Parkir', key: 'parking' },
                { icon: <FaBath />, label: 'Bathtub', key: 'bathtub' },
                { icon: <GiShower />, label: 'Shower', key: 'shower' },
                { icon: <FaUtensils />, label: 'Dapur', key: 'kitchen' },
                { icon: <FaSwimmingPool />, label: 'Kolam Renang', key: 'pool' },
              ].map(({ icon, label, key }) => (
                <label key={key} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={facilities.includes(key)}
                    onChange={() =>
                      setFacilities((prev) =>
                        prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
                      )
                    }
                    className="accent-blue-500"
                  />
                  <span className="text-[#00B5E2]">{icon}</span>
                  {label}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={
              isSubmitting
                ? {}
                : { backgroundColor: '#00B5E2' }
            }
            className={`w-full py-3 rounded-md text-white font-semibold transition duration-200 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'hover:brightness-110'
              }`}
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan Properti'}
          </button>
        </div>
      </div>

      <FloatingChat />
    </motion.div>
  );
}
