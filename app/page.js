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
		price: '1.500.000',
		image: '/images/home.avif',
		rating: '4.32',
	},
	{
		id: 2,
		name: 'Apartment Studio Jakarta Selatan',
		price: '900.000',
		image: '/images/home.avif',
		rating: '4.85',
	},
	{
		id: 3,
		name: 'Rumah Modern Minimalis Surabaya',
		price: '1.250.000',
		image: '/images/home.avif',
		rating: '4.80',
	},
	{
		id: 4,
		name: 'Kost Eksklusif Depok',
		price: '700.000',
		image: '/images/home.avif',
		rating: '4.70',
	},
	{
		id: 5,
		name: 'Guesthouse Jogja Tengah Kota',
		price: '1.100.000',
		image: '/images/home.avif',
		rating: '4.88',
	},
	{
		id: 6,
		name: 'Rumah Keluarga Bandung Utara',
		price: '1.350.000',
		image: '/images/home.avif',
		rating: '4.95',
	},
];

export default function Home() {
	const [search, setSearch] = useState('');
	const [price, setPrice] = useState([0, 2000000]);
	const [rating, setRating] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const t = setTimeout(() => setIsLoading(false), 1200);
		return () => clearTimeout(t);
	}, []);

	const filtered = featuredProperties.filter((p) => {
		const priceNum = Number(p.price.replace(/\./g, ''));
		const matchName = p.name.toLowerCase().includes(search.toLowerCase());
		const matchPrice = priceNum >= price[0] && priceNum <= price[1];
		const matchRating = rating ? Number(p.rating) >= Number(rating) : true;
		return matchName && matchPrice && matchRating;
	});

	if (isLoading) return <PageSkeleton />;

	return (
		<main className="py-6 pb-24">
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
			<BottomFilterBar
				onSearch={setSearch}
				onPriceChange={setPrice}
				onRatingChange={setRating}
			/>
		</main>
	);
}