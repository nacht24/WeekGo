'use client';
import React, {useState, useEffect} from 'react';
import {
  FaStar,
  FaMapMarkerAlt,
  FaShareAlt,
  FaHeart,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaUserFriends,
  FaBed,
  FaBath,
  FaDoorOpen,
  FaChevronLeft,
  FaChevronRight,
  FaRegCommentDots, // Tambahkan icon pesan
} from 'react-icons/fa';
import {FaShower, FaWifi, FaSnowflake, FaUtensils, FaCar, FaSwimmingPool, FaTv} from 'react-icons/fa';
import Image from 'next/image';
import {motion, AnimatePresence} from 'framer-motion';
import FloatingChat from '@/components/FloatingChat'; // sudah ada

const dummyProperties = [
  {
    id: 1,
    name: 'Villa Private Pool, Bali',
    image: '/images/home.avif',
    rating: '4.32',
    price3Days: 500000,
    price1Week: 1200000,
    price2Weeks: 2000000,
    location: 'Bali',
  },
  {
    id: 2,
    name: 'Apartment Studio Jakarta Selatan',
    image: '/images/home.avif',
    rating: '4.85',
    price3Days: 350000,
    price1Week: 900000,
    price2Weeks: 1600000,
    location: 'Jakarta Selatan',
  },
  {
    id: 3,
    name: 'Rumah Modern Minimalis Surabaya',
    image: '/images/home.avif',
    rating: '4.80',
    price3Days: 400000,
    price1Week: 1250000,
    price2Weeks: 2100000,
    location: 'Surabaya',
  },
  {
    id: 4,
    name: 'Kost Eksklusif Depok',
    image: '/images/home.avif',
    rating: '4.70',
    price3Days: 250000,
    price1Week: 700000,
    price2Weeks: 1200000,
    location: 'Depok',
  },
  {
    id: 5,
    name: 'Guesthouse Jogja Tengah Kota',
    image: '/images/home.avif',
    rating: '4.88',
    price3Days: 300000,
    price1Week: 1100000,
    price2Weeks: 1800000,
    location: 'Yogyakarta',
  },
  {
    id: 6,
    name: 'Rumah Keluarga Bandung Utara',
    image: '/images/home.avif',
    rating: '4.95',
    price3Days: 450000,
    price1Week: 1350000,
    price2Weeks: 2200000,
    location: 'Bandung',
  },
  {
    id: 7,
    name: 'Apartemen Mewah BSD City',
    image: '/images/home.avif',
    rating: '4.77',
    price3Days: 380000,
    price1Week: 980000,
    price2Weeks: 1700000,
    location: 'Tangerang',
  },
  {
    id: 8,
    name: 'Homestay Dekat Malioboro',
    image: '/images/home.avif',
    rating: '4.65',
    price3Days: 270000,
    price1Week: 800000,
    price2Weeks: 1400000,
    location: 'Yogyakarta',
  },
  {
    id: 9,
    name: 'Villa Puncak View Gunung',
    image: '/images/home.avif',
    rating: '4.90',
    price3Days: 600000,
    price1Week: 1500000,
    price2Weeks: 2500000,
    location: 'Bogor',
  },
  {
    id: 10,
    name: 'Rumah Minimalis Alam Sutera',
    image: '/images/home.avif',
    rating: '4.60',
    price3Days: 320000,
    price1Week: 900000,
    price2Weeks: 1600000,
    location: 'Tangerang',
  },
  {
    id: 11,
    name: 'Kost Putri Dekat UI',
    image: '/images/home.avif',
    rating: '4.50',
    price3Days: 200000,
    price1Week: 600000,
    price2Weeks: 1100000,
    location: 'Depok',
  },
  {
    id: 12,
    name: 'Apartment Green Pramuka',
    image: '/images/home.avif',
    rating: '4.40',
    price3Days: 300000,
    price1Week: 850000,
    price2Weeks: 1550000,
    location: 'Jakarta Pusat',
  },
  {
    id: 13,
    name: 'Guesthouse Dekat Pantai Sanur',
    image: '/images/home.avif',
    rating: '4.70',
    price3Days: 350000,
    price1Week: 950000,
    price2Weeks: 1700000,
    location: 'Bali',
  },
  {
    id: 14,
    name: 'Rumah Keluarga Cihampelas',
    image: '/images/home.avif',
    rating: '4.80',
    price3Days: 420000,
    price1Week: 1200000,
    price2Weeks: 2100000,
    location: 'Bandung',
  },
  {
    id: 15,
    name: 'Homestay Dekat Alun-Alun Batu',
    image: '/images/home.avif',
    rating: '4.68',
    price3Days: 280000,
    price1Week: 750000,
    price2Weeks: 1300000,
    location: 'Malang',
  },
];

