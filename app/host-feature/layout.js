import '../globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'WeekGo - Host Page',
  description: 'Platform sewa penginapan mingguan',
  icons: {
    icon: '/weekgo_favicon.ico', // atau '/favicon.ico' jika pakai nama default
  },
};

export default function RootLayout({children}) {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto">
        {children}
      </div>
    </div>
  );
}
