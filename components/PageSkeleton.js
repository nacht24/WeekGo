export default function PageSkeleton() {
  return (
    <div className="animate-pulse min-h-screen flex flex-col">
      <div className="h-16 bg-gray-200 w-full mb-6" /> {/* Navbar */}
      <div className="container mx-auto px-4 flex-1">
        <div className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-80" />
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full flex justify-center pointer-events-none z-50">
        <div className="pointer-events-none bg-gray-200/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl flex flex-row items-stretch gap-6 px-6 py-4 my-6 max-w-5xl w-[98%]" />
      </div>
    </div>
  );
}