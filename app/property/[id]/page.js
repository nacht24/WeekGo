'use client';
import React, { useState, useEffect } from 'react';
import { FaStar, FaMapMarkerAlt, FaShareAlt, FaHeart, FaMinus, FaPlus, FaArrowLeft, FaUserFriends, FaBed, FaBath, FaDoorOpen } from 'react-icons/fa';
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
		description: 'Villa mewah dengan kolam renang pribadi di Bali.',
	},
	{
		id: 2,
		name: 'Apartment Studio Jakarta Selatan',
		image: '/images/home.avif',
		rating: '4.85',
		price3Days: 350000,
		price1Week: 900000,
		price2Weeks: 1600000,
		description: 'Apartemen studio nyaman di Jakarta Selatan.',
	},
	{
		id: 3,
		name: 'Rumah Modern Minimalis Surabaya',
		image: '/images/home.avif',
		rating: '4.80',
		price3Days: 400000,
		price1Week: 1250000,
		price2Weeks: 2100000,
		description: 'Rumah modern minimalis di Surabaya.',
	},
	{
		id: 4,
		name: 'Kost Eksklusif Depok',
		image: '/images/home.avif',
		rating: '4.70',
		price3Days: 250000,
		price1Week: 700000,
		price2Weeks: 1200000,
		description: 'Kost eksklusif di Depok, dekat kampus.',
	},
	{
		id: 5,
		name: 'Guesthouse Jogja Tengah Kota',
		image: '/images/home.avif',
		rating: '4.88',
		price3Days: 300000,
		price1Week: 1100000,
		price2Weeks: 1800000,
		description: 'Guesthouse strategis di tengah kota Jogja.',
	},
	{
		id: 6,
		name: 'Rumah Keluarga Bandung Utara',
		image: '/images/home.avif',
		rating: '4.95',
		price3Days: 450000,
		price1Week: 1350000,
		price2Weeks: 2200000,
		description: 'Rumah keluarga nyaman di Bandung Utara.',
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

export default function PropertyDetail({ params }) {
    const actualParams = React.use(params);
    const { id } = actualParams;
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    // Booking state
    const [duration, setDuration] = useState('3'); // '3', '7', '14'
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    // State untuk baca selengkapnya
    const [showFullDesc, setShowFullDesc] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(t);
    }, []);

    const property = dummyProperties.find((p) => p.id === Number(id));

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
                                onClick={() =>
                                    navigator.share?.({ title: property.name, url: window.location.href })
                                }
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
                        <span>
                            {info.reviews} Reviews
                        </span>
                    </div>
                    {/* Garis pembatas */}
                    <div className="border-b border-gray-200 mb-6"></div>
                    {/* Detail */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                            <FaMapMarkerAlt className="text-primary" />
                            <span className="text-sm">Surabaya • Indonesia</span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-line">
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
                </div>
                {/* Kanan: Booking Box */}
                <div className="w-full lg:w-1/3">
                    <div className="sticky top-24 bg-white rounded-2xl shadow-xl p-6 space-y-6">
                        <div>
                            <label className="block font-semibold mb-2 text-primary">
                                Pilih Durasi Sewa
                            </label>
                            <select
                                className="w-full border rounded-lg px-4 py-2 focus:outline-primary"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            >
                                <option value="3">3 Hari</option>
                                <option value="7">1 Minggu</option>
                                <option value="14">2 Minggu</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold mb-2 text-primary">
                                Jumlah Tamu
                            </label>
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-700">Dewasa</span>
                                    <button
                                        className="p-2 rounded-full border bg-gray-50 hover:bg-primary/10"
                                        onClick={() => setAdults(Math.max(1, adults - 1))}
                                    >
                                        <FaMinus />
                                    </button>
                                    <span className="w-6 text-center">{adults}</span>
                                    <button
                                        className="p-2 rounded-full border bg-gray-50 hover:bg-primary/10"
                                        onClick={() => setAdults(adults + 1)}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-700">Anak</span>
                                    <button
                                        className="p-2 rounded-full border bg-gray-50 hover:bg-primary/10"
                                        onClick={() => setChildren(Math.max(0, children - 1))}
                                    >
                                        <FaMinus />
                                    </button>
                                    <span className="w-6 text-center">{children}</span>
                                    <button
                                        className="p-2 rounded-full border bg-gray-50 hover:bg-primary/10"
                                        onClick={() => setChildren(children + 1)}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="border-t pt-4">
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
        </main>
    );
}