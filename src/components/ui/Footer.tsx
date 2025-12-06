import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 text-white mt-16 relative overflow-hidden">
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-14 h-14 bg-gradient-ocean rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg overflow-hidden">
                  <Image
                    src="/cmz-logo.webp"
                    alt="CoolMathsZone Dolphin Logo"
                    width={60}
                    height={60}
                    className="object-cover"
                    priority
                  />
              </div>
              <span className="text-2xl font-bold text-white">CoolMathsZone</span>
            </div>
            <p className="text-blue-100 max-w-md">
              Dive deep into mathematics with our ocean of learning adventures! 
              From counting coral to calculus currents.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-200">Explore</h3>
            <ul className="space-y-2">
              <li><a href="/grades" className="text-blue-100 hover:text-white transition-colors flex items-center">
                <span className="mr-2">🐠</span>Grade Levels
              </a></li>
              <li><a href="/resources" className="text-blue-100 hover:text-white transition-colors flex items-center">
                <span className="mr-2">🎣</span>Exercise
              </a></li>
              <li><a href="/resources" className="text-blue-100 hover:text-white transition-colors flex items-center">
                <span className="mr-2">📜</span>Worksheets
              </a></li>
              <li><a href="/resources" className="text-blue-100 hover:text-white transition-colors flex items-center">
                <span className="mr-2">🐡</span>Resources
              </a></li>
            </ul>
          </div>
          
          {/* Ocean Friends */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-200">Ocean Friends</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-blue-100 hover:text-white transition-colors flex items-center">
                <span className="mr-2">🐬</span>About Us
              </a></li>
              <li><a href="/contact" className="text-blue-100 hover:text-white transition-colors flex items-center">
                <span className="mr-2">🐚</span>Contact Us
              </a></li>
              <li><a href="/parents-guide" className="text-blue-100 hover:text-white transition-colors flex items-center">
                <span className="mr-2">🦑</span>Parents Guide
              </a></li>
              <li><a href="/privacy" className="text-blue-100 hover:text-white transition-colors flex items-center">
                <span className="mr-2">🐢</span>Privacy
              </a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-500/30 mt-8 pt-8 text-center text-blue-200">
          <p className="flex items-center justify-center space-x-2">
            <span>Made with</span>
            <span className="text-red-400">❤️</span>
            <span>for math explorers everywhere</span>
          </p>
        </div>
      </div>
    </footer>
  );
}