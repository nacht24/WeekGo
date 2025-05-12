'use client';
import PropertyCard from '@/components/PropertyCard';
import BottomFilterBar from '@/components/BottomFilterBar';
import PageSkeleton from '@/components/PageSkeleton';
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const featuredProperties = [
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

export default function Home() {
	const [search, setSearch] = useState('');
	const [price, setPrice] = useState([0, 2200000]);
	const [rating, setRating] = useState('');
	const [location, setLocation] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const t = setTimeout(() => setIsLoading(false), 1200);
		return () => clearTimeout(t);
	}, []);

	const locations = [...new Set(featuredProperties.map((p) => p.location))];

	const filtered = featuredProperties.filter((p) => {
		const minPrice = Math.min(p.price3Days, p.price1Week, p.price2Weeks);
		const maxPrice = Math.max(p.price3Days, p.price1Week, p.price2Weeks);
		const matchName = p.name.toLowerCase().includes(search.toLowerCase());
		const matchPrice = maxPrice >= price[0] && minPrice <= price[1];
		const matchRating = rating ? Number(p.rating) >= Number(rating) : true;
		const matchLocation = location ? p.location === location : true;
		return matchName && matchPrice && matchRating && matchLocation;
	});

	if (isLoading) return <PageSkeleton />;

	return (
		<main className="py-6 pb-24">
			<div className="container mx-auto px-4">
				{/* Filter lokasi */}
				<div className="mb-6 flex flex-wrap gap-3">
					<select
						className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-primary"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					>
						<option value="">Semua Lokasi</option>
						{locations.map((loc) => (
							<option key={loc} value={loc}>
								{loc}
							</option>
						))}
					</select>
				</div>
				<div className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{filtered.length === 0 ? (
						<div className="col-span-full flex flex-col items-center justify-center py-24">
							<motion.div
								className="bg-primary/10 rounded-full p-6 mb-4"
								animate={{
									rotate: [0, 0, -20, 15, 0, 10, -10, 0, 0],
									y: [0, 0, -8, 0, 8, 0, -6, 0, 0],
									x: [0, 0, 18, -18, 12, -12, 0, 0, 0],
								}}
								transition={{
									duration: 5,
									times: [0, 0.08, 0.18, 0.32, 0.5, 0.68, 0.82, 0.92, 1],
									repeat: Infinity,
									ease: 'easeInOut',
								}}
							>
								<FiSearch className="text-primary" size={56} />
							</motion.div>
							<h2 className="text-xl font-semibold mb-2 text-gray-700">
								Tidak ada hasil ditemukan
							</h2>
							<p className="text-gray-500 text-center max-w-md">
								Coba kata kunci lain, atur ulang filter harga, atau pilih rating yang
								berbeda.
							</p>
						</div>
					) : (
						filtered.map((property) => (
							<PropertyCard key={property.id} property={property} />
						))
					)}
				</div>
			</div>
			<BottomFilterBar
				onSearch={setSearch}
				onPriceChange={setPrice}
				onRatingChange={setRating}
			/>
		</main>
	);
}