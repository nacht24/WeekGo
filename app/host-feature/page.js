'use client';
import { useState } from 'react';

export default function HostFeaturePage() {
  const [propertyName, setPropertyName] = useState('');
  const [description, setDescription] = useState('');
  const [price3Days, setPrice3Days] = useState('');
  const [price1Week, setPrice1Week] = useState('');
  const [price2Weeks, setPrice2Weeks] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoChange = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = () => {
    if (!propertyName || !description || !price3Days || !price1Week || !price2Weeks || !photo) {
      alert('Silakan lengkapi semua field dan unggah foto.');
      return;
    }

    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      alert('Fitur berhasil disimpan!');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Bagian Atas: Navbar dengan Logo dan Teks Host */}
      <div className="bg-white text-blue-800 flex justify-between items-center p-4">
        <img
          src="/images/weekgo_logo_horizontal.svg"
          alt="WeekGo Logo"
          className="w-48 h-auto"
        />
        <h1 className="text-2xl font-semibold">Host</h1>
      </div>

      {/* Bagian Konten dengan Background Gradien Biru */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-blue-700 text-gray-600 p-8 flex-1">
        
        {/* Deskripsi Fitur */}
        <p className="text-lg text-center mb-8 px-6 max-w-lg text-gray-800">
          Di halaman ini, Anda dapat mengelola properti Anda, melihat pendapatan, menerima notifikasi, dan memverifikasi status host. Fitur ini sedang dalam pengembangan dan belum dapat diakses.
        </p>

        {/* Form Input untuk Host */}
        <div className="w-full max-w-lg bg-gray-200 p-8 rounded-xl">
          {/* Input Foto */}
          <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Foto Properti</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="border p-2 rounded-md w-full"
            />
            {photo && (
              <div className="mt-4 w-48 h-48 overflow-hidden">
                <img src={photo} alt="Property" className="w-full h-full object-cover rounded-xl" />
              </div>
            )}
          </div>

          <h3 className="text-2xl font-semibold mb-4">Nama Properti</h3>
          <input
            type="text"
            placeholder="Masukkan nama tempat"
            className="w-full p-2 mb-6 border rounded-md"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
          />

          <h3 className="text-2xl font-semibold mb-4">Deskripsi</h3>
          <textarea
            placeholder="Masukkan deskripsi properti"
            className="w-full p-2 mb-6 border rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

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

          <button
            className={`bg-blue-700 text-white px-8 py-4 rounded-xl text-lg shadow-xl w-full ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : ''}`}
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