function DetailSkeleton() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 animate-pulse">
        <div className="w-full md:w-2/3 space-y-4">
          <div className="h-96 bg-gray-200 rounded-xl" />
          <div className="h-8 bg-gray-200 rounded w-2/3" />
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>
      </div>
    </main>
  );
}

export default function PropertyDetail({params}) {
  const actualParams = React.use(params);
  const {id} = actualParams;
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Booking state
  const [duration, setDuration] = useState('3'); // '3', '7', '14', 'custom'
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showChat, setShowChat] = useState(false); // Tambah state untuk chat
  const [pendingChatMsg, setPendingChatMsg] = useState(null); // Tambah state

  // State untuk baca selengkapnya
  const [showFullDesc, setShowFullDesc] = useState(false);

  // State untuk gallery modal
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const property = dummyProperties.find((p) => p.id === Number(id));

  // Ganti dengan gambar dari public/images/property/
  const galleryImages = [
    '/images/property/home1.jpeg',
    '/images/property/home2.jpeg',
    '/images/property/home3.jpeg',
    '/images/property/home4.jpeg',
    '/images/property/home5.jpeg',
    '/images/property/home6.jpeg',
    '/images/property/home7.jpeg',
  ];

  // Ubah perhitungan price
  let price = 0;
  if (duration === '3') price = property?.price3Days || 0;
  else if (duration === '7') price = property?.price1Week || 0;
  else if (duration === '14') price = property?.price2Weeks || 0;
  // Jika custom, price tetap 0 atau tampilkan "Hubungi host"

  // Deskripsi lorem ipsum (sama untuk semua properti)
  const fullDesc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Suspendisse potenti. Etiam ac mauris vitae urna fermentum tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Nullam dictum, enim at convallis dictum, enim enim dictum enim, at convallis enim enim at enim.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.

