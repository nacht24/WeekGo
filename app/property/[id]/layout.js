import '../../globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'WeekGo - Sewa Mingguan',
  description: 'Platform sewa penginapan mingguan',
};

export default function RootLayout({children}) {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-4">
        {children}
      </div>
    </div>
  );
}
