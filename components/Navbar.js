'use client';
import { FiSearch, FiUser } from 'react-icons/fi';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-white border-b py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Image
          src="/weekgo_logo_horizontal.svg"
          alt="WeekGo Logo"
          width={128}
          height={32}
          className="h-8"
        />
        <div className="flex items-center gap-4">
          <button className="border rounded-full p-2">
            <FiSearch />
          </button>
          <button className="border rounded-full p-2">
            <FiUser />
          </button>
        </div>
      </div>
    </nav>
  );
}