Vivamus suscipit tortor eget felis porttitor volutpat. Proin eget tortor risus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Pellentesque in ipsum id orci porta dapibus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla porttitor accumsan tincidunt.`;

  const shortDesc = fullDesc.split('\n').slice(0, 2).join(' ');

  // Dummy info property
  const info = {
    guests: 2,
    bedrooms: 2,
    beds: 3,
    baths: 1,
    reviews: 80,
  };

  const [showAll, setShowAll] = useState(false);

  if (isLoading) return <DetailSkeleton />;
  if (!property) return <div>Properti tidak ditemukan.</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div
        className="flex flex-col lg:flex-row gap-10"
        initial={{opacity: 0, y: 32}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5, ease: 'easeOut'}}
      >
        {/* Kiri: Header, Foto & Detail */}
        <motion.div
          className="w-full lg:w-2/3"
          initial={{opacity: 0, x: -40}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.5, delay: 0.15, ease: 'easeOut'}}
        >
          {/* Header */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, delay: 0.25}}
          >
            <button
              className="p-2 rounded-full hover:bg-primary/10 transition cursor-pointer"
              onClick={() => window.history.back()}
              aria-label="Kembali"
            >
              <FaArrowLeft className="text-primary text-xl" />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold flex-1">{property.name}</h1>
          </motion.div>
          {/* Gallery Images */}
          <motion.div
            className="mb-6"
            initial={{opacity: 0, scale: 0.97}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5, delay: 0.3}}
          >
            <div className="grid grid-cols-3 grid-rows-2 gap-2 h-72 md:h-96">
              {/* Gambar besar kiri */}
              <div className="relative row-span-2 col-span-2 rounded-l-lg overflow-hidden">
                <Image
                  src={galleryImages[0]}
                  alt="Foto properti 1"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Gambar kanan atas */}
              <div className="relative rounded-tr-lg overflow-hidden">
                <Image
                  src={galleryImages[1]}
                  alt="Foto properti 2"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Gambar kanan bawah dengan blur & overlay */}
              <div
                className="relative rounded-br-lg overflow-hidden group cursor-pointer"
                onClick={() => setShowAll(true)}
              >
                <Image
                  src={galleryImages[2]}
                  alt="Foto properti 3"
                  fill
                  className="object-cover blur-[2px] brightness-75 group-hover:blur-[3px] group-hover:brightness-50 transition"
                />
                <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg md:text-xl">
                  Lihat semua foto
                </span>
              </div>
            </div>
            {/* Modal gallery */}
            {showAll && (
              <AnimatePresence>
                <motion.div
                  className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center px-2"
                  onClick={() => setShowAll(false)}
                  id="modal-gallery-overlay"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.25}}
                  style={{backdropFilter: 'blur(2px)'}}
                >
                  <motion.div
                    className="w-full max-w-3xl flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                    initial={{y: 40, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={{y: 40, opacity: 0}}
                    transition={{duration: 0.25}}
                  >
                    <GalleryModal images={galleryImages} />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
          {/* Info property di bawah foto */}
          <motion.div
            className="flex items-center text-gray-700 text-base md:text-lg font-medium mb-2"
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, delay: 0.45}}
          >
            <span className="flex items-center gap-2">
              <FaUserFriends className="text-primary text-xl" /> {info.guests} guest
            </span>
            <span className="mx-2 text-gray-400 text-lg">•</span>
            <span className="flex items-center gap-2">
              <FaDoorOpen className="text-primary text-xl" /> {info.bedrooms} bedroom
            </span>
            <span className="mx-2 text-gray-400 text-lg">•</span>
            <span className="flex items-center gap-2">
              <FaBed className="text-primary text-xl" /> {info.beds} bed
            </span>
            <span className="mx-2 text-gray-400 text-lg">•</span>
            <span className="flex items-center gap-2">
              <FaBath className="text-primary text-xl" /> {info.baths} bath
            </span>
          </motion.div>
          {/* Rating & review di bawah info */}
          <motion.div
            className="flex items-center text-gray-700 mb-4 text-base md:text-lg font-medium"
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, delay: 0.55}}
          >
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-400 text-xl" />
              <span className="font-semibold text-primary">{property.rating}</span>
            </span>
            <span className="mx-2 text-gray-400 text-lg">•</span>
            <span>{info.reviews} Reviews</span>
          </motion.div>

          <div className="border-b border-gray-200 mb-6"></div>

          {/* Host Info Section */}
          <motion.div
            className="flex items-center gap-4 mb-4"
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, delay: 0.6}}
          >
            <div className="flex items-center gap-3">
              {/* Avatar inisial dinamis */}
              <div
                className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center text-primary font-bold text-lg select-none"
                style={{minWidth: 48, minHeight: 48}}
              >
                {getInitials('Nia')}
              </div>
              <div>
                <span className="block text-xs text-gray-500">Hosting oleh</span>
                <span className="block font-semibold text-gray-800">Nia</span>
              </div>
            </div>
            <button
              type="button"
              className="ml-2 flex items-center justify-center w-10 h-10 rounded-full transition cursor-pointer bg-gray-100 hover:bg-gray-200"
              onClick={() => {
                setPendingChatMsg('Halo Kak Nia, saya ingin bertanya tentang properti ini.');
                document.getElementById('floating-chat-btn')?.click();
              }}
              aria-label="Kirim pesan ke host"
            >
              <FaRegCommentDots className="text-xl text-primary" />
            </button>
          </motion.div>

          {/* Garis pembatas */}
          <div className="border-b border-gray-200 mb-6"></div>
          {/* Detail */}
          <motion.div
            className="mb-6"
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, delay: 0.65}}
          >
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <FaMapMarkerAlt className="text-primary" />
              <span className="text-sm">Surabaya • Indonesia</span>
            </div>
            <div className="text-gray-700 whitespace-pre-line text-justify">
              {showFullDesc ? (
                <>
                  {fullDesc.split('\n').map((p, i) => (
                    <p
                      key={i}
                      className="mb-3"
                    >
                      {p.trim()}
                    </p>
                  ))}
                  <button
                    className="flex items-center gap-1 text-primary font-semibold mt-1 cursor-pointer bg-transparent border-0 p-0 group"
                    onClick={() => setShowFullDesc(false)}
                    style={{outline: 'none'}}
                  >
                    <span className="no-underline group-hover:underline underline-offset-2 decoration-primary decoration-2 transition-all duration-150">
                      baca lebih sedikit
                    </span>
                    <FaChevronRight
                      className="inline-block align-middle text-sm"
                      style={{marginTop: '-1px', transform: 'rotate(180deg)'}}
                    />
                  </button>
                </>
              ) : (
                <p className="mb-3">{shortDesc}...</p>
              )}
              {!showFullDesc && (
                <button
                  className="flex items-center gap-1 text-primary font-semibold mt-1 cursor-pointer bg-transparent border-0 p-0 group"
                  onClick={() => setShowFullDesc(true)}
                  style={{outline: 'none'}}
                >
                  <span className="no-underline group-hover:underline underline-offset-2 decoration-primary decoration-2 transition-all duration-150">
                    baca selengkapnya
                  </span>
                  <FaChevronRight
                    className="inline-block align-middle text-sm"
                    style={{marginTop: '-1px'}}
                  />
                </button>
              )}
            </div>
          </motion.div>
          {/* Garis pembatas setelah deskripsi */}
          <div className="border-b border-gray-200 mb-6"></div>
          {/* Fasilitas Properti */}
          <motion.div
            className="mb-8"
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, delay: 0.75}}
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Fasilitas yang tersedia</h2>
            <div className="grid grid-cols-3 grid-rows-3 gap-x-6 gap-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl">
                  <FaWifi />
                </span>
                <span>Wifi</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl">
                  <FaSnowflake />
                </span>
                <span>AC</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl">
                  <FaUtensils />
                </span>
                <span>Dapur</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl">
                  <FaCar />
                </span>
                <span>Parkir mobil</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl">
                  <FaSwimmingPool />
                </span>
                <span>Kolam renang</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl">
                  <FaTv />
                </span>
                <span>TV</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl">
                  <FaBath />
                </span>
                <span>Bathub</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl">
                  <FaHeart />
                </span>
                <span>Water Heater</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl">
                  <FaShower />
                </span>
                <span>Shower</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        {/* Kanan: Booking Box */}
        <motion.div
          className="w-full lg:w-1/3"
          initial={{opacity: 0, x: 40}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.5, delay: 0.25, ease: 'easeOut'}}
        >
          <div className="sticky top-32 bg-white rounded-2xl shadow-xl p-6 space-y-6 border border-gray-200">
            {/* Grouped Durasi & Jumlah Tamu Dropdown */}
            <div className="mb-2">
              <div className="rounded-t-xl border border-b-0 border-gray-200">
                <div className="relative">
                  <label className="absolute left-4 top-1 text-xs text-gray-500 pointer-events-none z-10">Pilih Durasi Sewa</label>
                  <CustomDurasiDropdown
                    value={duration}
                    onChange={setDuration}
                    customClass="rounded-none"
                    labelHidden
                  />
                </div>
              </div>
              {/* Garis pembatas tipis antara dua dropdown */}
              <div className="border-t border-gray-200 mx-4" />
              <div className="rounded-b-xl border border-t-0 border-gray-200">
                <div className="relative">
                  <label className="absolute left-4 top-1 text-xs text-gray-500 pointer-events-none z-10">Jumlah Tamu</label>
                  <JumlahTamuDropdown
                    adults={adults}
                    setAdults={setAdults}
                    setChildren={setChildren}
                    customClass="rounded-none"
                    labelHidden
                  >
                    {children}
                  </JumlahTamuDropdown>
                </div>
              </div>
            </div>
            {/* Jarak antar dropdown dan garis pembatas diperkecil */}
            <div className="h-2" />
            {/* Garis pembatas lebih tipis dan warna sama seperti garis lain */}
            <div className="border-t border-gray-200" />
            {/* Jarak antara garis pembatas dan harga total diperkecil */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">Harga Total</span>
                <span className="font-bold text-xl text-primary">
                  {duration === 'custom' ? 'Hubungi host' : `Rp ${price.toLocaleString('id-ID')}`}
                </span>
              </div>
              {duration === 'custom' ? (
                <button
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:brightness-110 transition"
                  onClick={() => {
                    setPendingChatMsg('Permisi kak, aku ingin pesan untuk durasi lain');
                    // Buka floating chat dengan pesan siap dikirim
                    document.getElementById('floating-chat-btn')?.click();
                  }}
                >
                  Chat Host untuk Durasi Lain
                </button>
              ) : (
                <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:brightness-110 transition">
                  Pesan Sekarang
                </button>
              )}
            </div>
          </div>
          {/* Tampilkan chat jika showChat true */}
          {showChat && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40"
              onClick={() => setShowChat(false)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                {/* Import dan render FloatingChat di sini */}
                {/* Contoh: */}
                {/* <FloatingChat /> */}
                <div className="bg-white rounded-2xl shadow-xl p-4">
                  <p>Chat host di sini (integrasikan komponen FloatingChat.js sesuai kebutuhan)</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
      {/* Tambahkan FloatingChat di sini agar selalu muncul di pojok kanan bawah */}
      <FloatingChat
        userType="guest"
        pendingMessage={pendingChatMsg}
        setPendingMessage={setPendingChatMsg}
      />
    </main>
  );
}

// Tambahkan komponen dropdown custom di bawah export default:
function CustomDurasiDropdown({value, onChange, customClass = '', labelHidden = false}) {
  const [open, setOpen] = useState(false);
  const options = [
    {value: '3', label: '3 Hari'},
    {value: '7', label: '1 Minggu'},
    {value: '14', label: '2 Minggu'},
    {value: 'custom', label: 'Durasi lain (hubungi host)'},
  ];
  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest('.dropdown-durasi')) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className={`dropdown-durasi relative ${customClass}`}>
      {!labelHidden && <label className="absolute left-4 top-1 text-xs text-gray-500 pointer-events-none z-10">Pilih Durasi Sewa</label>}
      <button
        type="button"
        className="w-full px-4 pt-6 pb-3 text-left bg-white focus:outline-primary flex justify-between items-center cursor-pointer transition-colors hover:bg-gray-100"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{selected?.label || 'Pilih Durasi'}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 z-20 mt-0 w-full bg-white border border-t-0 border-gray-200 rounded-b-xl shadow-lg py-2">
          {/* Garis pembatas antara kotak dropdown dan option */}
          <div className="border-t border-gray-200 mb-2" />
          {options.map((opt, idx) => (
            <React.Fragment key={opt.value}>
              <div
                className={`px-4 py-3 hover:bg-gray-200 cursor-pointer text-base ${
                  value === opt.value ? 'text-primary font-semibold' : 'text-gray-700'
                }`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </div>
              {idx < options.length - 1 && <div className="border-t border-gray-200 mx-2" />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

function JumlahTamuDropdown({adults, children, setAdults, setChildren, customClass = '', labelHidden = false}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest('.dropdown-tamu')) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const MinusIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <line
        x1="4"
        y1="8"
        x2="12"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
  const PlusIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <line
        x1="4"
        y1="8"
        x2="12"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="4"
        x2="8"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className={`dropdown-tamu relative ${customClass}`}>
      {!labelHidden && <label className="absolute left-4 top-1 text-xs text-gray-500 pointer-events-none z-10">Jumlah Tamu</label>}
      <button
        type="button"
        className="w-full px-4 pt-6 pb-3 text-left bg-white focus:outline-primary flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          {adults + children} tamu
          <span className="text-gray-400 ml-2 text-sm">
            ({adults} dewasa
            {children > 0 ? `, ${children} anak` : ''})
          </span>
        </span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 z-20 mt-0 w-full bg-white border border-t-0 border-gray-200 rounded-b-xl shadow-lg p-4 space-y-4">
          {/* Garis pembatas antara kotak dropdown dan option */}
          <div className="border-t border-gray-200 mb-4" />
          {/* Dewasa */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <span className="text-gray-700">Dewasa</span>
            <div className="flex items-center min-w-[120px]">
              <button
                className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-200 cursor-pointer text-lg transition-colors"
                onClick={() => setAdults(Math.max(1, adults - 1))}
                type="button"
                aria-label="Kurangi Dewasa"
              >
                <MinusIcon />
              </button>
              <span className="mx-2 text-gray-300 select-none text-xl">|</span>
              <span className="w-8 flex items-center justify-center text-base font-semibold select-none">{adults}</span>
              <span className="mx-2 text-gray-300 select-none text-xl">|</span>
              <button
                className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-200 cursor-pointer text-lg transition-colors"
                onClick={() => setAdults(adults + 1)}
                type="button"
                aria-label="Tambah Dewasa"
              >
                <PlusIcon />
              </button>
            </div>
          </div>
          {/* Anak */}
          <div className="flex items-center justify-between pt-4">
            <span className="text-gray-700">Anak</span>
            <div className="flex items-center min-w-[120px]">
              <button
                className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-200 cursor-pointer text-lg transition-colors"
                onClick={() => setChildren(Math.max(0, children - 1))}
                type="button"
                aria-label="Kurangi Anak"
              >
                <MinusIcon />
              </button>
              <span className="mx-2 text-gray-300 select-none text-xl">|</span>
              <span className="w-8 flex items-center justify-center text-base font-semibold select-none">{children}</span>
              <span className="mx-2 text-gray-300 select-none text-xl">|</span>
              <button
                className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-200 cursor-pointer text-lg transition-colors"
                onClick={() => setChildren(children + 1)}
                type="button"
                aria-label="Tambah Anak"
              >
                <PlusIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Tambahkan komponen GalleryModal di bawah komponen lain:
function GalleryModal({images}) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const next = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // Disable scroll body saat modal tampil & enable lagi saat modal hilang
  useEffect(() => {
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Event scroll untuk switch gambar
  useEffect(() => {
    const handleWheel = (e) => {
      const modal = document.getElementById('modal-gallery-overlay');
      if (modal && modal.contains(e.target)) {
        e.preventDefault();
        if (e.deltaY > 0) next();
        else if (e.deltaY < 0) prev();
      }
    };
    window.addEventListener('wheel', handleWheel, {passive: false});
    return () => window.removeEventListener('wheel', handleWheel);
    // eslint-disable-next-line
  }, [current, images.length]);

  return (
    <div className="w-full max-w-3xl flex flex-col items-center select-none">
      {/* Foto utama */}
      <div className="relative w-full aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center mb-4">
        {/* Hilangkan AnimatePresence & motion.div agar tidak ada transisi flash */}
        <Image
          src={images[current]}
          alt={`Foto properti ${current + 1}`}
          fill
          className="object-cover"
          priority
        />
        {/* Tombol kiri */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl transition cursor-pointer"
          onClick={prev}
          aria-label="Sebelumnya"
        >
          <FaChevronLeft />
        </button>
        {/* Tombol kanan */}
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl transition cursor-pointer"
          onClick={next}
          aria-label="Selanjutnya"
        >
          <FaChevronRight />
        </button>
      </div>
      {/* Thumbnail horizontal */}
      <div className="flex gap-2 overflow-x-auto w-full pb-2">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition 
              ${idx === current ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
            onClick={() => setCurrent(idx)}
            whileHover={{scale: 1.07}}
            animate={{borderColor: idx === current ? '#3b82f6' : 'transparent'}}
            transition={{duration: 0.15}}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="96px"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Tambahkan fungsi helper di bawah komponen lain:
function getInitials(name) {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
