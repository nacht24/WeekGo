'use client';
import React, {useState, useEffect} from 'react';
import {FaStar, FaMapMarkerAlt, FaShareAlt, FaHeart, FaMinus, FaPlus, FaArrowLeft, FaUserFriends, FaBed, FaBath, FaDoorOpen} from 'react-icons/fa';
import { FaWifi, FaSnowflake, FaUtensils, FaCar, FaSwimmingPool, FaTv } from 'react-icons/fa';
import Image from 'next/image';

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
  const [duration, setDuration] = useState('3'); // '3', '7', '14'
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

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

  let price = 0;
  if (duration === '3') price = property?.price3Days || 0;
  else if (duration === '7') price = property?.price1Week || 0;
  else if (duration === '14') price = property?.price2Weeks || 0;

  // Deskripsi lorem ipsum (sama untuk semua properti)
  const fullDesc = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Suspendisse potenti. Etiam ac mauris vitae urna fermentum tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Nullam dictum, enim at convallis dictum, enim enim dictum enim, at convallis enim enim at enim.

    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.`;

  const shortDesc = fullDesc.split('\n').slice(0, 2).join(' ');

  // Dummy info property
  const info = {
    guests: 2,
    bedrooms: 2,
    beds: 3,
    baths: 1,
    reviews: 80,
  };

  // Dummy gallery images (sama untuk semua properti)
  const galleryImages = [
    '/images/home.avif',
    '/images/home2.avif',
    '/images/home3.avif',
    '/images/home4.avif',
    '/images/home5.avif',
    '/images/home6.avif',
  ];

  const [showAll, setShowAll] = useState(false);

  if (isLoading) return <DetailSkeleton />;
  if (!property) return <div>Properti tidak ditemukan.</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Kiri: Header, Foto & Detail */}
        <div className="w-full lg:w-2/3">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <button
              className="p-2 rounded-full hover:bg-primary/10 transition cursor-pointer"
              onClick={() => window.history.back()}
              aria-label="Kembali"
            >
              <FaArrowLeft className="text-primary text-xl" />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold flex-1">{property.name}</h1>
          </div>
          {/* Foto */}
          <div className="relative mb-4">
            <Image
              src={property.image}
              alt={property.name}
              width={800}
              height={400}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={() => setIsFavorite((f) => !f)}
                className={`p-3 rounded-full shadow bg-white/90 hover:bg-primary/90 transition-colors border ${
                  isFavorite ? 'text-primary' : 'text-gray-500'
                }`}
                aria-label="Favorit"
              >
                <FaHeart />
              </button>
              <button
                className="p-3 rounded-full shadow bg-white/90 hover:bg-primary/90 transition-colors border text-gray-500"
                aria-label="Bagikan"
                onClick={() => navigator.share?.({title: property.name, url: window.location.href})}
              >
                <FaShareAlt />
              </button>
            </div>
          </div>
          {/* Info property di bawah foto */}
          <div className="flex items-center text-gray-700 text-base md:text-lg font-medium mb-2">
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
          </div>
          {/* Rating & review di bawah info */}
          <div className="flex items-center text-gray-700 mb-4 text-base md:text-lg font-medium">
            <span className="flex items-center gap-1">
              <FaStar className="text-yellow-400 text-xl" />
              <span className="font-semibold text-primary">{property.rating}</span>
            </span>
            <span className="mx-2 text-gray-400 text-lg">•</span>
            <span>{info.reviews} Reviews</span>
          </div>
          {/* Garis pembatas */}
          <div className="border-b border-gray-200 mb-6"></div>
          {/* Detail */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <FaMapMarkerAlt className="text-primary" />
              <span className="text-sm">Surabaya • Indonesia</span>
            </div>
            <p className="text-gray-700 whitespace-pre-line text-justify">
              {showFullDesc ? fullDesc : shortDesc + '...'}
              {!showFullDesc && (
                <span
                  className="text-primary font-semibold ml-2 cursor-pointer hover:underline"
                  onClick={() => setShowFullDesc(true)}
                >
                  baca selengkapnya
                </span>
              )}
            </p>
          </div>
          {/* Garis pembatas setelah deskripsi */}
          <div className="border-b border-gray-200 mb-6"></div>
          {/* Fasilitas Properti */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Fasilitas yang tersedia</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl"><FaWifi /></span>
                <span>Wifi</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl"><FaSnowflake /></span>
                <span>AC</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl"><FaUtensils /></span>
                <span>Dapur</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl"><FaCar /></span>
                <span>Parkir mobil</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl"><FaSwimmingPool /></span>
                <span>Kolam renang</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl"><FaTv /></span>
                <span>TV</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-primary text-xl"><FaBath /></span>
                <span>Bathub</span>
              </div>
            </div>
          </div>
        </div>
        {/* Kanan: Booking Box */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-32 bg-white rounded-2xl shadow-xl p-6 space-y-6 border border-gray-200">
            {/* Grouped Durasi & Jumlah Tamu Dropdown */}
            <div className="mb-4">
              <div className="rounded-t-xl border border-b-0 border-gray-200">
                <div className="relative">
                  <label className="absolute left-4 top-1 text-xs text-gray-500 pointer-events-none z-10">
                    Pilih Durasi Sewa
                  </label>
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
                  <label className="absolute left-4 top-1 text-xs text-gray-500 pointer-events-none z-10">
                    Jumlah Tamu
                  </label>
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
            {/* Tambahkan jarak ekstra di sini */}
            <div className="h-4" />
            {/* Garis pembatas lebih tipis dan warna sama seperti garis lain */}
            <div className="border-t border-gray-200" />
            <div className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">Harga Total</span>
                <span className="font-bold text-xl text-primary">
                  Rp {price.toLocaleString('id-ID')}
                </span>
              </div>
              <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:brightness-110 transition">
                Pesan Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Tambahkan detail lain di bawah sini */}
    </main>
  );
}

// Tambahkan komponen dropdown custom di bawah export default:
function CustomDurasiDropdown({ value, onChange, customClass = "", labelHidden = false }) {
  const [open, setOpen] = useState(false);
  const options = [
    { value: '3', label: '3 Hari' },
    { value: '7', label: '1 Minggu' },
    { value: '14', label: '2 Minggu' },
  ];
  const selected = options.find(opt => opt.value === value);

  useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest('.dropdown-durasi')) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className={`dropdown-durasi relative ${customClass}`}>
      {!labelHidden && (
        <label className="absolute left-4 top-1 text-xs text-gray-500 pointer-events-none z-10">
          Pilih Durasi Sewa
        </label>
      )}
      <button
        type="button"
        className="w-full px-4 pt-6 pb-3 text-left bg-white focus:outline-primary flex justify-between items-center cursor-pointer transition-colors hover:bg-gray-100"
        onClick={() => setOpen(v => !v)}
      >
        <span>{selected?.label || 'Pilih Durasi'}</span>
        <svg className={`w-4 h-4 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 z-20 mt-0 w-full bg-white border border-t-0 border-gray-200 rounded-b-xl shadow-lg py-2">
          {/* Garis pembatas antara kotak dropdown dan option */}
          <div className="border-t border-gray-200 mb-2" />
          {options.map((opt, idx) => (
            <React.Fragment key={opt.value}>
              <div
                className={`px-4 py-3 hover:bg-gray-200 cursor-pointer text-base ${value === opt.value ? 'text-primary font-semibold' : 'text-gray-700'}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </div>
              {idx < options.length - 1 && (
                <div className="border-t border-gray-200 mx-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

function JumlahTamuDropdown({ adults, children, setAdults, setChildren, customClass = "", labelHidden = false }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest('.dropdown-tamu')) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const MinusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
  const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="8" y1="4" x2="8" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div className={`dropdown-tamu relative ${customClass}`}>
      {!labelHidden && (
        <label className="absolute left-4 top-1 text-xs text-gray-500 pointer-events-none z-10">
          Jumlah Tamu
        </label>
      )}
      <button
        type="button"
        className="w-full px-4 pt-6 pb-3 text-left bg-white focus:outline-primary flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          {adults + children} tamu
          <span className="text-gray-400 ml-2 text-sm">
            ({adults} dewasa
            {children > 0 ? `, ${children} anak` : ''}
            )
          </span>
        </span>
        <svg className={`w-4 h-4 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
              <span className="w-8 flex items-center justify-center text-base font-semibold select-none">
                {adults}
              </span>
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
              <span className="w-8 flex items-center justify-center text-base font-semibold select-none">
                {children}
              </span>
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
