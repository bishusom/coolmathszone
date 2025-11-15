import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-blue-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo with Dolphin Image */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Logo Container */}
              <div className="w-14 h-14 bg-gradient-ocean rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg overflow-hidden">
                <Image
                  src="/cmz-logo.png"
                  alt="CoolMathsZone Dolphin Logo"
                  width={60}
                  height={60}
                  className="object-cover"
                  priority
                />
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-ocean rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div>
              {/* Fixed text gradient */}
              <h1 className="text-2xl font-black text-gradient-ocean">
                CoolMathsZone
              </h1>
              <p className="text-xs text-blue-600 font-medium">Dive into Math Adventures! 🌊</p>
            </div>
          </Link>
          
          {/* Navigation with ocean emojis */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/grades" className="flex items-center space-x-2 text-blue-700 hover:text-emerald-600 font-bold transition-colors duration-300 py-2 group">
              <span className="text-lg">🐠</span>
              <span className="group-hover:scale-105 transition-transform">Grades</span>
            </Link>
            <Link href="/exercises" className="flex items-center space-x-2 text-blue-700 hover:text-teal-600 font-bold transition-colors duration-300 py-2 group">
              <span className="text-lg">🎣</span>
              <span className="group-hover:scale-105 transition-transform">Exercises</span>
            </Link>
            <Link href="/worksheets" className="flex items-center space-x-2 text-blue-700 hover:text-teal-600 font-bold transition-colors duration-300 py-2 group">
              <span className="text-lg">📜</span>
              <span className="group-hover:scale-105 transition-transform">Worksheets</span>
            </Link>
            <Link href="/resources" className="flex items-center space-x-2 text-blue-700 hover:text-teal-600 font-bold transition-colors duration-300 py-2 group">
              <span className="text-lg">🐡</span>
              <span className="group-hover:scale-105 transition-transform">Resources</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}