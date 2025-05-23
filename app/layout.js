import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'WeekGo - Platform sewa penginapan mingguan',
  description: 'Platform sewa penginapan mingguan',
  icons: {
    icon: '/weekgo_favicon.ico', // atau '/favicon.ico' jika pakai nama default
  },
};

export default function RootLayout({children}) {
  const isLanding = typeof window !== 'undefined' && window.location.pathname === '/';
  return (
    <html lang="id">
      <body className="bg-white text-gray-900">
        <div className="min-h-screen">
          {/* <Navbar /> */}
          {/* Hanya wrap container jika bukan halaman landing */}
          {typeof window === 'undefined' ? (
            children
          ) : window.location.pathname === '/' ? (
            children
          ) : (
            <div className="container mx-auto px-4">{children}</div>
          )}
        </div>
      </body>
    </html>
  );
}
