'use client';
import { useState } from 'react';

export default function HostFeaturePage() {
  const [propertyName, setPropertyName] = useState('');
  const [description, setDescription] = useState('');
  const [price3Days, setPrice3Days] = useState('');
  const [price1Week, setPrice1Week] = useState('');
  const [price2Weeks, setPrice2Weeks] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (
      !propertyName ||
      !description ||
      !price3Days ||
      !price1Week ||
      !price2Weeks ||
      photos.length === 0
    ) {
      alert('Silakan lengkapi semua field dan unggah minimal satu foto.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      alert('Fitur berhasil disimpan!');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-white text-blue-800 flex justify-between items-center p-4">
        <img
          src="/images/weekgo_logo_horizontal.svg"
          alt="WeekGo Logo"
          className="w-48 h-auto"
        />
        <h1 className="text-2xl font-semibold">Host</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-blue-700 text-gray-600 p-8 flex-1">
        <p className="text-lg text-center mb-8 px-6 max-w-lg text-gray-800">
          Di halaman ini, Anda dapat mengelola properti Anda, melihat pendapatan, menerima notifikasi, dan memverifikasi status host. Fitur ini sedang dalam pengembangan dan belum dapat diakses.
        </p>

        {/* Form */}
        <div className="w-full max-w-lg bg-gray-200 p-8 rounded-xl">
          {/* Foto Properti Grid */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4">Foto Properti</h3>
            <div className="grid grid-cols-3 grid-rows-2 gap-2 h-72 border-2 border-dashed border-gray-400 rounded-xl p-2">
              {/* Foto 1 – Besar kiri */}
              <label className="relative col-span-2 row-span-2 overflow-hidden rounded-xl cursor-pointer group border border-gray-300">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const newPhoto = URL.createObjectURL(file);
                      setPhotos((prev) => {
                        const updated = [...prev];
                        updated[0] = newPhoto;
                        return updated;
                      });
                    }
                  }}
                />
                {photos[0] && (
                  <img src={photos[0]} className="w-full h-full object-cover" alt="Foto 1" />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="text-white text-4xl font-bold">+</span>
                </div>
              </label>

              {/* Foto 2 – Kanan atas */}
              <label className="relative col-span-1 row-span-1 overflow-hidden rounded-xl cursor-pointer group border border-gray-300">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const newPhoto = URL.createObjectURL(file);
                      setPhotos((prev) => {
                        const updated = [...prev];
                        updated[1] = newPhoto;
                        return updated;
                      });
                    }
                  }}
                />
                {photos[1] && (
                  <img src={photos[1]} className="w-full h-full object-cover" alt="Foto 2" />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="text-white text-4xl font-bold">+</span>
                </div>
              </label>

              {/* Foto 3 – Kanan bawah, bisa upload multiple */}
              <label className="relative col-span-1 row-span-1 overflow-hidden rounded-xl cursor-pointer group border border-gray-300">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const files = Array.from(e.target.files).slice(0, 8);
                    const newUrls = files.map((file) => URL.createObjectURL(file));
                    setPhotos((prev) => {
                      const keep = prev.slice(0, 2);
                      return [...keep, ...newUrls].slice(0, 10);
                    });
                  }}
                />
                {photos[2] && (
                  <img src={photos[2]} className="w-full h-full object-cover" alt="Foto 3" />
                )}
                {photos.length > 3 && (
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-sm px-2 py-1 rounded-md">
                    +{photos.length - 3}
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <span className="text-white text-4xl font-bold">+</span>
                </div>
              </label>
            </div>
          </div>

          {/* Nama Properti */}
          <h3 className="text-2xl font-semibold mb-4">Nama Properti</h3>
          <input
            type="text"
            placeholder="Masukkan nama tempat"
            className="w-full p-2 mb-6 border rounded-md"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
          />

          {/* Deskripsi */}
          <h3 className="text-2xl font-semibold mb-4">Deskripsi</h3>
          <textarea
            placeholder="Masukkan deskripsi properti"
            className="w-full p-2 mb-6 border rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Durasi dan Harga */}
          <h3 className="text-2xl font-semibold mb-4">Pilih Durasi</h3>
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4">
              <label className="w-1/3">3 Hari</label>
              <input
                type="number"
                placeholder="Harga"
                className="w-2/3 p-2 border rounded-md"
                value={price3Days}
                onChange={(e) => setPrice3Days(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-1/3">1 Minggu</label>
              <input
                type="number"
                placeholder="Harga"
                className="w-2/3 p-2 border rounded-md"
                value={price1Week}
                onChange={(e) => setPrice1Week(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-1/3">2 Minggu</label>
              <input
                type="number"
                placeholder="Harga"
                className="w-2/3 p-2 border rounded-md"
                value={price2Weeks}
                onChange={(e) => setPrice2Weeks(e.target.value)}
              />
            </div>
          </div>

          {/* Tombol Submit */}
          <button
            className={`bg-blue-700 text-white px-8 py-4 rounded-xl text-lg shadow-xl w-full ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : ''
            }`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sedang Menyimpan...' : 'Simpan Properti'}
          </button>
        </div>
      </div>
    </div>
  );
}
