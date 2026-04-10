import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
      

        {/* Search Bar - Center */}
        <SearchBar />

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <a href="/" className="hover:text-orange-500">Home</a>
        </div>
      </div>
    </nav>
  );
}