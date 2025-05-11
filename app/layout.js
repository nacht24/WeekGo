import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'WeekGo - Sewa Mingguan',
  description: 'Platform sewa penginapan mingguan',
};

export default function RootLayout({children}) {
  return (
    <html lang="id">
      <body className="bg-white text-gray-900">
        <div className="min-h-screen">
          <Navbar />
          <div className="container mx-auto px-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
